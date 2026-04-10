import { useMemo, useState } from "react";
import {
  buildServiceQuoteHref,
  serviceToggleOptions,
  servicesByCategory,
} from "../data/servicesData";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("exterior");
  const [openServiceSlug, setOpenServiceSlug] = useState(
    servicesByCategory.exterior[0].slug,
  );

  const activeToggle = useMemo(
    () =>
      serviceToggleOptions.find((option) => option.id === activeCategory) ||
      serviceToggleOptions[0],
    [activeCategory],
  );

  const visibleServices = servicesByCategory[activeCategory];

  const handleToggle = (categoryId) => {
    setActiveCategory(categoryId);
    setOpenServiceSlug(servicesByCategory[categoryId][0].slug);
  };

  return (
    <section id="services" className="services-section-themed ui-section">
      <div className="ui-container">
        <div className="services-intro-shell" data-reveal>
          <div className="services-topbar">
            <div className="services-intro-topline">
              <p className="ui-kicker-pill services-kicker">Our Services</p>
            </div>
          </div>

          <div className="services-header services-header-compact">
            <div className="services-header-left">
              <h2 className="services-heading-title font-heading font-extrabold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.04] text-black">
                Our services,
                <br />
                <span className="text-[#B9975B]">clearly structured.</span>
              </h2>
            </div>

            <div className="services-header-right services-header-right-compact">
              <p className="services-switch-eyebrow font-body">
                {activeToggle.eyebrow}
              </p>
              <h3 className="services-switch-headline font-heading">
                {activeToggle.headline}
              </h3>
              <p className="services-switch-description font-body">
                {activeToggle.copy}
              </p>
            </div>
            <div
              className="services-toggle"
              role="tablist"
              aria-label="Services category"
            >
              {serviceToggleOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === option.id}
                  className={`services-toggle-btn ${
                    activeCategory === option.id ? "is-active" : ""
                  }`}
                  onClick={() => handleToggle(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="services-grid-shell" data-reveal>
          <div className="services-grid-intro">
            <p className="services-grid-copy font-body">
              Open each card for a quick description, then move straight into
              the quote flow for the service you need.
            </p>
          </div>

          <div className="services-grid" data-reveal-group>
            {visibleServices.map((service) => {
              const isOpen = openServiceSlug === service.slug;

              return (
                <article
                  key={service.slug}
                  className="service-card"
                  data-reveal-item
                >
                  <div className="service-card-accent" aria-hidden="true" />

                  <div
                    className="service-card-icon service-card-icon-lg"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>

                  <h3 className="service-card-title">{service.title}</h3>

                  <button
                    type="button"
                    className={`service-card-toggle ${isOpen ? "is-open" : ""}`}
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenServiceSlug((current) =>
                        current === service.slug ? "" : service.slug,
                      )
                    }
                  >
                    <span>{isOpen ? "Hide details" : "View details"}</span>
                    <span
                      className="service-card-toggle-icon"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`service-card-dropdown ${isOpen ? "is-open" : ""}`}
                  >
                    <p className="service-card-copy">{service.brief}</p>
                    <p className="service-card-detail">{service.summary}</p>

                    <div className="service-card-actions">
                      <a
                        href={buildServiceQuoteHref(service)}
                        className="ui-btn ui-btn-primary service-card-quote-btn"
                      >
                        Get a quote
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
