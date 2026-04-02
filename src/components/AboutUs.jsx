import { images } from "../assets/images";

const checkpoints = [
  "Locally owned team with reliable project coordination",
  "Code-compliant workmanship and transparent communication",
  "Premium materials selected for Alberta weather",
  "Detailed scheduling with clean and respectful site practices",
];

const stats = [
  { value: "10+", label: "Years Serving Homeowners" },
  { value: "100", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function AboutUs() {
  return (
    <section className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={images.aboutBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/85" />
      </div>

      <div className="relative ui-container ui-section">
        <div className="aboutus-shell" data-reveal>
          {/* Image */}
          <div className="aboutus-image-wrap">
            <video
              src={images.aboutPhoto}
              className="w-full h-full object-cover aboutus-image"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="aboutus-image-overlay" />
            <div className="aboutus-image-badge">
              <span className="aboutus-image-badge-label">Trusted Renovation Team</span>
              <span className="aboutus-image-badge-copy">Serving Calgary &amp; Area</span>
            </div>
          </div>

          {/* Content */}
          <div className="aboutus-content about-us-content">
            <p className="ui-kicker-pill aboutus-eyebrow">About Us</p>
            <h2 className="w-full font-heading font-extrabold text-[26px] md:text-[34px] lg:text-[42px] text-black ui-mb-sm leading-tight text-left">
              Built with Craftsmanship, Driven by Trust
            </h2>
            <p className="w-full font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-xs text-left">
              We help homeowners reimagine their spaces with renovation work
              that is practical, elegant, and made to last. Every project is
              handled with clear communication, precise execution, and respect
              for your home.
            </p>
            <p className="w-full font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-md text-left">
              From kitchens and basements to full exterior upgrades, our team
              focuses on quality details, schedule accountability, and
              long-term value for your investment.
            </p>
            <ul className="ui-space-y-sm aboutus-checks" data-reveal-group>
              {checkpoints.map((item) => (
                <li
                  key={item}
                  data-reveal-item
                  className="flex items-start ui-gap-3 font-body text-sm md:text-base text-navy"
                >
                  <span className="ui-mt-xs w-2 h-2 bg-gold rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="aboutus-stats" data-reveal-group>
              {stats.map((stat) => (
                <div key={stat.label} className="aboutus-stat" data-reveal-item>
                  <p className="aboutus-stat-value">{stat.value}</p>
                  <p className="aboutus-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center ui-gap-3 ui-mt-lg">
              <a href="#contact" className="ui-btn ui-btn-primary">
                Get a Free Estimate
              </a>
              <a href="#gallery" className="ui-btn ui-btn-outline-dark">
                View Recent Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
