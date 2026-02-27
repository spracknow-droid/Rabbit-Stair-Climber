/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../../localization';
import { Rabbit } from '../../types';
import { drawHappyRabbit, drawTrophy } from '../../utils/endingDrawingUtils';
import { ConfettiEffect } from './ConfettiEffect';

interface EndingOverlayProps {
  rabbit: Rabbit;
  onRestart: () => void;
}

export const EndingOverlay: React.FC<EndingOverlayProps> = ({ rabbit, onRestart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Trophy in the middle
      drawTrophy(ctx, canvas.width / 2, canvas.height / 2 - 50);
      
      // Draw Happy Rabbit next to it
      drawHappyRabbit(ctx, canvas.width / 2, canvas.height / 2 + 100, rabbit);
      
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [rabbit]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/95 z-40 overflow-hidden">
      <ConfettiEffect />
      
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="absolute inset-0 pointer-events-none z-20"
      />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-30 text-center flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8"
        >
          <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)] uppercase tracking-tighter italic">
            {TRANSLATIONS.congratulations}
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-indigo-200 text-2xl mb-12 max-w-md font-medium leading-tight"
        >
          {TRANSLATIONS.winDesc}
          <br />
          <span className="text-sm text-indigo-400 mt-2 block">전설적인 마법사 토끼가 탄생했습니다!</span>
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-12 py-5 rounded-2xl text-2xl shadow-2xl transition-all border-2 border-white/20"
        >
          {TRANSLATIONS.playAgain}
        </motion.button>
      </motion.div>
    </div>
  );
};
