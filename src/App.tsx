/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GameState } from './types';
import { GRAVITY, JUMP_FORCE, SPEED, CANVAS_WIDTH, CANVAS_HEIGHT, MAX_FLOOR, INITIAL_PLATFORMS } from './constants';
import { generateQuiz, createFloorPlatforms } from './utils/gameUtils';
import { getCarrotRewardForFloor, calculateQuizGemReward } from './utils/rewardUtils';
import { drawRabbit } from './utils/rabbitDrawingUtils';
import { drawDoor } from './utils/propDrawingUtils';
import { drawBackground } from './utils/backgroundDrawingUtils';
import { drawPlatform } from './utils/platformDrawingUtils';
import { updatePhysics } from './utils/physicsUtils';
import { QuizOverlay } from './components/QuizOverlay';
import { EndingOverlay } from './components/Ending/EndingOverlay';
import { GameUI } from './components/GameUI';
import { ShopOverlay } from './components/ShopOverlay';
import { TRANSLATIONS } from './localization';
import { getNextAbility } from './utils/magicUtils';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [floor, setFloor] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [quiz, setQuiz] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won'>('playing');
  const [isCorrect, setIsCorrect] = useState(false);
  const [rewardGems, setRewardGems] = useState(0);
  const [gems, setGems] = useState(0);
  const [rewardCarrots, setRewardCarrots] = useState(0);
  const [carrots, setCarrots] = useState(0);
  const [magicLevel, setMagicLevel] = useState(1);
  const [ownedItems, setOwnedItems] = useState<string[]>([]);
  const [equippedHat, setEquippedHat] = useState<string | undefined>(undefined);
  const [equippedCape, setEquippedCape] = useState<string | undefined>(undefined);
  const [equippedGlasses, setEquippedGlasses] = useState<string | undefined>(undefined);
  const [equippedStaff, setEquippedStaff] = useState<string | undefined>(undefined);
  const nextAbility = getNextAbility(magicLevel);
  
  const gameState = useRef<GameState>({
    paused: false,
    gems: 0,
    carrots: 0,
    magicLevel: 1,
    rabbit: {
      x: 100,
      y: 450,
      vx: 0,
      vy: 0,
      width: 40,
      height: 40,
      isGrounded: false,
      facingRight: true,
      jumpCount: 0,
      accessories: {},
    },
    keys: {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      Space: false,
    },
    startDoor: {
      x: 50,
      y: 420,
      width: 60,
      height: 80,
      isOpen: true,
    },
    door: {
      x: 650,
      y: 170,
      width: 60,
      height: 80,
      isOpen: false,
    },
    platforms: [...INITIAL_PLATFORMS],
  });

  // Sync React state to Ref for rendering
  useEffect(() => {
    gameState.current.rabbit.accessories = { 
      hat: equippedHat as any, 
      cape: equippedCape as any,
      glasses: equippedGlasses as any,
      staff: equippedStaff as any
    };
  }, [equippedHat, equippedCape, equippedGlasses, equippedStaff]);

  // ensure gameState ref is aware of the current numeric stats that affect
  // physics or other logic. previously magicLevel never propagated into the
  // ref, so abilities like double‑jump/flight never activated despite the UI
  // showing the level increasing.
  useEffect(() => {
    gameState.current.magicLevel = magicLevel;
  }, [magicLevel]);

  useEffect(() => {
    gameState.current.gems = gems;
  }, [gems]);

  useEffect(() => {
    gameState.current.carrots = carrots;
  }, [carrots]);

  // when a carrot bonus is awarded we reset it after a short delay so the
  // little popup disappears automatically.
  useEffect(() => {
    if (rewardCarrots > 0) {
      const t = setTimeout(() => setRewardCarrots(0), 2000);
      return () => clearTimeout(t);
    }
  }, [rewardCarrots]);

  const handleNextFloor = () => {
    if (floor >= MAX_FLOOR) {
      setGameStatus('won');
      return;
    }

    // compute the floor we're about to enter and apply any milestone rewards
    const nextFloor = floor + 1;
    const carrotBonus = getCarrotRewardForFloor(nextFloor);
    if (carrotBonus > 0) {
      setRewardCarrots(carrotBonus);
      setCarrots(prev => prev + carrotBonus);
    }

    const { rabbit, door, startDoor, platforms } = gameState.current;
    
    startDoor.x = 50;
    startDoor.y = 420;
    startDoor.isOpen = true;

    rabbit.x = 100;
    rabbit.y = 450;
    rabbit.vx = 0;
    rabbit.vy = 0;

    const newPlatforms = createFloorPlatforms();
    platforms.length = 0;
    platforms.push(...newPlatforms);

    const topPlatform = newPlatforms[newPlatforms.length - 1];
    door.x = topPlatform.x + 70;
    door.y = topPlatform.y - 80;
    door.isOpen = false;

    // Shop door appears from floor 10
    if (nextFloor >= 10) {
      gameState.current.shopDoor = {
        x: 700,
        y: 420,
        width: 60,
        height: 80,
        isOpen: true,
      };
    } else {
      delete gameState.current.shopDoor;
    }

    setFloor(nextFloor);
    setIsCorrect(false);
    setShowQuiz(false);
    gameState.current.paused = false;
  };

  const handleBuyItem = (item: any) => {
    if (gems >= item.price) {
      setGems(prev => prev - item.price);
      setOwnedItems(prev => [...prev, item.id]);
    }
  };

  const handleEquipItem = (item: any) => {
    if (item.type === 'hat') setEquippedHat(item.value);
    if (item.type === 'cape') setEquippedCape(item.value);
    if (item.type === 'glasses') setEquippedGlasses(item.value);
    if (item.type === 'staff') setEquippedStaff(item.value);
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === quiz.answer) {
      let earned = Math.floor(Math.random() * 3) + 1;
      
      // Gem Multiplier (Level 8+)
      if (magicLevel >= 8) {
        earned += 2; // Bonus gems for high magic level
      }

      setRewardGems(earned);
      setIsCorrect(true);
      
      const newGems = gems + earned;
      setGems(newGems);
      
      const newLevel = Math.floor(newGems / 10) + 1;
      if (newLevel > magicLevel) {
        setMagicLevel(newLevel);
      }

      gameState.current.door.isOpen = true;
      setTimeout(() => {
        handleNextFloor();
      }, 2000);
    } else {
      setUserAnswer('');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleKeyDown = (e: KeyboardEvent) => {
      const k = e.key;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(k)) {
        e.preventDefault();
      }
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') gameState.current.keys.ArrowLeft = true;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') gameState.current.keys.ArrowRight = true;
      if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === ' ') gameState.current.keys.ArrowUp = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') gameState.current.keys.ArrowLeft = false;
      if (k === 'ArrowRight' || k === 'd' || k === 'D') gameState.current.keys.ArrowRight = false;
      if (k === 'ArrowUp' || k === 'w' || k === 'W' || k === ' ') gameState.current.keys.ArrowUp = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const render = () => {
      if (!gameState.current.paused) {
        updatePhysics(
          gameState.current, 
          CANVAS_WIDTH, 
          CANVAS_HEIGHT, 
          () => {
            gameState.current.paused = true;
            const newQuiz = generateQuiz(floor);
            setQuiz(newQuiz);
            setUserAnswer('');
            setShowQuiz(true);
          },
          () => {
            gameState.current.paused = true;
            setShowShop(true);
          }
        );
      }

      drawBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, floor);
      for (const platform of gameState.current.platforms) {
        drawPlatform(ctx, platform);
      }
      
      drawDoor(ctx, gameState.current.startDoor, TRANSLATIONS.start);
      drawDoor(ctx, gameState.current.door, TRANSLATIONS.goal);
      
      if (gameState.current.shopDoor) {
        drawDoor(ctx, gameState.current.shopDoor, TRANSLATIONS.shop);
      }
      
      drawRabbit(ctx, gameState.current.rabbit);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [floor, gems, magicLevel, equippedHat, equippedCape, equippedGlasses, equippedStaff]);

  return (
    <div className="min-h-screen bg-indigo-950 flex flex-col items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 p-8 rounded-3xl shadow-2xl border border-indigo-500/30 max-w-4xl w-full"
      >
        <GameUI floor={floor} gems={gems} carrots={carrots} magicLevel={magicLevel} />

        <div className="relative rounded-2xl overflow-hidden border-4 border-indigo-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-slate-950">
          <canvas 
            ref={canvasRef} 
            width={CANVAS_WIDTH} 
            height={CANVAS_HEIGHT} 
            className="w-full h-auto block"
          />

          {showQuiz && (
            <QuizOverlay
              quiz={quiz}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              onSubmit={handleQuizSubmit}
              isCorrect={isCorrect}
              rewardGems={rewardGems}
            />
          )}

          {rewardCarrots > 0 && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold z-50">
              🥕 +{rewardCarrots} {TRANSLATIONS.carrots}
            </div>
          )}

          {showShop && (
            <ShopOverlay 
              gems={gems}
              carrots={carrots}
              ownedItems={ownedItems}
              equippedHat={equippedHat}
              equippedCape={equippedCape}
              equippedGlasses={equippedGlasses}
              equippedStaff={equippedStaff}
              onBuy={handleBuyItem}
              onEquip={handleEquipItem}
              onClose={() => {
                setShowShop(false);
                gameState.current.paused = false;
                // Move rabbit away from shop door to prevent immediate re-trigger
                gameState.current.rabbit.x -= 50;
              }}
            />
          )}

          {gameStatus === 'won' && (
            <EndingOverlay 
              rabbit={gameState.current.rabbit} 
              onRestart={() => window.location.reload()} 
            />
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-800/50 rounded-xl border border-indigo-500/20">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">{TRANSLATIONS.controls}</h3>
            <ul className="text-sm text-indigo-200 space-y-1">
              <li><span className="font-mono bg-indigo-900/50 px-1 rounded">← → / A D</span> {TRANSLATIONS.move}</li>
              <li><span className="font-mono bg-indigo-900/50 px-1 rounded">↑ / W / Space</span> {TRANSLATIONS.jump}</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl border border-indigo-500/20">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">{TRANSLATIONS.objective}</h3>
            <p className="text-sm text-indigo-200">{TRANSLATIONS.objectiveDesc}</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-xl border border-indigo-500/20">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">{TRANSLATIONS.magicStatus}</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${magicLevel > 1 ? 'bg-purple-400 animate-pulse shadow-[0_0_8px_#a855f7]' : 'bg-slate-600'}`} />
                <span className="text-sm font-medium text-indigo-200">
                  {magicLevel === 1 ? TRANSLATIONS.manaCharging : `${TRANSLATIONS.magicPower}: ${magicLevel * 10}%`}
                </span>
              </div>
              {nextAbility && (
                <p className="text-[10px] text-indigo-400 italic">
                  다음 능력: {nextAbility.name} (LV.{nextAbility.level})
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
