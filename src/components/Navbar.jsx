import { useEffect, useMemo, useState } from "react";
import { images } from "../assets/images";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Main Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#news", label: "News" },
];

const businessSchedule = [
  { day: "Sunday", hours: "Closed" },
  { day: "Monday", hours: "09:00 AM – 05:00 PM" },
  { day: "Tuesday", hours: "09:00 AM – 05:00 PM" },
  { day: "Wednesday", hours: "09:00 AM – 05:00 PM" },
  { day: "Thursday", hours: "09:00 AM – 05:00 PM" },
  { day: "Friday", hours: "09:00 AM – 05:00 PM" },
  { day: "Saturday", hours: "Closed" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let minuteInterval;
    const msToNextMinute = 60000 - (Date.now() % 60000);
    const alignmentTimer = window.setTimeout(() => {
      setNow(new Date());
      minuteInterval = window.setInterval(() => {
        setNow(new Date());
      }, 60000);
    }, msToNextMinute);

    return () => {
      window.clearTimeout(alignmentTimer);
      if (minuteInterval) {
        window.clearInterval(minuteInterval);
      }
    };
  }, []);

  const todaySchedule = useMemo(() => businessSchedule[now.getDay()], [now]);
  const businessHoursLabel = `${todaySchedule.day}: ${todaySchedule.hours}`;

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-black w-full" data-reveal>
        <div className="ui-navbar-top">
          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center ui-gap-3 sm:ui-gap-8">
            <a
              href="mailto:Info@Example.com"
              className="flex items-center ui-gap-2 group"
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
              className="flex items-center ui-gap-2 group"
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
            {businessHoursLabel}
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className="bg-gold w-full sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
        data-reveal
      >
        <div className="ui-navbar-main">
          <a href="#home" className="shrink-0">
            <img
              src={images.logo}
              alt="Bixi Homes"
              className="h-[44px] md:h-[60px] w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center ui-gap-6 xl:ui-gap-8">
            <ul className="flex items-center ui-gap-5 xl:ui-gap-7 font-body font-semibold text-[15px] xl:text-base text-navy">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="ui-nav-link hover:text-black transition-colors"
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
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 ui-gap-1-5 cursor-pointer"
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
          <ul className="ui-mobile-menu-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="ui-mobile-nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile CTA */}
          <div className="ui-mobile-cta-wrapper">
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
