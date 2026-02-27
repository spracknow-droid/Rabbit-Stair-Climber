/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Quiz, Platform } from '../types';

export const generateQuiz = (currentFloor: number): Quiz => {
  let question = '';
  let answer = 0;
  const b = Math.floor(Math.random() * 9) + 1;

  if (currentFloor <= 5) {
    const a = Math.floor(Math.random() * 9) + 1;
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else if (currentFloor <= 10) {
    const a = Math.floor(Math.random() * 30) + 10;
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else if (currentFloor <= 20) {
    const a = Math.floor(Math.random() * 30) + 40;
    question = `${a} + ${b} = ?`;
    answer = a + b;
  } else {
    const a = Math.floor(Math.random() * 22) + 70;
    question = `${a} + ${b} = ?`;
    answer = a + b;
  }

  return { question, answer };
};

export const createFloorPlatforms = (): Platform[] => {
  const newPlatforms: Platform[] = [
    { x: 0, y: 500, width: 800, height: 100 }, // Ground
  ];

  let lastX = 150;
  let lastY = 450;

  for (let i = 0; i < 5; i++) {
    const width = 80 + Math.random() * 40;
    const x = lastX + 50 + Math.random() * 50;
    const y = lastY - 50;
    newPlatforms.push({ x, y, width, height: 50 });
    lastX = x;
    lastY = y;
  }

  const topX = lastX + 50;
  const topY = lastY - 50;
  newPlatforms.push({ x: topX, y: topY, width: 200, height: 50 });
  
  return newPlatforms;
};
