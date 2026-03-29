import { useState } from "react";
import { images } from "../assets/images";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Main Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#news", label: "News" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-black w-full">
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5 md:py-0 md:h-[56px]">
          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
            <a
              href="mailto:Info@Example.com"
              className="flex items-center gap-2 group"
            >
              <img
                src={images.mailIcon}
                alt=""
                className="w-7 h-7 md:w-9 md:h-9 object-contain"
              />
              <span className="font-body text-xs md:text-sm text-gold group-hover:text-white transition-colors">
                Info@Example.com
              </span>
            </a>
            <a
              href="tel:+01569896654"
              className="flex items-center gap-2 group"
            >
              <img
                src={images.callIcon}
                alt=""
                className="w-7 h-7 md:w-9 md:h-9 object-contain"
              />
              <span className="font-body text-xs md:text-sm text-gold group-hover:text-white transition-colors">
                +01 569 896 654
              </span>
            </a>
          </div>

          {/* Business hours — desktop only */}
          <p className="hidden md:block font-body text-xs text-white/50">
            Mon - Sat: 8:00 AM - 6:00 PM
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gold w-full sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="w-full max-w-[1200px] mx-auto flex justify-between px-4 sm:px-6 lg:px-8 h-[60px] md:h-[76px]">
          <a href="#home" className="shrink-0">
            <img
              src={images.logo}
              alt="Bixi Homes"
              className="h-[44px] md:h-[60px] w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <ul className="flex items-center gap-5 xl:gap-7 font-body font-semibold text-[15px] xl:text-base text-navy">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative py-2 hover:text-black transition-colors after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-navy hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA button — primary conversion action */}
            <a
              href="#contact"
              className="ui-btn ui-btn-secondary shrink-0 min-w-[190px]"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-navy transition-transform duration-300 origin-center ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-navy transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-navy transition-transform duration-300 origin-center ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            menuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col font-body font-semibold text-base text-navy px-6 pb-3 gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 border-b border-navy/10 hover:text-black hover:pl-2 transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile CTA */}
          <div className="px-6 pb-5 pt-2">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="ui-btn ui-btn-secondary ui-btn-full"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
