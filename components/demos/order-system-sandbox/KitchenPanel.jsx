/**
 * Step 3: the kitchen tally (meals by status, in pixel-font figures) and the
 * order list. Every order keeps the same three buttons whatever its status, and
 * a button that a rule blocks is aria-disabled rather than removed or disabled,
 * so focus stays put and pressing it says which rule applies.
 */
import { fill } from "@/lib/fill";
import { DEMO as D } from "@/lib/demos/order-system-sandbox-data";
import Panel from "./Panel";
import { MEAL_TYPES, STATUSES, nameOf, noticeFor, tally } from "./rules";
import { BTN, META, NOTICE } from "./ui";

const CHIP = {
  pending: "border-[#BDBDBD] text-[#3D3D3D] dark:border-[#595959] dark:text-[#CCCCCC]",
  prepared:
    "border-[#1A1A1A] text-[#1A1A1A] dark:border-[#EEEEEE] dark:text-[#EEEEEE] font-semibold",
  delivered:
    "border-[#1A1A1A] bg-[#1A1A1A] text-white dark:border-[#EEEEEE] dark:bg-[#EEEEEE] dark:text-black",
  cancelled:
    "border-dashed border-[#BDBDBD] text-[#6E6E6E] dark:border-[#595959] dark:text-[#9A9A9A]",
};

export default function KitchenPanel({ state, dispatch, lang, uid }) {
  const L = (o) => o[lang];
  const K = D.kitchen;
  const t = tally(state.orders);
  const notice = noticeFor(state, "kitchen", lang);
  const mealName = (meal) => L(meal === "lunch" ? D.lunch : D.dinner);
  const hasPending = state.orders.some((o) => o.status === "pending");
  const hasPrepared = state.orders.some((o) => o.status === "prepared");

  return (
    <Panel n={3} id={`${uid}-kitchen`} title={L(K.title)} lang={lang}>
      <table className="w-full mb-5 border-y border-[#F0F0F0] dark:border-[#2A2A2A] text-left">
        <caption className="sr-only">{L(K.caption)}</caption>
        <thead>
          <tr>
            <th scope="col" className="py-2">
              <span className="sr-only">{L(K.statusCol)}</span>
            </th>
            {MEAL_TYPES.map((meal) => (
              <th key={meal} scope="col" className={`${META} py-2 text-right font-normal`}>
                {mealName(meal)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STATUSES.map((s) => (
            <tr key={s} className="border-t border-[#F0F0F0] dark:border-[#2A2A2A]">
              <th
                scope="row"
                className="py-2 pr-2 text-xs font-normal text-[#3D3D3D] dark:text-[#AAAAAA]"
              >
                {L(K.status[s])}
              </th>
              {MEAL_TYPES.map((meal) => (
                <td
                  key={meal}
                  className="py-2 text-right font-display text-2xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE]"
                >
                  {t[meal][s]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h4 className={META}>{L(K.orders)}</h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            className={BTN}
            aria-disabled={!hasPending || undefined}
            onClick={() => dispatch({ type: "bulk", from: "pending" })}
          >
            {L(K.allPrepared)}
          </button>
          <button
            type="button"
            className={BTN}
            aria-disabled={!hasPrepared || undefined}
            onClick={() => dispatch({ type: "bulk", from: "prepared" })}
          >
            {L(K.allDelivered)}
          </button>
        </div>
      </div>

      {state.orders.length === 0 ? (
        <p className="text-sm text-[#595959] dark:text-[#9A9A9A]">{L(K.empty)}</p>
      ) : (
        <ul className="divide-y divide-[#F0F0F0] dark:divide-[#2A2A2A] border-y border-[#F0F0F0] dark:border-[#2A2A2A]">
          {state.orders.map((o) => {
            const name = nameOf(o, lang);
            const meal = mealName(o.meal);
            const final = o.status === "delivered" || o.status === "cancelled";
            const label = (action) => fill(L(K.actionLabel), { action, name, meal, qty: o.qty });
            const advance =
              o.status === "pending"
                ? L(K.toPrepared)
                : o.status === "prepared"
                  ? L(K.toDelivered)
                  : L(K.final);
            return (
              <li key={o.id} className="py-2.5">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                  <span
                    className={`min-w-0 break-words text-sm text-[#1A1A1A] dark:text-[#EEEEEE] ${
                      o.status === "cancelled" ? "line-through decoration-[#9A9A9A]" : ""
                    }`}
                  >
                    {name}
                    {o.guest && (
                      <span className="ml-1 text-xs text-[#6E6E6E] dark:text-[#9A9A9A]">
                        ({L(K.walkIn)})
                      </span>
                    )}
                    <span className="text-[#6E6E6E] dark:text-[#9A9A9A]">
                      {" "}
                      · {meal} × {o.qty}
                    </span>
                  </span>
                  <span
                    className={`rounded-full border px-2 py-px text-[10px] tracking-wide ${CHIP[o.status]}`}
                  >
                    {L(K.status[o.status])}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    className={BTN}
                    aria-disabled={final || undefined}
                    aria-label={label(advance)}
                    onClick={() => dispatch({ type: "advance", id: o.id })}
                  >
                    {advance}
                  </button>
                  <button
                    type="button"
                    className={BTN}
                    aria-disabled={o.status !== "prepared" || undefined}
                    aria-label={label(L(K.back))}
                    onClick={() => dispatch({ type: "back", id: o.id })}
                  >
                    {L(K.back)}
                  </button>
                  <button
                    type="button"
                    className={BTN}
                    aria-disabled={final || undefined}
                    aria-label={label(L(K.cancel))}
                    onClick={() => dispatch({ type: "cancel", id: o.id })}
                  >
                    {L(K.cancel)}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p role="status" className={NOTICE}>
        {notice}
      </p>
    </Panel>
  );
}
