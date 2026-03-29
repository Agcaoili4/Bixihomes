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

      <div className="relative bg-gold/90 py-16 md:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black text-center mb-10 md:mb-12 leading-tight">
            Latest News and Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {articles.map((article) => (
              <article key={article.title}>
                <div className="h-[220px] md:h-[280px] lg:h-[340px] overflow-hidden mb-5">
                  <img
                    src={article.photo}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl lg:text-[28px] text-black leading-tight mb-3">
                  {article.title}
                </h3>
                <p className="font-body text-sm md:text-base text-black/65 leading-relaxed mb-5">
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
