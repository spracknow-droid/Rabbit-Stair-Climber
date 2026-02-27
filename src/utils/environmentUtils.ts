/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Platform } from '../types';

export const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, floor: number) => {
  // Dynamic gradient based on floor (gets darker/more magical as you climb)
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  
  // Base colors shift slightly every 10 floors
  const hueShift = Math.min(floor * 2, 60); 
  gradient.addColorStop(0, `hsl(${240 + hueShift}, 30%, 10%)`);
  gradient.addColorStop(1, `hsl(${230 + hueShift}, 40%, 15%)`);
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Draw layered stars for parallax-like depth
  const drawStarLayer = (count: number, speedMult: number, sizeMult: number, alpha: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = alpha;
    for (let i = 0; i < count; i++) {
      // Use floor to shift stars slightly for a sense of movement
      const seed = i * 137.5;
      const x = ((seed % 1) * width);
      const y = (((seed * 1.5 + floor * speedMult) % 1) * height);
      const size = (seed % 0.5 + 0.5) * sizeMult;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  drawStarLayer(40, 0.2, 1, 0.3); // Far stars
  drawStarLayer(20, 0.5, 2, 0.6); // Mid stars
  
  // Draw distant castle silhouettes or magical clouds
  ctx.fillStyle = '#0f0f1a';
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(100, height - 50);
  ctx.lineTo(200, height - 120);
  ctx.lineTo(300, height - 60);
  ctx.lineTo(450, height - 150);
  ctx.lineTo(600, height - 80);
  ctx.lineTo(width, height - 130);
  ctx.lineTo(width, height);
  ctx.fill();

  ctx.globalAlpha = 1.0;
};

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
