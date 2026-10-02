'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TEN_THINGS_I_LOVE } from '@/data/relationshipData';
import { Heart, ChevronLeft, ChevronRight, Sparkles, Quote } from 'lucide-react';

export default function TenThingsLove() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = TEN_THINGS_I_LOVE[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TEN_THINGS_I_LOVE.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TEN_THINGS_I_LOVE.length) % TEN_THINGS_I_LOVE.length);
  };

  return (
    <section id="ten-things" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <Heart className="w-3.5 h-3.5 text-romance-400 fill-romance-500" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Three</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          10 Things I Love About You
        </h2>
        <p className="text-sm sm:text-base text-romance-200/80 font-light">
          Out of the infinite reasons my heart chose you, here are ten that make you completely irreplaceable to me.
        </p>
      </div>

      {/* Main Interactive Card Container */}
      <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="w-full glass-panel rounded-3xl p-6 sm:p-10 border border-romance-500/30 shadow-2xl shadow-romance-950/80 relative overflow-hidden"
          >
            {/* Background glowing watermark number */}
            <div className="absolute right-4 -bottom-6 font-serif text-8xl sm:text-9xl font-bold text-romance-500/10 select-none pointer-events-none">
              {String(currentItem.id).padStart(2, '0')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Image if available */}
              {currentItem.image && (
                <div className="md:col-span-5 relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-romance-500/20 shadow-md">
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              )}

              {/* Text content */}
              <div className={`${currentItem.image ? 'md:col-span-7' : 'md:col-span-12'}`}>
                {/* Counter Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-romance-600/30 border border-romance-400/30 text-xs font-mono text-romance-200 mb-4">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  <span>Reason {currentItem.id} of 10</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  {currentItem.title}
                </h3>

                <p className="text-sm sm:text-base text-romance-100/90 leading-relaxed font-light mb-6">
                  {currentItem.description}
                </p>

                {currentItem.quote && (
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-romance-950/60 border border-romance-500/20 text-xs sm:text-sm text-gold-300 font-serif italic">
                    <Quote className="w-4 h-4 text-romance-400 shrink-0 mt-0.5" />
                    <span>"{currentItem.quote}"</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePrev}
          aria-label="Previous reason"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-romance-500/30 text-sm text-romance-200 hover:text-white hover:border-romance-400 transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Dots progress indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {TEN_THINGS_I_LOVE.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to reason ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-romance-500 shadow-md shadow-romance-500/50'
                  : 'w-2 bg-romance-900/60 hover:bg-romance-700/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next reason"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-romance-600 text-sm text-white hover:bg-romance-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-romance-900/40"
        >
          <span className="hidden sm:inline">Next Reason</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
