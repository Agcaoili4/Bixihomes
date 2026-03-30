import { useEffect, useRef } from "react";

export default function useHoverParallax(targetRef, { maxShift = 18 } = {}) {
  const frameRef = useRef(null);
  const enabledRef = useRef(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    enabledRef.current = !prefersReducedMotion;

    const setShift = (value) => {
      if (!targetRef.current) return;
      targetRef.current.style.setProperty("--bg-shift-y", `${value.toFixed(2)}px`);
    };

    const updateParallax = () => {
      tickingRef.current = false;
      if (!enabledRef.current || !targetRef.current) return;

      const rect = targetRef.current.getBoundingClientRect();
      if (rect.height <= 0) return;

      const viewportHalf = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const maxDistance = viewportHalf + rect.height / 2;
      const normalized = Math.max(
        -1,
        Math.min(1, (viewportHalf - sectionCenter) / Math.max(maxDistance, 1))
      );
      const shift = normalized * maxShift;
      setShift(shift);
    };

    const requestUpdate = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      frameRef.current = window.requestAnimationFrame(updateParallax);
    };

    setShift(0);
    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      tickingRef.current = false;
    };
  }, [maxShift, targetRef]);

  return {};
}
