/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState } from '../types';
import { SPEED, JUMP_FORCE, GRAVITY } from '../constants';

export const updatePhysics = (
  gameState: GameState,
  canvasWidth: number,
  canvasHeight: number,
  onDoorCollision: () => void,
  onShopCollision?: () => void
) => {
  const { rabbit, keys, platforms, door, shopDoor } = gameState;

  // Horizontal movement
  if (keys.ArrowLeft) {
    rabbit.vx = -SPEED;
    rabbit.facingRight = false;
  } else if (keys.ArrowRight) {
    rabbit.vx = SPEED;
    rabbit.facingRight = true;
  } else {
    rabbit.vx *= 0.8;
  }

  // Jump logic
  const jumpKey = keys.ArrowUp || keys.Space;
  
  // Reset jump count on ground
  if (rabbit.isGrounded) {
    rabbit.jumpCount = 0;
  }

  // Double Jump (Level 3+)
  const maxJumps = gameState.magicLevel >= 3 ? 2 : 1;
  
  // We need to know if the jump key was JUST pressed. 
  // For simplicity in this frame-based update, we'll use a simple check.
  // In a real game, we'd use a 'keyPressed' event, but here we can check if vy is positive or zero to allow second jump.
  if (jumpKey && !gameState.paused) {
    if (rabbit.isGrounded) {
      rabbit.vy = JUMP_FORCE;
      rabbit.isGrounded = false;
      rabbit.jumpCount = 1;
    } else if (gameState.magicLevel >= 3 && rabbit.jumpCount === 1 && rabbit.vy > -2) {
      // Second jump allowed if falling or at peak
      rabbit.vy = JUMP_FORCE * 0.8; // Slightly weaker second jump
      rabbit.jumpCount = 2;
    }
  }

  // Magic Glide (Level 5+)
  let currentGravity = GRAVITY;
  if (gameState.magicLevel >= 5 && jumpKey && rabbit.vy > 0) {
    currentGravity = GRAVITY * 0.3; // Much slower fall
  }

  // Apply gravity
  rabbit.vy += currentGravity;

  // Update position
  rabbit.x += rabbit.vx;
  rabbit.y += rabbit.vy;

  // Collision detection
  rabbit.isGrounded = false;
  for (const platform of platforms) {
    if (
      rabbit.x + rabbit.width > platform.x &&
      rabbit.x < platform.x + platform.width &&
      rabbit.y + rabbit.height > platform.y &&
      rabbit.y + rabbit.height < platform.y + platform.height + rabbit.vy
    ) {
      if (rabbit.vy > 0) {
        rabbit.y = platform.y - rabbit.height;
        rabbit.vy = 0;
        rabbit.isGrounded = true;
      }
    }
  }

  // Door collision
  if (
    !door.isOpen &&
    rabbit.x + rabbit.width > door.x &&
    rabbit.x < door.x + door.width &&
    rabbit.y + rabbit.height > door.y &&
    rabbit.y < door.y + door.height
  ) {
    onDoorCollision();
  }

  // Shop Door collision
  if (
    shopDoor &&
    onShopCollision &&
    rabbit.x + rabbit.width > shopDoor.x &&
    rabbit.x < shopDoor.x + shopDoor.width &&
    rabbit.y + rabbit.height > shopDoor.y &&
    rabbit.y < shopDoor.y + shopDoor.height
  ) {
    onShopCollision();
  }

  // Boundaries
  if (rabbit.x < 0) rabbit.x = 0;
  if (rabbit.x + rabbit.width > canvasWidth) rabbit.x = canvasWidth - rabbit.width;
  if (rabbit.y > canvasHeight) {
    // Reset if falls off
    rabbit.x = 100;
    rabbit.y = 450;
    rabbit.vy = 0;
  }
};
