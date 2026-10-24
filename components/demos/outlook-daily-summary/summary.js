/**
 * The counting rules of outlook_daily_summary.py (rNLKJA/Outlook-Mail-Counting),
 * ported to plain JavaScript for the demo on /projects/outlook-daily-summary.
 * Function names follow the Python ones. The only inputs that differ are the
 * mail items: synthetic objects (lib/demos/outlook-daily-summary-data.js) in
 * place of Outlook COM items, with a fixed word count and size each.
 *
 * Kept as the script has them:
 * - An email is new when its EntryID is not in today's tracking accumulator.
 * - A received email counts as replied when its reply time is set, on the same
 *   day, at the moment the run reads it (so here: replied at or before the run).
 * - Response times pair a sent email with the first received email of the same
 *   conversation in the same run, kept when the gap is 0 to 1,440 minutes.
 * - Medians are the upper middle value (sorted[n // 2]), and the top-ten lists
 *   break ties by first appearance, like Counter.most_common.
 */

export const TOP_N = 10;

/** Fresh accumulator. Maps keep insertion order, like Python dicts. */
export function emptyAccumulator() {
  return {
    counted_entryids: [],
    received_words: [],
    sent_words: [],
    sender_counts: new Map(),
    sender_domain_counts: new Map(),
    recipient_counts: new Map(),
    hour_dist_received: new Map(),
    hour_dist_sent: new Map(),
    received_with_attachments: 0,
    received_total_attachments: 0,
    sent_with_attachments: 0,
    sent_total_attachments: 0,
    conversation_ids: [],
    response_times: [],
    received_sizes: [],
    sent_sizes: [],
    subject_words_counts: new Map(),
    replied_count: 0,
    re_sent_count: 0,
  };
}

const bump = (map, key, by = 1) => map.set(key, (map.get(key) || 0) + by);
const minutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const hourOf = (hhmm) => String(Number(hhmm.split(":")[0]));

/** extract_domain: the part after @, lower case, or "(unknown)". */
export function extractDomain(address) {
  const m = String(address || "")
    .trim()
    .match(/@(.+)$/);
  return m ? m[1].toLowerCase() : "(unknown)";
}

/** Python's round() for display values: half to even on an exact tie. */
export function pyRound(x, digits) {
  const m = 10 ** digits;
  const y = x * m;
  const f = Math.floor(y);
  const r = Math.abs(y - f - 0.5) < 1e-9 ? (f % 2 === 0 ? f : f + 1) : Math.round(y);
  return r / m;
}

/** Python's str() of a float: 40 -> "40.0", 37.5 -> "37.5". */
export const pyFloat = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));

/** get_today_items: what has arrived (or gone out) by the run's clock time, oldest first. */
export function getTodayItems(items, clock) {
  return items.filter((it) => minutes(it.time) <= minutes(clock));
}

