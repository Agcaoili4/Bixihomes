"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const MediaItem = ({ item, className, onClick }) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (item.type !== 'video') return undefined;

    const options = {
      root: null,
      rootMargin: '50px',
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
    if (item.type !== 'video') return undefined;

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
        console.warn('Video playback failed:', error);
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
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }
    };
  }, [isInView, item.type]);

  if (item.type === 'video') {
    return (
      <div className={`${className ?? ''} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{
            opacity: isBuffering ? 0.8 : 1,
            transition: 'opacity 0.2s',
            transform: 'translateZ(0)',
            willChange: 'transform',
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
      className={`${className ?? ''} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
};

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={onClose}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md"
      >
        <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-5xl p-4">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <MediaItem item={selectedItem} className="w-full h-[70vh] min-h-[360px]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-white text-lg font-semibold">{selectedItem.title}</h3>
              <p className="text-white/80 text-sm mt-1">{selectedItem.desc}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        className="fixed top-4 right-4 z-50 rounded-full border border-white/30 bg-black/60 p-2 text-white hover:bg-black/80"
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="h-4 w-4" />
      </motion.button>

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition((prev) => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
        }}
        className="fixed z-50 left-1/2 bottom-4 -translate-x-1/2"
      >
        <motion.div className="rounded-xl border border-slate-200/30 bg-white/90 p-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center -space-x-2">
            {mediaItems.map((item, index) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  className={`relative h-10 w-10 rounded-lg overflow-hidden border ${isSelected ? 'border-blue-500' : 'border-white/50'} shadow-sm cursor-pointer`}
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
                  <MediaItem item={item} className="h-full w-full" onClick={() => setSelectedItem(item)} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

const InteractiveBentoGallery = ({ mediaItems, title, description }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 text-center gallery-heading">
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

      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={Boolean(selectedItem)}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
            }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-xl ${item.span}`}
                onClick={() => !isDragging && setSelectedItem(item)}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
                }}
                whileHover={{ scale: 1.02 }}
                drag
                dragElastic={1}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false);
                  const moveDistance = info.offset.x + info.offset.y;
                  if (Math.abs(moveDistance) > 50) {
                    const newItems = [...items];
                    const draggedItem = newItems[index];
                    const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
                    newItems.splice(index, 1);
                    newItems.splice(targetIndex, 0, draggedItem);
                    setItems(newItems);
                  }
                }}
              >
                <MediaItem item={item} className="h-72 w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="text-xs font-bold sm:text-sm">{item.title}</h3>
                  <p className="text-[10px] text-white/80 sm:text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBentoGallery;
