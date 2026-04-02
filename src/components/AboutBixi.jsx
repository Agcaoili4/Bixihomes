import { useState } from "react";
import { images } from "../assets/images";
import { BuildingIcon, HomeIcon } from "./ui/InlineIcons";

const tabs = [
  { id: "commercial", label: "Exterior", Icon: BuildingIcon },
  { id: "residential", label: "Interior", Icon: HomeIcon },
];

const tabContent = {
  commercial: {
    title: "Two Decades of Exterior Restoration",
    copy: "Bixi Homes & Renovations has focused for 20+ years on exterior home restoration with dependable workmanship built for Alberta weather.",
    points: [
      "Roofing and siding restoration for long-term protection",
      "Fascia and gutter systems that improve drainage performance",
      "Fence and decking work that strengthens curb appeal and function",
    ],
    metric: "20+ Years Exterior Focus",
    promise: "Exterior systems built to protect your property season after season.",
  },
  residential: {
    title: "Interior Renovation With a Proven Team",
    copy: "We have expanded into interior renovation with a strong team that builds homes, renovates living spaces, and develops basements with quality-first execution.",
    points: [
      "Home builds and structured renovation planning",
      "Basement development designed for comfort and value",
      "Clear communication, quality control, and clean turnover",
    ],
    metric: "100+ Projects Delivered",
    promise: "Interior spaces shaped for daily life, comfort, and long-term value.",
  },
};

const trustHighlights = [
  { value: "20+", label: "Years of Exterior Experience" },
  { value: "100+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
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
            Bixi Homes & Renovations is a client-first team with deep exterior restoration
            roots and a growing interior division, committed to quality, accountability,
            and long-lasting results.
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
                  <tab.Icon className="w-4 h-4 md:w-5 md:h-5 text-[#90826E]" />
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
