import { images } from "../assets/images";

const checkpoints = [
  "Sed varius ipsum lacus",
  "Pulvinar tortor dignissim sit amet",
  "Quisque tristique diam quis placerat",
  "Aliquam id ante suscipi fringilla",
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

      <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="bg-gold flex flex-col md:flex-row items-stretch overflow-hidden shadow-xl">
          {/* Image */}
          <div className="w-full md:w-[45%] lg:w-[48%] h-[280px] md:h-auto shrink-0 overflow-hidden">
            <img
              src={images.aboutPhoto}
              alt="Construction worker"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-14 py-10 md:py-14 lg:py-16">
            <h2 className="font-heading font-extrabold text-[26px] md:text-[34px] lg:text-[42px] text-black mb-4 leading-tight">
              We Provide Your Future
            </h2>
            <p className="font-body text-sm md:text-base text-black/70 leading-relaxed mb-3">
              Pellentesque vehicula eros neque, maximus mattis est sagittis
              Nulla facilisi. In sed pretium metus. Proin pretium id urna sit
              amet tincidunt. Interdum et malesuada.
            </p>
            <p className="font-body text-sm md:text-base text-black/70 leading-relaxed mb-7">
              In pulvinar viverra diam, nec rutrum mauris maximus non. Aenean
              sed quam tristique, facilisis est ac, interdum velit.
            </p>
            <ul className="space-y-3">
              {checkpoints.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-sm md:text-base text-navy">
                  <span className="mt-1.5 w-2 h-2 bg-navy rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
