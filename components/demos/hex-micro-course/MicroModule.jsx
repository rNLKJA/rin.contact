/**
 * MicroModule: the learner view of the HEX concept demo. One made-up module in
 * three steps: a concept card, a worked example that builds a sentence one
 * part at a time, and a three-question quiz with feedback straight after each
 * answer. When the quiz is done it reports { score, minutes } to the parent,
 * which adds the visitor to the dashboard. The clock starts at the visitor's
 * first interaction with the module. State lives in memory only.
 *
 * Accessibility: steps are buttons with aria-current="step", and changing step
 * moves focus to the new step's heading. Quiz answers are a native radio group.
 * The main quiz button keeps its place as it changes from Check to Next, so
 * focus stays on it. Feedback and progress are read out by a polite live
 * region. The only motion is a short fade-up on feedback, which is skipped when
 * the visitor prefers reduced motion.
 */
import { useEffect, useId, useRef, useState } from "react";
import { fill } from "@/lib/fill";
import { MODULE as C } from "@/lib/demos/hex-micro-course-data";

const STEPS = C.steps.length;
const QUESTIONS = C.quiz.questions;

const META = "text-[10px] tracking-widest uppercase text-[#6E6E6E] dark:text-[#9A9A9A]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CC0000] dark:focus-visible:outline-[#FF3C3C]";
const BTN_PRIMARY = `inline-flex items-center justify-center min-h-[44px] rounded-full px-5 text-xs tracking-widest uppercase bg-[#1A1A1A] text-white dark:bg-[#EEEEEE] dark:text-black hover:bg-[#CC0000] dark:hover:bg-[#FF3C3C] dark:hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const BTN = `inline-flex items-center justify-center min-h-[44px] rounded-full px-4 text-xs tracking-widest uppercase border border-[#E0E0E0] dark:border-[#3D3D3D] text-[#595959] dark:text-[#AAAAAA] hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 motion-reduce:transition-none ${FOCUS}`;
const HEADING =
  "text-lg font-semibold tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-3 outline-none";
const BODY = "text-[15px] text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed";

/** A pixel tick or cross, drawn on a 7 by 7 grid. */
function Mark({ ok }) {
  return (
    <svg
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`inline-block w-3 h-3 shrink-0 ${
        ok ? "fill-[#1A1A1A] dark:fill-[#EEEEEE]" : "fill-[#CC0000] dark:fill-[#FF3C3C]"
      }`}
    >
      {ok ? (
        <path d="M6 1h1v1H6zM5 2h1v1H5zM4 3h1v1H4zM3 4h1v1H3zM2 5h1v1H2zM1 4h1v1H1zM0 3h1v1H0z" />
      ) : (
        <path d="M0 0h1v1H0zM1 1h1v1H1zM2 2h1v1H2zM3 3h1v1H3zM4 4h1v1H4zM5 5h1v1H5zM6 6h1v1H6zM6 0h1v1H6zM5 1h1v1H5zM4 2h1v1H4zM2 4h1v1H2zM1 5h1v1H1zM0 6h1v1H0z" />
      )}
    </svg>
  );
}

