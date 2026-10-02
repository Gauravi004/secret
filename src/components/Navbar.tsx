'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Menu, X, Music, VolumeX, Sparkles } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function Navbar({ isPlaying, onTogglePlay }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('welcome');

  const navLinks = [
    { name: 'Welcome', href: '#welcome' },
    { name: 'Our Story', href: '#story' },
    { name: 'Memories', href: '#memories' },
    { name: '10 Things', href: '#ten-things' },
    { name: 'Inside Jokes', href: '#inside-jokes' },
    { name: 'Soundtrack', href: '#soundtrack' },
    { name: 'Quiz', href: '#quiz' },
    { name: 'Review', href: '#review' },
    { name: 'Future Us', href: '#future-us' },
    { name: 'Surprise', href: '#surprise' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active section
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-black/60 backdrop-blur-md border-b border-romance-900/30 shadow-lg shadow-black/40'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#welcome"
          className="flex items-center gap-2 group text-romance-200 hover:text-white transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-romance-600/20 border border-romance-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Heart className="w-4 h-4 text-romance-400 fill-romance-500/30" />
          </span>
          <span className="font-serif tracking-wider font-medium text-sm sm:text-base">
            Rishi & Gauravi
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-romance-500/20 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-romance-600 text-white font-medium shadow-md shadow-romance-900/50'
                    : 'text-romance-200/80 hover:text-white hover:bg-romance-900/40'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Audio Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-romance-500/30 text-xs text-romance-200 hover:text-white hover:border-romance-400 transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Music className="w-3.5 h-3.5 text-romance-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="hidden sm:inline font-mono text-[11px] text-romance-300">Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-romance-300/60" />
                <span className="hidden sm:inline font-mono text-[11px] text-romance-300/60">Music</span>
              </>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-xl glass-panel border border-romance-500/30 text-romance-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-16 glass-panel rounded-2xl p-4 border border-romance-500/30 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs px-3 py-2.5 rounded-xl transition-all ${
                  activeSection === link.href.substring(1)
                    ? 'bg-romance-600 text-white font-medium'
                    : 'text-romance-200/80 hover:bg-romance-900/30 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
