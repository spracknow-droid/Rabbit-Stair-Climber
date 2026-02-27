/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Quiz } from '../types';
import { TRANSLATIONS } from '../localization';

interface QuizOverlayProps {
  quiz: Quiz;
  userAnswer: string;
  setUserAnswer: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isCorrect: boolean;
  rewardGems: number;
}

export const QuizOverlay: React.FC<QuizOverlayProps> = ({ quiz, userAnswer, setUserAnswer, onSubmit, isCorrect, rewardGems }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-indigo-900 p-8 rounded-2xl border-2 border-indigo-400 shadow-[0_0_20px_rgba(168,85,247,0.4)] text-center max-w-xs w-full"
      >
        {!isCorrect ? (
          <>
            <h2 className="text-2xl font-bold text-indigo-100 mb-4">{TRANSLATIONS.magicLock}</h2>
            <p className="text-indigo-300 mb-6">{TRANSLATIONS.solveToOpen}</p>
            <div className="text-4xl font-mono text-white mb-6 tracking-widest">{quiz.question}</div>
            <form onSubmit={onSubmit}>
              <input 
                autoFocus
                type="number" 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full bg-slate-950 border-2 border-indigo-500 rounded-lg px-4 py-2 text-white text-center text-2xl focus:outline-none focus:border-purple-400 mb-4"
                placeholder="?"
              />
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg"
              >
                {TRANSLATIONS.unlock}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-3xl font-bold text-emerald-400 mb-2">{TRANSLATIONS.success}</h2>
            <p className="text-indigo-200 mb-6">{TRANSLATIONS.doorOpens}</p>
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="bg-emerald-900/50 border border-emerald-500/30 px-6 py-3 rounded-xl flex items-center gap-3"
            >
              <span className="text-3xl">💎</span>
              <div className="text-left">
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-tighter">{TRANSLATIONS.reward}</div>
                <div className="text-2xl text-white font-mono font-bold">+{rewardGems} {TRANSLATIONS.gems}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
