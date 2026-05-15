import { Classes, Races, Alignment, RaceClassLimits, THAC0S, ISavingThrows, HeightWeightTable, AgeTable, StartingMoneyTable } from './types.js';

export const raceClassLimits: RaceClassLimits = {
  human: [Classes.fighter, Classes.thief, Classes.cleric, Classes.mage, Classes.bard, Classes.paladin, Classes.ranger, Classes.druid, Classes.illusionist],
  dwarf: [Classes.fighter, Classes.cleric, Classes.thief],
  elf: [Classes.fighter, Classes.ranger, Classes.cleric, Classes.thief, Classes.bard, Classes.mage],
  halfElf: [Classes.fighter, Classes.paladin, Classes.ranger, Classes.cleric, Classes.druid, Classes.thief, Classes.bard, Classes.mage],
  gnome: [Classes.fighter, Classes.cleric, Classes.thief, Classes.illusionist],
  halfling: [Classes.fighter, Classes.cleric, Classes.thief]
};

export const thac0s: THAC0S = {
  fighter: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  rogue: [20, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11],
  cleric: [20, 20, 20, 18, 18, 18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10, 8, 8],
  mage: [20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 16, 15, 15, 15, 14, 14],
};

export const savingThrows: ISavingThrows = {
  fighter: {
    para: [14, 14, 13, 13, 11, 11, 10, 10, 8, 8, 7, 7, 5, 5, 4, 4, 3, 3, 3, 3],
    rod: [16, 16, 15, 15, 13, 13, 12, 12, 10, 10, 9, 9, 7, 7, 6, 6, 5, 5, 5, 5],
    poly: [15, 15, 14, 14, 12, 12, 11, 11, 9, 9, 8, 8, 6, 6, 5, 5, 4, 4, 4, 4],
    breath: [17, 17, 16, 16, 13, 13, 12, 12, 9, 9, 8, 8, 5, 5, 4, 4, 4, 4, 4, 4],
    spell: [17, 17, 16, 16, 14, 14, 13, 13, 11, 11, 10, 10, 8, 8, 7, 7, 6, 6, 6, 6]
  },
  cleric: {
    para: [10, 10, 10, 9, 9, 9, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4, 2, 2],
    rod: [14, 14, 14, 13, 13, 13, 11, 11, 11, 10, 10, 1, 9, 9, 9, 8, 8, 8, 6, 6],
    poly: [13, 13, 13, 12, 12, 12, 10, 10, 10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 5, 5],
    breath: [16, 16, 16, 15, 15, 15, 13, 13, 13, 12, 12, 12, 11, 11, 11, 10, 10, 10, 8, 8],
    spell: [15, 15, 15, 14, 14, 14, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9, 7, 7]
  },
  rogue: {
    para: [13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9],
    rod: [14, 14, 14, 14, 12, 12, 12, 12, 10, 10, 10, 10, 8, 8, 8, 8, 6, 6, 6, 6],
    poly: [12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9, 8, 8, 8, 8],
    breath: [16, 16, 16, 15, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12],
    spell: [15, 15, 15, 15, 13, 13, 13, 13, 11, 11, 11, 11, 9, 9, 9, 9, 7, 7, 7, 7]
  },
  mage: {
    para: [14, 14, 14, 14, 14, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10],
    rod: [11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5],
    poly: [13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7],
    breath: [15, 15, 15, 15, 15, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9],
    spell: [12, 12, 12, 12, 12, 10, 10, 10, 10, 10, 8, 8, 8, 8, 8, 6, 6, 6, 6, 6]
  }
};

