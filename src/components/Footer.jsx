import { images } from "../assets/images";
import {
  FacebookIcon,
  InstagramIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/InlineIcons";

const socialIcons = [
  {
    Icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576423253668",
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    href: "#NotFoundPage",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/bixihomes/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="ui-container">
        {/* Top section: Logo + Contact Info */}
        <div className="flex flex-col md:flex-row items-center ui-gap-lg border-b border-black/15 ui-py-lg" data-reveal>
          <a href="#home" className="shrink-0">
            <img
              src={images.logo}
              alt="Bixi Homes"
              className="h-[60px] md:h-[80px] w-auto object-contain"
            />
          </a>

          <div className="flex flex-col sm:flex-row items-center ui-gap-5 sm:ui-gap-6 md:ui-gap-10 md:ml-auto">
            <div className="flex items-center ui-gap-2-5">
              <MailIcon className="w-10 h-10 md:w-12 md:h-12 text-[#90826E]" />
              <div>
                <p className="font-heading font-bold text-xs md:text-sm text-black leading-tight">
                  Mail Us
                </p>
                <p className="font-body text-xs md:text-sm text-black/70">
                  bixihr@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center ui-gap-2-5">
              <PhoneIcon className="w-10 h-10 md:w-12 md:h-12 text-[#90826E]" />
              <div>
                <p className="font-heading font-bold text-xs md:text-sm text-black leading-tight">
                  Call Us
                </p>
                <p className="font-body text-xs md:text-sm text-black/70">
                  +01 403 9912631
                </p>
              </div>
            </div>

            <div className="flex items-center ui-gap-2-5">
              <LocationIcon className="w-10 h-10 md:w-12 md:h-12 text-[#90826E]" />
              <div>
                <p className="font-heading font-bold text-xs md:text-sm text-black leading-tight">
                  Location
                </p>
                <p className="font-body text-xs md:text-sm text-black/70">
                  192 Marquis Common <br /> SE Calgary AB T3M 1N6
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section: About, Explore, Quick Links */}
        <div className="ui-py-lg flex flex-col md:flex-row ui-gap-xl items-start border-b border-black/15" data-reveal>
          {/* About text + social */}
          <div className="max-w-full md:max-w-[380px] shrink-0">
            <p className="font-body text-sm md:text-base text-black/70 leading-relaxed ui-mb-md md:ui-mb-lg">
              For more updates and news, follow us on our social media.
            </p>
            <div className="flex ui-gap-3">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href={icon.href}
                  aria-label={icon.label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 text-[#90826E] hover:text-[#256464] hover:scale-110 transition-all"
                >
                  <icon.Icon className="w-6 h-6 md:w-6 md:h-6" />
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
                  <a href="/not-ready" className="hover:text-navy transition-colors">
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
