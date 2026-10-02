'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BOYFRIEND_QUIZ } from '@/data/relationshipData';
import { HelpCircle, CheckCircle2, XCircle, Trophy, Sparkles, RotateCcw, ArrowRight } from 'lucide-react';

export default function BoyfriendQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = BOYFRIEND_QUIZ[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < BOYFRIEND_QUIZ.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      // Trigger festive celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fbbf24', '#fda4af', '#ffffff'],
        });
      } catch (e) {
        // graceful fallback if canvas-confetti fails in SSR
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <section id="quiz" className="relative py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-950/80 border border-romance-500/20 text-xs text-romance-300 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-gold-400" />
          <span className="uppercase tracking-widest font-mono text-[10px]">Chapter Six</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          How Well Do You Know Your Girlfriend? 👀
        </h2>
        <p className="text-sm text-romance-200/80 font-light">
          A high-stakes relationship aptitude test for Rishi. One question at a time. No cheating allowed!
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-romance-500/30 shadow-2xl relative overflow-hidden">
        {!isFinished ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-romance-300 mb-3">
              <span>Question {currentIndex + 1} of {BOYFRIEND_QUIZ.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full h-2 bg-romance-950/80 rounded-full overflow-hidden mb-8 border border-romance-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-romance-500 to-rose-400 rounded-full"
                animate={{ width: `${((currentIndex + 1) / BOYFRIEND_QUIZ.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Multiple choice options */}
                <div className="space-y-3 mb-6">
                  {currentQ.options.map((option, idx) => {
                    let btnStyle = 'glass-card border-romance-500/20 hover:border-romance-400 text-romance-100 hover:text-white';

                    if (isAnswered) {
                      if (idx === currentQ.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30';
                      } else if (idx === selectedOption) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md shadow-rose-900/30';
                      } else {
                        btnStyle = 'opacity-40 border-transparent text-white/50';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-2xl text-left text-sm sm:text-base font-medium transition-all duration-200 border flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && idx === currentQ.correctIndex && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Banner */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl border mb-6 ${
                      selectedOption === currentQ.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {selectedOption === currentQ.correctIndex
                        ? currentQ.correctMessage
                        : currentQ.incorrectMessage}
                    </p>
                    <p className="text-xs text-white/70 font-light">
                      💡 {currentQ.funFact}
                    </p>
                  </motion.div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                  >
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 rounded-full bg-romance-600 hover:bg-romance-500 text-white font-medium text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-romance-900/40"
                    >
                      <span>
                        {currentIndex + 1 === BOYFRIEND_QUIZ.length ? 'See Final Score 🏆' : 'Next Question'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Final Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-romance-600 to-amber-500 mx-auto flex items-center justify-center shadow-xl shadow-romance-600/30 mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-xs font-mono text-gold-300 uppercase tracking-widest mb-3">
              Official Assessment Result
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-2">
              Your Boyfriend Score: {score} / {BOYFRIEND_QUIZ.length}
            </h3>

            <p className="text-sm sm:text-base text-romance-200/90 font-light max-w-md mx-auto mb-8">
              {score >= 5
                ? "ASTOUNDING! You actually know every single detail of our world. You are hereby awarded the title of Boyfriend of the Millennium! ❤️"
                : "Not bad, mister! But you might want to review the 21 August voice oath before you lose that mustache! 😉"}
            </p>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel border border-romance-500/30 text-sm text-romance-200 hover:text-white hover:border-romance-400 transition-all hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
