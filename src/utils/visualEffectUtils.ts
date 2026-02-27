/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Draws a swirling magical vortex effect within a clipped area
 */
export const drawMagicalVortex = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  time: number
) => {
  ctx.save();
  
  for (let i = 0; i < 3; i++) {
    const angle = time + (i * Math.PI * 2 / 3);
    const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width);
    grad.addColorStop(0, 'rgba(157, 78, 221, 0.8)');
    grad.addColorStop(0.6, 'rgba(75, 0, 130, 0.4)');
    grad.addColorStop(1, 'transparent');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, width, height * 0.8, angle, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Sparkles
  ctx.fillStyle = '#fff';
  for (let i = 0; i < 12; i++) {
    const pTime = time * 2 + i;
    const dist = (pTime % 1) * width * 0.8;
    const pAngle = i * (Math.PI * 2 / 12) + time;
    const px = centerX + Math.cos(pAngle) * dist;
    const py = centerY + Math.sin(pAngle) * dist;
    
    ctx.globalAlpha = 1 - (pTime % 1);
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

/**
 * Draws a pulsing magical rune
 */
export const drawMagicalRune = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
  time: number
) => {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.4 + Math.sin(time) * 0.3;
  
  ctx.beginPath();
  ctx.moveTo(x - size/2, y - size/2);
  ctx.lineTo(x + size/2, y);
  ctx.lineTo(x - size/2, y + size/2);
  ctx.stroke();
  
  ctx.restore();
};
