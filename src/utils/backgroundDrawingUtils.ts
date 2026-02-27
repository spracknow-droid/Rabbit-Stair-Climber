/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  
  // Magical Aurora (Floor 20+)
  if (floor >= 20) {
    const auroraAlpha = Math.min((floor - 20) * 0.02, 0.3);
    ctx.save();
    ctx.globalAlpha = auroraAlpha;
    for (let i = 0; i < 3; i++) {
      const time = Date.now() / 2000 + i;
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, i % 2 === 0 ? '#4ade80' : '#a855f7');
      grad.addColorStop(1, 'transparent');
      
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.2 + i * 50);
      for (let x = 0; x <= width; x += 20) {
        const y = height * 0.2 + i * 50 + Math.sin(x * 0.01 + time) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height * 0.5);
      ctx.lineTo(0, height * 0.5);
      ctx.fill();
    }
    ctx.restore();
  }

  // Floating Magical Crystals (Floor 35+)
  if (floor >= 35) {
    ctx.save();
    for (let i = 0; i < 5; i++) {
      const seed = i * 555.5;
      const tx = ((seed % 1) * width);
      const ty = (((seed * 0.7 + floor * 0.1) % 1) * (height * 0.6));
      const size = 15 + (seed % 10);
      const angle = (Date.now() / 1000) + seed;
      
      ctx.translate(tx, ty);
      ctx.rotate(angle);
      ctx.fillStyle = '#00ffff';
      ctx.globalAlpha = 0.2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00ffff';
      
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.6, 0);
      ctx.lineTo(0, size);
      ctx.lineTo(-size * 0.6, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset for next crystal
    }
    ctx.restore();
  }

  // Floating Islands (Floor 45+)
  if (floor >= 45) {
    ctx.save();
    ctx.fillStyle = '#1a1a2e';
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 2; i++) {
      const seed = i * 888.8;
      const tx = ((seed % 1) * width);
      const ty = height * 0.15 + i * 100;
      const iWidth = 120;
      const iHeight = 40;
      
      ctx.beginPath();
      ctx.ellipse(tx, ty, iWidth, iHeight, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Island bottom (Jagged)
      ctx.beginPath();
      ctx.moveTo(tx - iWidth, ty);
      ctx.lineTo(tx - iWidth * 0.5, ty + iHeight * 1.5);
      ctx.lineTo(tx, ty + iHeight * 2);
      ctx.lineTo(tx + iWidth * 0.5, ty + iHeight * 1.5);
      ctx.lineTo(tx + iWidth, ty);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // Distant castle silhouettes or magical clouds
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
