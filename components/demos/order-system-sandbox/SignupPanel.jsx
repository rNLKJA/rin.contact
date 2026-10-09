/**
 * Step 2: a mock group-chat sign-up, editable, with a live check of every line
 * before anything is saved. Ready lines become orders in one press. The enter
 * button stays focusable when there is nothing new to enter (aria-disabled), so
 * keyboard focus never drops to the page, and it explains why instead.
 */
import { useMemo } from "react";
import { fill } from "@/lib/fill";
import { DEMO as D, WALK_IN_CENTS } from "@/lib/demos/order-system-sandbox-data";
import Panel from "./Panel";
import { checkSignup, mealsText, money, nameOf, noticeFor } from "./rules";
import { BTN_PRIMARY, ERROR, INPUT, META, NOTICE } from "./ui";

const TAG = {
  ready:
    "border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-black",
  entered: "border-[#BDBDBD] text-[#595959] dark:border-[#595959] dark:text-[#9A9A9A]",
  held: "border-[#CC0000] text-[#CC0000] dark:border-[#FF6B6B] dark:text-[#FF6B6B]",
  skipped:
    "border-dashed border-[#BDBDBD] text-[#595959] dark:border-[#595959] dark:text-[#9A9A9A]",
};

export default function SignupPanel({ state, dispatch, lang, uid }) {
  const L = (o) => o[lang];
  const S = D.signup;
  const rows = useMemo(
    () => checkSignup(state.text, state.members, state.entered),
    [state.text, state.members, state.entered]
  );
  const readyCount = rows.filter((r) => r.status === "ready").length;
  const notice = noticeFor(state, "signup", lang);

  const mealsOf = (r) =>
    [r.lunch > 0 && `${L(D.lunch)} ${r.lunch}`, r.dinner > 0 && `${L(D.dinner)} ${r.dinner}`]
      .filter(Boolean)
      .join(L(D.listSep));

  const detail = (r) => {
    if (r.status === "ready" && r.guest) {
      return fill(L(S.readyWalkIn), {
        name: r.guest,
        meals: mealsOf(r),
        amount: money(r.cents),
        price: money(WALK_IN_CENTS),
      });
    }
    if (r.status === "ready") {
      return fill(L(S.readyCard), {
        name: nameOf(r, lang),
        meals: mealsOf(r),
        before: r.before,
        after: r.after,
      });
    }
    if (!r.error) return "";
    const e = r.error;
    if (e.code === "noBalance") {
      return fill(L(S.errors.noBalance), {
        name: nameOf(r, lang),
        left: mealsText(e.left, lang),
        need: mealsText(e.need, lang),
      });
    }
    return fill(L(S.errors[e.code]), { name: r.name });
  };

  return (
    <Panel n={2} id={`${uid}-signup`} title={L(S.title)} lang={lang}>
      {/* Mock chat: a pinned message from the studio, then the sign-up list */}
      <div className="rounded-lg bg-[#F7F7F7] dark:bg-[#141414] p-3 mb-4">
        <p className={`${META} font-mono mb-2`}>{L(S.chat)}</p>
        <div className="max-w-[92%] rounded-lg rounded-tl-none bg-white dark:bg-[#0A0A0A] border border-[#F0F0F0] dark:border-[#2A2A2A] px-3 py-2 mb-3">
          <p className="text-[10px] font-semibold text-[#6E6E6E] dark:text-[#9A9A9A] mb-0.5">
            {L(S.studio)}
          </p>
          <p className="text-sm text-[#1A1A1A] dark:text-[#EEEEEE] leading-relaxed">
            {L(S.pinned)}
          </p>
        </div>
        <label htmlFor={`${uid}-text`} className={`${META} block mb-1`}>
          {L(S.field)}
        </label>
        <textarea
          id={`${uid}-text`}
          rows={7}
          maxLength={2000}
          spellCheck={false}
          autoComplete="off"
          value={state.text}
          onChange={(e) => dispatch({ type: "text", text: e.target.value })}
          aria-describedby={`${uid}-text-help`}
          className={`${INPUT} font-mono leading-relaxed resize-y`}
        />
        <p
          id={`${uid}-text-help`}
          className="mt-1 text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed"
        >
          {L(S.help)}
        </p>
      </div>

      <h4 className={`${META} mb-2`}>{L(S.check)}</h4>
      {rows.length === 0 ? (
        <p className="text-sm text-[#595959] dark:text-[#9A9A9A] mb-4">{L(S.empty)}</p>
      ) : (
        <ol className="mb-4 divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] border-y border-[#F0F0F0] dark:border-[#2A2A2A]">
          {rows.map((r) => (
            <li key={r.n} className="py-2 flex items-start gap-2.5">
              <span
                className={`mt-0.5 shrink-0 rounded-full border px-2 py-px text-[10px] tracking-wide ${TAG[r.status]}`}
              >
                {L(S.tag[r.status])}
              </span>
              <span className="min-w-0 text-sm leading-relaxed">
                <span className="block font-mono text-xs text-[#6E6E6E] dark:text-[#9A9A9A] break-words">
                  {r.raw}
                </span>
                <span
                  className={
                    r.error && r.status === "held"
                      ? ERROR
                      : "text-[#3D3D3D] dark:text-[#CCCCCC] break-words"
                  }
                >
                  {detail(r)}
                </span>
              </span>
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        className={BTN_PRIMARY}
        aria-disabled={readyCount === 0 || undefined}
        onClick={() => dispatch({ type: "enter" })}
      >
        {fill(L(S.enter), { n: readyCount })}
      </button>
      <p role="status" className={NOTICE}>
        {notice}
      </p>
    </Panel>
  );
}
