const services = [
  {
    title: "Flat Roofing",
    summary:
      "Durable flat roofing systems for residential and commercial properties with leak-resistant, weather-ready installation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 19h18M5 19l2-9h10l2 9M8 10V6h8v4" />
      </svg>
    ),
  },
  {
    title: "Sloped Roofing",
    summary:
      "Complete sloped roof installation and restoration for asphalt shingles, shake, metal, rubber, and tile systems.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12 12 4l9 8M6 11.5V20h12v-8.5" />
      </svg>
    ),
  },
  {
    title: "Siding",
    summary:
      "Professional siding installation and replacement with finishes that improve curb appeal and exterior protection.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18M3 10h18M3 14h18M3 18h18" />
      </svg>
    ),
  },
  {
    title: "Fascia",
    summary:
      "Fascia installation and replacement that supports roof edges and improves structural finish quality.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18M5 7v10M19 7v10M5 17h14" />
      </svg>
    ),
  },
  {
    title: "Gutters",
    summary:
      "Gutter systems built for proper water flow, drainage protection, and long-term exterior performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V7z" />
        <path d="M8 15v2M12 15v2M16 15v2" />
      </svg>
    ),
  },
  {
    title: "Window Replacement",
    summary:
      "Energy-efficient window replacement with clean installation for better comfort and improved exterior look.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="1.5" />
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
  },
  {
    title: "Fencing",
    summary:
      "Custom fencing built for privacy, safety, and curb appeal with durable materials and precise alignment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V8M9 20V8M15 20V8M20 20V8M3 11h18M3 16h18" />
      </svg>
    ),
  },
  {
    title: "Decking",
    summary:
      "Deck build and restoration services that create durable, functional outdoor living spaces for your home.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 15h18M5 15v5M9 15v5M15 15v5M19 15v5M3 12h18" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section-themed ui-section">
      <div className="ui-container">
        {/* Split Heading — title left, copy right */}
        <div className="services-header" data-reveal>
          <div className="services-header-left">
            <p className="ui-kicker-pill services-kicker">Our Services</p>
            <h2 className="services-heading-title font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] leading-tight">
              What We Do
            </h2>
          </div>
          <div className="services-header-right">
            <p className="services-heading-copy font-body text-sm md:text-base lg:text-lg leading-relaxed">
              We provide exterior restoration and renovation services built on practical workmanship,
              dependable timelines, and finishes that protect long-term property value.
            </p>
            <a href="#contact" className="services-header-link">
              Get a free estimate
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Service Grid */}
        <div className="services-grid" data-reveal-group>
          {services.map((service) => (
            <a
              key={service.title}
              href="#contact"
              className="service-card"
              data-reveal-item
            >
              <div className="service-card-accent" aria-hidden="true" />

              <div className="service-card-icon" aria-hidden="true">
                {service.icon}
              </div>

              <h3 className="service-card-title">{service.title}</h3>

              <p className="service-card-copy">{service.summary}</p>

              <span className="service-card-link">
                Learn more
                <span className="service-card-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
