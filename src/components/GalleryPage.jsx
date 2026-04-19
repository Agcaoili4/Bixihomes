import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { createPortal } from "react-dom";
import galleryItems, { TRADES } from "../data/galleryData";

function GalleryMedia({ item, className = "", autoPlay = false }) {
  if (item.type === "video") {
    return (
      <video
        src={item.url}
        className={className}
        playsInline
        muted
        loop
        controls={false}
        autoPlay={autoPlay}
        preload="metadata"
      />
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={className}
      draggable={false}
    />
  );
}

function LightboxModal({ item, onClose, items, setSelected }) {
  if (!item) return null;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    const prevPad = body.style.paddingRight;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      body.style.paddingRight = prevPad;
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx < items.length - 1) setSelected(items[idx + 1]);
      }
      if (e.key === "ArrowLeft") {
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx > 0) setSelected(items[idx - 1]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, items, onClose, setSelected]);

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-xl"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl p-3 sm:p-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-2xl border border-white/28 bg-black/30 shadow-[0_28px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GalleryMedia
                item={item}
                className="w-full h-[58vh] min-h-[260px] sm:h-[70vh] sm:min-h-[360px] object-cover"
                autoPlay
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/82 via-black/32 to-transparent backdrop-blur-md">
                <span className="inline-block mb-1.5 px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 text-[0.65rem] font-bold uppercase tracking-wider text-white/90 font-body">
                  {item.trade}
                </span>
                <h3 className="text-white text-lg font-semibold font-heading">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm mt-1 font-body">{item.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.button
        className="fixed top-4 right-4 z-[80] rounded-full border border-white/45 bg-black/35 p-2 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-200 hover:bg-black/55"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="h-4 w-4" />
      </motion.button>

      <motion.div
        className="fixed z-[80] left-1/2 bottom-3 sm:bottom-4 -translate-x-1/2 w-[calc(100vw-1rem)] sm:w-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        <div className="rounded-xl border border-white/40 bg-black/28 p-2 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 overflow-x-auto ui-hide-scrollbar">
            {items.map((thumb) => {
              const isSelected = item.id === thumb.id;
              return (
                <div
                  key={thumb.id}
                  className={`relative h-10 w-10 rounded-lg overflow-hidden border shadow-sm cursor-pointer gp-lightbox-thumb ${
                    isSelected
                      ? "border-gold bg-white/30 shadow-[0_0_0_1px_rgba(37,100,100,0.55),0_10px_20px_rgba(37,100,100,0.26)] gp-lightbox-thumb-active"
                      : "border-white/45 bg-white/10"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(thumb);
                  }}
                >
                  <GalleryMedia
                    item={thumb}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
}

export default function GalleryPage() {
  const [activeTrade, setActiveTrade] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const filtered =
    activeTrade === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.trade === activeTrade);

  return (
    <div className="gp-shell">
      <header className="gp-header">
        <a href="/" className="gp-back-link">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </a>
      </header>

      <div className="gp-container">
        <div className="gp-heading">
          <p className="ui-kicker-pill gallery-kicker">Full Portfolio</p>
          <h1 className="gp-title font-heading">Our Project Gallery</h1>
          <p className="gp-subtitle font-body">
            Browse our complete portfolio filtered by trade. Every photo is from a real Bixi Homes project site.
          </p>
        </div>

        <div className="gp-filters">
          {TRADES.map((trade) => (
            <button
              key={trade}
              className={`gp-filter-btn ${activeTrade === trade ? "is-active" : ""}`}
              onClick={() => setActiveTrade(trade)}
            >
              {trade}
              {trade !== "All" && (
                <span className="gp-filter-count">
                  {galleryItems.filter((i) => i.trade === trade).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="gp-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="gp-card"
                onClick={() => setSelectedItem(item)}
              >
                <GalleryMedia
                  item={item}
                  className="gp-card-img"
                />
                <div className="gp-card-overlay" />
                <div className="gp-card-trade-chip">{item.trade}</div>
                <div className="gp-card-caption">
                  <h3 className="gp-card-title font-heading">{item.title}</h3>
                  <p className="gp-card-desc font-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="gp-empty">
            <p className="font-body">No projects found for this trade.</p>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedItem && (
          <LightboxModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            items={filtered}
            setSelected={setSelectedItem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
