import { useEffect, useMemo, useState } from "react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
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

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  weekday: "long",
  timeZone: ALBERTA_TIMEZONE,
});

export default function Navbar() {
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
      full: `Alberta time \u2022 ${todayName}: ${hours}`,
      compact: `AB \u2022 ${shortDay}: ${hours}`,
    };
  }, [now]);

  return (
    <nav className="bg-white w-full sticky top-0 z-50 border-b border-black/8">
      <div className="ui-navbar-main navbar-main-centered">
        <div
          className="hidden lg:block navbar-side-spacer"
          aria-hidden="true"
        />

        {/* Desktop centered nav */}
        <ul className="hidden lg:flex flex-row items-center navbar-links-center font-body font-bold text-[#90826E]">
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

        {/* Right side — hours */}
        <div className="flex items-center gap-4 navbar-right-meta">
          <span className="font-body text-[11px] text-black/45 whitespace-nowrap navbar-hours-label">
            {hoursLabel.compact}
          </span>
        </div>
      </div>

      <div className="lg:hidden navbar-mobile-links-wrap">
        <ul className="ui-mobile-menu-list navbar-mobile-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="ui-mobile-nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-hours-row" aria-label="Business hours">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mobile-hours-icon"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{hoursLabel.full}</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
