"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const MediaItem = ({ item, className, onClick }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (item.type !== "video") return undefined;

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
        console.warn("Video playback failed:", error);
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
        className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 backdrop-blur-xl"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-5xl p-4"
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/35 bg-white/12 shadow-[0_28px_60px_rgba(15,23,42,0.38)] backdrop-blur-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <MediaItem
              item={selectedItem}
              className="w-full h-[70vh] min-h-[360px]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/72 via-slate-900/20 to-transparent backdrop-blur-md">
              <h3 className="text-white text-lg font-semibold">
                {selectedItem.title}
              </h3>
              <p className="text-white/80 text-sm mt-1">{selectedItem.desc}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        className="fixed top-4 right-4 z-[80] rounded-full border border-white/45 bg-white/16 p-2 text-white shadow-[0_10px_24px_rgba(15,23,42,0.28)] backdrop-blur-2xl transition-colors duration-200 hover:bg-white/24"
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="h-4 w-4" />
      </motion.button>

      <motion.div className="fixed z-[80] left-1/2 bottom-4 -translate-x-1/2">
        <motion.div className="rounded-xl border border-white/40 bg-white/16 p-2 shadow-[0_16px_36px_rgba(15,23,42,0.3)] backdrop-blur-2xl">
          <div className="flex items-center -space-x-2">
            {mediaItems.map((item, index) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  className={`relative h-10 w-10 rounded-lg overflow-hidden border shadow-sm cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "border-white/70 bg-white/28 shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_10px_20px_rgba(249,115,22,0.24)]"
                      : "border-white/45 bg-white/10"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                  animate={{
                    scale: isSelected ? 1.2 : 1,
                    rotate: isSelected ? 0 : index % 2 === 0 ? -15 : 15,
                    y: isSelected ? -5 : 0,
                  }}
                  whileHover={{ scale: 1.25, rotate: 0, y: -8 }}
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

const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(mediaItems);

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

  return (
    <div className="ui-gallery-shell">
      <div className="mb-8 text-center gallery-heading" data-reveal>
        <motion.h2
          className="font-heading font-extrabold text-[28px] md:text-[38px] lg:text-[44px] text-black ui-mb-sm leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="ui-copy-centered font-body text-sm md:text-base lg:text-lg text-black/70 leading-relaxed text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-reveal-group
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            data-reveal-item
            className="relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] aspect-[4/3]"
            onClick={() => setSelectedItem(item)}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { type: "spring", stiffness: 300, damping: 24 },
              },
            }}
            whileHover={{ scale: 1.02 }}
          >
            <MediaItem item={item} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-xs font-bold sm:text-sm leading-snug">{item.title}</h3>
              <p className="mt-1 text-[10px] text-white/85 sm:text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
