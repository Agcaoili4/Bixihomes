import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

function parseDurationToSeconds(value, fallbackSeconds) {
  if (!value) return fallbackSeconds;

  const trimmed = value.trim();
  if (trimmed.endsWith("ms")) {
    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed / 1000 : fallbackSeconds;
  }
  if (trimmed.endsWith("s")) {
    const parsed = Number.parseFloat(trimmed);
    return Number.isFinite(parsed) ? parsed : fallbackSeconds;
  }

  const parsed = Number.parseFloat(trimmed);
  return Number.isFinite(parsed) ? parsed : fallbackSeconds;
}

export function Marquee({
  children,
  className = "",
  pauseOnHover = false,
  reverse = false,
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const isInteractingRef = useRef(false);

  const items = Array.isArray(children) ? children : [children];
  const loopItems = [...items, ...items];

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || items.length === 0) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      content.style.transform = "translate3d(0, 0, 0)";
      return undefined;
    }

    let frameId = 0;
    let lastTime = performance.now();
    let offset = 0;
    let currentSpeed = 0;
    let distance = 0;
    let baseSpeed = 0;

    const recalculate = () => {
      distance = content.scrollWidth / 2;
      const durationValue = getComputedStyle(container).getPropertyValue(
        "--duration",
      );
      const durationSeconds = Math.max(
        parseDurationToSeconds(durationValue, 34),
        0.001,
      );
      baseSpeed = distance / durationSeconds;
    };

    const wrapOffset = () => {
      if (!distance) return;

      if (reverse) {
        while (offset > 0) {
          offset -= distance;
        }
        while (offset <= -distance) {
          offset += distance;
        }
      } else {
        while (offset <= -distance) {
          offset += distance;
        }
        while (offset > 0) {
          offset -= distance;
        }
      }
    };

    const step = (time) => {
      const deltaMs = Math.min(time - lastTime, 64);
      lastTime = time;

      const easing = 1 - Math.exp(-deltaMs / 180);
      const direction = reverse ? 1 : -1;
      const targetSpeed =
        pauseOnHover && isInteractingRef.current ? 0 : baseSpeed * direction;

      currentSpeed += (targetSpeed - currentSpeed) * easing;
      offset += currentSpeed * (deltaMs / 1000);
      wrapOffset();

      content.style.transform = `translate3d(${offset}px, 0, 0)`;
      frameId = window.requestAnimationFrame(step);
    };

    recalculate();
    frameId = window.requestAnimationFrame(step);

    const resizeObserver = new ResizeObserver(() => {
      recalculate();
      wrapOffset();
    });
    resizeObserver.observe(container);
    resizeObserver.observe(content);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [items.length, pauseOnHover, reverse]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "marquee relative flex overflow-hidden [--duration:34s] [--gap:1.5rem]",
        className,
      )}
      onMouseEnter={() => {
        if (pauseOnHover) isInteractingRef.current = true;
      }}
      onMouseLeave={() => {
        isInteractingRef.current = false;
      }}
      onFocusCapture={() => {
        if (pauseOnHover) isInteractingRef.current = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          isInteractingRef.current = false;
        }
      }}
      data-reverse={reverse ? "true" : "false"}
    >
      <div
        ref={contentRef}
        className="marquee-content flex min-w-max items-stretch gap-[var(--gap)]"
      >
        {loopItems.map((child, index) => (
          <div
            key={index}
            className="shrink-0"
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
