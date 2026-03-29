import InteractiveBentoGallery from "./ui/interactive-bento-gallery";
import { images } from "../assets/images";

export default function Gallery() {
  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Modern living room interior",
      desc: "Spacious, bright interior with premium finish",
      url: images.galleryImg1,
      span: "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
    },
    {
      id: 2,
      type: "image",
      title: "Luxury kitchen design",
      desc: "Beautiful lighting and smart storage",
      url: images.galleryImg2,
      span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1",
    },
    {
      id: 3,
      type: "image",
      title: "Bright bedroom details",
      desc: "Comfort-focused residential space",
      url: images.galleryImg3,
      span: "sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1",
    },
    {
      id: 4,
      type: "image",
      title: "Spacious backyard patio",
      desc: "Outdoor luxury designed for family",
      url: images.galleryImg4,
      span: "sm:col-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-1",
    },
    {
      id: 5,
      type: "image",
      title: "Stylish bathroom aesthetic",
      desc: "Clean lines with modern fixtures",
      url: images.galleryImg5,
      span: "sm:col-span-2 sm:row-span-1 lg:col-span-1 lg:row-span-2",
    },
  ];

  return (
    <section id="gallery" className="bg-white ui-section" data-reveal>
      <div className="ui-container">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Take a Look at Our Work"
          description="Explore our portfolio of stunning home renovations and construction projects. From modern interiors to luxurious outdoor spaces, see how we transform houses into dream homes."
        />
      </div>
    </section>
  );
}
