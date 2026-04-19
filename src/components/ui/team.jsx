import { Marquee } from "./marquee";

export default function Team({
  members = [],
  className = "",
}) {
  if (!members.length) {
    return null;
  }

  return (
    <div
      className={`about-bixi-team-marquee relative w-full overflow-hidden ${className}`.trim()}
      aria-label="Bixi Homes team showcase"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B9975B]/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_bottom_center,rgba(185,151,91,0.12),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full">
        <div className="about-bixi-team-marquee-rail relative w-full">
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-white via-white/92 to-transparent sm:w-14 md:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-white via-white/92 to-transparent sm:w-14 md:w-24"
            aria-hidden="true"
          />

          <Marquee
            className="[--duration:26s] [--gap:0.75rem] sm:[--duration:32s] sm:[--gap:1rem] md:[--duration:38s] md:[--gap:1.5rem]"
            pauseOnHover
          >
            {members.map((member) => (
              <article
                className="about-bixi-team-marquee-card group flex w-[13.5rem] shrink-0 flex-col sm:w-[16.5rem] md:w-[17.5rem] lg:w-[19rem]"
                key={member.id ?? member.name}
                tabIndex={0}
              >
                <div className="relative h-[17rem] w-full overflow-hidden rounded-[1.2rem] border border-black/8 bg-[#ece6db] shadow-[0_10px_28px_rgba(0,0,0,0.08)] sm:h-[20rem] sm:rounded-[1.35rem] sm:shadow-[0_14px_34px_rgba(0,0,0,0.08)] md:h-[22rem]">
                  <img
                    src={member.imageUrl}
                    alt={member.imageAlt ?? member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3.5 pb-3.5 pt-12 text-left sm:px-4 sm:pb-4 sm:pt-14 md:px-5 md:pb-5 md:pt-16">
                    <h4 className="font-heading text-[0.95rem] font-bold leading-[1.16] text-white sm:text-[1.08rem] md:text-[1.22rem]">
                      {member.name}
                    </h4>
                    <p className="about-bixi-team-role mt-1 font-body text-[0.6rem] font-bold uppercase tracking-[0.14em] sm:mt-1.5 sm:text-[0.66rem] sm:tracking-[0.16em] md:text-[0.7rem] md:tracking-[0.18em]">
                      {member.role}
                    </p>
                    {member.bio ? (
                      <p className="about-bixi-team-marquee-bio mt-2 max-w-[27ch] font-body text-[0.72rem] leading-[1.52] text-white/85 sm:mt-2.5 sm:text-[0.78rem] sm:leading-[1.58] sm:text-white/78 md:text-[0.82rem]">
                        {member.bio}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
