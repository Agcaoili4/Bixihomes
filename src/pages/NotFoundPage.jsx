import { images } from "../assets/images";

const notReadyPaths = new Set(["/not-ready", "/coming-soon"]);

export default function NotFoundPage() {
  const path = window.location.pathname;
  const isNotReady = notReadyPaths.has(path);

  return (
    <main className="notfound-page min-h-screen relative overflow-hidden">
      <div className="notfound-bg" aria-hidden="true">
        <img src={images.heroBg} alt="" className="notfound-bg-image" />
      </div>
      <div className="notfound-overlay" aria-hidden="true" />

      <section className="relative ui-container min-h-screen flex items-center justify-center py-16">
        <div className="notfound-card" data-reveal>
          <p className="ui-kicker-pill notfound-kicker">
            {isNotReady ? "In Progress" : "Error 404"}
          </p>

          <h1 className="font-heading font-extrabold text-[32px] md:text-[44px] leading-tight text-black ui-mb-sm">
            {isNotReady ? "This Page Is Being Prepared" : "Page Not Found"}
          </h1>

          <p className="font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-lg max-w-[58ch]">
            {isNotReady
              ? "We are currently building this page to match the same product-grade experience as the rest of Bixi Homes. Please check back shortly."
              : "The page you requested is unavailable or may have moved. You can return to the homepage and continue exploring our services."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a href="/" className="ui-btn ui-btn-primary">
              Back To Homepage
            </a>
            <a href="/#contact" className="ui-btn ui-btn-outline-dark">
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
