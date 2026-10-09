/**
 * Step 1: the members' cards and a top-up form. Each member row shows the meals
 * left as a strip of small squares (a calm pixel touch, hidden from screen
 * readers, which hear the number instead). The form is a native select and a
 * radio group, so it works from the keyboard as is.
 */
import { useState } from "react";
import { fill } from "@/lib/fill";
import { DEMO as D, MEMBERS, PACKS } from "@/lib/demos/order-system-sandbox-data";
import Panel from "./Panel";
import { money, noticeFor } from "./rules";
import { BTN_PRIMARY, INPUT, META, NOTICE, PILL } from "./ui";

const DOTS = 12;

function MealDots({ n }) {
  return (
    <span aria-hidden="true" className="flex items-center gap-[3px]">
      {Array.from({ length: DOTS }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 ${
            i < n ? "bg-[#1A1A1A] dark:bg-[#EEEEEE]" : "bg-[#E0E0E0] dark:bg-[#2A2A2A]"
          }`}
        />
      ))}
      <span className="w-3 font-mono text-[10px] leading-none text-[#6E6E6E] dark:text-[#9A9A9A]">
        {n > DOTS ? "+" : ""}
      </span>
    </span>
  );
}

export default function TopUpPanel({ state, dispatch, lang, uid }) {
  const L = (o) => o[lang];
  const T = D.topUp;
  const [memberId, setMemberId] = useState("m3");
  const [packId, setPackId] = useState(PACKS[0].id);
  const selected = MEMBERS.find((m) => m.id === memberId);
  const notice = noticeFor(state, "topUp", lang);

  return (
    <Panel n={1} id={`${uid}-topup`} title={L(T.title)} lang={lang}>
      <h4 className={`${META} mb-2`}>{L(T.members)}</h4>
      <ul className="mb-5 divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] border-y border-[#F0F0F0] dark:border-[#2A2A2A]">
        {state.members.map((m) => {
          const name = MEMBERS.find((x) => x.id === m.id).name[lang];
          return (
            <li key={m.id} className="flex items-center gap-3 py-2 text-sm">
              <span className="min-w-[3.5rem] text-[#1A1A1A] dark:text-[#EEEEEE]">{name}</span>
              <MealDots n={m.remaining} />
              <span
                className={`ml-auto font-mono text-xs ${
                  m.remaining === 0
                    ? "text-[#CC0000] dark:text-[#FF6B6B]"
                    : "text-[#3D3D3D] dark:text-[#AAAAAA]"
                }`}
              >
                {m.remaining === 0 ? L(T.usedUp) : fill(L(T.left), { n: m.remaining })}
              </span>
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "topUp", memberId, packId });
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor={`${uid}-member`} className={`${META} block mb-1`}>
            {L(T.member)}
          </label>
          <select
            id={`${uid}-member`}
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className={INPUT}
          >
            {MEMBERS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name[lang]}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="min-w-0">
          <legend className={`${META} mb-2`}>{L(T.pack)}</legend>
          <div className="flex flex-wrap gap-1.5">
            {PACKS.map((p) => (
              <label key={p.id} className="relative cursor-pointer">
                <input
                  type="radio"
                  name={`${uid}-pack`}
                  value={p.id}
                  checked={packId === p.id}
                  onChange={() => setPackId(p.id)}
                  className="peer sr-only"
                />
                <span className={PILL}>
                  {fill(L(T.packLabel), { meals: p.meals, price: money(p.cents) })}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <p
          id={`${uid}-topup-hint`}
          className="text-xs text-[#595959] dark:text-[#9A9A9A] leading-relaxed"
        >
          {L(T.hint)}
        </p>
        <button type="submit" className={BTN_PRIMARY} aria-describedby={`${uid}-topup-hint`}>
          {fill(L(T.button), { name: selected.name[lang] })}
        </button>
      </form>
      <p role="status" className={NOTICE}>
        {notice}
      </p>
    </Panel>
  );
}
