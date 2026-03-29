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

      <div className="relative ui-container ui-section">
        <div
          className="bg-gold flex flex-col md:flex-row items-stretch overflow-hidden shadow-xl"
          data-reveal
        >
          {/* Image */}
          <div className="w-full md:w-[45%] lg:w-[48%] h-[280px] md:h-auto shrink-0 overflow-hidden">
            <img
              src={images.aboutPhoto}
              alt="Construction worker"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-center ui-container ui-section about-us-content">
            <h2 className="w-full font-heading font-extrabold text-[26px] md:text-[34px] lg:text-[42px] text-black ui-mb-sm leading-tight text-left">
              We Provide Your Future
            </h2>
            <p className="w-full font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-xs text-left">
              Pellentesque vehicula eros neque, maximus mattis est sagittis
              Nulla facilisi. In sed pretium metus. Proin pretium id urna sit
              amet tincidunt. Interdum et malesuada.
            </p>
            <p className="w-full font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-md text-left">
              In pulvinar viverra diam, nec rutrum mauris maximus non. Aenean
              sed quam tristique, facilisis est ac, interdum velit.
            </p>
            <ul className="ui-space-y-sm" data-reveal-group>
              {checkpoints.map((item) => (
                <li
                  key={item}
                  data-reveal-item
                  className="flex items-start ui-gap-3 font-body text-sm md:text-base text-navy"
                >
                  <span className="ui-mt-xs w-2 h-2 bg-navy rounded-full shrink-0" />
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
