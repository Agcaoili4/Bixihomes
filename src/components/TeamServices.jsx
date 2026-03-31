import { images } from "../assets/images";

const teamServices = [
  {
    title: "Interior & Exterior Renovation",
    photo: images.interiorPhoto,
    description:
      "Full-scope upgrades for kitchens, basements, facades, and outdoor spaces with clean finishing standards.",
    tags: ["Renovation", "Finishing", "Project Coordination"],
  },
  {
    title: "Structural & Welding Works",
    photo: images.welderPhoto,
    description:
      "Precision metal fabrication and reinforcement services delivered with safety-first execution on every site.",
    tags: ["Welding", "Structural Support", "Safety Focused"],
  },
  {
    title: "Custom Carpentry Solutions",
    photo: images.carpenterPhoto,
    description:
      "Built-in storage, framing, trim, and bespoke woodwork tailored to your layout and long-term use.",
    tags: ["Carpentry", "Custom Build", "Quality Materials"],
  },
];

export default function TeamServices() {
  return (
    <section id="team" className="team-services-section ui-section">
      <div className="team-services-bg" aria-hidden="true">
        <img src={images.teamBg} alt="" className="team-services-bg-image" />
      </div>
      <div className="ui-container">
        <div className="text-center ui-mb-xl" data-reveal>
          <p className="ui-kicker-pill team-services-kicker">Main Services</p>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight">
            Specialized Teams, One Quality Standard
          </h2>
          <p className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-center">
            Our field specialists work as one coordinated unit to deliver dependable timelines,
            code-compliant workmanship, and polished project handovers.
          </p>
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
