import { Classes } from './types.js';
import { AbilityScores } from './multiclass.js';

/**
 * The single prime-requisite ability score used for dual-class eligibility.
 * PHB p.44: need 15+ in the old class's prime req and 17+ in the new class's prime req.
 */
export const primeRequisite: Record<Classes, keyof AbilityScores> = {
  [Classes.fighter]:     'str',
  [Classes.paladin]:     'str',
  [Classes.ranger]:      'str',
  [Classes.cleric]:      'wis',
  [Classes.druid]:       'wis',
  [Classes.mage]:        'int',
  [Classes.illusionist]: 'int',
  [Classes.thief]:       'dex',
  [Classes.bard]:        'dex',
};

/** Minimum score in the original class's prime requisite to be eligible to leave it */
export const DUAL_FROM_MIN = 15;

/** Minimum score in the new class's prime requisite to be eligible to enter it */
export const DUAL_TO_MIN = 17;

const ALL_CLASSES = Object.values(Classes) as Classes[];

/**
 * Returns all eligible [from, to] dual-class pairs for a human character with
 * the given ability scores.
 * Rules (2e PHB): from prime req >= 15, to prime req >= 17, from !== to.
 */
export function getEligibleDualClassCombos(abilities: AbilityScores): [Classes, Classes][] {
  const result: [Classes, Classes][] = [];
  for (const from of ALL_CLASSES) {
    if (abilities[primeRequisite[from]] < DUAL_FROM_MIN) continue;
    for (const to of ALL_CLASSES) {
      if (from === to) continue;
      if (abilities[primeRequisite[to]] < DUAL_TO_MIN) continue;
      result.push([from, to]);
    }
  }
  return result;
}

/** Formats a dual-class pair for display: "fighter → mage" */
export function dualClassLabel(from: Classes, to: Classes): string {
  return `${from} \u2192 ${to}`;
}
