import { useEffect, useMemo, useState } from "react";
import { images } from "../assets/images";
import { MailIcon, PhoneIcon } from "./ui/InlineIcons";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#team", label: "Main Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#news", label: "News" },
];

const ALBERTA_TIMEZONE = "America/Edmonton";

const businessSchedule = {
  Sunday: "Closed",
  Monday: "09:00 AM - 05:00 PM",
  Tuesday: "09:00 AM - 05:00 PM",
  Wednesday: "09:00 AM - 05:00 PM",
  Thursday: "09:00 AM - 05:00 PM",
  Friday: "09:00 AM - 05:00 PM",
  Saturday: "Closed",
};

const shortDayName = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

// Formatter to get the current day name in Alberta time

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  weekday: "long",
  timeZone: ALBERTA_TIMEZONE,
});

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

  const hoursLabel = useMemo(() => {
    const todayName = dayFormatter.format(now);
    const hours = businessSchedule[todayName] ?? "Closed";
    const shortDay = shortDayName[todayName] ?? todayName;

    return {
      full: `Alberta time • ${todayName}: ${hours}`,
      compact: `AB • ${shortDay}: ${hours}`,
    };
  }, [now]);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-black w-full" data-reveal>
        <div className="ui-navbar-top py-2 md:py-2.5 flex-wrap gap-y-2">
          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 min-w-0">
            <a
              href="mailto:bixihr@gmail.com"
              className="flex items-center gap-2 group"
            >
              <MailIcon className="w-7 h-7 md:w-9 md:h-9 text-[#90826E]" />
              <span className="font-body text-xs md:text-sm text-gold group-hover:text-white transition-colors">
                bixihr@gmail.com
              </span>
            </a>
            <a
              href="tel:+1 403 9912631"
              className="flex items-center gap-2 group"
            >
              <PhoneIcon className="w-7 h-7 md:w-9 md:h-9 text-[#90826E]" />
              <span className="font-body text-xs md:text-sm text-gold group-hover:text-white transition-colors">
                +01 569 896 654
              </span>
            </a>
          </div>

          {/* Live business hours in Alberta time */}
          <div className="hidden md:flex items-center shrink-0 text-right font-body text-xs text-white/60 whitespace-nowrap">
            <span className="lg:hidden">{hoursLabel.compact}</span>
            <span className="hidden lg:inline">{hoursLabel.full}</span>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className="bg-white w-full sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
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
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <ul className="flex items-center gap-5 xl:gap-7 font-body font-semibold text-[15px] xl:text-base text-black">
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

            <a
              href="#contact"
              className="ui-btn ui-btn-outline-light navbar-cta-btn shrink-0 min-w-[190px]"
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
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 origin-center ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 origin-center ${
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
          <div className="ui-mobile-cta-wrapper">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="ui-btn ui-btn-outline-light navbar-cta-btn ui-btn-full"
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
