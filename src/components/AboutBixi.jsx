import { useState } from "react";
import { images } from "../assets/images";

const tabs = [
  { id: "commercial", label: "Commercial", icon: images.commercialIcon },
  { id: "residential", label: "Residential", icon: images.residentialIcon },
  { id: "industrial", label: "Industrial", icon: images.industrialIcon },
];

const tabContent = {
  commercial: {
    title: "Commercial Renovation Excellence",
    copy: "We help businesses upgrade and modernize properties with efficient planning, professional site management, and durable finishes designed for daily operations.",
    points: [
      "Tenant improvement and interior modernization",
      "Reliable scheduling with minimal business disruption",
      "Code-compliant execution and quality assurance",
    ],
    metric: "250+ Commercial Projects",
    promise: "Built to keep your operations moving while we renovate.",
  },
  residential: {
    title: "Residential Spaces Built for Living",
    copy: "From kitchens and basements to full-home transformations, we deliver thoughtful design and trusted craftsmanship that increases comfort and long-term value.",
    points: [
      "Custom layouts tailored to family lifestyle",
      "Premium materials selected for longevity",
      "Transparent communication from start to finish",
    ],
    metric: "98% Homeowner Satisfaction",
    promise: "Designed around daily life, comfort, and resale value.",
  },
  industrial: {
    title: "Industrial Work with Precision",
    copy: "Our industrial team manages specialized construction and upgrades with strict safety standards, robust materials, and proven workflows for complex environments.",
    points: [
      "High-performance systems and structural upgrades",
      "Safety-first delivery with documented procedures",
      "Coordinated execution for large-scale scopes",
    ],
    metric: "10+ Years of Field Experience",
    promise:
      "Engineered execution for demanding, safety-critical environments.",
  },
};

const trustHighlights = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24h", label: "Response Time" },
];

export default function AboutBixi() {
  const [activeTab, setActiveTab] = useState("commercial");
  const currentContent = tabContent[activeTab];

  return (
    <section className="about-bixi-section ui-section">
      <div className="ui-container">
        <div className="text-center ui-mb-xl about-bixi-heading">
          <p className="ui-kicker-pill about-bixi-kicker">Who We Are</p>
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight">
            About Bixi Homes
          </h2>
          <p className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-center">
            Bixi Homes is a client-first renovation and construction company
            committed to quality, accountability, and timeless results across
            residential, commercial, and industrial projects.
          </p>
        </div>

        <div className="about-bixi-trust-strip ui-mb-lg">
          {trustHighlights.map((item) => (
            <div key={item.label} className="about-bixi-trust-card">
              <p className="about-bixi-trust-value">{item.value}</p>
              <p className="about-bixi-trust-label">{item.label}</p>
            </div>
          ))}
        </div>

        <div
          id={`about-bixi-panel-${activeTab}`}
          className={`about-bixi-panel about-bixi-panel-${activeTab}`}
          role="tabpanel"
        >
          <div className="about-bixi-panel-head">
            <div className="about-bixi-head-copy">
              <p className="about-bixi-head-kicker">Choose Your Segment</p>
              <p className="about-bixi-head-sub">
                Tailored renovation strategy aligned to your exact project type.
              </p>
            </div>

            <div
              className="about-bixi-choice-corner"
              role="tablist"
              aria-label="Service type"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`about-bixi-panel-${tab.id}`}
                  className={`about-bixi-choice-btn ${
                    activeTab === tab.id ? "is-active" : ""
                  }`}
                >
                  <img
                    src={tab.icon}
                    alt=""
                    className="w-4 h-4 md:w-5 md:h-5 object-contain"
                  />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="about-bixi-body">
            <div className="about-bixi-media">
              <img
                src={images.storyPhoto}
                alt="Construction work"
                className="w-full h-full object-cover about-bixi-media-img"
              />
              <div className="about-bixi-media-overlay" />
              <div className="about-bixi-media-badge">{currentContent.metric}</div>
            </div>
            <div className="about-bixi-content">
              <p className="about-bixi-metric-chip">{currentContent.metric}</p>
              <h3 className="font-heading font-extrabold text-2xl md:text-[32px] text-black ui-mb-sm leading-tight">
                {currentContent.title}
              </h3>
              <p className="font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed ui-mb-lg">
                {currentContent.copy}
              </p>

              <div className="about-bixi-promise ui-mb-md">
                <p className="about-bixi-promise-text">{currentContent.promise}</p>
              </div>

              <ul className="about-bixi-points ui-mb-lg">
                {currentContent.points.map((point) => (
                  <li key={point} className="about-bixi-point-item">
                    <span className="about-bixi-point-dot" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="about-bixi-feature-grid ui-mb-lg">
                <article className="about-bixi-feature-card">
                  <p className="about-bixi-feature-title">Clear Planning</p>
                  <p className="about-bixi-feature-copy">
                    Scope, schedule, and deliverables aligned before work begins.
                  </p>
                </article>
                <article className="about-bixi-feature-card">
                  <p className="about-bixi-feature-title">Quality Control</p>
                  <p className="about-bixi-feature-copy">
                    Consistent inspections and finish checks through every phase.
                  </p>
                </article>
                <article className="about-bixi-feature-card">
                  <p className="about-bixi-feature-title">Reliable Turnover</p>
                  <p className="about-bixi-feature-copy">
                    Handover that is clean, documented, and ready for occupancy.
                  </p>
                </article>
              </div>

              <div className="about-bixi-cta-row">
                <a href="#contact" className="ui-btn ui-btn-primary">
                  Start Your Project
                </a>
                <a href="#gallery" className="ui-btn ui-btn-outline-dark">
                  See Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
