/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../localization';

interface ShopItem {
  id: string;
  type: 'hat' | 'cape';
  value: string;
  name: string;
  price: number;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 'h1', type: 'hat', value: 'wizard', name: TRANSLATIONS.accessoryWizardHat, price: 5 },
  { id: 'h2', type: 'hat', value: 'crown', name: TRANSLATIONS.accessoryCrown, price: 15 },
  { id: 'h3', type: 'hat', value: 'tophat', name: TRANSLATIONS.accessoryTopHat, price: 10 },
  { id: 'c1', type: 'cape', value: 'red', name: TRANSLATIONS.accessoryRedCape, price: 8 },
  { id: 'c2', type: 'cape', value: 'blue', name: TRANSLATIONS.accessoryBlueCape, price: 8 },
  { id: 'c3', type: 'cape', value: 'gold', name: TRANSLATIONS.accessoryGoldCape, price: 20 },
];

interface ShopOverlayProps {
  gems: number;
  ownedItems: string[];
  equippedHat?: string;
  equippedCape?: string;
  onBuy: (item: ShopItem) => void;
  onEquip: (item: ShopItem) => void;
  onClose: () => void;
}

export const ShopOverlay: React.FC<ShopOverlayProps> = ({
  gems,
  ownedItems,
  equippedHat,
  equippedCape,
  onBuy,
  onEquip,
  onClose,
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-md z-40 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-indigo-950 border-2 border-indigo-500 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90%] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-indigo-500/30 flex justify-between items-center bg-indigo-900/30">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">🏪</span> {TRANSLATIONS.shop}
            </h2>
            <p className="text-indigo-300 text-sm">{TRANSLATIONS.shopWelcome}</p>
          </div>
          <div className="bg-emerald-900/50 border border-emerald-500/30 px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="text-xl">💎</span>
            <span className="text-emerald-100 font-mono font-bold text-xl">{gems}</span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SHOP_ITEMS.map((item) => {
            const isOwned = ownedItems.includes(item.id);
            const isEquipped = (item.type === 'hat' && equippedHat === item.value) || 
                               (item.type === 'cape' && equippedCape === item.value);

            return (
              <div 
                key={item.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  isEquipped 
                    ? 'bg-indigo-600/20 border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.2)]' 
                    : 'bg-slate-900/50 border-indigo-500/20 hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-900/50 rounded-xl flex items-center justify-center text-2xl">
                    {item.type === 'hat' ? '🎩' : '🧥'}
                  </div>
                  <div>
                    <div className="text-white font-bold">{item.name}</div>
                    {!isOwned && (
                      <div className="text-emerald-400 font-mono text-sm flex items-center gap-1">
                        <span>💎</span> {item.price}
                      </div>
                    )}
                  </div>
                </div>

                {isOwned ? (
                  <button
                    onClick={() => onEquip(item)}
                    disabled={isEquipped}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                      isEquipped 
                        ? 'bg-indigo-400/20 text-indigo-300 cursor-default' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {isEquipped ? TRANSLATIONS.equipped : '장착'}
                  </button>
                ) : (
                  <button
                    onClick={() => onBuy(item)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                      gems >= item.price
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {TRANSLATIONS.buy}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-indigo-500/30 flex justify-center bg-indigo-900/30">
          <button 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-12 py-3 rounded-xl transition-all shadow-lg"
          >
            {TRANSLATIONS.close}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
