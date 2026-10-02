'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { INSIDE_JOKES } from '@/data/relationshipData';
import { Smile, RotateCw, Sparkles, AlertCircle } from 'lucide-react';

export default function InsideJokes() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="inside-jokes" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <Smile className="w-3.5 h-3.5 text-gold-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Four</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Things That Make Absolutely No Sense To Anyone Else
        </h2>
        <p className="text-sm sm:text-base text-romance-200/80 font-light">
          Welcome to our private corner of absurdity. Tap any card below to reveal the official confidential backstory!
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INSIDE_JOKES.map((joke) => {
          const isFlipped = !!flippedCards[joke.id];

          return (
            <div
              key={joke.id}
              onClick={() => toggleFlip(joke.id)}
              className="perspective-1000 h-[380px] sm:h-[400px] cursor-pointer select-none"
            >
              <motion.div
                className="w-full h-full relative transform-style-3d transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl glass-card p-6 flex flex-col justify-between border border-romance-500/25 overflow-hidden group shadow-xl">
                  {/* Subtle Image Background if available */}
                  {joke.image && (
                    <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                      <Image
                        src={joke.image}
                        alt={joke.frontTitle}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                    </div>
                  )}

                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-romance-600/40 border border-romance-400/30 text-[10px] font-mono text-romance-200 uppercase tracking-wider mb-4">
                      {joke.tag}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-romance-300 transition-colors">
                      {joke.frontTitle}
                    </h3>
                    <p className="text-xs text-romance-300/80 font-light">
                      {joke.frontSubtitle}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-romance-500/20">
                    <div className="p-3 rounded-xl bg-black/40 border border-romance-400/20 mb-4">
                      <p className="text-xs text-gold-300 font-medium italic">
                        "{joke.punchline}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-romance-400/80 font-mono">
                      <span>Tap to reveal the truth</span>
                      <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl glass-panel p-6 flex flex-col justify-between border-2 border-romance-400/40 shadow-2xl bg-gradient-to-br from-romance-950/90 to-black/95">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-mono">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>The Declassified Story</span>
                      </span>
                      <span className="p-1 rounded-full bg-romance-600/30 text-romance-300">
                        <RotateCw className="w-3 h-3" />
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-white mb-3">
                      {joke.frontTitle}
                    </h4>

                    <p className="text-xs sm:text-sm text-romance-100/90 leading-relaxed font-light">
                      {joke.theRealStory}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-romance-500/20 flex items-center justify-between text-[11px] text-romance-300/70 font-mono">
                    <span>Evidence verified</span>
                    <span className="text-romance-400">Tap to flip back</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
