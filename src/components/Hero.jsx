import { useEffect, useRef, useState } from "react";
import BixiLogoMark from "./ui/BixiLogoMark";
import { TextEffect } from "./ui/text-effect";

const heroPhrases = [
  "Exterior Restoration & Renovation",
  "Connect With Us Today",
];

const heroTextEffectVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.032,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 8,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -6,
      filter: "blur(4px)",
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    },
  },
};

export default function Hero() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [showPhrase, setShowPhrase] = useState(true);
  const hideTimerRef = useRef(null);
  const swapTimerRef = useRef(null);

  useEffect(() => {
    hideTimerRef.current = window.setTimeout(() => {
      setShowPhrase(false);
    }, 2200);

    return () => {
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [activePhraseIndex]);

  useEffect(() => {
    if (showPhrase) return undefined;

    swapTimerRef.current = window.setTimeout(() => {
      setActivePhraseIndex((current) => (current + 1) % heroPhrases.length);
      setShowPhrase(true);
    }, 360);

    return () => {
      if (swapTimerRef.current) {
        window.clearTimeout(swapTimerRef.current);
        swapTimerRef.current = null;
      }
    };
  }, [showPhrase]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-white"
      data-reveal
      data-reveal-once
    >
      <div className="ui-container hero-intro">
        {/* Large centered logo — bold entrance */}
        <div className="hero-logo-center">
          <BixiLogoMark className="hero-logo-main" animated={false} />
        </div>

        {/* Tagline beneath the logo */}
        <div className="hero-tagline-shell" aria-live="polite">
          <TextEffect
            per="word"
            as="p"
            variants={heroTextEffectVariants}
            trigger={showPhrase}
            className="hero-tagline font-body"
            segmentWrapperClassName="inline-block"
          >
            {heroPhrases[activePhraseIndex]}
          </TextEffect>
        </div>

        {/* Subtle trust line */}
        <div className="hero-trust-row">
          <span className="hero-trust-pill">20+ Years</span>
          <span className="hero-trust-divider" aria-hidden="true" />
          <span className="hero-trust-pill">Licensed &amp; Insured</span>
          <span className="hero-trust-divider" aria-hidden="true" />
          <span className="hero-trust-pill">Calgary &amp; Area</span>
        </div>
      </div>
    </section>
  );
}
