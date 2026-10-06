import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy text to the clipboard. `copied` flips on for `resetAfterMs`; `failed`
 * stays on until the next attempt so a fallback message can be read. Never
 * throws, and clears its timer on unmount.
 * Ported from the COMP10002 coursework useCopy.
 */
export function useCopy(resetAfterMs = 1600) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = useCallback(
    async (text) => {
      if (timer.current) clearTimeout(timer.current);
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(text);
        setFailed(false);
        setCopied(true);
        timer.current = setTimeout(() => setCopied(false), resetAfterMs);
        return true;
      } catch {
        setCopied(false);
        setFailed(true);
        return false;
      }
    },
    [resetAfterMs]
  );

  return { copied, failed, copy };
}