function Concept({ L, headingRef }) {
  return (
    <div>
      <h4 ref={headingRef} tabIndex={-1} className={HEADING}>
        {L(C.concept.heading)}
      </h4>
      <div className={`space-y-3 mb-5 ${BODY}`}>
        {C.concept.body.map((p, i) => (
          <p key={i}>{L(p)}</p>
        ))}
      </div>
      <ol className="grid sm:grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border border-[#E0E0E0] dark:border-[#3D3D3D]">
        {C.concept.parts.map((part, i) => (
          <li key={part.key} className="bg-white dark:bg-[#0A0A0A] p-4 min-w-0">
            <p className="flex items-baseline gap-2 mb-1">
              <span
                className="font-display text-xl leading-none text-[#CC0000] dark:text-[#FF3C3C]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-[#1A1A1A] dark:text-[#EEEEEE]">
                {L(part.label)}
              </span>
            </p>
            <p className="text-sm text-[#595959] dark:text-[#AAAAAA] leading-relaxed">
              {L(part.hint)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Example({ L, headingRef, shown, setShown, announce }) {
  const addRef = useRef(null);
  const total = C.example.parts.length;
  const labelOf = (key) => L(C.concept.parts.find((p) => p.key === key).label);
  const complete = shown >= total;

  const add = () => {
    if (complete) {
      setShown(0);
      announce("");
      return;
    }
    const part = C.example.parts[shown];
    setShown(shown + 1);
    announce(fill(L(C.example.added), { part: labelOf(part.key) }));
  };
  const showAll = () => {
    setShown(total);
    announce(L(C.example.complete));
    addRef.current?.focus();
  };

  return (
    <div>
      <h4 ref={headingRef} tabIndex={-1} className={HEADING}>
        {L(C.example.heading)}
      </h4>
      <p className={`${META} mb-1`}>{L(C.example.beforeLabel)}</p>
      <p className="mb-5 text-[15px] text-[#595959] dark:text-[#9A9A9A] line-through decoration-[#BDBDBD] dark:decoration-[#595959]">
        {L(C.example.before)}
      </p>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <p className={META}>{L(C.example.afterLabel)}</p>
        <p className={`${META} font-mono`}>{fill(L(C.example.progress), { n: shown })}</p>
      </div>
      <div className="relative min-h-[132px] border border-[#E0E0E0] dark:border-[#3D3D3D] p-4 mb-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 text-[#F0F0F0] dark:text-[#1A1A1A]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1.3px)",
            backgroundSize: "14px 14px",
          }}
        />
        {shown === 0 ? (
          <p className="relative text-sm text-[#6E6E6E] dark:text-[#9A9A9A]">
            {L(C.example.empty)}
          </p>
        ) : (
          <ol className="relative space-y-2">
            {C.example.parts.slice(0, shown).map((part) => (
              <li key={part.key} className="min-w-0">
                <span className="block font-display text-[10px] leading-none tracking-widest uppercase text-[#CC0000] dark:text-[#FF3C3C] mb-1">
                  {labelOf(part.key)}
                </span>
                <span className="text-[15px] text-[#1A1A1A] dark:text-[#EEEEEE] leading-relaxed">
                  {L(part.text)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button ref={addRef} type="button" onClick={add} className={BTN_PRIMARY}>
          {complete ? L(C.example.restart) : L(C.example.add)}
        </button>
        {!complete && (
          <button type="button" onClick={showAll} className={BTN}>
            {L(C.example.showAll)}
          </button>
        )}
      </div>
      {complete && (
        <p className="border-l-2 border-[#CC0000] dark:border-[#FF3C3C] pl-3 text-sm text-[#3D3D3D] dark:text-[#AAAAAA] leading-relaxed">
          {L(C.example.tip)}
        </p>
      )}
    </div>
  );
}

const QUIZ_START = { index: 0, choice: null, checked: false, right: 0, hint: false };

/** The quiz. Its state lives in MicroModule, so stepping back to the example keeps progress. */
function Quiz({ L, headingRef, quiz, setQuiz, onFinish, announce }) {
  const uid = useId();
  const { index, choice, checked, right, hint } = quiz;
  const q = QUESTIONS[index];
  const last = index === QUESTIONS.length - 1;
  const ok = checked && choice === q.answer;

  const primary = () => {
    if (!checked) {
      if (choice == null) {
        setQuiz({ ...quiz, hint: true });
        announce(L(C.quiz.pick));
        return;
      }
      const isRight = choice === q.answer;
      setQuiz({ ...quiz, checked: true, hint: false, right: right + (isRight ? 1 : 0) });
      announce(
        `${isRight ? L(C.quiz.correct) : L(C.quiz.wrong)}. ${
          isRight ? "" : `${L(C.quiz.rightAnswer)}: ${L(q.options[q.answer])}. `
        }${L(q.why)}`
      );
      return;
    }
    if (last) {
      onFinish(right);
      return;
    }
    setQuiz({ ...quiz, index: index + 1, choice: null, checked: false });
    announce(fill(L(C.quiz.qOf), { n: index + 2, total: QUESTIONS.length }));
  };

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h4 ref={headingRef} tabIndex={-1} className={`${HEADING} mb-0`}>
          {L(C.quiz.heading)}
        </h4>
        <p className={`${META} font-mono`}>
          {fill(L(C.quiz.qOf), { n: index + 1, total: QUESTIONS.length })}
        </p>
      </div>
      <fieldset className="min-w-0 mb-4">
        <legend className="text-[15px] font-medium text-[#1A1A1A] dark:text-[#EEEEEE] leading-snug mb-3">
          {L(q.q)}
        </legend>
        <div className="space-y-2">
          {q.options.map((o, i) => {
            const isAnswer = checked && i === q.answer;
            const isWrongPick = checked && i === choice && i !== q.answer;
            return (
              <label
                key={`${index}-${i}`}
                className={`relative flex items-start gap-3 rounded-lg border px-3 py-3 text-sm leading-relaxed transition-colors duration-150 motion-reduce:transition-none has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#CC0000] dark:has-[:focus-visible]:outline-[#FF3C3C] ${
                  isAnswer
                    ? "border-[#1A1A1A] dark:border-[#EEEEEE] text-[#1A1A1A] dark:text-[#EEEEEE]"
                    : isWrongPick
                      ? "border-[#CC0000] dark:border-[#FF3C3C] text-[#1A1A1A] dark:text-[#EEEEEE]"
                      : choice === i
                        ? "border-[#1A1A1A] dark:border-[#EEEEEE] bg-[#FAFAFA] dark:bg-[#111111] text-[#1A1A1A] dark:text-[#EEEEEE]"
                        : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#3D3D3D] dark:text-[#AAAAAA]"
                } ${checked ? "cursor-default" : "cursor-pointer hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE]"}`}
              >
                <input
                  type="radio"
                  name={`${uid}-q${index}`}
                  value={i}
                  checked={choice === i}
                  disabled={checked}
                  onChange={() => setQuiz({ ...quiz, choice: i, hint: false })}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#1A1A1A] dark:accent-[#EEEEEE]"
                />
                <span className="min-w-0 flex-1">
                  {L(o)}
                  {(isAnswer || isWrongPick) && (
                    <span className="mt-1 flex items-center gap-1.5 font-display text-[10px] leading-none tracking-widest uppercase">
                      <Mark ok={isAnswer} />
                      {isAnswer ? L(C.quiz.rightAnswer) : L(C.quiz.yourAnswer)}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {checked && (
        // Feedback in the site's pixel dialogue frame: square corners, double rule.
        <div className="pixel-frame mb-4 border-2 border-[#1A1A1A] dark:border-[#EEEEEE] bg-white dark:bg-[#0A0A0A] p-[3px] animate-enter-up motion-reduce:animate-none">
          <div className="border border-[#1A1A1A] dark:border-[#CCCCCC] p-3">
            <p
              className={`font-display text-[11px] leading-none tracking-widest uppercase flex items-center gap-2 mb-2 ${
                ok ? "text-[#1A1A1A] dark:text-[#EEEEEE]" : "text-[#CC0000] dark:text-[#FF3C3C]"
              }`}
            >
              <Mark ok={ok} />
              {ok ? L(C.quiz.correct) : L(C.quiz.wrong)}
            </p>
            <p className="text-sm text-[#3D3D3D] dark:text-[#CCCCCC] leading-relaxed">{L(q.why)}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={primary} className={BTN_PRIMARY}>
          {!checked ? L(C.quiz.check) : last ? L(C.quiz.finish) : L(C.quiz.next)}
        </button>
        {hint && <p className="text-sm text-[#CC0000] dark:text-[#FF3C3C]">{L(C.quiz.pick)}</p>}
      </div>
    </div>
  );
}

export default function MicroModule({ lang = "en", result, onFinish, onReset }) {
  const L = (o) => o[lang];
  const uid = useId();
  const [step, setStep] = useState(0);
  const [shown, setShown] = useState(0);
  const [quiz, setQuiz] = useState(QUIZ_START);
  const [message, setMessage] = useState("");
  const startRef = useRef(null);
  const headingRef = useRef(null);
  const focusNext = useRef(false);

  // Move focus to the new step's heading after a step change the visitor asked for.
  useEffect(() => {
    if (focusNext.current) {
      focusNext.current = false;
      headingRef.current?.focus();
    }
  }, [step, result]);

  const touch = () => {
    if (startRef.current == null) startRef.current = Date.now();
  };

  const goTo = (s) => {
    if (s === step || s < 0 || s >= STEPS) return;
    focusNext.current = true;
    setStep(s);
    setMessage(`${fill(L(C.stepOf), { n: s + 1 })}: ${L(C.steps[s])}`);
  };

  const finish = (score) => {
    const started = startRef.current ?? Date.now();
    const minutes = Math.max(0.1, Math.round(((Date.now() - started) / 60000) * 10) / 10);
    focusNext.current = true;
    onFinish({ score, minutes });
    setMessage(
      fill(L(C.result.announce), { score, total: QUESTIONS.length, min: minutes.toFixed(1) })
    );
  };

  const again = () => {
    startRef.current = null;
    focusNext.current = true;
    setShown(0);
    setStep(0);
    setQuiz(QUIZ_START);
    setMessage("");
    onReset();
  };

  return (
    <section
      aria-labelledby={`${uid}-title`}
      className="min-w-0 border border-[#E0E0E0] dark:border-[#3D3D3D] rounded-lg overflow-hidden bg-white dark:bg-[#0A0A0A]"
      onPointerDownCapture={touch}
      onKeyDownCapture={touch}
    >
      {/* Label strip */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 sm:px-5 py-3 border-b border-[#E0E0E0] dark:border-[#3D3D3D] bg-[#FAFAFA] dark:bg-[#111111]">
        <p className={`${META} font-mono flex items-center gap-2`}>
          <span className="w-1.5 h-1.5 bg-[#1A1A1A] dark:bg-[#EEEEEE]" aria-hidden="true" />
          {L(C.kicker)}
        </p>
        <p className={`${META} font-mono`}>{L(C.moduleOf)}</p>
      </div>

      <div className="px-4 sm:px-5 pt-5">
        <h3
          id={`${uid}-title`}
          className="font-display text-2xl leading-none tracking-tight text-[#1A1A1A] dark:text-[#EEEEEE] mb-4"
        >
          {L(C.title)}
        </h3>

        {/* Steps: a small quest log of three squares */}
        {!result && (
          <nav aria-label={L(C.stepsLabel)} className="mb-5">
            <ol className="grid grid-cols-3 gap-1.5">
              {C.steps.map((s, i) => {
                const active = i === step;
                const done = i < step;
                return (
                  <li key={s.en} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={active ? "step" : undefined}
                      className={`w-full min-h-[44px] flex flex-col items-start gap-1 border px-2 py-1.5 text-left transition-colors duration-150 motion-reduce:transition-none ${FOCUS} ${
                        active
                          ? "border-[#1A1A1A] dark:border-[#EEEEEE] text-[#1A1A1A] dark:text-[#EEEEEE]"
                          : "border-[#E0E0E0] dark:border-[#3D3D3D] text-[#595959] dark:text-[#9A9A9A] hover:border-[#1A1A1A] dark:hover:border-[#EEEEEE]"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className={`inline-block w-2 h-2 ${
                            active
                              ? "bg-[#CC0000] dark:bg-[#FF3C3C]"
                              : done
                                ? "bg-[#1A1A1A] dark:bg-[#EEEEEE]"
                                : "border border-[#9A9A9A] dark:border-[#6E6E6E]"
                          }`}
                        />
                        <span className="font-display text-[11px] leading-none">{i + 1}</span>
                      </span>
                      <span className="text-[11px] leading-tight break-words">{L(s)}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>

      <div className="px-4 sm:px-5 pb-5">
        {result ? (
          <div>
            <h4 ref={headingRef} tabIndex={-1} className={HEADING}>
              {L(C.result.heading)}
            </h4>
            <dl className="grid grid-cols-2 gap-px bg-[#E0E0E0] dark:bg-[#3D3D3D] border border-[#E0E0E0] dark:border-[#3D3D3D] mb-4">
              <div className="bg-white dark:bg-[#0A0A0A] p-4 min-w-0">
                <dt className={`${META} mb-1`}>{L(C.result.scoreLabel)}</dt>
                <dd className="font-display text-3xl leading-none text-[#CC0000] dark:text-[#FF3C3C]">
                  {result.score}/{QUESTIONS.length}
                </dd>
                <dd className="mt-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
                  {fill(L(C.result.score), { score: result.score, total: QUESTIONS.length })}
                </dd>
              </div>
              <div className="bg-white dark:bg-[#0A0A0A] p-4 min-w-0">
                <dt className={`${META} mb-1`}>{L(C.result.timeLabel)}</dt>
                <dd className="font-display text-3xl leading-none text-[#1A1A1A] dark:text-[#EEEEEE]">
                  {result.minutes.toFixed(1)}
                </dd>
                <dd className="mt-2 text-xs text-[#595959] dark:text-[#AAAAAA]">
                  {fill(L(C.result.time), { min: result.minutes.toFixed(1) })}
                </dd>
              </div>
            </dl>
            <p className={`${BODY} mb-4`}>{L(C.result.joined)}</p>
            <button type="button" onClick={again} className={BTN}>
              {L(C.result.again)}
            </button>
          </div>
        ) : (
          <>
            {step === 0 && <Concept L={L} headingRef={headingRef} />}
            {step === 1 && (
              <Example
                L={L}
                headingRef={headingRef}
                shown={shown}
                setShown={setShown}
                announce={setMessage}
              />
            )}
            {step === 2 && (
              <Quiz
                L={L}
                headingRef={headingRef}
                quiz={quiz}
                setQuiz={setQuiz}
                onFinish={finish}
                announce={setMessage}
              />
            )}

            {/* Back and next */}
            <div className="mt-6 pt-4 border-t border-[#F0F0F0] dark:border-[#3D3D3D] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
                className={BTN}
              >
                ← {L(C.back)}
              </button>
              <p className={`${META} font-mono`} aria-hidden="true">
                {step + 1}/{STEPS}
              </p>
              <button
                type="button"
                onClick={() => goTo(step + 1)}
                disabled={step === STEPS - 1}
                className={BTN}
              >
                {L(C.next)} →
              </button>
            </div>
          </>
        )}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {message}
      </p>
    </section>
  );
}
