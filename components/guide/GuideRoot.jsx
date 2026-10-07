/**
 * GuideRoot: mounts Pawsibly, the optional site guide, from _app.
 *
 * Off by default. Visitors see a small pixel cat with "PRESS START" in the
 * bottom-left corner; nothing else loads until they press it. The dialogue box
 * and the quest log are separate chunks fetched on first open, and the tour's
 * copy ships inside the dialogue chunk. Progress lives in localStorage
 * (hooks/useGuideProgress), and "Don't show again" removes the launcher until
 * the visitor switches it back on from /info/history.
 *
 * The box lives in _app, so it stays open across route changes. While a tour is
 * running, landing on a stop's page marks that stop as visited, even with the
 * box closed.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useI18n } from "@/contexts/I18nContext";
import { useFooterClearance } from "@/hooks/useFooterClearance";
import { GUIDE_OPEN_EVENT, useGuideProgress } from "@/hooks/useGuideProgress";
import {
  GUIDE_HIDDEN_ON,
  SIDE_QUEST,
  STOPS,
  nextUndoneIndex,
  normalisePath,
  stopIndexForPath,
} from "@/lib/guide-stops";
import PixelCat from "./PixelCat";

const DialogueBox = dynamic(() => import("./DialogueBox"), { ssr: false });
const QuestLog = dynamic(() => import("./QuestLog"), { ssr: false });

// The boot overlay runs for about 2 seconds on a first visit; wait it out.
const REVEAL_MS = 2300;
// The homepage shows a one-off "move your cursor" hint in the same corner on
// desktop. Hold the launcher back until it has gone (or 9 seconds pass).
const HINT_KEY = "rin_hero_hint_seen";
const HINT_WAIT_MS = 9000;

function heroHintPending() {
  try {
    const path = window.location.pathname.replace(/^\/zh-Hans(?=\/|$)/, "") || "/";
    return (
      normalisePath(path) === "/" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !sessionStorage.getItem(HINT_KEY)
    );
  } catch {
    return false;
  }
}

function focusMain() {
  const main = document.getElementById("main-content");
  if (!main) return;
  if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
  main.focus({ preventScroll: true });
}

export default function GuideRoot() {
  const router = useRouter();
  const { t, locale = "en-AU" } = useI18n();
  const [state, update] = useGuideProgress();
  const [ready, setReady] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [userOpened, setUserOpened] = useState(false);
  const launcherRef = useRef(null);
  const focusLauncherNext = useRef(false);

  const path = normalisePath(router.asPath);
  const blocked = GUIDE_HIDDEN_ON.test(path);

  useEffect(() => {
    let waited = 0;
    let timer;
    const check = () => {
      if (heroHintPending() && waited < HINT_WAIT_MS) {
        waited += 500;
        timer = setTimeout(check, 500);
      } else {
        setReady(true);
      }
    };
    timer = setTimeout(check, REVEAL_MS);
    return () => clearTimeout(timer);
  }, []);

  // Route sync: while a tour is running, arriving on a stop marks it visited.
  const { started, hidden, done, side } = state;
  useEffect(() => {
    if (!started || hidden) return;
    const i = stopIndexForPath(path);
    if (i >= 0 && !done.includes(STOPS[i].id)) {
      update((s) => ({ ...s, done: [...new Set([...s.done, STOPS[i].id])] }));
    }
    if (path === SIDE_QUEST.href && !side.includes(SIDE_QUEST.id)) {
      update((s) => ({ ...s, side: [...new Set([...s.side, SIDE_QUEST.id])] }));
    }
  }, [path, started, hidden, done, side, update]);

  // A page button (start again, on /info/history) opened the box: treat it like
  // the launcher, so focus moves to the box's main button.
  useEffect(() => {
    const onOpen = () => setUserOpened(true);
    window.addEventListener(GUIDE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(GUIDE_OPEN_EVENT, onOpen);
  }, []);

  // Put focus back on the launcher after the box closes from the keyboard.
  useEffect(() => {
    if (state.minimised && focusLauncherNext.current && launcherRef.current) {
      focusLauncherNext.current = false;
      launcherRef.current.focus();
    }
  }, [state.minimised, ready, blocked]);

  const open = useCallback(() => {
    setUserOpened(true);
    update({ minimised: false });
  }, [update]);

  const minimise = useCallback(() => {
    focusLauncherNext.current = true;
    setLogOpen(false);
    update({ minimised: true });
  }, [update]);

  const hide = useCallback(() => {
    setLogOpen(false);
    update({ hidden: true, minimised: true });
    // The launcher is gone too, so focus has nowhere natural to land.
    requestAnimationFrame(focusMain);
  }, [update]);

  // Stop the launcher at the footer's top edge rather than letting it sit on it.
  const footerClearance = useFooterClearance([path]);

  if (state.hidden || blocked || !ready) return null;

  const total = STOPS.length;
  const visited = STOPS.filter((s) => state.done.includes(s.id)).length;
  const inProgress = state.started && nextUndoneIndex(state.done) !== -1;

  return (
    <>
      {state.minimised ? (
        <button
          ref={launcherRef}
          type="button"
          onClick={open}
          aria-label={t("guide.launch")}
          style={{ bottom: `calc(1rem + ${footerClearance}px)` }}
          className="fixed left-4 z-40 print:hidden flex items-center gap-2 h-12 min-w-[48px] p-[6px] sm:pr-3
                     border-2 border-black dark:border-white bg-white dark:bg-[#0A0A0A] text-black dark:text-white
                     hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A] transition-colors duration-150 animate-enter
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3C3C]"
        >
          <PixelCat className="w-8 h-8 shrink-0" />
          <span
            aria-hidden="true"
            className="hidden sm:inline font-display text-[11px] leading-none tracking-widest uppercase"
          >
            {inProgress ? `${t("guide.continue")} ${visited}/${total}` : t("guide.pressStart")}
          </span>
        </button>
      ) : (
        <DialogueBox
          state={state}
          update={update}
          path={path}
          locale={locale}
          autoFocus={userOpened}
          paused={logOpen}
          onMinimise={minimise}
          onHide={hide}
          onOpenLog={() => setLogOpen(true)}
        />
      )}
      {logOpen && (
        <QuestLog
          state={state}
          update={update}
          path={path}
          locale={locale}
          onClose={() => setLogOpen(false)}
          onHide={hide}
        />
      )}
    </>
  );
}
