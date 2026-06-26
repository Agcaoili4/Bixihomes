import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import privacyHtml from "../data/privacy-policy.html?raw";

// Single custom event used to open the policy from anywhere (footer link,
// contact-form consent line) without prop drilling across unrelated trees.
const OPEN_EVENT = "bixi:open-privacy";

export function openPrivacyPolicy() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function PrivacyPolicy() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialogRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleOpen = () => {
      lastFocusedRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [open, close]);

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { y: 24, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 16, opacity: 0 },
      };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="privacy-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-[#111111]/55 backdrop-blur-[3px] p-0 sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
            {...panelMotion}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full sm:max-w-[820px] max-h-[94vh] sm:max-h-[88vh] flex flex-col overflow-hidden bg-white rounded-t-2xl sm:rounded-2xl shadow-[0_30px_90px_-30px_rgba(17,17,17,0.45)] ring-1 ring-black/[0.06] outline-none"
          >
            <div
              className="h-px w-full bg-gradient-to-r from-transparent via-[#b9975b]/70 to-transparent"
              aria-hidden="true"
            />

            <div className="shrink-0 flex items-center justify-end px-7 sm:px-12 py-6 sm:py-7 border-b border-black/[0.06]">
              <button
                type="button"
                onClick={close}
                aria-label="Close privacy policy"
                className="shrink-0 cursor-pointer rounded-full p-3 text-[#111111]/55 ring-1 ring-black/10 transition-all duration-300 ease-out hover:rotate-90 hover:bg-black/[0.04] hover:text-[#111111] hover:ring-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9975b]/60"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[22px] w-[22px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="privacy-scroll overflow-y-auto px-8 sm:px-14 py-9 sm:py-11"
              dangerouslySetInnerHTML={{ __html: privacyHtml }}
            />

            <div className="shrink-0 flex flex-col items-center justify-center gap-4 border-t border-black/[0.06] bg-[#fafafa] px-7 sm:px-12 py-5 sm:py-6 text-center">
              <p className="font-body text-[12.5px] leading-snug text-[#111111]/55 max-w-[44ch]">
                By using our website, you agree to the terms outlined in this policy.
              </p>
              <button
                type="button"
                onClick={close}
                className="ui-btn ui-btn-primary sm:px-11 cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
