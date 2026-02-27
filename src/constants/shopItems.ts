/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRANSLATIONS } from '../localization';

export interface ShopItem {
  id: string;
  type: 'hat' | 'cape' | 'glasses' | 'staff';
  value: string;
  name: string;
  price: number;
  icon: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'h1', type: 'hat', value: 'wizard', name: TRANSLATIONS.accessoryWizardHat, price: 5, icon: '🎩' },
  { id: 'h2', type: 'hat', value: 'crown', name: TRANSLATIONS.accessoryCrown, price: 15, icon: '👑' },
  { id: 'h3', type: 'hat', value: 'tophat', name: TRANSLATIONS.accessoryTopHat, price: 10, icon: '🎩' },
  { id: 'c1', type: 'cape', value: 'red', name: TRANSLATIONS.accessoryRedCape, price: 8, icon: '🧥' },
  { id: 'c2', type: 'cape', value: 'blue', name: TRANSLATIONS.accessoryBlueCape, price: 8, icon: '🧥' },
  { id: 'c3', type: 'cape', value: 'gold', name: TRANSLATIONS.accessoryGoldCape, price: 20, icon: '🧥' },
  { id: 'g1', type: 'glasses', value: 'heart', name: TRANSLATIONS.accessoryHeartGlasses, price: 12, icon: '👓' },
  { id: 's1', type: 'staff', value: 'magic', name: TRANSLATIONS.accessoryMagicStaff, price: 25, icon: '🪄' },
];
