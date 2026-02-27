/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rabbit } from '../types';
import { drawRabbit } from './rabbitDrawingUtils';

/**
 * Draws a happy, celebrating rabbit
 */
export const drawHappyRabbit = (ctx: CanvasRenderingContext2D, x: number, y: number, rabbit: Rabbit) => {
  ctx.save();
  // Jump animation based on time
  const bounce = Math.sin(Date.now() / 150) * 15;
  const scale = 1.5; // Make it bigger for the ending
  
  ctx.translate(x, y + bounce);
  ctx.scale(scale, scale);
  
  // Draw the rabbit using existing logic but centered
  const tempRabbit = { ...rabbit, x: -rabbit.width / 2, y: -rabbit.height / 2, facingRight: true };
  drawRabbit(ctx, tempRabbit);
  
  // Add extra celebration details like a sparkle
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8 + (Date.now() / 1000);
    const dist = 35 + Math.sin(Date.now() / 200) * 5;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

/**
 * Draws a golden magical trophy
 */
export const drawTrophy = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.save();
  ctx.translate(x, y);
  
  // Floating animation
  const float = Math.sin(Date.now() / 300) * 10;
  ctx.translate(0, float);
  
  // Glow
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#FFD700';
  
  // Base
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(-20, 30, 40, 10);
  
  // Stem
  ctx.fillStyle = '#DAA520';
  ctx.fillRect(-5, 10, 10, 20);
  
  // Cup
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.moveTo(-25, -20);
  ctx.lineTo(25, -20);
  ctx.lineTo(15, 10);
  ctx.lineTo(-15, 10);
  ctx.closePath();
  ctx.fill();
  
  // Handles
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(-25, -5, 10, Math.PI * 0.5, Math.PI * 1.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(25, -5, 10, Math.PI * 1.5, Math.PI * 0.5);
  ctx.stroke();
  
  // Gem
  ctx.fillStyle = '#00FFFF';
  ctx.beginPath();
  ctx.arc(0, -5, 5, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};
