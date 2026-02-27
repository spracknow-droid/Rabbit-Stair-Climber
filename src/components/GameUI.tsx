/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

import { TRANSLATIONS } from '../localization';
import { MAGIC_ABILITIES } from '../utils/magicUtils';

interface GameUIProps {
  floor: number;
  gems: number;
  magicLevel: number;
}

export const GameUI: React.FC<GameUIProps> = ({ floor, gems, magicLevel }) => {
  const currentAbility = [...MAGIC_ABILITIES].reverse().find(a => magicLevel >= a.level);

  return (
    <div className="flex justify-between items-start mb-6 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-indigo-100 tracking-tight">{TRANSLATIONS.title}</h1>
        <p className="text-indigo-300 italic text-sm">{TRANSLATIONS.subtitle}</p>
        {currentAbility && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg">{currentAbility.icon}</span>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">{currentAbility.name}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-4">
        {/* Magic Level */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{TRANSLATIONS.magicLevel}</span>
          <div className="bg-purple-900/50 border border-purple-500/30 px-4 py-1 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-100 font-mono font-bold">LV.{magicLevel}</span>
          </div>
        </div>

        {/* Gems */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">{TRANSLATIONS.gems}</span>
          <motion.div 
            key={gems}
            initial={{ scale: 1.2, color: '#10b981' }}
            animate={{ scale: 1, color: '#ecfdf5' }}
            className="bg-emerald-900/50 border border-emerald-500/30 px-4 py-1 rounded-lg flex items-center gap-2"
          >
            <span className="text-xl">💎</span>
            <span className="text-emerald-100 font-mono font-bold">{gems}</span>
          </motion.div>
        </div>

        {/* Floor */}
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{TRANSLATIONS.current}</span>
          <div className="bg-indigo-600 text-white px-6 py-1 rounded-lg font-mono text-xl shadow-[0_0_15px_rgba(79,70,229,0.5)] border border-indigo-400">
            {floor}{TRANSLATIONS.floor}
          </div>
        </div>
      </div>
    </div>
  );
};
