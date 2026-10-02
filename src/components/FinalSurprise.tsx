'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { FINAL_SURPRISE_DATA, PERSONAL_DETAILS } from '@/data/relationshipData';
import { Heart, Sparkles, Volume2, ShieldCheck, Stars } from 'lucide-react';

interface FinalSurpriseProps {
  onPlayOath: () => void;
}

export default function FinalSurprise({ onPlayOath }: FinalSurpriseProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [showFullClimax, setShowFullClimax] = useState(false);

  useEffect(() => {
    if (activeStep < FINAL_SURPRISE_DATA.openingLines.length) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 2400);
      return () => clearTimeout(timer);
    } else if (!showFullClimax) {
      const timer = setTimeout(() => {
        setShowFullClimax(true);
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#f43f5e', '#fbbf24', '#fbcfe8', '#ffffff'],
          });
        } catch (e) {
          // fallback
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeStep, showFullClimax]);

  const triggerHeartsShower = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#fda4af'],
      });
    } catch (e) {
      // fallback
    }
  };

  return (
    <section id="surprise" className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient from-romance-950/40 to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-romance-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Cinematic Build-up */}
      {!showFullClimax ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-4">
          <div className="space-y-6 max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-romance-100 font-light leading-relaxed italic"
              >
                "{FINAL_SURPRISE_DATA.openingLines[Math.min(activeStep, FINAL_SURPRISE_DATA.openingLines.length - 1)]}"
              </motion.p>
            </AnimatePresence>

            <div className="pt-6">
              <button
                onClick={() => setShowFullClimax(true)}
                className="text-xs font-mono text-romance-400 hover:text-romance-200 transition-colors"
              >
                Skip to Letter →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* The Climax Reveal */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 glass-panel rounded-3xl p-6 sm:p-12 border border-romance-500/40 shadow-2xl bg-gradient-to-b from-[#180a18]/95 to-[#0a040b]/98"
        >
          {/* Header Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-romance-600/30 border border-romance-400/40 text-xs font-mono text-gold-300 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>With All My Love</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-tight">
              {FINAL_SURPRISE_DATA.climaxSalute}
            </h2>

            <p className="text-sm font-mono text-romance-300">
              For {PERSONAL_DETAILS.boyfriendName} • From {PERSONAL_DETAILS.girlfriendName}
            </p>
          </div>

          {/* Sacred Blessing Portrait */}
          <div className="relative w-full max-w-md mx-auto aspect-[9/16] max-h-[480px] rounded-2xl overflow-hidden border-2 border-gold-400/30 shadow-2xl mb-8 group">
            <Image
              src="/photos/WhatsApp Image 2026-10-02 at 22.03.35.jpeg"
              alt="Divine Blessing"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-5 text-center">
              <p className="font-serif text-sm sm:text-base text-gold-200 italic mb-1">
                "{FINAL_SURPRISE_DATA.sacredBlessingCaption}"
              </p>
              <span className="text-[11px] font-mono text-romance-300">
                Har Har Mahadev • Blessed Forever
              </span>
            </div>
          </div>

          {/* Heartfelt Love Letter */}
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-black/50 border border-romance-500/25 mb-8">
            <div className="font-serif text-base sm:text-lg text-romance-100/90 leading-relaxed space-y-4 whitespace-pre-line">
              {FINAL_SURPRISE_DATA.girlfriendLetter}
            </div>
          </div>

          {/* Interactive Easter Eggs & Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-romance-500/20">
            <button
              onClick={onPlayOath}
              className="px-5 py-2.5 rounded-full bg-romance-600 hover:bg-romance-500 text-white text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-romance-900/40 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Replay 21 August Vow Tape 🎙️</span>
            </button>

            <button
              onClick={triggerHeartsShower}
              className="px-5 py-2.5 rounded-full glass-card border border-romance-400/30 text-romance-100 hover:text-white hover:border-romance-300 text-xs sm:text-sm font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-romance-400 fill-romance-500" />
              <span>Shower With Love ❤️</span>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
