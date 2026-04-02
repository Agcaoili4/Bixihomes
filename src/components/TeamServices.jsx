import { images } from "../assets/images";

const teamServices = [
  {
    title: "Exterior Restoration Team",
    photo: images.interiorPhoto,
    description:
      "For two decades, our core focus has been exterior home restoration delivered with durable materials and clean finishing standards.",
    tags: ["Roofing & Siding", "Fascia & Gutters", "Fence & Decking"],
    highlights: [
      "Roofing and siding restoration for residential and commercial properties",
      "Fascia and gutter work for proper drainage and long-term protection",
      "Fence and decking upgrades for safety, function, and curb appeal",
    ],
  },
  {
    title: "Roofing & Envelope Specialists",
    photo: images.welderPhoto,
    description:
      "Specialized crews handling flat and sloped roofing systems with weather-ready installation and restoration.",
    tags: ["Flat Roofing", "Sloped Roofing", "Window Replacement"],
    highlights: [
      "Flat roofing systems installed for long-term waterproof performance",
      "Sloped roofing solutions for shingles, shake, metal, rubber, and tile",
      "Window replacement to improve comfort, efficiency, and exterior finish",
    ],
  },
  {
    title: "Interior Renovation Team",
    photo: images.carpenterPhoto,
    description:
      "We now bring the same disciplined execution to interior projects including home builds, renovations, and basement development.",
    tags: ["Home Builds", "Renovation", "Basement Development"],
    highlights: [
      "Complete interior renovation planning and execution",
      "Basement development aligned to family use and property value",
      "Clear communication with accountable schedule milestones",
    ],
  },
];

export default function TeamServices() {
  return (
    <section id="team" className="team-services-section ui-section">
      <div className="team-services-bg" aria-hidden="true">
        <img src={images.teamBg} alt="" className="team-services-bg-image" />
      </div>
      <div className="ui-container">
        <div className="team-services-intro ui-mb-xl" data-reveal>
          <p className="ui-kicker-pill team-services-kicker">Main Services</p>
          <div className="team-services-intro-layout">
            <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black leading-tight text-left">
              Exterior Experts, Expanded Interior Team
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-left">
              Built on 20+ years of exterior restoration, our crews now also deliver interior builds,
              renovation scopes, and basement development with the same quality standard.
            </p>
          </div>
        </div>

        <div className="team-services-grid" data-reveal-group>
          {teamServices.map((service) => (
            <article key={service.title} className="team-service-card" data-reveal-item>
              <div className="team-service-media">
                <img
                  src={service.photo}
                  alt={service.title}
                  className="team-service-image"
                />
                <div className="team-service-overlay" />
              </div>
              <div className="team-service-content">
                <h3 className="team-service-title">{service.title}</h3>
                <p className="team-service-description">{service.description}</p>
                {service.highlights ? (
                  <ul className="team-service-highlights">
                    {service.highlights.map((item) => (
                      <li key={item}>
                        <span className="team-service-highlight-dot" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <div className="team-service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="team-service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="team-service-link">
                  Talk to Our Team
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="team-services-cta" data-reveal>
          <p className="team-services-cta-copy">
            Need a bundled scope across multiple trades?
          </p>
          <a href="#contact" className="ui-btn ui-btn-primary">
            Request a Combined Quote
          </a>
        </div>
      </div>
    </section>
  );
}