// PHB Table 1B - Height and Weight by Race and Gender
// Heights in inches, weights in lbs. Roll: base + XdY.
export const heightWeightTable: HeightWeightTable = {
  human: {
    male:   { htBase: 60, htDice: 2, htSides: 10, wtBase: 140, wtDice: 6, wtSides: 10 },
    female: { htBase: 59, htDice: 2, htSides: 10, wtBase: 100, wtDice: 4, wtSides: 10 },
  },
  dwarf: {
    male:   { htBase: 43, htDice: 1, htSides: 10, wtBase: 130, wtDice: 4, wtSides: 10 },
    female: { htBase: 41, htDice: 1, htSides: 10, wtBase: 105, wtDice: 3, wtSides: 10 },
  },
  elf: {
    male:   { htBase: 55, htDice: 1, htSides: 10, wtBase: 90,  wtDice: 3, wtSides: 10 },
    female: { htBase: 50, htDice: 1, htSides: 10, wtBase: 70,  wtDice: 3, wtSides: 10 },
  },
  gnome: {
    male:   { htBase: 38, htDice: 1, htSides: 6,  wtBase: 72,  wtDice: 5, wtSides: 4  },
    female: { htBase: 36, htDice: 1, htSides: 6,  wtBase: 68,  wtDice: 5, wtSides: 4  },
  },
  halfling: {
    male:   { htBase: 32, htDice: 2, htSides: 8,  wtBase: 52,  wtDice: 5, wtSides: 4  },
    female: { htBase: 30, htDice: 2, htSides: 8,  wtBase: 48,  wtDice: 5, wtSides: 4  },
  },
  halfElf: {
    male:   { htBase: 60, htDice: 2, htSides: 6,  wtBase: 110, wtDice: 3, wtSides: 12 },
    female: { htBase: 58, htDice: 2, htSides: 6,  wtBase: 85,  wtDice: 3, wtSides: 12 },
  },
};

// PHB Table 1A - Starting Age by Race and Class
// Starting age = base + rollXdY(dice, sides)
export const startingAgeTable: AgeTable = {
  human: {
    fighter:     { base: 15, dice: 1, sides: 4 },
    paladin:     { base: 17, dice: 1, sides: 4 },
    ranger:      { base: 15, dice: 1, sides: 4 },
    cleric:      { base: 15, dice: 1, sides: 6 },
    druid:       { base: 15, dice: 1, sides: 6 },
    mage:        { base: 15, dice: 2, sides: 8 },
    illusionist: { base: 15, dice: 2, sides: 8 },
    thief:       { base: 15, dice: 1, sides: 4 },
    bard:        { base: 15, dice: 1, sides: 4 },
  },
  dwarf: {
    fighter: { base: 40, dice: 5, sides: 4 },
    cleric:  { base: 40, dice: 5, sides: 4 },
    thief:   { base: 40, dice: 3, sides: 6 },
  },
  elf: {
    fighter:  { base: 100, dice: 5, sides: 6 },
    ranger:   { base: 105, dice: 5, sides: 6 },
    cleric:   { base: 105, dice: 5, sides: 6 },
    mage:     { base: 110, dice: 5, sides: 6 },
    thief:    { base: 100, dice: 5, sides: 6 },
    bard:     { base: 100, dice: 5, sides: 6 },
  },
  gnome: {
    fighter:     { base: 60, dice: 6, sides: 4 },
    cleric:      { base: 60, dice: 7, sides: 4 },
    illusionist: { base: 60, dice: 9, sides: 4 },
    thief:       { base: 60, dice: 5, sides: 4 },
  },
  halfling: {
    fighter: { base: 20, dice: 2, sides: 4 },
    cleric:  { base: 22, dice: 2, sides: 4 },
    thief:   { base: 20, dice: 1, sides: 4 },
  },
  halfElf: {
    fighter:  { base: 15, dice: 2, sides: 4 },
    paladin:  { base: 17, dice: 2, sides: 4 },
    ranger:   { base: 15, dice: 2, sides: 4 },
    cleric:   { base: 17, dice: 2, sides: 4 },
    druid:    { base: 17, dice: 2, sides: 4 },
    mage:     { base: 18, dice: 3, sides: 4 },
    thief:    { base: 15, dice: 2, sides: 4 },
    bard:     { base: 15, dice: 2, sides: 4 },
  },
};

// PHB Table 23 - Starting Money by Class
// Starting gold = rollXdY(dice, sides) * multiplier
export const startingMoneyTable: StartingMoneyTable = {
  fighter:     { dice: 5, sides: 4, multiplier: 10 },
  paladin:     { dice: 5, sides: 4, multiplier: 10 },
  ranger:      { dice: 5, sides: 4, multiplier: 10 },
  cleric:      { dice: 3, sides: 6, multiplier: 10 },
  druid:       { dice: 3, sides: 6, multiplier: 10 },
  mage:        { dice: 2, sides: 4, multiplier: 10 },
  illusionist: { dice: 2, sides: 4, multiplier: 10 },
  thief:       { dice: 2, sides: 6, multiplier: 10 },
  bard:        { dice: 2, sides: 6, multiplier: 10 },
};

