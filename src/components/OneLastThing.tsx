'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface OneLastThingProps {
  onOpenFinalSurprise: () => void;
}

export default function OneLastThing({ onOpenFinalSurprise }: OneLastThingProps) {
  return (
    <section className="relative py-28 px-4 sm:px-6 max-w-3xl mx-auto text-center overflow-hidden">
      {/* Soft spotlight in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-romance-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-6 relative z-10"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs font-mono text-romance-300">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Almost at the End...</span>
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          You made it this far...
        </h2>

        <p className="text-base sm:text-lg text-romance-200/80 max-w-lg mx-auto font-light leading-relaxed">
          Through every laugh, every funny filter, every memory, and our plans for tomorrow. But before today ends, there is one last thing I want to tell you.
        </p>

        <div className="pt-4">
          <button
            onClick={onOpenFinalSurprise}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-romance-600 via-rose-500 to-amber-500 text-white font-medium text-base shadow-xl shadow-romance-900/50 hover:shadow-romance-600/70 hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-3 group"
          >
            <Heart className="w-5 h-5 fill-white/80 group-hover:scale-110 transition-transform" />
            <span>Open The Final Surprise</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
