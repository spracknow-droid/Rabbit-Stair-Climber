/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Door } from '../types';
import { drawMagicalVortex, drawMagicalRune } from './visualEffectUtils';

export const drawDoor = (ctx: CanvasRenderingContext2D, door: Door, label?: string) => {
  ctx.save();
  
  // Outer Glow for magical feel
  ctx.shadowBlur = 15;
  ctx.shadowColor = door.isOpen ? '#9d4edd' : 'rgba(0,0,0,0.3)';
  
  // Door frame (Stone/Wood mix)
  const frameGrad = ctx.createLinearGradient(door.x, door.y, door.x + door.width, door.y);
  frameGrad.addColorStop(0, '#1a1a1a');
  frameGrad.addColorStop(0.5, '#4a4a4a');
  frameGrad.addColorStop(1, '#1a1a1a');
  ctx.fillStyle = frameGrad;
  
  // Ornate top for the frame
  ctx.beginPath();
  ctx.moveTo(door.x - 12, door.y);
  ctx.lineTo(door.x + door.width + 12, door.y);
  ctx.lineTo(door.x + door.width / 2, door.y - 25);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillRect(door.x - 10, door.y - 5, door.width + 20, door.height + 5);

  // Door threshold (Bottom step)
  ctx.fillStyle = '#333333';
  ctx.fillRect(door.x - 15, door.y + door.height, door.width + 30, 8);
  
  // Door surface
  const surfaceGrad = ctx.createLinearGradient(door.x, door.y, door.x + door.width, door.y);
  if (door.isOpen) {
    surfaceGrad.addColorStop(0, '#000000');
    surfaceGrad.addColorStop(0.5, '#1a0033');
    surfaceGrad.addColorStop(1, '#000000');
  } else {
    surfaceGrad.addColorStop(0, '#3e2723');
    surfaceGrad.addColorStop(0.5, '#5d4037');
    surfaceGrad.addColorStop(1, '#3e2723');
  }
  ctx.fillStyle = surfaceGrad;
  ctx.fillRect(door.x, door.y, door.width, door.height);
  
  // Door details
  if (!door.isOpen) {
    // Ornate panels
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(door.x + 10, door.y + 10, door.width - 20, door.height / 2 - 15);
    ctx.strokeRect(door.x + 10, door.y + door.height / 2 + 5, door.width - 20, door.height / 2 - 15);

    // Door handle (Gold)
    ctx.fillStyle = '#ffd700';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#ffd700';
    ctx.beginPath();
    ctx.arc(door.x + door.width - 15, door.y + door.height / 2, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Magical runes (Glow) - Using the new visualEffectUtils
    const runeTime = Date.now() / 400;
    drawMagicalRune(ctx, door.x + door.width / 2, door.y + 25, 10, '#e0aaff', runeTime);
    drawMagicalRune(ctx, door.x + door.width / 2, door.y + 65, 10, '#e0aaff', runeTime + 1);
  } else {
    // Portal effect when open (Swirling vortex) - Using the new visualEffectUtils
    const centerX = door.x + door.width / 2;
    const centerY = door.y + door.height / 2;
    const time = Date.now() / 500;
    
    ctx.save();
    ctx.beginPath();
    ctx.rect(door.x, door.y, door.width, door.height);
    ctx.clip();
    
    drawMagicalVortex(ctx, centerX, centerY, door.width, door.height, time);
    
    ctx.restore();
  }

  if (label) {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'black';
    ctx.fillText(label, door.x + door.width / 2, door.y - 15);
  }
  ctx.restore();
};
