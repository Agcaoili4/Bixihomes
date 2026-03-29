const services = [
  {
    title: "Air Conditioning Service",
    category: "Mechanical",
    summary:
      "Installation, diagnostics, and preventive maintenance for reliable cooling performance across seasons.",
  },
  {
    title: "Electrical Installation",
    category: "Electrical",
    summary:
      "Code-compliant wiring, panel upgrades, and fixture installation delivered with safety-first standards.",
  },
  {
    title: "General Builder",
    category: "Construction",
    summary:
      "End-to-end structural and finishing work managed with disciplined timelines and workmanship quality.",
  },
  {
    title: "Security Systems",
    category: "Safety",
    summary:
      "Modern home and business security setup with practical layouts for visibility, access, and protection.",
  },
  {
    title: "Service & Maintenance",
    category: "Operations",
    summary:
      "Routine inspections and responsive maintenance programs to keep properties efficient and problem-free.",
  },
  {
    title: "House Extensions",
    category: "Renovation",
    summary:
      "Thoughtful expansion solutions that increase usable space while preserving architectural harmony.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white ui-section">
      <div className="ui-container">
        {/* Heading */}
        <div className="text-center ui-mb-xl">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight">
            Our Services
          </h2>
          <p className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-center ui-mb-md">
            Pellentesque vehicula eros neque, maximus mattis est sagittis Nulla
            facilisi. In sed pretium metus. Proin pretium id urna sit amet
            tincidunt.
          </p>
        </div>

        {/* Service Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card"
            >
              <div className="service-card-head">
                <span className="service-card-badge">{service.category}</span>
                <span className="service-card-icon" aria-hidden="true">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12h12M12 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <h3 className="service-card-title">
                {service.title}
              </h3>

              <p className="service-card-copy">{service.summary}</p>

              <a href="#contact" className="service-card-link">
                Contact Us
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
