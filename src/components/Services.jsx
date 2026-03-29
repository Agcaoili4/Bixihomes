const services = [
  { title: "Air condition service" },
  { title: "Electrical installation" },
  { title: "General Builder" },
  { title: "Security System" },
  { title: "Service & maintenance" },
  { title: "House Extensions" },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-16 md:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black mb-4 leading-tight">
            Our Services
          </h2>
          <p className="font-body text-sm md:text-base lg:text-lg text-black/70 max-w-[640px] mx-auto leading-relaxed">
            Pellentesque vehicula eros neque, maximus mattis est sagittis Nulla
            facilisi. In sed pretium metus. Proin pretium id urna sit amet
            tincidunt.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 place-items-stretch">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gold px-6 md:px-8 py-8 md:py-10 hover:bg-gold-dark transition-colors group"
            >
              <h3 className="font-heading font-bold text-lg md:text-[22px] text-black mb-3 leading-snug">
                {service.title}
              </h3>
              <p className="font-body text-sm md:text-base text-black/60 mb-6 leading-relaxed">
                Sagittis Nulla facilisi. In sed pretium metus. Proin pretium
                Turna sit amet tincidunt.
              </p>
              <a
                href="#contact"
                className="ui-btn ui-btn-secondary group-hover:bg-black"
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
