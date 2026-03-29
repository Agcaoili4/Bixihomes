import { images } from "../assets/images";

export default function ContactForm() {
  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — centered */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black leading-tight mb-4">
            Get In Touch
          </h2>
          <p className="font-body text-sm md:text-base text-black/70 max-w-[520px] mx-auto leading-relaxed">
            Have a project in mind? Fill out the form below and our team will
            get back to you within 24 hours.
          </p>
        </div>

        {/* Card container — centered with constrained width */}
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-col md:flex-row items-stretch overflow-hidden shadow-xl rounded-sm">
            {/* Form side */}
            <div className="bg-gold flex-1 px-6 sm:px-10 md:px-12 py-10 md:py-12">
              <h3 className="font-heading font-bold text-lg md:text-xl text-black mb-6">
                Send Us a Message
              </h3>
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full h-[48px] md:h-[52px] px-4 md:px-5 bg-white border-2 border-black/15 font-body text-sm text-black placeholder:text-black/45 outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full h-[48px] md:h-[52px] px-4 md:px-5 bg-white border-2 border-black/15 font-body text-sm text-black placeholder:text-black/45 outline-none focus:border-black transition-colors"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full h-[48px] md:h-[52px] px-4 md:px-5 bg-white border-2 border-black/15 font-body text-sm text-black placeholder:text-black/45 outline-none focus:border-black transition-colors"
                />
                <textarea
                  placeholder="Describe your project or service needed..."
                  rows={4}
                  className="w-full px-4 md:px-5 py-3.5 bg-white border-2 border-black/15 font-body text-sm text-black placeholder:text-black/45 outline-none focus:border-black transition-colors resize-none h-[120px] md:h-[140px]"
                />
                <button
                  type="submit"
                  className="ui-btn ui-btn-secondary ui-btn-full sm:w-auto sm:self-start mt-1"
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
