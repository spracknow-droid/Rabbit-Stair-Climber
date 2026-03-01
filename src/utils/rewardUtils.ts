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
