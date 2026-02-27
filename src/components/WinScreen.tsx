/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../localization';

export const WinScreen: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/90 z-30">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="text-8xl mb-6">👑</div>
        <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter">{TRANSLATIONS.congratulations}</h2>
        <p className="text-indigo-200 text-xl mb-8">{TRANSLATIONS.winDesc}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-4 rounded-full text-2xl shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all transform hover:scale-105"
        >
          {TRANSLATIONS.playAgain}
        </button>
      </motion.div>
    </div>
  );
};
