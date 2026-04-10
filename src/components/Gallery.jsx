import InteractiveBentoGallery from "./ui/interactive-bento-gallery";
import galleryItems from "../data/galleryData";

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section ui-section" data-reveal>
      <div className="ui-container">
        <InteractiveBentoGallery
          mediaItems={galleryItems}
          description="Explore our real project portfolio across roofing, exterior restoration, and full-home build progress. Each photo reflects active site execution and finished workmanship from our team."
        />
        <div className="gallery-see-more-row">
          <a href="/gallery" className="ui-btn ui-btn-primary gallery-see-more-btn">
            See More Projects
          </a>
        </div>
      </div>
    </section>
  );
}
