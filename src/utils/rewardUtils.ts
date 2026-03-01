/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Utility functions and configuration for managing any kind of reward
 * that can be granted to the player.  Keeping all of the "reward logic" in
 * one place makes it easier to maintain and prevents the quiz/gem reward
 * code from getting tangled with the floor/carrot reward logic, which was
 * exactly what the user was worried about.
 */

// floors on which the player receives a carrot bonus when they arrive
export const FLOOR_CARROT_MILESTONES = [5, 10, 15, 20, 25] as const;

/**
 * Returns how many carrots should be awarded when the player reaches the
 * specified floor.  For now the value is fixed to 1 per milestone, but the
 * function is intentionally simple so it can be extended later (different
 * amounts, special floors, etc.).
 */
export function getCarrotRewardForFloor(floor: number): number {
  return FLOOR_CARROT_MILESTONES.includes(floor as any) ? 1 : 0;
}

/**
 * Calculates how many gems the player should earn for answering a quiz
 * correctly.  The logic originally lived directly in App.tsx; centralising it
 * here keeps the various reward systems from "cross‑contaminating" each
 * other and makes it easy to write unit tests against the code if desired.
 *
 * A random amount between 1–3 is given, with a bonus +2 gems when the magic
 * level is 8 or higher (existing behaviour).
 */
export function calculateQuizGemReward(magicLevel: number): number {
  let earned = Math.floor(Math.random() * 3) + 1;
  if (magicLevel >= 8) {
    earned += 2; // bonus for high magic level
  }
  return earned;
}

/**
 * Determine the player's magic level based on their accumulated gems and
 * optionally the current floor.  Previously the level was only updated once
 * during quiz submission, and it relied on ad-hoc arithmetic scattered in
 * `App.tsx`.  By centralising the formula we prevent inconsistencies and make
 * it easy to adjust the progression rule (e.g. tie it to floors later).
 *
 * The default behaviour mirrors the original formula (1 level per 10 gems,
 * starting at level 1).  In addition, a floor-based floor bonus is computed so
 * that every five floors the base level increments by one; this makes it
 * impossible to climb dozens of floors and remain stuck at low magic.
 */
export function calculateMagicLevel(gems: number, floor: number): number {
  const gemLevel = Math.floor(gems / 10) + 1;
  const floorLevel = Math.floor((floor - 1) / 5) + 1; // 1..6 for floors 1..30
  return Math.max(gemLevel, floorLevel);
}
