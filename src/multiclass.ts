import { Classes, Races } from './types.js';

export type AbilityScores = {
  str: number; dex: number; con: number; int: number; wis: number; chr: number;
};

// Core 2e PHB class minimums
export const classMinimums: Record<Classes, Partial<AbilityScores>> = {
  [Classes.cleric]: { wis: 9 },
  [Classes.druid]: { wis: 12, chr: 15 },
  [Classes.fighter]: { str: 9 },
  [Classes.paladin]: { str: 12, con: 9, wis: 13, chr: 17 }, // not available to demi-humans
  [Classes.ranger]: { str: 13, dex: 13, con: 14, wis: 14 }, // only elves & half-elves
  [Classes.mage]: { int: 9 },
  [Classes.illusionist]: { dex: 16, int: 15 },
  [Classes.thief]: { dex: 9 },
  [Classes.bard]: {}, // not used in combos list provided
};

// Allowed multiclass combinations by race from the provided rules
export const allowedCombosByRace: Record<Races, Classes[][]> = {
  [Races.human]: [],
  [Races.dwarf]: [
    [Classes.cleric, Classes.fighter],
    [Classes.cleric, Classes.thief],
    [Classes.fighter, Classes.thief],
  ],
  [Races.elf]: [
    [Classes.cleric, Classes.fighter],
    [Classes.cleric, Classes.mage],
    [Classes.cleric, Classes.ranger],
    [Classes.cleric, Classes.thief],
    [Classes.fighter, Classes.mage],
    [Classes.fighter, Classes.ranger],
    [Classes.fighter, Classes.thief],
    [Classes.mage, Classes.thief],
    [Classes.cleric, Classes.fighter, Classes.mage],
    [Classes.cleric, Classes.fighter, Classes.thief],
    [Classes.cleric, Classes.mage, Classes.thief],
    [Classes.fighter, Classes.mage, Classes.thief],
  ],
  [Races.gnome]: [
    [Classes.cleric, Classes.fighter],
    [Classes.cleric, Classes.thief],
    [Classes.fighter, Classes.thief],
    [Classes.fighter, Classes.illusionist],
    [Classes.illusionist, Classes.thief],
  ],
  [Races.halfling]: [
    [Classes.cleric, Classes.fighter],
    [Classes.cleric, Classes.thief],
    [Classes.fighter, Classes.thief],
  ],
  [Races.halfElf]: [
    [Classes.cleric, Classes.fighter],
    [Classes.cleric, Classes.mage],
    [Classes.cleric, Classes.ranger],
    [Classes.cleric, Classes.thief],
    [Classes.fighter, Classes.druid],
    [Classes.fighter, Classes.mage],
    [Classes.fighter, Classes.ranger],
    [Classes.fighter, Classes.thief],
    [Classes.mage, Classes.thief],
    [Classes.cleric, Classes.fighter, Classes.mage],
    [Classes.cleric, Classes.fighter, Classes.thief],
    [Classes.cleric, Classes.mage, Classes.thief],
    [Classes.fighter, Classes.mage, Classes.thief],
    [Classes.cleric, Classes.fighter, Classes.mage, Classes.thief],
  ],
};

export function meetsClassMinimums(abilities: AbilityScores, cls: Classes): boolean {
  const mins = classMinimums[cls];
  for (const [k, v] of Object.entries(mins)) {
    const key = k as keyof AbilityScores;
    if (v !== undefined && abilities[key] < v) return false;
  }
  return true;
}

export function qualifiesForCombo(abilities: AbilityScores, combo: Classes[]): boolean {
  return combo.every(c => meetsClassMinimums(abilities, c));
}

export function getAllowedCombosForRace(race: Races): Classes[][] {
  return allowedCombosByRace[race] ?? [];
}

export function getEligibleMulticlassCombos(race: Races, abilities: AbilityScores): Classes[][] {
  return getAllowedCombosForRace(race).filter(c => qualifiesForCombo(abilities, c));
}

export function comboToLabel(combo: Classes[]): string {
  return combo.join(' / ');
}
