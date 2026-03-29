import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutBixi from "./components/AboutBixi";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import TeamServices from "./components/TeamServices";
import ContactForm from "./components/ContactForm";
import News from "./components/News";
import Newsletter from "./components/Newsletter";
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -12% 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
    revealGroups.forEach((group) => observer.observe(group));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutBixi />
      <AboutUs />
      <Services />
      <Gallery />
      <TeamServices />
      <ContactForm />
      <News />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

export default App;
