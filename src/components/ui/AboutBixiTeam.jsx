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
      <div className="about-bixi-team-header">
        <div className="grid gap-6 md:gap-8">
          <div className="about-bixi-team-topline flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
            <p className="ui-kicker-pill">Meet The Team</p>
            <p className="about-bixi-team-intro-label font-body">
              The crew behind every Bixi project
            </p>
          </div>

          <div className="about-bixi-team-layout grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-start md:gap-7 lg:gap-10">
            <div className="about-bixi-team-title-wrap pr-0 md:pr-4 lg:pr-6">
              <h2
                id="about-bixi-team-heading"
                className="about-bixi-team-title max-w-[100ch] font-heading text-[30px] font-extrabold leading-[1.1] text-black md:text-[40px] lg:text-[50px]"
              >
                The Team Behind
                <br />
                <span className="about-bixi-team-title-accent text-[#B9975B]">
                  Every Bixi Project
                </span>
              </h2>
            </div>

            <div className="about-bixi-team-side grid max-w-none gap-3 md:max-w-[36rem]">
              <p className="font-body text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[#B9975B]">
                Built Around Dependable Workmanship
              </p>
              <p className="font-body text-sm leading-[1.72] text-black/60 md:text-[0.95rem]">
                Built around practical leadership, dependable communication,
                and quality workmanship from exterior restoration through
                interior renovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom: Team Portraits ── */}
      <div className="about-bixi-team-grid-shell border-t border-black/10 pt-10 md:pt-14 lg:pt-16">
        <Team members={teams} />
      </div>
    </section>
  );
}
