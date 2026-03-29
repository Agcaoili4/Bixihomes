import { images } from "../assets/images";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white ui-section">
      <div className="ui-container">
        <h2 className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black text-center ui-mb-xl leading-tight">
          Gallery
        </h2>

        {/* Desktop masonry grid */}
        <div className="hidden md:grid grid-cols-3 ui-gap-4 lg:ui-gap-5">
          {/* Column 1 */}
          <div className="flex flex-col ui-gap-4 lg:ui-gap-5">
            <div className="h-[340px] lg:h-[360px] overflow-hidden">
              <img
                src={images.galleryImg1}
                alt="Gallery 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-[340px] lg:h-[360px] overflow-hidden">
              <img
                src={images.galleryImg2}
                alt="Gallery 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Column 2 - full height */}
          <div className="overflow-hidden">
            <img
              src={images.galleryImg3}
              alt="Gallery 3"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col ui-gap-4 lg:ui-gap-5">
            <div className="h-[340px] lg:h-[360px] overflow-hidden">
              <img
                src={images.galleryImg4}
                alt="Gallery 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-[340px] lg:h-[360px] overflow-hidden">
              <img
                src={images.galleryImg5}
                alt="Gallery 5"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Mobile stacked grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 ui-gap-3">
          {[images.galleryImg1, images.galleryImg2, images.galleryImg3, images.galleryImg4, images.galleryImg5].map(
            (src, i) => (
              <div key={i} className="h-[220px] sm:h-[200px] overflow-hidden">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
