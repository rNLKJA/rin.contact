/**
 * The order system sandbox on /projects/order-system-sandbox: a concept demo of
 * one day at a meal-prep studio, in four steps (top up a card, turn the mock
 * group-chat sign-up into orders, move meals through the kitchen, then read the
 * day's roll-up), with an activity log underneath.
 *
 * Everything is synthetic and in memory: nothing is stored or sent, and a
 * reload or the reset button starts over. The page keys this component by
 * language, so switching locale starts a fresh sandbox in that language.
 *
 * Accessibility: every control is a native button, select, radio, text field
 * or textarea, so it all works from the keyboard. Each step reports its result
 * in its own polite status line, and a button that a rule blocks stays
 * focusable (aria-disabled) and says why when pressed. The only motion is
 * colour fades, and those switch off for prefers-reduced-motion.
 */
import { useId, useReducer } from "react";
import { DEMO as D } from "@/lib/demos/order-system-sandbox-data";
import ActivityLog from "./ActivityLog";
import FinancePanel from "./FinancePanel";
import KitchenPanel from "./KitchenPanel";
import SignupPanel from "./SignupPanel";
import TopUpPanel from "./TopUpPanel";
import { initState, noticeFor, reducer } from "./rules";
import { BTN } from "./ui";

export default function OrderSystemSandbox({ lang = "en" }) {
  const L = (o) => o[lang];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const [state, dispatch] = useReducer(reducer, lang, initState);
  const props = { state, dispatch, lang, uid: `oss${uid}` };

  return (
    <div role="region" aria-label={L(D.regionLabel)} className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] dark:border-[#3D3D3D] px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase text-[#3D3D3D] dark:text-[#AAAAAA]">
          <span aria-hidden="true" className="grid grid-cols-2 gap-[2px]">
            <span className="h-[3px] w-[3px] bg-[#CC0000] dark:bg-[#FF3C3C]" />
            <span className="h-[3px] w-[3px] bg-[#1A1A1A] dark:bg-[#EEEEEE]" />
            <span className="h-[3px] w-[3px] bg-[#1A1A1A] dark:bg-[#EEEEEE]" />
            <span className="h-[3px] w-[3px] bg-[#1A1A1A] dark:bg-[#EEEEEE]" />
          </span>
          {L(D.synthetic)}
        </p>
        <button type="button" className={BTN} onClick={() => dispatch({ type: "reset", lang })}>
          {L(D.reset)}
        </button>
      </div>
      <p
        role="status"
        className="mb-3 break-words text-xs leading-relaxed text-[#1A1A1A] dark:text-[#EEEEEE]"
      >
        {noticeFor(state, "top", lang)}
      </p>

      <div className="grid gap-4 md:grid-cols-2 md:items-start mb-4">
        <TopUpPanel {...props} />
        <SignupPanel {...props} />
        <KitchenPanel {...props} />
        <FinancePanel {...props} />
      </div>

      <ActivityLog log={state.log} lang={lang} uid={props.uid} />
    </div>
  );
}