/** extract_raw_data for one run's new received and sent items. */
export function extractRawData(received, sent, clock) {
  const acc = emptyAccumulator();
  acc.counted_entryids = [...received, ...sent].map((it) => it.id);
  for (const it of received) acc.received_words.push(it.words);
  for (const it of sent) acc.sent_words.push(it.words);
  for (const it of received) {
    const display = it.senderName || extractDomain(it.senderEmail) || "(unknown)";
    bump(acc.sender_counts, display);
  }
  for (const it of received) bump(acc.sender_domain_counts, extractDomain(it.senderEmail));
  for (const it of sent) {
    for (const r of it.to.split(";")) {
      const name = r.trim();
      if (name) bump(acc.recipient_counts, name);
    }
  }
  for (const it of received) bump(acc.hour_dist_received, hourOf(it.time));
  for (const it of sent) bump(acc.hour_dist_sent, hourOf(it.time));
  for (const it of received) {
    if (it.attachments > 0) {
      acc.received_with_attachments += 1;
      acc.received_total_attachments += it.attachments;
    }
  }
  for (const it of sent) {
    if (it.attachments > 0) {
      acc.sent_with_attachments += 1;
      acc.sent_total_attachments += it.attachments;
    }
  }
  for (const it of [...received, ...sent]) {
    if (it.conversationId) acc.conversation_ids.push(it.conversationId);
  }
  const receivedByConv = new Map();
  for (const it of received) {
    if (!receivedByConv.has(it.conversationId)) receivedByConv.set(it.conversationId, it.time);
  }
  for (const it of sent) {
    if (!receivedByConv.has(it.conversationId)) continue;
    const delta = minutes(it.time) - minutes(receivedByConv.get(it.conversationId));
    if (delta >= 0 && delta <= 1440) acc.response_times.push(delta);
  }
  for (const it of received) acc.received_sizes.push(it.size);
  for (const it of sent) acc.sent_sizes.push(it.size);
  for (const it of [...received, ...sent]) {
    const clean = it.subject.replace(/^(re|fw|fwd)\s*:\s*/i, "");
    for (const raw of clean.toLowerCase().split(/\s+/)) {
      const word = raw.replace(/^[.,;:!?()[\]{}<>"']+|[.,;:!?()[\]{}<>"']+$/g, "");
      if (word.length > 3) bump(acc.subject_words_counts, word);
    }
  }
  for (const it of received) {
    if (it.repliedAt && minutes(it.repliedAt) <= minutes(clock)) acc.replied_count += 1;
  }
  for (const it of sent) if (it.subject.toLowerCase().startsWith("re:")) acc.re_sent_count += 1;
  return acc;
}

/** merge_accumulators: EntryIDs as a set, lists joined, counts added. */
export function mergeAccumulators(existing, fresh) {
  const merged = emptyAccumulator();
  for (const key of Object.keys(merged)) {
    const a = existing[key];
    const b = fresh[key];
    if (key === "counted_entryids") merged[key] = [...new Set([...a, ...b])];
    else if (Array.isArray(a)) merged[key] = [...a, ...b];
    else if (a instanceof Map) {
      const m = new Map(a);
      for (const [k, v] of b) bump(m, k, v);
      merged[key] = m;
    } else merged[key] = a + b;
  }
  return merged;
}

/** Counter.most_common(n): highest first, ties in first-seen order. */
function mostCommon(map, n) {
  return [...map.entries()]
    .map((e, i) => [...e, i])
    .sort((x, y) => y[1] - x[1] || x[2] - y[2])
    .slice(0, n)
    .map(([k, v]) => [k, v]);
}

const median = (xs) => (xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)] : 0);
const sum = (xs) => xs.reduce((a, b) => a + b, 0);

/** compute_final_stats. */
export function computeFinalStats(acc, day) {
  const received = acc.received_words.length;
  const sent = acc.sent_words.length;
  const rts = acc.response_times;
  return {
    date: day.iso,
    day_name: day.dayName,
    sent_count: sent,
    received_count: received,
    replied_count: acc.replied_count,
    total_traffic: sent + received,
    re_sent_count: acc.re_sent_count,
    received_avg_words: received ? pyRound(sum(acc.received_words) / received, 1) : 0,
    received_median_words: median(acc.received_words),
    received_total_words: sum(acc.received_words),
    sent_avg_words: sent ? pyRound(sum(acc.sent_words) / sent, 1) : 0,
    sent_median_words: median(acc.sent_words),
    sent_total_words: sum(acc.sent_words),
    top_senders: mostCommon(acc.sender_counts, TOP_N),
    top_sender_domains: mostCommon(acc.sender_domain_counts, TOP_N),
    top_recipients: mostCommon(acc.recipient_counts, TOP_N),
    hour_dist_received: [...acc.hour_dist_received]
      .map(([h, c]) => [Number(h), c])
      .sort((a, b) => a[0] - b[0]),
    hour_dist_sent: [...acc.hour_dist_sent]
      .map(([h, c]) => [Number(h), c])
      .sort((a, b) => a[0] - b[0]),
    received_with_attachments: acc.received_with_attachments,
    received_total_attachments: acc.received_total_attachments,
    sent_with_attachments: acc.sent_with_attachments,
    sent_total_attachments: acc.sent_total_attachments,
    unique_conversations: new Set(acc.conversation_ids).size,
    reply_rate: received > 0 ? pyRound((acc.replied_count / received) * 100, 1) : 0,
    avg_response_minutes: rts.length ? pyRound(sum(rts) / rts.length, 1) : null,
    received_total_mb: pyRound(sum(acc.received_sizes) / (1024 * 1024), 2),
    sent_total_mb: pyRound(sum(acc.sent_sizes) / (1024 * 1024), 2),
    top_subject_keywords: mostCommon(acc.subject_words_counts, Math.min(TOP_N, 15)),
  };
}

