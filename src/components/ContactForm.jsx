import { useEffect, useState } from "react";
import { images } from "../assets/images";
import { contactServiceOptions } from "../data/contactServiceOptions";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });
  const [formSeed, setFormSeed] = useState(0);
  const [prefill, setPrefill] = useState(() => {
    if (typeof window === "undefined") {
      return { service: "", message: "" };
    }

    const params = new URLSearchParams(window.location.search);
    const service = String(params.get("service") || "").trim();
    const message = String(params.get("message") || "").trim();

    return {
      service: contactServiceOptions.includes(service) ? service : "",
      message,
    };
  });

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5050";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.search) return;

    const cleanUrl = `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState(null, "", cleanUrl);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    const selectedService = String(formData.get("service") || "").trim();
    if (selectedService) {
      payload.service = selectedService;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage =
          data?.message || "Unable to send your request right now.";
        throw new Error(errorMessage);
      }

      setSubmitStatus({
        type: "success",
        message:
          data?.message ||
          "Your request was sent successfully. We will reply soon.",
      });
      setPrefill({ service: "", message: "" });
      setFormSeed((current) => current + 1);
      formElement?.reset();
    } catch (error) {
      let message;
      if (error?.name === "AbortError") {
        message =
          "The server is waking up. Please wait a moment and try again.";
      } else if (
        error?.message === "Failed to fetch" ||
        error?.message === "Load failed"
      ) {
        message =
          "Could not reach the server. Please check your connection and try again.";
      } else {
        message =
          error?.message ||
          "Something went wrong. Please try again in a few minutes.";
      }
      setSubmitStatus({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="ui-section bg-white">
      <div className="ui-container">
        <div className="flex flex-col lg:flex-row ui-gap-10 lg:ui-gap-12 items-stretch">
          {/* Left — tall video showcase */}
          <div className="flex-1 min-w-0 lg:max-w-[520px]" data-reveal>
            <div className="contact-video-wrap contact-video-tall">
              <video
                src={images.aboutPhoto}
                autoPlay
                loop
                muted
                playsInline
                aria-label="Bixi Homes construction showcase"
                className="contact-video"
              />
            </div>
          </div>

          {/* Right — heading + cards (top) and compact form (bottom) */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col">
            {/* Heading + direct contact cards */}
            <div className="contact-intro" data-reveal>
              <div className="contact-intro-topline">
                <p className="ui-kicker-pill contact-kicker">Get In Touch</p>
                <p className="contact-intro-label font-body">
                  Estimates, questions, and project planning
                </p>
              </div>
              <h2 className="contact-heading font-heading font-extrabold max-w-[100ch] text-[30px] md:text-[40px] lg:text-[50px] leading-[1.04] text-black ui-mb-sm">
                Let&apos;s Talk About{" "}
                <span className="text-[#B9975B]">Your Project</span>
              </h2>
              <p className="contact-copy font-body text-sm md:text-base text-black/60 leading-relaxed ui-mb-lg max-w-[520px]">
                Whether it&apos;s a quick question or a full renovation plan, our
                team is ready to help. Fill out the form or reach us directly.
              </p>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 ui-gap-3 ui-mb-lg"
                data-reveal-group
              >
                <a
                  href="tel:+014039912631"
                  className="contact-direct-card"
                  data-reveal-item
                >
                  <div className="contact-direct-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-black">
                      Call Us Directly
                    </p>
                    <p className="font-body text-sm text-black/50">
                      +01 403 991-2631
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:bixihr@gmail.com"
                  className="contact-direct-card"
                  data-reveal-item
                >
                  <div className="contact-direct-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-black">
                      Email Us
                    </p>
                    <p className="font-body text-sm text-black/50">
                      bixihr@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Compact form card */}
            <div data-reveal>
              <div className="contact-form-card contact-form-card-compact">
                <h3 className="font-heading font-bold text-[20px] md:text-[24px] ui-mb-xxs leading-tight">
                  Request an Estimate
                </h3>
                <p className="font-body text-[13px] text-black/55 ui-mb-md">
                  No obligation &mdash; just a straightforward quote.
                </p>

                <form
                  key={formSeed}
                  className="flex flex-col gap-3.5"
                  onSubmit={handleSubmit}
                >
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cf-first" className="contact-label">
                      First Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-first"
                      name="firstName"
                      type="text"
                      required
                      placeholder="John"
                      className="w-full contact-input"
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cf-last" className="contact-label">
                      Last Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-last"
                      name="lastName"
                      type="text"
                      required
                      placeholder="Smith"
                      className="w-full contact-input"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="cf-email" className="contact-label">
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full contact-input"
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="cf-phone" className="contact-label">
                      Phone<span className="text-red-600">*</span>
                    </label>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(403) XXX-XXXX"
                      className="w-full contact-input"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Service type */}
                <div className="space-y-2">
                  <label htmlFor="cf-service" className="contact-label">
                    What do you need help with?
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    defaultValue={prefill.service}
                    className="w-full contact-input cursor-pointer"
                  >
                    <option value="" disabled>
                      Choose a service...
                    </option>
                    {contactServiceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="cf-message" className="contact-label">
                    Tell us about your project
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={3}
                    placeholder="Budget, timeline, anything that helps us give you an accurate quote..."
                    className="w-full contact-textarea"
                    defaultValue={prefill.message}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="ui-btn ui-btn-primary ui-btn-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Get My Free Estimate"}
                </button>

                {/* Trust line */}
                <p className="font-body text-xs text-black/45 text-center leading-relaxed">
                  We respond within 24 hours on business days.
                  <br />
                  Your information is kept private and never shared.
                </p>

                  {submitStatus.message ? (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`text-center font-body text-sm ${
                        submitStatus.type === "success"
                          ? "text-emerald-700"
                          : "text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
