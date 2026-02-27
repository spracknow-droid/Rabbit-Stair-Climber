/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rabbit, Door } from '../types';
import { TRANSLATIONS } from '../localization';

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

  // Glasses (Always there, he's a smart rabbit)
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

  // Nose
  ctx.fillStyle = '#FF9999';
  ctx.beginPath();
  ctx.arc(0, -3, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export const drawDoor = (ctx: CanvasRenderingContext2D, door: Door, label?: string) => {
  ctx.save();
  
  // Outer Glow for magical feel
  ctx.shadowBlur = 15;
  ctx.shadowColor = door.isOpen ? '#9d4edd' : 'rgba(0,0,0,0.3)';
  
  // Door frame (Stone/Wood mix)
  const frameGrad = ctx.createLinearGradient(door.x, door.y, door.x + door.width, door.y);
  frameGrad.addColorStop(0, '#2d1b0f');
  frameGrad.addColorStop(0.5, '#4d2b1f');
  frameGrad.addColorStop(1, '#2d1b0f');
  ctx.fillStyle = frameGrad;
  ctx.fillRect(door.x - 8, door.y - 8, door.width + 16, door.height + 8);
  
  // Door surface
  const surfaceGrad = ctx.createLinearGradient(door.x, door.y, door.x + door.width, door.y);
  if (door.isOpen) {
    surfaceGrad.addColorStop(0, '#0f0c29');
    surfaceGrad.addColorStop(0.5, '#302b63');
    surfaceGrad.addColorStop(1, '#24243e');
  } else {
    surfaceGrad.addColorStop(0, '#4e342e');
    surfaceGrad.addColorStop(0.5, '#6d4c41');
    surfaceGrad.addColorStop(1, '#4e342e');
  }
  ctx.fillStyle = surfaceGrad;
  ctx.fillRect(door.x, door.y, door.width, door.height);
  
  // Door details
  if (!door.isOpen) {
    // Door handle (Gold)
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(door.x + door.width - 15, door.y + door.height / 2, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Magical runes (Glow)
    ctx.strokeStyle = '#e0aaff';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.5 + Math.sin(Date.now() / 500) * 0.2; // Pulsing runes
    ctx.beginPath();
    ctx.moveTo(door.x + 15, door.y + 20);
    ctx.lineTo(door.x + door.width - 15, door.y + 35);
    ctx.moveTo(door.x + 15, door.y + 50);
    ctx.lineTo(door.x + door.width - 15, door.y + 25);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
  } else {
    // Portal effect when open
    ctx.fillStyle = 'rgba(157, 78, 221, 0.2)';
    ctx.fillRect(door.x, door.y, door.width, door.height);
    
    // Particles inside portal
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 5; i++) {
      const px = door.x + (Math.sin(Date.now() / 200 + i) * 0.5 + 0.5) * door.width;
      const py = door.y + (Math.cos(Date.now() / 300 + i) * 0.5 + 0.5) * door.height;
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
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
