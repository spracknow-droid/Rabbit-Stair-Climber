/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GRAVITY = 0.5;
export const JUMP_FORCE = -10;
export const SPEED = 5;
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const MAX_FLOOR = 30;

export const INITIAL_PLATFORMS = [
  { x: 0, y: 500, width: 800, height: 100 }, // Ground
  { x: 200, y: 450, width: 100, height: 50 }, // Step 1
  { x: 300, y: 400, width: 100, height: 50 }, // Step 2
  { x: 400, y: 350, width: 100, height: 50 }, // Step 3
  { x: 500, y: 300, width: 100, height: 50 }, // Step 4
  { x: 600, y: 250, width: 200, height: 50 }, // Top platform
];
