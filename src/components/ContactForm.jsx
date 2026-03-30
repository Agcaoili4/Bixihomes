import { images } from "../assets/images";

const serviceOptions = [
  "Home Renovation",
  "New Build",
  "Basement Development",
  "Roofing",
  "Electrical Installation",
  "General Maintenance",
  "Other",
];

export default function ContactForm() {
  return (
    <section id="contact" className="bg-white ui-section">
      <div className="ui-container">
        <div className="flex flex-col lg:flex-row ui-gap-10 lg:ui-gap-14 items-start">
          {/* Left — persuasion + direct contact options */}
          <div className="flex-1 min-w-0" data-reveal>
            <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black leading-tight ui-mb-sm">
              Let&apos;s Talk About Your Project
            </h2>
            <p className="font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed ui-mb-lg max-w-[520px]">
              Whether it&apos;s a quick question or a full renovation plan, our
              team is ready to help. Fill out the form or reach us directly
              &mdash; we respond within 24 hours.
            </p>

            {/* Direct contact cards */}
            <div className="flex flex-col ui-gap-4 ui-mb-lg max-w-[520px]">
              <a
                href="tel:+014039912631"
                className="flex items-center ui-gap-3 p-4 bg-black/[0.03] rounded-sm hover:bg-black/[0.06] transition-colors group cursor-pointer"
              >
                <img
                  src={images.callIcon}
                  alt=""
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div>
                  <p className="font-heading font-bold text-sm text-black">
                    Call Us Directly
                  </p>
                  <p className="font-body text-sm text-black/60 group-hover:text-black/80 transition-colors">
                    +01 403 991-2631
                  </p>
                </div>
              </a>
              <a
                href="mailto:Info@Example.com"
                className="flex items-center ui-gap-3 p-4 bg-black/[0.03] rounded-sm hover:bg-black/[0.06] transition-colors group cursor-pointer"
              >
                <img
                  src={images.mailIcon}
                  alt=""
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div>
                  <p className="font-heading font-bold text-sm text-black">
                    Email Us
                  </p>
                  <p className="font-body text-sm text-black/60 group-hover:text-black/80 transition-colors">
                    Info@Example.com
                  </p>
                </div>
              </a>
            </div>

            {/* Photo — hidden on mobile */}
            <div className="hidden md:block w-full max-w-[520px] h-[280px] lg:h-[320px] overflow-hidden rounded-sm shadow-lg">
              <img
                src={images.contactPhoto}
                alt="Bixi Homes construction project"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right — branded form card */}
          <div
            className="w-full lg:w-[480px] xl:w-[520px] shrink-0"
            data-reveal
          >
            {/* Gold accent bar */}
            <div className="h-1.5 bg-gold rounded-t-sm" />

            <div className="bg-white border border-black/10 border-t-0 p-5 sm:p-7 md:p-8 rounded-b-sm shadow-lg">
              <h3 className="font-heading font-bold text-xl md:text-2xl text-black ui-mb-xxs">
                Request a Free Estimate
              </h3>
              <p className="font-body text-sm text-black/50 ui-mb-lg">
                No obligation. No spam. Just a straightforward quote.
              </p>

              <form className="flex flex-col ui-gap-5">
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 ui-gap-4">
                  <div>
                    <label
                      htmlFor="cf-first"
                      className="block font-body font-semibold text-sm text-black mb-1.5"
                    >
                      First Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-first"
                      type="text"
                      required
                      placeholder="John"
                      className="w-full ui-input ui-input-compact"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-last"
                      className="block font-body font-semibold text-sm text-black mb-1.5"
                    >
                      Last Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-last"
                      type="text"
                      required
                      placeholder="Smith"
                      className="w-full ui-input ui-input-compact"
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 ui-gap-4">
                  <div>
                    <label
                      htmlFor="cf-email"
                      className="block font-body font-semibold text-sm text-black mb-1.5"
                    >
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full ui-input ui-input-compact"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cf-phone"
                      className="block font-body font-semibold text-sm text-black mb-1.5"
                    >
                      Phone<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      required
                      placeholder="(403) XXX-XXXX"
                      className="w-full ui-input ui-input-compact"
                    />
                  </div>
                </div>

                {/* Service type */}
                <div>
                  <label
                    htmlFor="cf-service"
                    className="block font-body font-semibold text-sm text-black mb-1.5"
                  >
                    What do you need help with?
                  </label>
                  <select
                    id="cf-service"
                    defaultValue=""
                    className="w-full ui-input ui-input-compact bg-white cursor-pointer"
                  >
                    <option value="" disabled>
                      Choose a service...
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="cf-message"
                    className="block font-body font-semibold text-sm text-black mb-1.5"
                  >
                    Tell us about your project
                  </label>
                  <textarea
                    id="cf-message"
                    rows={4}
                    placeholder="Budget, timeline, anything that helps us give you an accurate quote..."
                    className="w-full ui-textarea ui-textarea-compact"
                  />
                </div>

                {/* Submit — full-width gold CTA */}
                <button
                  type="submit"
                  className="ui-btn ui-btn-primary ui-btn-form self-center w-full max-w-[260px]"
                >
                  Get My Free Estimate
                </button>

                {/* Trust line */}
                <p className="font-body text-xs text-black/40 text-center leading-relaxed">
                  We respond within 24 hours on business days.
                  Your info is never shared with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
