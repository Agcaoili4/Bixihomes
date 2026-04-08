const RoofingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12 12 4l9 8M6 11.5V20h12v-8.5" />
    <path d="M4 20h16" />
  </svg>
);

const SidingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M3 10h18M3 14h18M3 18h18" />
  </svg>
);

const FasciaGuttersIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h18M5 7v3M19 7v3M5 10h14" />
    <path d="M4 12h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2z" />
  </svg>
);

const WindowIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M12 4v16M4 12h16" />
  </svg>
);

const OutdoorIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V8M9 20V8M15 20V8M20 20V8M3 11h18M3 16h18" />
  </svg>
);

const RenovationIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V9l7-5 7 5v12" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

const NewBuildIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M6 21V8l6-4 6 4v13" />
    <path d="M9 12h6M9 16h6" />
  </svg>
);

const BasementIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h16v10H4z" />
    <path d="M8 10V6h8v4" />
    <path d="M8 14h3M13 14h3M8 18h8" />
  </svg>
);

const BathroomIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3v6a2 2 0 0 0 2 2h8v2a6 6 0 0 1-6 6H9a5 5 0 0 1-5-5v-1h14" />
    <path d="M7 6h1" />
  </svg>
);

const GarageIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10 12 4l9 6v10H3z" />
    <path d="M8 21v-7h8v7" />
    <path d="M9 11h6" />
  </svg>
);

const FinishingIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19h16" />
    <path d="M6 19V7h12v12" />
    <path d="M9 10h6M9 14h6" />
  </svg>
);

