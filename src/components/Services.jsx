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
    <section id="services" className="bg-white ui-section">
      <div className="ui-container">
        {/* Heading */}
        <div className="text-center ui-mb-xl">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight">
            Our Services
          </h2>
          <p className="font-body text-sm md:text-base lg:text-lg text-black/70 max-w-[640px] ui-mb-md leading-relaxed">
            Pellentesque vehicula eros neque, maximus mattis est sagittis Nulla
            facilisi. In sed pretium metus. Proin pretium id urna sit amet
            tincidunt.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ui-gap-lg place-items-stretch">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gold ui-gap-md ui-py-lg hover:bg-gold-dark transition-colors group"
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
