import { images } from "../assets/images";

const teamServices = [
  { title: "Interior/Exterior Services", photo: images.interiorPhoto },
  { title: "Welder Service", photo: images.welderPhoto },
  { title: "Carpenter Service", photo: images.carpenterPhoto },
];

export default function TeamServices() {
  return (
    <section id="team" className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={images.teamBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gold overlay */}
      <div className="relative bg-gold/90 py-16 md:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black text-center mb-10 md:mb-12 leading-tight">
            Our Team Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {teamServices.map((service) => (
              <div key={service.title} className="flex flex-col">
                <div className="w-full h-[300px] sm:h-[380px] lg:h-[440px] overflow-hidden">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-navy py-4 px-5 text-center">
                  <h3 className="font-heading font-bold text-base md:text-lg text-white">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