// Alignment restrictions by class (PHB).
// Paladin must be LG, Druid must be TN, Ranger must be any Good.
export const classAlignmentRestrictions: Partial<Record<Classes, Alignment[]>> = {
  [Classes.paladin]: [Alignment.LG],
  [Classes.druid]:   [Alignment.TN],
  [Classes.ranger]:  [Alignment.LG, Alignment.NG, Alignment.CG],
};

// Proficiency slots per meta-class group.
// Formula: initial + floor((level - 1) / per)
export const proficiencySlotData = {
  warrior: { wp: { initial: 4, per: 3 }, nwp: { initial: 3, per: 3 } },
  rogue:   { wp: { initial: 2, per: 4 }, nwp: { initial: 3, per: 4 } },
  priest:  { wp: { initial: 2, per: 4 }, nwp: { initial: 4, per: 3 } },
  wizard:  { wp: { initial: 1, per: 6 }, nwp: { initial: 4, per: 3 } },
} as const;

// Spell slots per day indexed as [level-1][spellLevel-1]
// PHB Table 27 – Wizard Spell Progression (Mage / Illusionist, 9 spell levels)
const mageSlots: number[][] = [
  [1,0,0,0,0,0,0,0,0],
  [2,0,0,0,0,0,0,0,0],
  [2,1,0,0,0,0,0,0,0],
  [3,2,0,0,0,0,0,0,0],
  [4,2,1,0,0,0,0,0,0],
  [4,2,2,0,0,0,0,0,0],
  [4,3,2,1,0,0,0,0,0],
  [4,3,3,2,0,0,0,0,0],
  [4,3,3,2,1,0,0,0,0],
  [4,4,3,2,2,0,0,0,0],
  [4,4,4,3,3,0,0,0,0],
  [4,4,4,4,4,1,0,0,0],
  [5,5,5,4,4,2,0,0,0],
  [5,5,5,4,4,2,1,0,0],
  [5,5,5,5,5,2,1,0,0],
  [5,5,5,5,5,3,2,1,0],
  [5,5,5,5,5,3,3,2,1],
  [5,5,5,5,5,3,3,2,2],
  [5,5,5,5,5,3,3,3,3],
  [5,5,5,5,5,4,3,3,3],
];

// PHB Priest Spell Progression (Cleric / Druid, 7 spell levels, base without WIS bonus)
const priestSlots: number[][] = [
  [1,0,0,0,0,0,0],
  [2,0,0,0,0,0,0],
  [2,1,0,0,0,0,0],
  [3,2,0,0,0,0,0],
  [3,3,1,0,0,0,0],
  [3,3,2,0,0,0,0],
  [3,3,2,1,0,0,0],
  [3,3,3,2,0,0,0],
  [4,4,3,2,1,0,0],
  [4,4,3,3,2,0,0],
  [5,4,4,3,2,1,0],
  [6,5,5,3,2,2,0],
  [6,6,6,4,2,2,0],
  [6,6,6,5,3,2,1],
  [6,6,6,6,4,2,1],
  [7,7,7,6,4,3,1],
  [7,7,7,7,5,3,2],
  [8,8,8,8,6,4,2],
  [9,9,8,8,6,4,2],
  [9,9,9,8,7,5,2],
];

// PHB Bard Spell Progression (wizard-type spells, 6 levels; level 1 has no spells)
const bardSlots: number[][] = [
  [0,0,0,0,0,0],
  [1,0,0,0,0,0],
  [2,0,0,0,0,0],
  [2,1,0,0,0,0],
  [3,1,0,0,0,0],
  [3,2,0,0,0,0],
  [3,2,1,0,0,0],
  [3,3,2,0,0,0],
  [3,3,2,1,0,0],
  [3,3,3,2,0,0],
  [3,3,3,2,1,0],
  [3,3,3,3,2,0],
  [3,3,3,3,2,1],
  [3,3,3,3,3,2],
  [3,3,3,3,3,2],
  [4,3,3,3,3,2],
  [4,4,3,3,3,2],
  [4,4,4,3,3,2],
  [4,4,4,4,3,3],
  [4,4,4,4,4,3],
];

