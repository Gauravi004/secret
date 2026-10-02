'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Compass, MapPin, Calendar, Music } from 'lucide-react';
import { PERSONAL_DETAILS } from '@/data/relationshipData';

interface WelcomeHeroProps {
  onEnter: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function WelcomeHero({ onEnter, isPlaying, onTogglePlay }: WelcomeHeroProps) {
  return (
    <section
      id="welcome"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-16 overflow-hidden"
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-romance-600/15 rounded-full blur-3xl pointer-events-none animate-glow" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating subtle romantic particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-romance-400/40"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 92}%`,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            {i % 3 === 0 ? <Heart className="w-4 h-4 fill-romance-500/30" /> : <Sparkles className="w-3.5 h-3.5" />}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto text-center z-10">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-romance-400/20 text-xs sm:text-sm text-romance-200 mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-romance-400" />
          <span className="tracking-widest uppercase text-[11px] font-medium text-romance-300">
            A little something for you...
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight sm:leading-none"
        >
          Happy Boyfriend's Day,{' '}
          <span className="bg-gradient-to-r from-romance-300 via-romance-400 to-amber-200 bg-clip-text text-transparent romantic-glow block sm:inline">
            {PERSONAL_DETAILS.boyfriendShortName} ❤️
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-romance-100/80 max-w-xl mx-auto font-light leading-relaxed mb-8"
        >
          Because being far away doesn't mean I can't make today special.
          Welcome to the world built out of our laughter, milestones, rides, and endless love.
        </motion.p>

        {/* Milestone Quick Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10 text-xs text-romance-300/80"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-romance-950/60 border border-romance-500/20">
            <Compass className="w-3.5 h-3.5 text-romance-400" />
            <span>{PERSONAL_DETAILS.college}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-romance-950/60 border border-romance-500/20">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>Milestone: {PERSONAL_DETAILS.milestoneFirstPhotoDate}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-romance-950/60 border border-romance-500/20">
            <Heart className="w-3.5 h-3.5 text-romance-400 fill-romance-400/40" />
            <span>"{PERSONAL_DETAILS.anthemTag}"</span>
          </div>
        </motion.div>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-romance-600 via-romance-500 to-rose-600 text-white font-medium text-base shadow-xl shadow-romance-700/40 hover:shadow-romance-600/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Enter Our World</span>
            <span className="text-xl group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </button>

          <button
            onClick={onTogglePlay}
            className="w-full sm:w-auto px-6 py-4 rounded-full glass-card border border-romance-400/30 text-romance-100 hover:text-white hover:border-romance-300 hover:bg-romance-900/30 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <Music className={`w-4 h-4 ${isPlaying ? 'text-romance-400 animate-pulse' : 'text-romance-300/60'}`} />
            <span>{isPlaying ? 'Pause Music' : 'Listen to Our Tape 🎵'}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
