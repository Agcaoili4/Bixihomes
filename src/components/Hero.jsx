import { useEffect, useRef, useState } from "react";
import { images } from "../assets/images";
import useHoverParallax from "../hooks/useHoverParallax";

const metrics = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 500, suffix: "+", label: "Projects Completed" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
];

function CountUpValue({ target, suffix, shouldStart }) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const randomTimerRef = useRef(null);
  const settleFrameRef = useRef(null);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(target);
      hasAnimated.current = true;
      return undefined;
    }

    hasAnimated.current = true;
    const randomPhaseMs = 2200;
    const settlePhaseMs = 1100;
    const settleStartValue = Math.max(0, Math.round(target * 0.2));
    const randomMax = Math.max(target, 9);

    const randomStartTime = performance.now();
    randomTimerRef.current = window.setInterval(() => {
      const elapsed = performance.now() - randomStartTime;
      if (elapsed >= randomPhaseMs) {
        if (randomTimerRef.current) {
          window.clearInterval(randomTimerRef.current);
          randomTimerRef.current = null;
        }
        setValue(settleStartValue);

        const settleStartTime = performance.now();
        const settleTick = (currentTime) => {
          const settleElapsed = currentTime - settleStartTime;
          const progress = Math.min(settleElapsed / settlePhaseMs, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const nextValue = Math.round(
            settleStartValue + (target - settleStartValue) * eased
          );
          setValue(nextValue);

          if (progress < 1) {
            settleFrameRef.current = window.requestAnimationFrame(settleTick);
          } else {
            setValue(target);
            settleFrameRef.current = null;
          }
        };

        settleFrameRef.current = window.requestAnimationFrame(settleTick);
        return;
      }

      const min = elapsed > randomPhaseMs * 0.65 ? Math.round(target * 0.35) : 0;
      const nextRandom = Math.floor(Math.random() * (randomMax - min + 1)) + min;
      setValue(nextRandom);
    }, 45);

    return () => {
      if (randomTimerRef.current) {
        window.clearInterval(randomTimerRef.current);
        randomTimerRef.current = null;
      }
      if (settleFrameRef.current) {
        window.cancelAnimationFrame(settleFrameRef.current);
        settleFrameRef.current = null;
      }
    };
  }, [shouldStart, target]);

  return `${value}${suffix}`;
}

export default function Hero() {
  const sectionRef = useRef(null);
  const [shouldStartCount, setShouldStartCount] = useState(false);
  useHoverParallax(sectionRef, { maxShift: 20 });

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShouldStartCount(true);
          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] overflow-hidden isolate"
      data-reveal
    >
      <img
        src={images.heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover hero-bg-parallax"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/25" />
      <div className="hero-accent-grid absolute inset-0 pointer-events-none" />
      <div className="hero-accent-orb hero-accent-orb-1" aria-hidden="true" />
      <div className="hero-accent-orb hero-accent-orb-2" aria-hidden="true" />

      <div className="relative ui-container h-full flex flex-col justify-center items-center lg:items-end ui-section-hero">
        <div className="hero-content-shell max-w-[640px] text-center lg:text-right">
          {/* Subtitle badge */}
          <div className="hero-anim-badge bg-gold/20 border border-gold/40 inline-flex items-center ui-gap-2-5 ui-px-md ui-pt-xs ui-mb-md backdrop-blur-sm">
            <img
              src={images.heroSubIcon}
              alt=""
              className="w-5 h-5 md:w-6 md:h-6 shrink-0"
            />
            <p className="font-body font-semibold text-xs md:text-sm text-gold tracking-wide uppercase">
              Licensed &amp; Insured Contractors
            </p>
          </div>

          {/* Headline */}
          <h1 className="hero-anim-h1 font-heading font-extrabold text-[28px] md:text-[40px] lg:text-[50px] leading-[1.12] text-white ui-mb-sm">
            Building Homes,{" "}
            <span className="text-gold">Building Trust</span>
          </h1>

          {/* Subheading */}
          <p className="hero-anim-sub font-body text-sm md:text-base lg:text-lg text-white/75 leading-relaxed ui-mb-lg max-w-auto lg:ml-auto lg:text-right">
            Professional home renovation and construction services. From concept
            to completion, we deliver quality craftsmanship that stands the test
            of time.
          </p>

          {/* Dual CTAs */}
          <div className="hero-anim-cta flex flex-col sm:flex-row items-center lg:justify-end ui-gap-4">
            <a href="#contact" className="ui-btn ui-btn-primary hero-primary-cta">
              Contact Us
            </a>
            <a href="#gallery" className="ui-btn ui-btn-outline-light">
              View Our Work
            </a>
          </div>

          <div className="hero-anim-trust ui-mt-lg flex flex-wrap items-center justify-center lg:justify-end ui-gap-2-5">
            <span className="hero-trust-pill">WSIB Insured</span>
            <span className="hero-trust-pill">Licensed Builders</span>
            <span className="hero-trust-pill">On-Time Delivery</span>
          </div>
        </div>

        {/* Trust metrics strip */}
        <div className="hero-anim-metrics w-full ui-mt-xl ui-pt-lg border-t border-white/15">
          <div className="flex flex-wrap justify-center lg:justify-end ui-gap-8 md:ui-gap-14 lg:ui-gap-20">
            {metrics.map((m, i) => (
              <div key={m.label} className={`hero-anim-metric-${i + 1}`}>
                <p className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-gold leading-none ui-mb-xxs">
                  <CountUpValue
                    target={m.target}
                    suffix={m.suffix}
                    shouldStart={shouldStartCount}
                  />
                </p>
                <p className="font-body text-xs md:text-sm text-white/60 tracking-wide">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
