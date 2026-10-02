'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles, Disc } from 'lucide-react';
import { PERSONAL_DETAILS } from '@/data/relationshipData';

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  trackTitle?: string;
}

export default function FloatingMusicPlayer({
  isPlaying,
  onTogglePlay,
  trackTitle = "Rishi's 21 August Vow Tape (Chitkara Accord)",
}: FloatingMusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40">
      <motion.div
        layout
        className="glass-panel rounded-full p-2 border border-romance-400/40 shadow-2xl shadow-black/80 flex items-center gap-3 backdrop-blur-xl bg-black/75"
      >
        {/* Disc button */}
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-romance-600 to-rose-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ repeat: isPlaying ? Infinity : 0, duration: 6, ease: 'linear' }}
            className="w-full h-full rounded-full flex items-center justify-center"
          >
            <Disc className="w-5 h-5 text-white/90" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 ml-0.5 fill-white" />
            )}
          </div>
        </button>

        {/* Info Pill */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer pr-3 hidden sm:block max-w-[200px]"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-romance-300 uppercase tracking-wider">
              {isPlaying ? 'Now Playing' : 'Voice Memo Ready'}
            </span>
          </div>
          <p className="text-xs font-serif text-white truncate font-medium">
            {trackTitle}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
