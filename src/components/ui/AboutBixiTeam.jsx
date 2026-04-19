import { images } from "../../assets/images";
import { cn } from "../../lib/utils";
import Team from "./team";

const defaultTeams = [
  {
    id: "exterior",
    name: "Exterior Restoration Crew",
    role: "Roofing, Siding, Fascia & Gutters",
    bio: "The crew focused on durable exterior envelopes, weather-ready detailing, and clean execution built for Alberta conditions.",
    imageUrl: images.teamBg,
    imageAlt: "Bixi Homes exterior restoration work",
  },
  {
    id: "interior",
    name: "Interior Renovation Team",
    role: "Basements, Repairs & Finishing",
    bio: "A practical renovation team delivering structured interiors, dependable craftsmanship, and spaces designed for everyday living.",
    imageUrl: images.interiorPhoto,
    imageAlt: "Bixi Homes interior renovation work",
  },
  {
    id: "coordination",
    name: "Project Coordination",
    role: "Planning, Scheduling & Communication",
    bio: "Every project is supported by organized coordination that keeps timelines clear, scopes aligned, and clients informed at every stage.",
    imageUrl: images.storyPhoto,
    imageAlt: "Bixi Homes project planning and coordination",
  },
  {
    id: "quality",
    name: "Quality & Client Care",
    role: "Site Respect & Final Turnover",
    bio: "From first walkthrough to final handoff, the team stays focused on detail, accountability, and a professional client experience.",
    imageUrl: images.carpenterPhoto,
    imageAlt: "Bixi Homes quality workmanship detail",
  },
];

export default function AboutBixiTeam({
  teams = defaultTeams,
  className = "",
}) {
  return (
    <section
      className={cn(
        "about-bixi-team-section flex w-full max-w-7xl flex-col mx-auto",
        className,
      )}
      aria-labelledby="about-bixi-team-heading"
    >
      {/* ── Top: Header / Intro ── */}
      <div className="about-bixi-intro-shell">
        <div className="about-bixi-intro-topline">
          <p className="ui-kicker-pill about-bixi-kicker">Meet The Team</p>
          <p className="about-bixi-intro-label font-body">
            The crew behind every Bixi project
          </p>
        </div>

        <div className="about-bixi-heading-layout">
          <div className="about-bixi-heading-main">
            <h2
              id="about-bixi-team-heading"
              className="font-heading font-extrabold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.04] text-black"
            >
              The Team Behind{" "}
              <span className="text-[#B9975B]">Every Bixi Project</span>
            </h2>
          </div>

          <div className="about-bixi-heading-side">
            <p className="about-bixi-heading-eyebrow font-body">
              Built around dependable workmanship
            </p>
            <p className="about-bixi-intro-copy font-body text-sm md:text-base lg:text-lg text-black/60 leading-relaxed">
              Built around practical leadership, dependable communication, and
              quality workmanship from exterior restoration through interior
              renovation.
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom: Team Portraits ── */}
      <div className="about-bixi-team-grid-shell">
        <Team members={teams} />
      </div>
    </section>
  );
}
