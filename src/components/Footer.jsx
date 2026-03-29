import { images } from "../assets/images";

const socialIcons = [
  { src: images.socialIcon1, label: "Facebook" },
  { src: images.socialIcon2, label: "Twitter" },
  { src: images.socialIcon3, label: "Instagram" },
  { src: images.socialIcon4, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-gold">
      <div className="ui-container">
        {/* Top section: Logo + Contact Info */}
        <div className="flex flex-col md:flex-row items-center ui-gap-lg border-b border-black/15 ui-py-lg">
          <a href="#home" className="shrink-0">
            <img
              src={images.logo}
              alt="Bixi Homes"
              className="h-[60px] md:h-[80px] w-auto object-contain"
            />
          </a>

          <div className="flex flex-col sm:flex-row items-center ui-gap-5 sm:ui-gap-6 md:ui-gap-10 md:ml-auto">
            <div className="flex items-center ui-gap-2-5">
              <img
                src={images.footerMailIcon}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <div>
                <p className="font-heading font-bold text-xs md:text-sm text-black leading-tight">
                  Mail Us
                </p>
                <p className="font-body text-xs md:text-sm text-black/70">
                  Info@Example.com
                </p>
              </div>
            </div>

            <div className="flex items-center ui-gap-2-5">
              <img
                src={images.footerCallIcon}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <div>
                <p className="font-heading font-bold text-xs md:text-sm text-black leading-tight">
                  Call Us
                </p>
                <p className="font-body text-xs md:text-sm text-black/70">
                  +01 569 896 654
                </p>
              </div>
            </div>

            <div className="flex items-center ui-gap-2-5">
              <img
                src={images.footerLocationIcon}
                alt=""
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <div>
                <p className="font-heading font-bold text-xs md:text-sm text-black leading-tight">
                  Location
                </p>
                <p className="font-body text-xs md:text-sm text-black/70">
                  192 Marquis Common SE Calgary AB T3M 1N6
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section: About, Explore, Quick Links */}
        <div className="ui-py-lg flex flex-col md:flex-row ui-gap-xl items-start border-b border-black/15">
          {/* About text + social */}
          <div className="max-w-full md:max-w-[380px] shrink-0">
            <p className="font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-md md:ui-mb-lg">
              For more updates and news, follow us on our social media.
            </p>
            <div className="flex ui-gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="block w-10 h-10 md:w-11 md:h-11 hover:opacity-70 hover:scale-110 transition-all"
                >
                  <img
                    src={icon.src}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Divider - desktop only */}
          <div className="hidden md:block w-px self-stretch bg-black/20" />

          {/* Links columns */}
          <div className="flex ui-gap-12 md:ui-gap-14 lg:ui-gap-20">
            <div>
              <h4 className="font-heading font-bold text-sm md:text-base text-black ui-mb-sm">
                Explore
              </h4>
              <ul className="font-body text-sm md:text-base text-black/70 ui-space-y-2-5">
                <li>
                  <a href="#" className="hover:text-navy transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-navy transition-colors">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm md:text-base text-black ui-mb-sm">
                Quick Links
              </h4>
              <ul className="font-body text-sm md:text-base text-black/70 ui-space-y-2-5">
                <li>
                  <a href="#services" className="hover:text-navy transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#news" className="hover:text-navy transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-navy transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-navy transition-colors">
                    Service Request
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="ui-py-md text-center">
          <p className="font-body text-xs md:text-sm text-black/60">
            Copyright &copy; Bixi Homes | 2026 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
