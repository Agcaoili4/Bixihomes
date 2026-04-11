import { motion } from "framer-motion";
import { images } from "../../assets/images";
import { cn } from "../../lib/utils";

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
      className={cn("w-full max-w-7xl mx-auto", className)}
      aria-labelledby="about-bixi-team-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-28 border-b border-black/10 pb-12 md:mb-40 md:pb-16"
      >
        <div className="grid gap-4">
          <div className="about-bixi-team-topline flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
            <p className="ui-kicker-pill">Meet The Team</p>
            <p className="about-bixi-team-intro-label font-body">
              The crew behind every Bixi project
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-4 md:mb-24 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-start md:gap-7">
            <div>
              <h2
                id="about-bixi-team-heading"
                className="max-w-[100ch] font-heading text-[30px] font-extrabold leading-[1.04] text-black md:text-[40px] lg:text-[50px]"
              >
                The Team Behind
                <br />
                <span className="text-[#B9975B]">Every Bixi Project</span>
              </h2>
            </div>

            <div className="grid max-w-none gap-3 md:max-w-[36rem]">
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
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-24 md:gap-7 xl:grid-cols-4">
        {teams.map((team, index) => (
          <motion.article
            key={team.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col items-center overflow-hidden rounded-[22px] bg-white px-7 pb-10 pt-12 text-center ring-1 ring-black/[0.06] shadow-[0_2px_14px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,--tw-ring-color] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(0,0,0,0.10)] hover:ring-black/[0.12] md:px-8 md:pb-12 md:pt-14"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[#B9975B] transition-transform duration-500 ease-out group-hover:scale-x-100"
              aria-hidden="true"
            />

            <div className="relative mb-6">
              <div
                className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_center,rgba(185,151,91,0.22),rgba(185,151,91,0)_70%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#f7f3ec] ring-[3px] ring-white shadow-[0_14px_32px_rgba(0,0,0,0.14)] md:h-28 md:w-28">
                <img
                  src={team.imageUrl}
                  alt={team.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="flex w-full flex-col items-center">
              <h3 className="font-heading text-[1.12rem] font-bold leading-[1.2] text-black md:text-[1.22rem]">
                {team.name}
              </h3>
              <p className="mt-1.5 font-body text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#B9975B]">
                {team.role}
              </p>
              <div
                className="mt-3 h-px w-10 bg-[#B9975B]/35"
                aria-hidden="true"
              />
              <p className="mt-5 max-w-[20rem] font-body text-[0.88rem] leading-[1.72] text-black/60">
                {team.bio}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