// PHB Table 25 – Paladin Spell Progression (priest spells, 4 levels, starts at 9th level)
const paladinSlots: number[][] = [
  [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0],
  [1,0,0,0], // 9
  [2,0,0,0], // 10
  [2,1,0,0], // 11
  [2,2,0,0], // 12
  [2,2,1,0], // 13
  [3,2,1,0], // 14
  [3,2,1,1], // 15
  [3,3,2,1], // 16
  [3,3,3,1], // 17
  [3,3,3,2], // 18
  [3,3,3,3], // 19
  [3,3,3,3], // 20
];

// PHB Table 17 – Ranger Spell Progression (priest spells, 3 levels, starts at 8th level)
const rangerSlots: number[][] = [
  [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0], [0,0,0],
  [1,0,0], // 8
  [2,0,0], // 9
  [2,1,0], // 10
  [2,2,0], // 11
  [2,2,1], // 12
  [3,2,1], // 13
  [3,2,2], // 14
  [3,3,2], // 15
  [3,3,3], // 16
  [3,3,3], [3,3,3], [3,3,3], [3,3,3], // 17-20
];

export const spellSlotsPerDay: Partial<Record<Classes, number[][]>> = {
  [Classes.mage]:        mageSlots,
  [Classes.illusionist]: mageSlots,
  [Classes.cleric]:      priestSlots,
  [Classes.druid]:       priestSlots,
  [Classes.bard]:        bardSlots,
  [Classes.paladin]:     paladinSlots,
  [Classes.ranger]:      rangerSlots,
};

// Thief base skill scores before racial adjustments or discretionary points (PHB Table 28)
export const thiefBaseSkills = {
  pp:  15,  // Pick Pockets
  ol:  10,  // Open Locks
  frt:  5,  // Find/Remove Traps
  ms:  10,  // Move Silently
  his:  5,  // Hide in Shadows
  dn:  15,  // Detect Noise
  cw:  60,  // Climb Walls
  rl:   0,  // Read Languages
} as const;

// Racial adjustments added to base thief skill scores (PHB Table 28)
export const thiefRaceAdjustments: Record<string, {
  pp: number; ol: number; frt: number; ms: number; his: number; dn: number; cw: number; rl: number;
}> = {
  human:    { pp:  0, ol:  0, frt:  0, ms:  0, his:  0, dn:  0, cw:   0, rl:  0 },
  dwarf:    { pp: -5, ol: 10, frt: 15, ms:  0, his:  0, dn:  0, cw: -10, rl:  0 },
  elf:      { pp:  5, ol: -5, frt: -5, ms:  5, his: 10, dn: -5, cw:  -5, rl:  0 },
  gnome:    { pp:  5, ol:  5, frt:  5, ms: 10, his: 10, dn:  0, cw: -15, rl: -5 },
  halfling: { pp:  5, ol: 10, frt:  0, ms: 15, his: 15, dn:  5, cw: -15, rl: -5 },
  halfElf:  { pp:  5, ol: -5, frt: -5, ms:  5, his: 10, dn: -5, cw:  -5, rl:  0 },
};

// Bard base skill scores — bards receive 4 of the thief skills (PHB)
export const bardBaseSkills = {
  pp:  15,  // Pick Pockets
  dn:  15,  // Detect Noise
  cw:  60,  // Climb Walls
  rl:   0,  // Read Languages
} as const;

// Ranger wilderness skills progression by level — Move Silently and Hide in Shadows in natural settings (PHB)
export const rangerSkillsByLevel: { ms: number; his: number }[] = [
  { ms: 15, his: 10 }, // 1
  { ms: 21, his: 15 }, // 2
  { ms: 27, his: 20 }, // 3
  { ms: 33, his: 25 }, // 4
  { ms: 40, his: 31 }, // 5
  { ms: 47, his: 37 }, // 6
  { ms: 55, his: 43 }, // 7
  { ms: 62, his: 49 }, // 8
  { ms: 70, his: 56 }, // 9
  { ms: 78, his: 63 }, // 10
  { ms: 86, his: 70 }, // 11
  { ms: 94, his: 77 }, // 12
  { ms: 99, his: 85 }, // 13
  { ms: 99, his: 93 }, // 14
  { ms: 99, his: 99 }, // 15
  { ms: 99, his: 99 }, // 16+
];
