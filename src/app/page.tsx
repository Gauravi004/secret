'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import WelcomeHero from '@/components/WelcomeHero';
import OurStoryTimeline from '@/components/OurStoryTimeline';
import MemoriesGallery from '@/components/MemoriesGallery';
import LightboxModal from '@/components/LightboxModal';
import TenThingsLove from '@/components/TenThingsLove';
import InsideJokes from '@/components/InsideJokes';
import SoundtrackSection from '@/components/SoundtrackSection';
import BoyfriendQuiz from '@/components/BoyfriendQuiz';
import PerformanceReview from '@/components/PerformanceReview';
import FutureBucketList from '@/components/FutureBucketList';
import OneLastThing from '@/components/OneLastThing';
import FinalSurprise from '@/components/FinalSurprise';
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer';
import { MEMORIES_MEDIA } from '@/data/relationshipData';

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle global audio safely
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback permission needed:', err));
    }
  };

  const handleEnterWorld = () => {
    // Smooth scroll down to Story
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
    // Attempt playback on direct user gesture
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleOpenFinalSurprise = () => {
    const surpriseSection = document.getElementById('surprise');
    if (surpriseSection) {
      surpriseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Lightbox handlers
  const handleOpenLightbox = (index: number) => {
    setActiveMediaIndex(index);
    setLightboxOpen(true);
  };

  const handleSelectStoryPhoto = (src: string, title: string, caption: string) => {
    const existingIndex = MEMORIES_MEDIA.findIndex((m) => m.src === src);
    if (existingIndex !== -1) {
      setActiveMediaIndex(existingIndex);
    } else {
      setActiveMediaIndex(0);
    }
    setLightboxOpen(true);
  };

  const currentMediaItem = MEMORIES_MEDIA[activeMediaIndex] || null;

  const handlePrevMedia = () => {
    setActiveMediaIndex((prev) => (prev - 1 + MEMORIES_MEDIA.length) % MEMORIES_MEDIA.length);
  };

  const handleNextMedia = () => {
    setActiveMediaIndex((prev) => (prev + 1) % MEMORIES_MEDIA.length);
  };

  return (
    <main className="relative min-h-screen bg-[#0d060e] text-romance-50 selection:bg-romance-600 selection:text-white">
      {/* Hidden Global Audio Element for the 21 August Vow Recording */}
      <audio
        ref={audioRef}
        src="/audio/WhatsApp Audio 2026-10-02 at 21.28.52.mp4"
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating Header */}
      <Navbar isPlaying={isPlaying} onTogglePlay={togglePlay} />

      {/* 1. Welcome Screen */}
      <WelcomeHero
        onEnter={handleEnterWorld}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />

      {/* 2. Our Story */}
      <OurStoryTimeline onSelectPhoto={handleSelectStoryPhoto} />

      {/* 3. Our Memories */}
      <MemoriesGallery onOpenLightbox={handleOpenLightbox} />

      {/* 4. 10 Things I Love About You */}
      <TenThingsLove />

      {/* 5. Our Inside Jokes */}
      <InsideJokes />

      {/* 6. The Soundtrack of Us */}
      <SoundtrackSection
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        audioRef={audioRef}
      />

      {/* 7. Boyfriend Quiz */}
      <BoyfriendQuiz />

      {/* 8. Boyfriend Performance Review */}
      <PerformanceReview />

      {/* 9. Future Us */}
      <FutureBucketList />

      {/* 10. One Last Thing */}
      <OneLastThing onOpenFinalSurprise={handleOpenFinalSurprise} />

      {/* 11. Final Surprise */}
      <FinalSurprise onPlayOath={togglePlay} />

      {/* Floating Bottom Music Controller */}
      <FloatingMusicPlayer isPlaying={isPlaying} onTogglePlay={togglePlay} />

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        item={currentMediaItem}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrevMedia}
        onNext={handleNextMedia}
        hasPrev={MEMORIES_MEDIA.length > 1}
        hasNext={MEMORIES_MEDIA.length > 1}
      />

      {/* Footer */}
      <footer className="py-12 border-t border-romance-900/40 text-center text-xs text-romance-300/60 font-mono">
        <p className="mb-2">Made with eternal love by Gauravi Ojhha for Rishi Raghav Singh Pathania ❤️</p>
        <p className="text-[11px] text-romance-400/40">Chitkara University (2022–2026) • 1 Aug 2025 • Jai Gauravi Ki</p>
      </footer>
    </main>
  );
}
