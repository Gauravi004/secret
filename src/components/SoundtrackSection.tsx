'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SOUNDTRACK_SONGS, PERSONAL_DETAILS } from '@/data/relationshipData';
import { Music, Play, Pause, Disc, Sparkles, Volume2, VolumeX, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface SoundtrackSectionProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef?: React.RefObject<HTMLAudioElement>;
}

export default function SoundtrackSection({ isPlaying, onTogglePlay, audioRef }: SoundtrackSectionProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(150); // 2m 30s approx

  const primaryTrack = SOUNDTRACK_SONGS[0];

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef?.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <section id="soundtrack" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <Music className="w-3.5 h-3.5 text-romance-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Five</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          The Soundtrack of Us
        </h2>
        <p className="text-sm sm:text-base text-romance-200/80 font-light">
          Melodies that bring back Himachal mountain breezes, campus walks, and our most cherished real voice recording.
        </p>
      </div>

      {/* Featured Vinyl Player: The Real Voice Oath Tape */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-romance-500/30 shadow-2xl relative overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Animated Vinyl Disc */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{
                  repeat: isPlaying ? Infinity : 0,
                  duration: 8,
                  ease: 'linear',
                }}
                className="w-full h-full rounded-full bg-gradient-to-tr from-black via-zinc-900 to-stone-900 border-4 border-romance-500/40 p-4 shadow-2xl flex items-center justify-center relative"
              >
                {/* Vinyl Grooves */}
                <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full border border-white/10 flex items-center justify-center bg-romance-900 border-romance-400/40">
                      <Disc className="w-8 h-8 text-gold-400" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Center Play Button Overlay */}
              <button
                onClick={onTogglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-romance-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all border border-romance-300"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 ml-1 fill-white" />
                )}
              </button>
            </div>
          </div>

          {/* Player Metadata & Controls */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-romance-600/30 border border-romance-400/30 text-xs font-mono text-romance-200 mb-3">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Authentic Voice Tape • 21 August</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              {primaryTrack.title}
            </h3>

            <p className="text-sm text-romance-300 font-mono mb-4">
              {primaryTrack.artist}
            </p>

            <p className="text-xs sm:text-sm text-romance-100/80 leading-relaxed font-light mb-6">
              {primaryTrack.whyItMatters}
            </p>

            {/* Scrubber Bar */}
            <div className="space-y-2 mb-6">
              <input
                type="range"
                min="0"
                max={duration || 150}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-romance-950 rounded-lg appearance-none cursor-pointer accent-romance-500"
              />
              <div className="flex items-center justify-between text-xs font-mono text-romance-400/70">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Transcript Toggle Button */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="inline-flex items-center gap-2 text-xs font-mono text-gold-400 hover:text-gold-300 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>{showTranscript ? 'Hide Vow Transcript' : 'Read Live Oath Transcript (Hindi)'}</span>
              {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Transcript Accordion */}
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 pt-6 border-t border-romance-500/20 text-xs sm:text-sm leading-relaxed text-romance-100/90 font-mono bg-black/40 rounded-2xl p-5 border border-romance-400/15"
          >
            <p className="font-bold text-gold-300 mb-2">📜 Official Transcript (21 August, 2:10 PM):</p>
            <blockquote className="space-y-2 italic">
              <p>"Main Rishi Raghav Singh Pathania, from Himachal Pradesh... studied at Chitkara University, batch 2022 to 2026."</p>
              <p>"Main yeh kehna chahta hoon ki main Gauravi Ojhha ke saath relationship mein hoon. Aur aaj date hai 21 August, Friday hai, 2:10 time hai dopahar ka..."</p>
              <p>"Main aaj yeh pran leta hoon ki agar maine Gauravi ka dil dukhaya ya isko chhod ke chala gaya, toh Gauravi mujhpe razor chala degi... aur meri moochh kaat ke fenk sakti hai, aur yeh recording mere father ko bhej sakti hai ya kisi bhi mere family ke sadasya ko. Main iski permission deta hoon bina kisi shikayat ke."</p>
              <p>"...She is the last. Inke baad kisi ladki ko main nahi prem kar paunga. Yehi mera sab kuch hai. Jai Gauravi ki! Jai Gauravi ki! Jai Gauravi ki!"</p>
            </blockquote>
          </motion.div>
        )}
      </div>

      {/* Additional Playlist Track Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SOUNDTRACK_SONGS.slice(1).map((song) => (
          <div
            key={song.id}
            className="glass-card rounded-2xl p-5 border border-romance-500/20 hover:border-romance-400/40 transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-romance-900/60 border border-romance-500/30 flex items-center justify-center shrink-0 mt-1">
              <Music className="w-5 h-5 text-romance-300" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-0.5">{song.title}</h4>
              <p className="text-xs font-mono text-romance-300/80 mb-2">{song.artist}</p>
              <p className="text-xs text-romance-200/80 font-light leading-relaxed mb-2">{song.whyItMatters}</p>
              <span className="text-[11px] font-mono text-gold-400/90 bg-black/30 px-2 py-0.5 rounded-md border border-gold-500/20">
                {song.associatedMemory}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
