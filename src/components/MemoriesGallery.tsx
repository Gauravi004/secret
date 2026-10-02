'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MEMORIES_MEDIA } from '@/data/relationshipData';
import { MemoryMedia } from '@/types';
import { Play, Sparkles, Heart, Filter, Calendar } from 'lucide-react';

interface MemoriesGalleryProps {
  onOpenLightbox: (index: number) => void;
}

export default function MemoriesGallery({ onOpenLightbox }: MemoriesGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Moments' },
    { id: 'together', label: 'Us Together ❤️' },
    { id: 'rishi', label: 'Rishi Vibes ✨' },
    { id: 'funny', label: 'Silly & Filters 👽' },
    { id: 'rides', label: 'Bikes & Rides 🏍️' },
  ];

  const filteredMedia = activeCategory === 'all'
    ? MEMORIES_MEDIA
    : MEMORIES_MEDIA.filter(item => item.category === activeCategory);

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-romance-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Two</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Our Little Universe
        </h2>
        <p className="text-sm sm:text-base text-romance-200/80 font-light">
          A collection of our favorite snapshots, candid laughs, college days, mountain air, and videos that never fail to make me smile.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
              activeCategory === cat.id
                ? 'bg-romance-600 text-white shadow-lg shadow-romance-900/40 border border-romance-400'
                : 'glass-panel text-romance-200/80 hover:text-white hover:bg-romance-900/40 border-romance-500/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Responsive Masonry / Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <AnimatePresence>
          {filteredMedia.map((item) => {
            const originalIndex = MEMORIES_MEDIA.findIndex(m => m.id === item.id);
            const isVideo = item.type === 'video';

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => onOpenLightbox(originalIndex)}
                className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-romance-500/20 hover:border-romance-400/60 shadow-lg hover:shadow-2xl hover:shadow-romance-900/30 transition-all duration-300"
              >
                {/* Media Thumbnail */}
                <div className="relative w-full aspect-[4/5] bg-black/40 overflow-hidden">
                  {isVideo ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video
                        src={item.src}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Play overlay button */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-romance-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}

                  {/* Gradient overlay with details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    {item.date && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gold-400 mb-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    )}
                    <h3 className="font-serif text-base font-bold text-white leading-tight mb-1 group-hover:text-romance-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-romance-200/80 font-light line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