const exteriorServices = [
  {
    slug: "roofing",
    title: "Roofing",
    category: "Exterior",
    icon: RoofingIcon,
    brief:
      "Flat and sloped roofing solutions built for Alberta weather and long-term protection.",
    summary:
      "We handle asphalt shingles, shake, metal, rubber, tile, and flat roof systems with restoration and replacement planning that fits the property.",
    details:
      "From leak-driven repairs to complete reroof projects, our roofing scope covers assessment, material matching, flashing work, and weather-ready installation. We focus on drainage, finish quality, and durable protection for both residential and commercial envelopes.",
    bullets: [
      "Asphalt, shake, metal, rubber, tile, and flat roofing",
      "Repair, restoration, and full replacement scopes",
      "Residential and commercial roof planning",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my roof.",
  },
  {
    slug: "siding",
    title: "Siding",
    category: "Exterior",
    icon: SidingIcon,
    brief:
      "Clean exterior cladding upgrades that improve curb appeal and envelope durability.",
    summary:
      "We install and replace siding systems with attention to detailing, weather protection, and a clean finished appearance.",
    details:
      "Our siding work is designed to improve both appearance and performance. We help clients refresh worn exterior walls, improve protection from the elements, and choose materials that support the home's long-term value.",
    bullets: [
      "Vinyl and fibre cement siding options",
      "Clean transitions and trim integration",
      "Exterior refreshes designed for longevity",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my siding project.",
  },
  {
    slug: "fascia-gutters",
    title: "Fascia & Gutters",
    category: "Exterior",
    icon: FasciaGuttersIcon,
    brief:
      "Combined roof-edge and drainage work that protects the envelope and finishes the exterior cleanly.",
    summary:
      "We handle fascia and gutter scopes together so rooflines, drainage, and exterior finishing all work as one coordinated system.",
    details:
      "Fascia and gutters perform best when they are planned together. Our crews restore and replace both systems with attention to alignment, drainage, finish consistency, and long-term weather protection around the home.",
    bullets: [
      "Fascia replacement and edge finishing",
      "Gutter systems planned for proper water flow",
      "Coordinated drainage and roofline protection",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my fascia and gutters.",
  },
  {
    slug: "window-replacement",
    title: "Window Replacement",
    category: "Exterior",
    icon: WindowIcon,
    brief:
      "Window upgrades that improve comfort, curb appeal, and energy performance.",
    summary:
      "We replace worn windows with cleaner installation, better sealing, and a more refined finished look.",
    details:
      "Window replacement affects both energy performance and the overall visual quality of a home. We approach each project with clean installation practices, careful finish work, and a focus on comfort, durability, and exterior integration.",
    bullets: [
      "Energy-conscious replacement work",
      "Clean trim and sealing details",
      "Improved comfort and exterior finish",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my window replacement project.",
  },
  {
    slug: "outdoor-builds",
    title: "Fencing & Decking",
    category: "Exterior",
    icon: OutdoorIcon,
    brief:
      "Outdoor builds that add privacy, structure, and better everyday use around the home.",
    summary:
      "We build and restore fences and decks with practical layouts, strong alignment, and durable finishing that supports curb appeal.",
    details:
      "Our outdoor builds help homeowners extend the value and usability of their property. Whether the priority is privacy, safety, curb appeal, or a better outdoor living area, we deliver fencing and decking work with clear layout decisions and strong workmanship.",
    bullets: [
      "Fence builds and replacements",
      "Deck restoration and new deck work",
      "Durable outdoor finishes and alignment",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my fencing and decking project.",
  },
];

const interiorServices = [
  {
    slug: "repair-renovation",
    title: "Repair & Renovation",
    category: "Interior",
    icon: RenovationIcon,
    brief:
      "Interior repair and renovation work planned around practicality, finish quality, and better day-to-day living.",
    summary:
      "We help homeowners repair worn spaces and rework aging interiors into cleaner, more functional environments with clear coordination.",
    details:
      "Repair and renovation projects often need more than a cosmetic refresh. We help correct worn areas, improve finishes, and reshape spaces so they feel more cohesive, comfortable, and easier to live in while keeping the work organized and clearly communicated.",
    bullets: [
      "Repair-first and renovation-led interior scopes",
      "Practical planning for better flow and function",
      "Clean finish standards and coordinated trades",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my repair and renovation project.",
  },
  {
    slug: "new-build",
    title: "New Build",
    category: "Interior",
    icon: NewBuildIcon,
    brief:
      "Structured build support for new homes delivered with quality control and practical coordination.",
    summary:
      "Our team now supports full home builds with a clear focus on workmanship, sequencing, and finish quality.",
    details:
      "New build projects require consistency across planning, execution, and handoff. We bring a dependable crew and quality-first approach to projects that need organized delivery and a finished home that feels complete from the start.",
    bullets: [
      "Full-home build support",
      "Coordinated delivery and quality oversight",
      "Finish-driven execution and turnover",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my new build project.",
  },
  {
    slug: "basement-development",
    title: "Basement Development",
    category: "Interior",
    icon: BasementIcon,
    brief:
      "Basement transformations that add living space, comfort, and long-term property value.",
    summary:
      "We develop basements into practical finished spaces with clearer layouts, better use, and quality detailing.",
    details:
      "Basement development is one of the most effective ways to add value to a home. We help shape underused lower levels into functional living areas, recreation spaces, work zones, or guest-ready rooms with a clean finished result.",
    bullets: [
      "Layout planning for comfortable use",
      "Finished spaces designed for long-term value",
      "Clean handoff and detail-focused execution",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my basement development.",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    category: "Interior",
    icon: BathroomIcon,
    brief:
      "Bathroom updates focused on comfort, cleaner layouts, and a more refined finish.",
    summary:
      "We remodel bathrooms with practical planning, improved fixtures, and detail-driven finish work.",
    details:
      "Bathroom remodeling needs careful coordination because every finish is visible and every decision affects daily use. We help modernize the room, improve its function, and deliver a cleaner, more polished final result.",
    bullets: [
      "Layout refreshes and finish upgrades",
      "Improved functionality and comfort",
      "Clean detailing for a polished result",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my bathroom remodeling project.",
  },
  {
    slug: "garage-building",
    title: "Garage Building",
    category: "Interior",
    icon: GarageIcon,
    brief:
      "Garage builds designed for utility, storage, and a better match with the overall property.",
    summary:
      "We build garages with practical layouts, durable structures, and finishes that align with the home.",
    details:
      "Garage projects need to feel useful, durable, and visually connected to the property. Our work focuses on strong structure, practical planning, and an end result that adds convenience and long-term value.",
    bullets: [
      "Detached and integrated garage scopes",
      "Practical layouts for storage and utility",
      "Exterior alignment with the main home",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my garage building project.",
  },
  {
    slug: "interior-finishing",
    title: "Interior Finishing",
    category: "Interior",
    icon: FinishingIcon,
    brief:
      "Finish-focused interior work that brings renovation and build projects to a cleaner final standard.",
    summary:
      "We complete interior spaces with the detailing, consistency, and polish needed for a strong final impression.",
    details:
      "Interior finishing is where a space starts to feel complete. We focus on clean execution, coordinated details, and a finished standard that supports both everyday use and long-term value.",
    bullets: [
      "Finish-focused final stage work",
      "Polished detailing and consistency",
      "Better cohesion across interior spaces",
    ],
    quoteMessage: "Hi, I'd like to get a quote done for my interior finishing project.",
  },
];

export const servicesByCategory = {
  exterior: exteriorServices,
  interior: interiorServices,
};

export const serviceToggleOptions = [
  {
    id: "exterior",
    label: "Exterior",
    eyebrow: "Exterior restoration and envelope protection",
    headline: "Built for Alberta weather, delivered with clean finishing.",
    copy:
      "Our exterior work focuses on long-term protection, better drainage, and curb appeal that feels intentional.",
  },
  {
    id: "interior",
    label: "Interior",
    eyebrow: "Interior renovation and new build support",
    headline: "Structured interior work with a quality-first renovation team.",
    copy:
      "We now support interior renovations, home builds, and basement development with the same practical execution and clear communication.",
  },
];

export function buildServiceQuoteHref(service) {
  const params = new URLSearchParams({
    service: service.title,
    message: service.quoteMessage,
  });

  return `/?${params.toString()}#contact`;
}
import { contactServiceOptions } from "./contactServiceOptions";