/** The Daily Log columns (log_columns) and the row save_to_excel writes. */
export const LOG_COLUMNS = [
  "Date",
  "Day",
  "Sent",
  "Received",
  "Replied",
  "Total Traffic",
  "Reply Rate (%)",
  "Avg Words (Sent)",
  "Avg Words (Received)",
  "Median Words (Sent)",
  "Median Words (Received)",
  "Avg Response (min)",
  "Unique Conversations",
  "Received w/ Attach",
  "Sent w/ Attach",
  "Received MB",
  "Sent MB",
];

export function logRow(s) {
  return [
    s.date,
    s.day_name,
    s.sent_count,
    s.received_count,
    s.replied_count,
    s.total_traffic,
    s.reply_rate,
    s.sent_avg_words,
    s.received_avg_words,
    s.sent_median_words,
    s.received_median_words,
    s.avg_response_minutes ? s.avg_response_minutes : "N/A",
    s.unique_conversations,
    s.received_with_attachments,
    s.sent_with_attachments,
    s.received_total_mb,
    s.sent_total_mb,
  ];
}

const formatHour = (h) => `${String(h).padStart(2, "0")}:00 – ${String(h).padStart(2, "0")}:59`;

/** The sections of the Detail sheet, in the order save_to_excel writes them. */
export function detailSections(s, isRerun) {
  const rank = (rows) => rows.map(([k, v], i) => [i + 1, k, v]);
  const sections = [
    {
      title: `Summary · ${s.date} (${s.day_name})${isRerun ? " (updated via re-run)" : ""}`,
      headers: ["Metric", "Value"],
      rows: [
        ["Sent", s.sent_count],
        ["Received", s.received_count],
        ["Replied To", s.replied_count],
        ["Total Traffic", s.total_traffic],
        ["Reply Rate", `${pyFloat(s.reply_rate)}%`],
        ["Unique Conversations", s.unique_conversations],
        ["RE: Subjects in Sent", s.re_sent_count],
      ],
    },
    {
      title: "Word Count Analysis",
      headers: ["Metric", "Value"],
      rows: [
        ["Avg Words (Sent)", s.sent_avg_words],
        ["Avg Words (Received)", s.received_avg_words],
        ["Median Words (Sent)", s.sent_median_words],
        ["Median Words (Received)", s.received_median_words],
        ["Total Words (Sent)", s.sent_total_words],
        ["Total Words (Received)", s.received_total_words],
      ],
    },
    {
      title: `Top ${TOP_N} People Who Emailed You`,
      headers: ["Rank", "Sender", "Email Count"],
      rows: rank(s.top_senders),
    },
    {
      title: `Top ${TOP_N} Sender Domains`,
      headers: ["Rank", "Domain", "Email Count"],
      rows: rank(s.top_sender_domains),
    },
    {
      title: `Top ${TOP_N} People You Emailed`,
      headers: ["Rank", "Recipient", "Email Count"],
      rows: rank(s.top_recipients),
    },
  ];
  if (s.hour_dist_received.length) {
    sections.push({
      title: "Hourly Distribution · Received",
      headers: ["Hour", "Count"],
      rows: s.hour_dist_received.map(([h, c]) => [formatHour(h), c]),
      hourly: true,
    });
  }
  if (s.hour_dist_sent.length) {
    sections.push({
      title: "Hourly Distribution · Sent",
      headers: ["Hour", "Count"],
      rows: s.hour_dist_sent.map(([h, c]) => [formatHour(h), c]),
      hourly: true,
    });
  }
  sections.push({
    title: "Attachments, Size & Response Time",
    headers: ["Metric", "Value"],
    rows: [
      ["Received with Attachments", s.received_with_attachments],
      ["Total Received Attachments", s.received_total_attachments],
      ["Sent with Attachments", s.sent_with_attachments],
      ["Total Sent Attachments", s.sent_total_attachments],
      ["Total Received (MB)", s.received_total_mb],
      ["Total Sent (MB)", s.sent_total_mb],
      ["Avg Response Time (min)", s.avg_response_minutes ? String(s.avg_response_minutes) : "N/A"],
    ],
  });
  if (s.top_subject_keywords.length) {
    sections.push({
      title: "Common Subject Keywords",
      headers: ["Rank", "Keyword", "Occurrences"],
      rows: rank(s.top_subject_keywords),
    });
  }
  return sections;
}

