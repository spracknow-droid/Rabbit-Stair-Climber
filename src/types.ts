/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Rabbit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isGrounded: boolean;
  facingRight: boolean;
  jumpCount: number;
  accessories: {
    hat?: 'wizard' | 'crown' | 'tophat';
    cape?: 'red' | 'blue' | 'gold';
    glasses?: 'heart';
    staff?: 'magic';
  };
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Door {
  x: number;
  y: number;
  width: number;
  height: number;
  isOpen: boolean;
}

export interface Quiz {
  question: string;
  answer: number;
}

export interface GameState {
  paused: boolean;
  gems: number;
  magicLevel: number;
  rabbit: Rabbit;
  keys: {
    ArrowLeft: boolean;
    ArrowRight: boolean;
    ArrowUp: boolean;
    Space: boolean;
  };
  startDoor: Door;
  door: Door;
  shopDoor?: Door;
  platforms: Platform[];
}
