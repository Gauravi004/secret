'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PERFORMANCE_REVIEW_METRICS, PERSONAL_DETAILS } from '@/data/relationshipData';
import { Award, Briefcase, Star, CheckCircle, ShieldCheck, FileCheck } from 'lucide-react';

export default function PerformanceReview() {
  return (
    <section id="review" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <Briefcase className="w-3.5 h-3.5 text-romance-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Seven</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Annual Boyfriend Performance Review
        </h2>
        <p className="text-sm text-romance-200/80 font-light">
          Strictly confidential corporate evaluation conducted by CEO Gauravi Ojhha.
        </p>
      </div>

      {/* Corporate Evaluation Dossier */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-romance-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#1a0e1c]/90 to-[#0e0710]/95 font-sans">
        {/* Dossier Header Info */}
        <div className="border-b border-romance-500/20 pb-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-black/40 border border-romance-500/20">
            <span className="text-romance-400/80 block uppercase tracking-wider text-[10px] mb-1">
              Employee Name
            </span>
            <span className="text-sm font-bold text-white">
              {PERSONAL_DETAILS.boyfriendName}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-romance-500/20">
            <span className="text-romance-400/80 block uppercase tracking-wider text-[10px] mb-1">
              Designation
            </span>
            <span className="text-sm font-bold text-gold-300">
              Chief Boyfriending Officer
            </span>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-romance-500/20">
            <span className="text-romance-400/80 block uppercase tracking-wider text-[10px] mb-1">
              Department
            </span>
            <span className="text-sm font-bold text-romance-300">
              Gauravi's Heart ❤️
            </span>
          </div>
        </div>

        {/* Evaluation Metrics */}
        <div className="space-y-4 mb-10">
          <h4 className="text-xs uppercase font-mono tracking-widest text-gold-400/90 mb-4 flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            <span>Key Performance Indicators (KPIs)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERFORMANCE_REVIEW_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-4 border border-romance-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-white">
                      {metric.kpi}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-xs text-romance-200/80 font-light mb-3">
                    {metric.comment}
                  </p>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 text-gold-400">
                  {[...Array(metric.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-gold-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Verdict & Big Stamp */}
        <div className="relative p-6 rounded-2xl bg-black/50 border border-romance-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-romance-300">
              Executive Board Finding:
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Contract Renewed Indefinitely.
            </h3>
            <p className="text-xs text-romance-200/80 max-w-md font-light">
              Under Section 4.2 of the 21 August Chitkara Accord, employee has demonstrated supreme affection, loyalty, and humor. Resignation is strictly prohibited.
            </p>
          </div>

          {/* Red Official Stamp */}
          <motion.div
            initial={{ scale: 2, rotate: -25, opacity: 0 }}
            whileInView={{ scale: 1, rotate: -12, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
            className="shrink-0 px-6 py-3 rounded-2xl border-4 border-rose-500 text-rose-400 font-mono font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-950/80 bg-rose-950/40 select-none text-center"
          >
            APPROVED 100%
            <span className="block text-[9px] tracking-normal font-sans opacity-80">
              Valid Forever
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
