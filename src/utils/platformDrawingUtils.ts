/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Platform } from '../types';

export const drawPlatform = (ctx: CanvasRenderingContext2D, platform: Platform) => {
  const { x, y, width, height } = platform;
  
  ctx.save();
  
  // Main stone body with gradient
  const stoneGrad = ctx.createLinearGradient(x, y, x, y + height);
  stoneGrad.addColorStop(0, '#5a5a7a');
  stoneGrad.addColorStop(1, '#3a3a5a');
  ctx.fillStyle = stoneGrad;
  
  // Rounded corners for a more "crafted" feel
  const radius = 8;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();

  // Highlight on top edge
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Brick pattern
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.lineWidth = 1;
  const brickW = 30;
  for (let bx = x + brickW; bx < x + width; bx += brickW) {
    ctx.beginPath();
    ctx.moveTo(bx, y);
    ctx.lineTo(bx, y + height);
    ctx.stroke();
  }

  // Magical glowing surface
  const glowGrad = ctx.createLinearGradient(x, y, x, y + 6);
  glowGrad.addColorStop(0, '#b794f4'); // Light purple
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(x, y, width, 6);

  // Decorative gold line
  ctx.fillStyle = '#ecc94b'; // Gold
  ctx.fillRect(x, y + 6, width, 1.5);

  // Subtle shadow below
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 5;
  
  ctx.restore();
};
