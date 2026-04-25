"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const MediaItem = ({ item, className, onClick }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (item.type !== "video") return undefined;

    // Only start video work when the media is near the viewport.
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
      });
    }, options);

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [item.type]);

  useEffect(() => {
    if (item.type !== "video") return undefined;

    let mounted = true;

    // Wait until playback is possible before removing the loading state.
    const handleVideoPlay = async () => {
      if (!videoRef.current || !isInView || !mounted) return;

      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.oncanplay = resolve;
            }
          });
          if (mounted) {
            setIsBuffering(false);
            await videoRef.current.play();
          }
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("Video playback failed:", error);
        }
      }
    };

    if (isInView) {
      handleVideoPlay();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }

    return () => {
      mounted = false;
      if (videoRef.current) {
        // Reset the element so hidden videos release decode/network work.
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, [isInView, item.type]);

  if (item.type === "video") {
    return (
      <div className={`${className ?? ""} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          draggable={false}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: "opacity 0.2s",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={item.url}
      alt={item.title}
      className={`${className ?? ""} object-cover cursor-pointer`}
      onClick={onClick}
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  );
};

const GalleryModal = ({
  selectedItem,
  isOpen,
  onClose,
  setSelectedItem,
  mediaItems,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <>
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-xl"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-5xl p-3 sm:p-4"
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/28 bg-black/30 shadow-[0_28px_60px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <MediaItem
              item={selectedItem}
              className="w-full h-[58vh] min-h-[260px] sm:h-[70vh] sm:min-h-[360px]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/82 via-black/32 to-transparent backdrop-blur-md">
              <h3 className="text-white text-lg font-semibold font-heading">
                {selectedItem.title}
              </h3>
              <p className="text-white/80 text-sm mt-1 font-body">{selectedItem.desc}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        className="fixed top-4 right-4 z-[80] rounded-full border border-white/45 bg-black/35 p-2 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-200 hover:bg-black/55"
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="h-4 w-4" />
      </motion.button>

      <motion.div className="fixed z-[80] left-1/2 bottom-3 sm:bottom-4 -translate-x-1/2 w-[calc(100vw-1rem)] sm:w-auto">
        <motion.div className="rounded-xl border border-white/40 bg-black/28 p-2 shadow-[0_16px_36px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 overflow-x-auto ui-hide-scrollbar">
            {mediaItems.map((item, index) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  className={`relative h-10 w-10 rounded-lg overflow-hidden border shadow-sm cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "border-gold bg-white/30 shadow-[0_0_0_1px_rgba(37,100,100,0.55),0_10px_20px_rgba(37,100,100,0.26)]"
                      : "border-white/45 bg-white/10"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{
                    opacity: 1,
                    scale: isSelected ? 1.1 : 1,
                    y: isSelected ? -2 : 0,
                  }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.12, y: -4 }}
                >
                  <MediaItem
                    item={item}
                    className="h-full w-full"
                    onClick={() => setSelectedItem(item)}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  return createPortal(modalContent, document.body);
};

const InteractiveBentoGallery = ({
  mediaItems,
  description,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const wrapRef = useRef(null);
  const touchStartX = useRef(null);
  const items = mediaItems;

  const goTo = useCallback(
    (index) => {
      const clamped = ((index % items.length) + items.length) % items.length;
      setActiveIndex(clamped);
    },
    [items.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Keep the carousel moving until the user interacts with it.
  useEffect(() => {
    const start = () => {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    };
    start();

    const wrap = wrapRef.current;
    const pause = () => clearInterval(autoplayRef.current);
    const resume = () => { pause(); start(); };

    if (wrap) {
      wrap.addEventListener("mouseenter", pause);
      wrap.addEventListener("mouseleave", resume);
      wrap.addEventListener("touchstart", pause, { passive: true });
      wrap.addEventListener("touchend", resume);
    }

    return () => {
      pause();
      if (wrap) {
        wrap.removeEventListener("mouseenter", pause);
        wrap.removeEventListener("mouseleave", resume);
        wrap.removeEventListener("touchstart", pause);
        wrap.removeEventListener("touchend", resume);
      }
    };
  }, [items.length]);

  // Treat horizontal swipes as next/previous navigation on touch devices.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goNext();
        else goPrev();
      }
      touchStartX.current = null;
    };

    wrap.addEventListener("touchstart", onTouchStart, { passive: true });
    wrap.addEventListener("touchend", onTouchEnd);
    return () => {
      wrap.removeEventListener("touchstart", onTouchStart);
      wrap.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev]);

  // Allow arrow-key navigation while the modal is closed.
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedItem) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, selectedItem]);

  // Preserve layout width while page scroll is locked behind the modal.
  useEffect(() => {
    if (!selectedItem) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [selectedItem]);

  // Offset surrounding cards to create the stacked carousel layout.
  const getCardStyle = (index) => {
    const distance = index - activeIndex;
    const absDistance = Math.abs(distance);

    if (absDistance === 0) {
      return { zIndex: 10, opacity: 1, transform: "translateX(0) scale(1)", pointerEvents: "auto" };
    }

    // Neighbors tuck behind the active card with overlap
    const direction = distance > 0 ? 1 : -1;
    const shiftPx = direction * absDistance * 58;
    const scale = Math.max(0.72, 1 - absDistance * 0.1);
    const opacity = Math.max(0, 0.55 - (absDistance - 1) * 0.2);
    const z = 10 - absDistance;

    return {
      zIndex: z,
      opacity,
      transform: `translateX(${shiftPx}px) scale(${scale})`,
      pointerEvents: absDistance <= 2 ? "auto" : "none",
    };
  };

  // Skip cards that sit too far from the active item.
  const visibleRange = 3;

  return (
    <div className="ui-gallery-shell">
      <div className="gallery-header" data-reveal>
        <div className="gallery-intro-topline">
          <p className="ui-kicker-pill gallery-kicker">Portfolio</p>
          <p className="gallery-intro-label font-body">
            Selected residential restoration and renovation work
          </p>
        </div>

        <div className="gallery-intro-layout grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:items-start md:gap-7 lg:gap-10">
          <motion.h2
            className="gallery-heading-title font-heading font-extrabold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.04] text-black text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Take a Look at{" "}
            <span className="text-[#B9975B]">Our Work</span>
          </motion.h2>
          <motion.p
            className="gallery-heading-copy font-body text-sm md:text-base lg:text-lg text-black/60 leading-relaxed text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Carousel wrapper */}
      <div className="gallery-carousel-wrap" ref={wrapRef}>
        {/* Prev arrow */}
        <button
          className="gallery-arrow gallery-arrow-prev"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Stacked track */}
        <div className="gallery-carousel-stage">
          {items.map((item, index) => {
            const distance = Math.abs(index - activeIndex);
            if (distance > visibleRange) return null;

            const style = getCardStyle(index);

            return (
              <div
                key={item.id}
                className={`gallery-carousel-card ${index === activeIndex ? "is-active" : ""}`}
                style={style}
                onClick={() =>
                  index === activeIndex
                    ? setSelectedItem(item)
                    : goTo(index)
                }
              >
                <MediaItem item={item} className="h-full w-full gallery-card-image" />
                <div className="gallery-carousel-card-overlay" />
                <div className="absolute top-3 left-3">
                  <span className="gallery-card-chip">Featured Project</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-xs font-bold sm:text-sm leading-snug font-heading text-white/75">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] text-white/75 sm:text-xs leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          className="gallery-arrow gallery-arrow-next"
          onClick={goNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="gallery-dots">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={`gallery-dot ${index === activeIndex ? "is-active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedItem && (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={Boolean(selectedItem)}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBentoGallery;
