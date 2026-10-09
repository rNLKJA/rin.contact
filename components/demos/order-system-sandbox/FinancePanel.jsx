/**
 * Step 4: the day's roll-up, recomputed from the ledger, orders and cards on
 * every change, plus the ledger itself and a small spending form. The form
 * checks the same rules as the app's expense schema and shows what is wrong
 * next to the field, linked with aria-describedby.
 */
import { useState } from "react";
import { fill } from "@/lib/fill";
import { DEMO as D } from "@/lib/demos/order-system-sandbox-data";
import Panel from "./Panel";
import { DESC_MAX, mealsText, money, nameOf, noticeFor, parseAmount, rollUp } from "./rules";
import { BTN_PRIMARY, ERROR, INPUT, META, NOTICE } from "./ui";

export default function FinancePanel({ state, dispatch, lang, uid }) {
  const L = (o) => o[lang];
  const F = D.finance;
  const r = rollUp(state);
  const notice = noticeFor(state, "finance", lang);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const cents = parseAmount(amount);
    const text = desc.trim();
    const next = {
      amount: cents === null ? L(F.badAmount) : "",
      desc: text.length === 0 || text.length > DESC_MAX ? L(F.badDesc) : "",
    };
    setErrors(next);
    if (next.amount || next.desc) {
      document.getElementById(next.amount ? `${uid}-amount` : `${uid}-desc`)?.focus();
      return;
    }
    dispatch({ type: "expense", cents, desc: text });
    setAmount("");
    setDesc("");
  };

  const entryText = (l) => {
    if (l.kind === "card") {
      return fill(L(F.cardEntry), { name: nameOf(l, lang), meals: mealsText(l.meals, lang) });
    }
    if (l.kind === "walkIn") {
      return fill(L(F.walkInEntry), { name: l.guest, meals: mealsText(l.meals, lang) });
    }
    return typeof l.desc === "string" ? l.desc : L(l.desc);
  };

  const stats = [
    [L(F.cardSales), money(r.cardSales)],
    [L(F.walkIns), money(r.walkIns)],
    [L(F.spending), money(r.spending)],
    [L(F.delivered), mealsText(r.delivered, lang)],
  ];

  return (
    <Panel n={4} id={`${uid}-finance`} title={L(F.title)} lang={lang}>
      <dl className="grid grid-cols-2 gap-px mb-5 border border-[#F0F0F0] dark:border-[#3D3D3D] bg-[#F0F0F0] dark:bg-[#3D3D3D] rounded-lg overflow-hidden">
        <div className="col-span-2 bg-white dark:bg-[#0A0A0A] px-3 py-3">
          <dt className={META}>{L(F.net)}</dt>
          <dd
            className={`mt-1 font-display text-3xl leading-none ${
              r.net < 0
                ? "text-[#CC0000] dark:text-[#FF6B6B]"
                : "text-[#1A1A1A] dark:text-[#EEEEEE]"
            }`}
          >
            {money(r.net)}
          </dd>
        </div>
        {stats.map(([k, v]) => (
          <div key={k} className="bg-white dark:bg-[#0A0A0A] px-3 py-2.5 min-w-0">
            <dt className={META}>{k}</dt>
            <dd className="font-mono text-sm text-[#1A1A1A] dark:text-[#EEEEEE] break-words">
              {v}
            </dd>
          </div>
        ))}
        <div className="col-span-2 bg-white dark:bg-[#0A0A0A] px-3 py-2.5">
          <dt className={META}>{L(F.onCards)}</dt>
          <dd className="font-mono text-sm text-[#1A1A1A] dark:text-[#EEEEEE]">
            {mealsText(r.onCards, lang)}
          </dd>
        </div>
      </dl>

      <h4 className={`${META} mb-2`}>{L(F.ledger)}</h4>
      <ul className="mb-5 divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] border-y border-[#F0F0F0] dark:border-[#2A2A2A]">
        {state.ledger
          .slice()
          .reverse()
          .map((l) => (
            <li key={l.id} className="py-2 flex items-start justify-between gap-3 text-sm">
              <span className="min-w-0">
                <span
                  className={`block break-words text-[#1A1A1A] dark:text-[#EEEEEE] ${
                    l.voided ? "line-through decoration-[#9A9A9A]" : ""
                  }`}
                >
                  {entryText(l)}
                </span>
                <span className="text-[10px] tracking-wide text-[#6E6E6E] dark:text-[#9A9A9A]">
                  {l.kind === "expense" ? L(F.manual) : L(F.auto)}
                  {l.voided ? ` · ${L(F.voided)}` : ""}
                </span>
              </span>
              <span
                className={`shrink-0 font-mono text-xs ${
                  l.voided
                    ? "line-through text-[#9A9A9A]"
                    : l.kind === "expense"
                      ? "text-[#3D3D3D] dark:text-[#AAAAAA]"
                      : "text-[#1A1A1A] dark:text-[#EEEEEE]"
                }`}
              >
                {l.kind === "expense" ? money(-l.cents) : money(l.cents)}
              </span>
            </li>
          ))}
      </ul>

      <form onSubmit={submit} noValidate>
        <fieldset className="min-w-0">
          <legend className={`${META} mb-2`}>{L(F.add)}</legend>
          <div className="grid gap-3 sm:grid-cols-[120px_minmax(0,1fr)]">
            <div className="min-w-0">
              <label
                htmlFor={`${uid}-amount`}
                className="block mb-1 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]"
              >
                {L(F.amount)}
              </label>
              <input
                id={`${uid}-amount`}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                maxLength={10}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-invalid={Boolean(errors.amount) || undefined}
                aria-describedby={errors.amount ? `${uid}-amount-error` : undefined}
                className={`${INPUT} font-mono`}
              />
            </div>
            <div className="min-w-0">
              <label
                htmlFor={`${uid}-desc`}
                className="block mb-1 text-xs text-[#3D3D3D] dark:text-[#AAAAAA]"
              >
                {L(F.desc)}
              </label>
              <input
                id={`${uid}-desc`}
                type="text"
                autoComplete="off"
                maxLength={DESC_MAX}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                aria-invalid={Boolean(errors.desc) || undefined}
                aria-describedby={errors.desc ? `${uid}-desc-error` : undefined}
                className={INPUT}
              />
            </div>
          </div>
          {errors.amount && (
            <p id={`${uid}-amount-error`} className={`${ERROR} mt-2`}>
              {errors.amount}
            </p>
          )}
          {errors.desc && (
            <p id={`${uid}-desc-error`} className={`${ERROR} mt-2`}>
              {errors.desc}
            </p>
          )}
          <button type="submit" className={`${BTN_PRIMARY} mt-3`}>
            {L(F.submit)}
          </button>
        </fieldset>
      </form>
      <p role="status" className={NOTICE}>
        {notice}
      </p>
    </Panel>
  );
}