/**
 * One run of main() at `clock`: scan, skip what is counted, merge, save. Returns
 * the next state and the console lines, close to what the script prints.
 * State: { tracking: accumulator | null, stats, isRerun, workbook: bool, runs }.
 */
export function runScript(state, mailbox, day, clock) {
  const out = [];
  const say = (text, tone = "normal") => out.push({ text, tone });
  const already = new Set(state.tracking?.counted_entryids || []);
  // The script prints a line of 60 "=" here; the demo draws a hairline.
  const rule = "=".repeat(60);
  say("Connecting to Microsoft Outlook ...", "dim");
  say("Connected successfully.", "dim");
  say(rule, "rule");
  say(`Outlook Daily Summary · ${day.long} · ${clock}`, "strong");
  if (already.size) {
    say(
      `(Re-run detected · ${already.size} emails already counted; will only pick up new ones)`,
      "dim"
    );
  }
  say(rule, "rule");
  const scan = (items, label, what) => {
    say(`Scanning ${label} for today's ${what} emails ...`);
    const all = getTodayItems(items, clock);
    say(`  Found ${all.length} total ${what} email(s)`);
    const fresh = all.filter((it) => !already.has(it.id));
    const skipped = all.length - fresh.length;
    if (skipped > 0) {
      say(`    (skipped ${skipped} already-counted email${skipped !== 1 ? "s" : ""})`, "dim");
    }
    return fresh;
  };
  const receivedNew = scan(mailbox.inbox, "Inbox", "received");
  const sentNew = scan(mailbox.sent, "Sent Items", "sent");
  const runs = state.runs + 1;

  if (!receivedNew.length && !sentNew.length) {
    say("No new emails found since last run.", "strong");
    if (already.size) {
      say(`Today's tracking already has ${already.size} emails recorded.`);
      say("Excel spreadsheet is up to date · nothing to add.");
    } else {
      say("No email activity detected for today.");
    }
    return { state: { ...state, runs, clock }, lines: out };
  }

  say(
    `Extracting data from ${receivedNew.length} new received + ${sentNew.length} new sent emails ...`
  );
  const fresh = extractRawData(receivedNew, sentNew, clock);
  const isRerun = already.size > 0;
  let merged;
  if (isRerun) {
    say("Merging new emails with existing daily data ...");
    merged = mergeAccumulators(state.tracking, fresh);
    const added = fresh.counted_entryids.length;
    say(
      `Merged ${added} new email(s) into existing ${merged.counted_entryids.length - added}.`,
      "strong"
    );
  } else {
    merged = fresh;
    say(`First run for today · ${merged.counted_entryids.length} email(s) collected.`, "strong");
  }
  say("Tracking saved to: email_tracking.json");
  say("Computing summary statistics ...");
  const stats = computeFinalStats(merged, day);
  say("Saving to Excel spreadsheet ...");
  if (state.workbook && state.stats) say(`  (Updating existing row 2 for ${day.iso})`, "dim");
  say("Excel report saved to: DailyEmailSummary.xlsx");
  say(
    `sent ${stats.sent_count} · received ${stats.received_count} · replied to ${stats.replied_count} · reply rate ${stats.reply_rate.toFixed(1)}% · ${stats.unique_conversations} conversations`,
    "strong"
  );
  return {
    state: { tracking: merged, stats, isRerun, workbook: true, runs, clock },
    lines: out,
  };
}

export const initialState = () => ({
  tracking: null,
  stats: null,
  isRerun: false,
  workbook: false,
  runs: 0,
  clock: null,
});
