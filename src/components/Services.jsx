const services = [
  {
    title: "Air Conditioning",
    summary:
      "Keep your home comfortable year-round with expert HVAC installation, diagnostics, and seasonal maintenance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M12 2a5 5 0 0 0-5 5M12 2a5 5 0 0 1 5 5M12 22a5 5 0 0 1-5-5M12 22a5 5 0 0 0 5-5M2 12a5 5 0 0 1 5-5M2 12a5 5 0 0 0 5 5M22 12a5 5 0 0 0-5-5M22 12a5 5 0 0 1-5 5" />
      </svg>
    ),
  },
  {
    title: "Electrical Installation",
    summary:
      "Code-compliant wiring, panel upgrades, and fixture installation with safety-first standards you can trust.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "General Builder",
    summary:
      "End-to-end structural and finishing work delivered on disciplined timelines with quality craftsmanship.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M4 20V8l8-5 8 5v12M9 20v-5h6v5M9 12h.01M15 12h.01" />
      </svg>
    ),
  },
  {
    title: "Security Systems",
    summary:
      "Modern home security with practical camera layouts, smart access control, and 24/7 monitoring options.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Service & Maintenance",
    summary:
      "Routine inspections and responsive repair programs that keep your property efficient and problem-free.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    title: "House Extensions",
    summary:
      "Thoughtful expansions that increase usable space while preserving your home's architectural character.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M17.5 14v7M14 17.5h7" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="ui-section" style={{ background: "#f8f8f6" }}>
      <div className="ui-container">
        {/* Heading */}
        <div className="text-center ui-mb-xl" data-reveal>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight">
            What We Do
          </h2>
          <p className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/60 leading-relaxed text-center">
            From routine maintenance to full-scale construction, we bring
            licensed expertise to every project in your home.
          </p>
        </div>

        {/* Service Grid */}
        <div className="services-grid" data-reveal-group>
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card"
              data-reveal-item
            >
              {/* Icon */}
              <div className="service-card-icon" aria-hidden="true">
                {service.icon}
              </div>

              <h3 className="service-card-title">{service.title}</h3>

              <p className="service-card-copy">{service.summary}</p>

              <a href="#contact" className="service-card-link">
                Learn more
                <span className="service-card-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* Section-level CTA */}
        <div className="text-center ui-mt-xl" data-reveal>
          <a href="#contact" className="ui-btn ui-btn-primary">
            Get a Free Estimate
          </a>
        </div>
      </div>
    </section>
  );
}