'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { STORY_MILESTONES } from '@/data/relationshipData';
import { Calendar, Sparkles, Heart } from 'lucide-react';

interface OurStoryTimelineProps {
  onSelectPhoto: (src: string, title: string, caption: string) => void;
}

export default function OurStoryTimeline({ onSelectPhoto }: OurStoryTimelineProps) {
  return (
    <section id="story" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-romance-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter One</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
        >
          How We Became Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-romance-200/80 font-light"
        >
          Every love story is special, but ours is written in shared campus hallways, unforgettable first dates, mountain air, and a sacred vow.
        </motion.p>
      </div>

      {/* Timeline spine */}
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-romance-500/40 via-romance-400/20 to-transparent" />
        <div className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-romance-500/40 via-romance-400/20 to-transparent" />

        {/* Milestone Cards */}
        <div className="space-y-12 sm:space-y-16">
          {STORY_MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-romance-900 border-2 border-romance-400 shadow-lg shadow-romance-600/40 flex items-center justify-center z-10">
                  <Heart className="w-3.5 h-3.5 text-romance-200 fill-romance-400" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}
                >
                  <div
                    className={`p-6 rounded-2xl glass-card transition-all duration-300 relative group ${
                      milestone.highlight
                        ? 'border-romance-500/40 shadow-xl shadow-romance-900/40'
                        : 'border-romance-500/15'
                    }`}
                  >
                    {/* Highlight Badge */}
                    {milestone.highlight && (
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-romance-600 text-white text-[11px] font-medium tracking-wide mb-3 shadow-sm ${
                          isEven ? 'md:ml-auto' : ''
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{milestone.tag}</span>
                      </div>
                    )}

                    {/* Date indicator */}
                    <div
                      className={`flex items-center gap-1.5 text-xs text-romance-300 font-mono mb-2 ${
                        isEven ? 'md:justify-end' : 'justify-start'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{milestone.date}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-romance-300 transition-colors">
                      {milestone.title}
                    </h3>

                    <p className="text-sm text-romance-100/80 leading-relaxed font-light mb-4">
                      {milestone.description}
                    </p>

                    {/* Photo attached if present */}
                    {milestone.image && (
                      <div
                        onClick={() =>
                          onSelectPhoto(milestone.image!, milestone.title, milestone.description)
                        }
                        className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden cursor-pointer border border-romance-400/20 group/img shadow-md"
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-3">
                          <span className="text-xs text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-gold-400" /> Click to view full image
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Empty spacer for alignment on desktop */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
