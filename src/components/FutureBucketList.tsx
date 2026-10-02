'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FUTURE_BUCKET_LIST } from '@/data/relationshipData';
import { BucketListItem } from '@/types';
import { Compass, CheckSquare, Square, Sparkles, Heart } from 'lucide-react';

export default function FutureBucketList() {
  const [items, setItems] = useState<BucketListItem[]>(FUTURE_BUCKET_LIST);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            try {
              confetti({
                particleCount: 40,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#f43f5e', '#fbbf24', '#fbcfe8'],
              });
            } catch (e) {
              // fallback
            }
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <section id="future-us" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <Compass className="w-3.5 h-3.5 text-romance-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Eight</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Things We Still Have To Do Together...
        </h2>
        <p className="text-sm text-romance-200/80 font-light">
          Some chapters are already written, but the best ones are waiting right around the corner. Click any item to mark it on our journey!
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-romance-500/30 shadow-2xl relative">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between text-xs font-mono text-romance-300 mb-4">
          <span>Our Journey Checklist</span>
          <span className="text-gold-400 font-bold">
            {completedCount} of {items.length} unlocked
          </span>
        </div>

        <div className="w-full h-2 bg-romance-950 rounded-full overflow-hidden mb-8 border border-romance-500/20">
          <motion.div
            className="h-full bg-gradient-to-r from-romance-500 via-rose-400 to-gold-400 rounded-full"
            animate={{ width: `${(completedCount / items.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* List of items */}
        <div className="space-y-3.5">
          {items.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 select-none ${
                item.completed
                  ? 'bg-romance-950/50 border-romance-500/40 text-romance-100 shadow-md'
                  : 'glass-card border-romance-500/15 hover:border-romance-400/40 text-romance-200/80'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 shrink-0 text-romance-400 hover:text-romance-300 transition-colors"
                aria-label={item.completed ? 'Mark uncompleted' : 'Mark completed'}
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-romance-400 fill-romance-500/20" />
                ) : (
                  <Square className="w-5 h-5 text-romance-300/40" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`text-sm sm:text-base font-medium transition-all ${
                      item.completed ? 'line-through text-romance-300/60' : 'text-white'
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/40 border border-romance-500/20 text-romance-400">
                    {item.category}
                  </span>
                </div>

                {item.memoryNote && (
                  <p className="text-xs text-gold-400 font-mono flex items-center gap-1.5 mt-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.memoryNote}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
