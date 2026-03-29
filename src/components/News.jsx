import { images } from "../assets/images";

const articles = [
  {
    title: "Improve Workflow With bluecollar Construction",
    description:
      "Pellentesque vehicula eros neque, maximus mattis est sagittis Nulla facilisi. In sed pretium metus. Proin pretium id urna sit amet tincidunt. Interdum et malesuada.",
    photo: images.newsPhoto1,
  },
  {
    title: "Understanding Your Home's Electrical Capacity",
    description:
      "Pellentesque vehicula eros neque, maximus mattis est sagittis Nulla facilisi. In sed pretium metus. Proin pretium id urna sit amet tincidunt. Interdum et malesuada.",
    photo: images.newsPhoto2,
  },
];

export default function News() {
  return (
    <section id="news" className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={images.newsBg}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative bg-gold/90 ui-section">
        <div className="ui-container">
          <h2
            className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black text-center ui-mb-xl leading-tight"
            data-reveal
          >
            Latest News and Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 ui-gap-8 md:ui-gap-10" data-reveal-group>
            {articles.map((article) => (
              <article key={article.title} data-reveal-item>
                <div className="h-[220px] md:h-[280px] lg:h-[340px] overflow-hidden ui-mb-sm">
                  <img
                    src={article.photo}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-[28px] text-black leading-tight ui-mb-xs">
                  {article.title}
                </h3>
                <p className="font-body text-sm md:text-base text-black/65 leading-relaxed ui-mb-sm">
                  {article.description}
                </p>
                <a
                  href="#"
                  className="ui-btn ui-btn-secondary"
                >
                  Read More
                  <span className="text-xs">&rarr;</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
