/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRANSLATIONS } from '../localization';

export interface MagicAbility {
  level: number;
  name: string;
  description: string;
  icon: string;
}

export const MAGIC_ABILITIES: MagicAbility[] = [
  {
    level: 1,
    name: "기초 마법",
    description: "마법의 성을 오르기 위한 기초 체력을 가집니다.",
    icon: "🪄"
  },
  {
    level: 3,
    name: "이단 점프",
    description: "공중에서 한 번 더 점프할 수 있습니다.",
    icon: "✨"
  },
  {
    level: 5,
    name: "마법 활공",
    description: "공중에서 점프 키를 누르고 있으면 천천히 하강합니다.",
    icon: "🦅"
  },
  {
    level: 8,
    name: "보석 연금술",
    description: "퀴즈 정답 시 획득하는 보석의 양이 증가합니다.",
    icon: "💎"
  },
  {
    level: 12,
    name: "시간의 눈",
    description: "퀴즈의 난이도가 소폭 하락합니다.",
    icon: "👁️"
  }
];

export const getActiveAbilities = (level: number) => {
  return MAGIC_ABILITIES.filter(ability => level >= ability.level);
};

export const getNextAbility = (level: number) => {
  return MAGIC_ABILITIES.find(ability => ability.level > level);
};
