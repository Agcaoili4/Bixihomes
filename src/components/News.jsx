import { useEffect, useState } from "react";
import { images } from "../assets/images";

const articles = [
  {
    id: "project-1",
    title: "Basement Development Program",
    description:
      "A complete basement development service focused on legal suite readiness, efficient layouts, and long-term property value.",
    photo: images.newsPhoto1,
    location: "Calgary, AB",
    schedule: "Q2 2026",
    timeline: "8-12 weeks",
    details: [
      "Scope includes framing, insulation, drywall, flooring, lighting, and mechanical rough-ins tailored to code requirements.",
      "Layouts are planned for family living, rental potential, and future flexibility without compromising comfort.",
      "Each project includes staged inspections and milestone updates to keep timelines predictable.",
    ],
  },
  {
    id: "project-2",
    title: "Bathroom Remodeling Series",
    description:
      "A renovation series for modern bathroom transformations with improved function, clean detailing, and durable finishes.",
    photo: images.newsPhoto2,
    location: "Airdrie, AB",
    schedule: "Q3 2026",
    timeline: "3-6 weeks",
    details: [
      "Work scope includes tile replacement, vanity upgrades, fixture updates, shower/tub redesign, and improved ventilation.",
      "We prioritize moisture control, practical storage, and elegant material selection for long-term durability.",
      "Remodel phases are scheduled to minimize household disruption and ensure quality at every handoff point.",
    ],
  },
  {
    id: "project-3",
    title: "Garage Building and Expansion Projects",
    description:
      "New garage builds and expansions designed for vehicle protection, storage optimization, and curb appeal alignment.",
    photo: images.newsPhoto1,
    location: "Mount Royal, AB",
    schedule: "Q4 2026",
    timeline: "6-10 weeks",
    details: [
      "Projects include detached and attached garage builds with structural planning and permit-aware execution.",
      "Options cover insulated walls, custom doors, integrated electrical setup, and workspace-ready layouts.",
      "Exterior finish selections are coordinated to match the main home and neighborhood character.",
    ],
  },
  {
    id: "project-4",
    title: "Multi-Unit Interior Turnover Program",
    description:
      "Rapid renovation cycles for rental and investment units with quality control checkpoints across each turnover.",
    photo: images.newsPhoto2,
    location: "Calgary North, AB",
    schedule: "Rolling 2026",
    timeline: "2-3 weeks per unit",
    details: [
      "Standardized renovation package covers flooring, paint, lighting, kitchen refresh, and fixture replacement.",
      "Dedicated project sequencing keeps trades aligned to reduce vacancy periods and protect owner cash flow.",
      "Each unit receives documented quality checks before handoff to leasing or occupancy teams.",
    ],
  },
];

export default function News() {
  const [activeArticleId, setActiveArticleId] = useState(null);
  const activeArticle =
    articles.find((article) => article.id === activeArticleId) || null;

  useEffect(() => {
    if (!activeArticle) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveArticleId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeArticle]);

  return (
    <>
      <section id="news" className="news-section relative w-full overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.newsBg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative bg-gold/90 ui-section">
          <div className="ui-container">
            <h2
              className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black text-center ui-mb-xl leading-tight"
              data-reveal
            >
              Upcoming Projects and News
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 ui-gap-8 md:ui-gap-10"
              data-reveal-group
            >
              {articles.slice(0, 2).map((article) => (
                <article key={article.id} className="news-card" data-reveal-item>
                  <div className="news-card-media h-[220px] md:h-[280px] lg:h-[340px] overflow-hidden ui-mb-sm">
                    <img
                      src={article.photo}
                      alt={article.title}
                      className="news-card-image w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="news-card-title font-heading font-bold text-xl md:text-2xl lg:text-[28px] text-black leading-tight ui-mb-xs">
                    {article.title}
                  </h3>
                  <p className="news-card-copy font-body text-sm md:text-base text-black/65 leading-relaxed ui-mb-sm">
                    {article.description}
                  </p>

                  <button
                    type="button"
                    className="news-card-interactive"
                    onClick={() => setActiveArticleId(article.id)}
                    aria-label={`Read more about ${article.title}`}
                  >
                    <span className="news-card-interactive-left">
                      <span className="news-card-pulse" aria-hidden="true" />
                      <span className="news-card-meta">2 min insight</span>
                    </span>
                    <span className="news-card-hint">
                      Explore story <span aria-hidden="true">→</span>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeArticle ? (
        <div
          className="news-modal-overlay"
          role="presentation"
          onClick={() => setActiveArticleId(null)}
        >
          <div
            className="news-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="news-modal-close"
              onClick={() => setActiveArticleId(null)}
              aria-label="Close project details"
            >
              ×
            </button>

            <div className="news-modal-main">
              <div className="news-modal-media-wrap">
                <img
                  src={activeArticle.photo}
                  alt={activeArticle.title}
                  className="news-modal-media"
                />
              </div>

              <div className="news-modal-content">
                <div className="news-modal-meta">
                  <span>{activeArticle.location}</span>
                  <span>{activeArticle.schedule}</span>
                  <span>{activeArticle.timeline}</span>
                </div>

                <h3 id="news-modal-title" className="news-modal-title">
                  {activeArticle.title}
                </h3>
                <p className="news-modal-summary">{activeArticle.description}</p>

                <div className="news-modal-details">
                  {activeArticle.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="news-modal-list">
              <p className="news-modal-list-title">More Upcoming Projects</p>
              <div className="news-modal-list-grid">
                {articles.map((article) => {
                  const isActive = article.id === activeArticle.id;
                  return (
                    <button
                      key={article.id}
                      type="button"
                      className={`news-modal-list-item ${
                        isActive ? "is-active" : ""
                      }`}
                      onClick={() => setActiveArticleId(article.id)}
                    >
                      <span className="news-modal-list-item-title">
                        {article.title}
                      </span>
                      <span className="news-modal-list-item-meta">
                        {article.schedule}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
