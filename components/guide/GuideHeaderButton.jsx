/**
 * GuideHeaderButton — Pawsibly's launcher on phones.
 *
 * Below md the fixed bottom-left launcher would sit on top of the text, so the
 * cat moves into the header bar beside the menu button instead. Same rules as
 * the floating launcher: hidden once the visitor turns the guide off, on pages
 * the guide skips, and while the dialogue box is open.
 */
import { useRouter } from "next/router";
import { useI18n } from "@/contexts/I18nContext";
import { GUIDE_OPEN_EVENT, useGuideProgress } from "@/hooks/useGuideProgress";
import { GUIDE_HIDDEN_ON, normalisePath } from "@/lib/guide-stops";
import PixelCat from "./PixelCat";

export default function GuideHeaderButton({ className = "" }) {
  const router = useRouter();
  const { t } = useI18n();
  const [state, update] = useGuideProgress();
  const path = normalisePath(router.asPath);

  if (state.hidden || !state.minimised || GUIDE_HIDDEN_ON.test(path)) return null;

  return (
    <button
      type="button"
      onClick={() => {
        update({ minimised: false });
        window.dispatchEvent(new Event(GUIDE_OPEN_EVENT));
      }}
      id="guide-header-launcher"
      aria-label={t("guide.launch")}
      title={t("guide.pressStart")}
      className={`md:hidden print:hidden flex items-center justify-center w-11 h-11 -my-1.5 text-black dark:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-black dark:focus-visible:outline-white ${className}`}
    >
      <PixelCat className="w-7 h-7" />
    </button>
  );
}
