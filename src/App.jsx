import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutBixi from "./components/AboutBixi";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll("[data-reveal]");
    const revealGroups = document.querySelectorAll("[data-reveal-group]");

    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      revealGroups.forEach((group) => group.classList.add("is-visible"));
      return;
    }

    revealGroups.forEach((group) => {
      const items = group.querySelectorAll("[data-reveal-item]");
      items.forEach((item, index) => {
        item.style.setProperty("--reveal-order", `${index}`);
      });
    });

    const ENTER_RATIO = 0.24;
    const EXIT_RATIO = 0.06;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const ratio = entry.intersectionRatio;
          const isVisible = el.classList.contains("is-visible");

          // Hysteresis: enter at a higher ratio, exit at a lower ratio.
          // This prevents jitter/replay loops around section boundaries.
          if (!isVisible && ratio >= ENTER_RATIO) {
            el.classList.add("is-visible");
            return;
          }

          if (isVisible && ratio <= EXIT_RATIO) {
            el.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: [0, EXIT_RATIO, ENTER_RATIO, 0.5, 0.8],
        rootMargin: "0px 0px -6% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
    revealGroups.forEach((group) => observer.observe(group));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getScrollOffset = () => {
      const stickyNav = document.querySelector("nav.sticky");
      return (stickyNav instanceof HTMLElement ? stickyNav.offsetHeight : 0) + 16;
    };

    const scrollToHash = (hash, shouldReplaceHistory = true) => {
      if (!hash || hash === "#") return;

      const targetId = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(targetId);
      if (!target) return;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      if (shouldReplaceHistory && window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }
    };

    const handleAnchorClick = (event) => {
      const clicked = event.target;
      if (!(clicked instanceof Element)) return;

      const anchor = clicked.closest('a[href^="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.getAttribute("href") === "#") return;

      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.search !== window.location.search) return;

      event.preventDefault();
      scrollToHash(url.hash);
    };

    document.addEventListener("click", handleAnchorClick);

    if (window.location.hash) {
      requestAnimationFrame(() => scrollToHash(window.location.hash, false));
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    const { body } = document;
    let scrollIdleTimer;

    const markScrolling = () => {
      body.classList.add("is-scrolling");
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        body.classList.remove("is-scrolling");
      }, 140);
    };

    window.addEventListener("scroll", markScrolling, { passive: true });
    window.addEventListener("wheel", markScrolling, { passive: true });
    window.addEventListener("touchmove", markScrolling, { passive: true });

    return () => {
      window.clearTimeout(scrollIdleTimer);
      body.classList.remove("is-scrolling");
      window.removeEventListener("scroll", markScrolling);
      window.removeEventListener("wheel", markScrolling);
      window.removeEventListener("touchmove", markScrolling);
    };
  }, []);

  return (
    <div className="w-full overflow-x-clip">
      <Hero />
      <Navbar />
      <AboutBixi />
      <Services />
      <Gallery />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
