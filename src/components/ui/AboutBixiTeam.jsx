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
      className={cn(
        "w-full max-w-7xl mx-auto pt-8 md:pt-10",
        className,
      )}
      aria-labelledby="about-bixi-team-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 border-b border-black/8 pb-5 md:mb-8 md:pb-6"
      >
        <div className="grid gap-4">
          <div className="about-bixi-team-topline flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
            <p className="ui-kicker-pill">Meet The Team</p>
            <p className="about-bixi-team-intro-label font-body">
              The crew behind every Bixi project
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-start md:gap-7">
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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
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
            whileHover={{ y: -3 }}
            className="group relative flex flex-col items-center overflow-hidden rounded-[28px] border border-black/8 bg-white px-6 py-8 text-center shadow-[0_18px_42px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_26px_52px_rgba(0,0,0,0.1)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-[#B9975B] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative mb-6 h-32 w-32 overflow-hidden rounded-full border-[3px] border-[#B9975B]/25 bg-[#f7f3ec] shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:h-36 md:w-36">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/25" />
              <img
                src={team.imageUrl}
                alt={team.imageAlt}
                className="h-full w-full object-cover transition-transform duration-[420ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="space-y-2.5">
              <h3 className="font-heading text-[1.08rem] font-bold leading-snug text-black md:text-xl">
                {team.name}
              </h3>
              <p className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#B9975B]">
                {team.role}
              </p>
              <p className="mx-auto max-w-[17rem] pt-1 font-body text-[0.82rem] leading-6 text-black/60 md:text-[0.84rem]">
                {team.bio}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
