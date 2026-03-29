import { images } from "../assets/images";

export default function ContactForm() {
  return (
    <section id="contact" className="bg-white ui-section">
      <div className="ui-container">
        {/* Section header — centered */}
        <div className="text-center ui-mb-xl">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black leading-tight ui-mb-sm">
            Get In Touch
          </h2>
          <p className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-center-center-body text-sm md:text-base text-black/70 max-w-[520px] mx-auto text-center leading-relaxed">
            Have a project in mind? Fill out the form below and our team will
            get back to you within 24 hours.
          </p>
        </div>

        {/* Card container — centered with constrained width */}
        <div className="ui-card-wrapper">
          <div className="flex flex-col md:flex-row items-stretch overflow-hidden shadow-xl rounded-sm">
            {/* Form side */}
            <div className="bg-gold flex-1 ui-form-inner">
              <h3 className="font-heading font-bold text-lg md:text-xl text-black ui-mb-lg">
                Send Us a Message
              </h3>
              <form className="flex flex-col ui-gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 ui-gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-[48px] md:h-[52px] ui-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-[48px] md:h-[52px] ui-input"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full h-[48px] md:h-[52px] ui-input"
                />
                <textarea
                  placeholder="Describe your project or service needed..."
                  rows={4}
                  className="w-full ui-textarea"
                />
                <button
                  type="submit"
                  className="ui-btn ui-btn-secondary ui-btn-full sm:w-auto sm:self-start ui-mt-xxs"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Image side */}
            <div className="hidden md:block md:w-[340px] lg:w-[380px] shrink-0 overflow-hidden">
              <img
                src={images.contactPhoto}
                alt="Construction professional"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
