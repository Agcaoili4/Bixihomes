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
    },
    {
      id: 2,
      type: "image",
      title: "Luxury kitchen design",
      desc: "Beautiful lighting and smart storage",
      url: images.galleryImg2,
    },
    {
      id: 3,
      type: "image",
      title: "Bright bedroom details",
      desc: "Comfort-focused residential space",
      url: images.galleryImg3,
    },
    {
      id: 4,
      type: "image",
      title: "Spacious backyard patio",
      desc: "Outdoor luxury designed for family",
      url: images.galleryImg4,
    },
    {
      id: 5,
      type: "image",
      title: "Stylish bathroom aesthetic",
      desc: "Clean lines with modern fixtures",
      url: images.galleryImg5,
    },
  ];

  return (
    <section id="gallery" className="gallery-section ui-section" data-reveal>
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
