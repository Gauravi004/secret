'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface LightboxItem {
  src: string;
  title: string;
  caption: string;
  type?: 'image' | 'video';
  date?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function LightboxModal({
  isOpen,
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev?.();
            }}
            aria-label="Previous item"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            aria-label="Next item"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Media Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden glass-panel border border-romance-500/30 p-2 sm:p-4"
        >
          <div className="relative w-full h-[60vh] sm:h-[68vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/40">
            {item.type === 'video' ? (
              <video
                src={item.src}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>

          {/* Details below media */}
          <div className="w-full mt-3 px-2 sm:px-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                {item.date && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gold-400 bg-black/40 px-2 py-0.5 rounded-full border border-gold-500/20">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                )}
                <h4 className="font-serif text-lg font-bold text-white">{item.title}</h4>
              </div>
              <p className="text-xs sm:text-sm text-romance-200/80 font-light">{item.caption}</p>
            </div>
            <div className="text-[11px] text-romance-400/60 font-mono hidden sm:block">
              Use arrow keys ← →
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
