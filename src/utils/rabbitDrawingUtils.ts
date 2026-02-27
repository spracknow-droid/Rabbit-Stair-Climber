/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rabbit } from '../types';

export const drawRabbit = (ctx: CanvasRenderingContext2D, rabbit: Rabbit) => {
  const { x, y, width: w, height: h, facingRight } = rabbit;
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  if (!facingRight) ctx.scale(-1, 1);

  // Ears
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-10, -25, 6, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(10, -25, 6, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Inner Ears
  ctx.fillStyle = '#FFD1DC';
  ctx.beginPath();
  ctx.ellipse(-10, -25, 3, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(10, -25, 3, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Base Body (Always visible)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(0, 10, 15, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wizard Cloak (Body Accessory)
  if (rabbit.accessories.cape) {
    let cloakColor = '#4B0082'; // Default
    if (rabbit.accessories.cape === 'red') cloakColor = '#B22222';
    if (rabbit.accessories.cape === 'blue') cloakColor = '#1E90FF';
    if (rabbit.accessories.cape === 'gold') cloakColor = '#FFD700';

    ctx.fillStyle = cloakColor;
    ctx.beginPath();
    ctx.moveTo(-18, 5);
    ctx.lineTo(18, 5);
    ctx.lineTo(22, 22);
    ctx.lineTo(-22, 22);
    ctx.closePath();
    ctx.fill();
    
    // Cloak trim
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Hands (Paws)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(-15, 12, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(15, 12, 5, 0, Math.PI * 2);
  ctx.fill();

  // Feet
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-10, 18, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(10, 18, 8, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head (Main Body/Face)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(0, -5, 18, 0, Math.PI * 2);
  ctx.fill();

  // Accessories - Hat
  if (rabbit.accessories.hat) {
    let hatColor = '#4B0082';
    if (rabbit.accessories.cape === 'red') hatColor = '#B22222';
    if (rabbit.accessories.cape === 'blue') hatColor = '#1E90FF';
    if (rabbit.accessories.cape === 'gold') hatColor = '#FFD700';

    if (rabbit.accessories.hat === 'wizard') {
      ctx.fillStyle = hatColor;
      ctx.beginPath();
      ctx.moveTo(-18, -18);
      ctx.lineTo(18, -18);
      ctx.lineTo(0, -48);
      ctx.closePath();
      ctx.fill();
      // Star on hat
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(0, -38, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (rabbit.accessories.hat === 'crown') {
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(-14, -18);
      ctx.lineTo(-14, -32);
      ctx.lineTo(-7, -26);
      ctx.lineTo(0, -38);
      ctx.lineTo(7, -26);
      ctx.lineTo(14, -32);
      ctx.lineTo(14, -18);
      ctx.closePath();
      ctx.fill();
      // Jewels on crown
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(0, -25, 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (rabbit.accessories.hat === 'tophat') {
      ctx.fillStyle = '#222222';
      ctx.fillRect(-18, -20, 36, 4); // Brim
      ctx.fillRect(-12, -40, 24, 20); // Top
      // Red band
      ctx.fillStyle = '#B22222';
      ctx.fillRect(-12, -24, 24, 4);
    }
  }
  
  // Face details
  // Eyes
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(-7, -8, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(7, -8, 2, 0, Math.PI * 2);
  ctx.fill();

  // Base Glasses (Only if no special glasses equipped)
  if (!rabbit.accessories.glasses) {
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(-7, -8, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(7, -8, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-1, -8);
    ctx.lineTo(1, -8);
    ctx.stroke();
  } else if (rabbit.accessories.glasses === 'heart') {
    // Heart Glasses (Shrunk and centered)
    ctx.strokeStyle = '#FF69B4';
    ctx.lineWidth = 1.5;
    
    const drawHeart = (hx: number, hy: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.bezierCurveTo(hx, hy - size, hx + size, hy - size, hx + size, hy);
      ctx.bezierCurveTo(hx + size, hy + size, hx, hy + size * 1.5, hx, hy + size * 2);
      ctx.bezierCurveTo(hx, hy + size * 1.5, hx - size, hy + size, hx - size, hy);
      ctx.bezierCurveTo(hx - size, hy - size, hx, hy - size, hx, hy);
      ctx.stroke();
    };

    // Left heart
    drawHeart(-7, -11, 4);
    // Right heart
    drawHeart(7, -11, 4);
    
    // Bridge
    ctx.beginPath();
    ctx.moveTo(-3, -9);
    ctx.lineTo(3, -9);
    ctx.stroke();
  }

  // Nose
  ctx.fillStyle = '#FF9999';
  ctx.beginPath();
  ctx.arc(0, -3, 2, 0, Math.PI * 2);
  ctx.fill();

  // Magic Staff
  if (rabbit.accessories.staff === 'magic') {
    ctx.save();
    ctx.translate(20, 15);
    ctx.rotate(Math.PI / 4);
    // Staff body
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(-2, -25, 4, 40);
    // Gem on top
    ctx.fillStyle = '#00FFFF';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00FFFF';
    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.lineTo(8, -25);
    ctx.lineTo(0, -15);
    ctx.lineTo(-8, -25);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
};
