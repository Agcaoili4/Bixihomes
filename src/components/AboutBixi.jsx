import { useEffect, useRef, useState } from "react";
import { images } from "../assets/images";
import { BuildingIcon, HomeIcon } from "./ui/InlineIcons";

const tabs = [
  { id: "commercial", label: "Exterior", Icon: BuildingIcon },
  { id: "residential", label: "Interior", Icon: HomeIcon },
];

const tabContent = {
  commercial: {
    title: "Two Decades of Exterior Restoration",
    copy: "Dependable exterior workmanship built for Alberta weather — roofing, siding, fascia, gutters, fencing, and decking that protect your property long-term.",
    points: [
      "Roofing and siding restoration for lasting protection",
      "Fascia and gutter systems for reliable drainage",
      "Fencing and decking that strengthen curb appeal",
    ],
    metric: "20+ Years Exterior Focus",
  },
  residential: {
    title: "Interior Renovation With a Proven Team",
    copy: "Quality-first interior renovation — from full home builds and basement development to structured living spaces delivered with clear communication.",
    points: [
      "Home builds and structured renovation planning",
      "Basement development designed for comfort and value",
      "Consistent quality control and clean turnover",
    ],
    metric: "100+ Projects Delivered",
  },
};

const metrics = [
  { target: 20, suffix: "+", label: "Years Experience" },
  { target: 100, suffix: "+", label: "Projects Completed" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
];

function CountUpValue({ target, suffix, shouldStart }) {
  const [value, setValue] = useState(0);
  const randomTimerRef = useRef(null);
  const settleFrameRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) {
      setValue(0);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setValue(target);
      return undefined;
    }

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
            settleStartValue + (target - settleStartValue) * eased,
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

      const min =
        elapsed > randomPhaseMs * 0.65 ? Math.round(target * 0.35) : 0;
      const nextRandom =
        Math.floor(Math.random() * (randomMax - min + 1)) + min;
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

export default function AboutBixi() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("commercial");
  const [shouldStartCount, setShouldStartCount] = useState(false);
  const currentContent = tabContent[activeTab];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShouldStartCount(entry.isIntersecting);
        });
      },
      { threshold: 0.32 },
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-bixi-section ui-section"
    >
      <div className="ui-container">
        <div className="about-bixi-intro-shell" data-reveal>
          <div className="about-bixi-intro-topline">
            <p className="ui-kicker-pill about-bixi-kicker">Who We Are</p>
            <p className="about-bixi-intro-label font-body">
              Exterior-led restoration with trusted interior capability
            </p>
          </div>

          <div className="about-bixi-heading-layout">
            <div className="about-bixi-heading-main">
              <h1 className="hero-anim-h1 font-heading font-extrabold text-[30px] md:text-[44px] lg:text-[56px] leading-[1.08] text-black ui-mb-sm">
                Crafted to Last,{" "}
                <span className="text-[#B9975B]">Trusted to Deliver</span>
              </h1>
            </div>

            <div className="about-bixi-heading-side">
              <p className="hero-anim-sub about-bixi-intro-copy font-body text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
                We help homeowners reimagine spaces with practical, quality work
                built to last — delivered with clear communication and respect
                for every home we touch.
              </p>

              <div className="hero-anim-metrics about-bixi-metrics-strip w-full ui-pt-lg border-t border-black/10">
                <div className="about-bixi-metrics-grid">
                  {metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className={`about-bixi-metric-card hero-anim-metric-${i + 1}`}
                    >
                      <p className="about-bixi-metric-value font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl leading-none ui-mb-xxs">
                        <CountUpValue
                          target={m.target}
                          suffix={m.suffix}
                          shouldStart={shouldStartCount}
                        />
                      </p>
                      <p className="about-bixi-metric-label font-body text-xs md:text-sm tracking-wide">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="about-bixi-panel"
          className="about-bixi-panel"
          role="tabpanel"
          aria-live="polite"
        >
          <div className="about-bixi-panel-head">
            <div className="about-bixi-panel-lead">
              <p className="about-bixi-panel-kicker font-body">
                Explore our focus
              </p>
              <p className="about-bixi-panel-caption font-body">
                Switch between our exterior restoration roots and our interior
                renovation capabilities.
              </p>
            </div>

            <div
              className="about-bixi-choice-corner"
              role="tablist"
              aria-label="Service type"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls="about-bixi-panel"
                  className={`about-bixi-choice-btn ${
                    activeTab === tab.id ? "is-active" : ""
                  }`}
                >
                  <tab.Icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="about-bixi-body">
            <div className="about-bixi-media">
              <img
                src={images.storyPhoto}
                alt="Construction work"
                className="w-full h-full object-cover about-bixi-media-img"
              />
              <div className="about-bixi-media-overlay" />
              <div className="about-bixi-media-badge">
                {currentContent.metric}
              </div>
            </div>
            <div className="about-bixi-content">
              <h3 className="font-heading font-extrabold text-2xl md:text-[28px] lg:text-[32px] text-black leading-tight ui-mb-xs">
                {currentContent.title}
              </h3>
              <p className="font-body text-sm md:text-base text-black/60 leading-relaxed ui-mb-md">
                {currentContent.copy}
              </p>

              <ul className="about-bixi-points ui-mb-lg">
                {currentContent.points.map((point) => (
                  <li key={point} className="about-bixi-point-item">
                    <span className="about-bixi-point-dot" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="about-bixi-cta-row">
                <a href="#gallery" className="ui-btn ui-btn-outline-dark">
                  See Our Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
