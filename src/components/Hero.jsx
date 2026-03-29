import { images } from "../assets/images";

const metrics = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[85vh] overflow-hidden"
    >
      <img
        src={images.heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/25" />

      <div className="relative w-full max-w-[1200px] mx-auto h-full flex flex-col justify-center items-center lg:items-end px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-[620px] text-center lg:text-right">
          {/* Subtitle badge */}
          <div className="hero-anim-badge bg-gold/20 border border-gold/40 inline-flex items-center gap-2.5 px-4 py-1.5 mb-6 backdrop-blur-sm">
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
          <h1 className="hero-anim-h1 font-heading font-extrabold text-[28px] md:text-[40px] lg:text-[50px] leading-[1.12] text-white mb-5">
            Building Homes,{" "}
            <span className="text-gold">Building Trust</span>
          </h1>

          {/* Subheading */}
          <p className="hero-anim-sub font-body text-sm md:text-base lg:text-lg text-white/75 leading-relaxed mb-8 max-w-[520px] ml-auto lg:ml-auto mx-auto lg:mx-0">
            Professional home renovation and construction services. From concept
            to completion, we deliver quality craftsmanship that stands the test
            of time.
          </p>

          {/* Dual CTAs */}
          <div className="hero-anim-cta flex flex-col sm:flex-row items-center lg:justify-end gap-4">
            <a href="#contact" className="ui-btn ui-btn-primary">
              Contact Us
            </a>
            <a href="#gallery" className="ui-btn ui-btn-outline-light">
              View Our Work
            </a>
          </div>
        </div>

        {/* Trust metrics strip */}
        <div className="hero-anim-metrics w-full mt-12 md:mt-16 pt-8 border-t border-white/15">
          <div className="flex flex-wrap justify-center lg:justify-end gap-8 md:gap-14 lg:gap-20">
            {metrics.map((m, i) => (
              <div key={m.label} className={`hero-anim-metric-${i + 1}`}>
                <p className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-gold leading-none mb-1">
                  {m.value}
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
