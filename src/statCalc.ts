/** Pure ability-score modifier calculations — no DOM, no side effects. */

export interface StrMods {
  hitProb: number; dmgAdj: number; wghtAllow: number; maxPress: number; opDrs: number; bndBrs: number;
}
export interface DexMods { rctAdj: number; mislAdj: number; defAdj: number; }
export interface ConMods { hpAdj: number; sysShk: number; resSurv: number; poisonSv: number; regen: number; }
export interface IntMods { noLang: number; splLvl: number; chnLearn: number; maxSplPerLvl: number; splImun: number; }
export interface WisMods { magDefAdj: number; bonusSp: number; chnFail: number; splImmune: number; }
export interface ChrMods { mxHench: number; loyalBs: number; reactAdj: number; }

// Range-based tables: [maxStat, mods]. Find first entry where stat <= maxStat.

// ---------- Strength ----------

const STR_BASE: [number, StrMods][] = [
  [3,  { hitProb: -3, dmgAdj: -1, wghtAllow: 5,   maxPress: 10,  opDrs: 2,  bndBrs: 0  }],
  [5,  { hitProb: -2, dmgAdj: -1, wghtAllow: 10,  maxPress: 25,  opDrs: 3,  bndBrs: 0  }],
  [7,  { hitProb: -1, dmgAdj:  0, wghtAllow: 20,  maxPress: 55,  opDrs: 4,  bndBrs: 0  }],
  [9,  { hitProb:  0, dmgAdj:  0, wghtAllow: 35,  maxPress: 90,  opDrs: 5,  bndBrs: 1  }],
  [11, { hitProb:  0, dmgAdj:  0, wghtAllow: 40,  maxPress: 115, opDrs: 6,  bndBrs: 2  }],
  [13, { hitProb:  0, dmgAdj:  0, wghtAllow: 45,  maxPress: 140, opDrs: 7,  bndBrs: 4  }],
  [15, { hitProb:  0, dmgAdj:  0, wghtAllow: 55,  maxPress: 170, opDrs: 8,  bndBrs: 7  }],
  [16, { hitProb:  0, dmgAdj:  1, wghtAllow: 70,  maxPress: 195, opDrs: 8,  bndBrs: 10 }],
  [17, { hitProb:  1, dmgAdj:  1, wghtAllow: 85,  maxPress: 220, opDrs: 10, bndBrs: 13 }],
];

// STR 18 non-warrior default (no d100 roll)
const STR_18_DEFAULT: StrMods =
  { hitProb: 1, dmgAdj: 2, wghtAllow: 110, maxPress: 255, opDrs: 11, bndBrs: 16 };

// STR 18/xx warrior: [maxRoll, mods]
const STR_18_WARRIOR: [number, StrMods][] = [
  [50,  { hitProb: 1, dmgAdj: 3, wghtAllow: 135, maxPress: 280, opDrs: 12, bndBrs: 20 }],
  [75,  { hitProb: 2, dmgAdj: 3, wghtAllow: 160, maxPress: 305, opDrs: 13, bndBrs: 25 }],
  [90,  { hitProb: 2, dmgAdj: 4, wghtAllow: 185, maxPress: 330, opDrs: 14, bndBrs: 30 }],
  [99,  { hitProb: 2, dmgAdj: 5, wghtAllow: 235, maxPress: 380, opDrs: 15, bndBrs: 35 }],
  [100, { hitProb: 3, dmgAdj: 6, wghtAllow: 335, maxPress: 480, opDrs: 16, bndBrs: 40 }],
];

/**
 * Calculate strength modifiers.
 * @param prcStr d100 roll for STR 18 warriors (1–100). Pass 0 for non-warriors or non-18.
 */
export function calcStrMods(str: number, isWarrior: boolean, prcStr = 0): StrMods {
  if (str === 18 && isWarrior && prcStr > 0) {
    return STR_18_WARRIOR.find(([max]) => prcStr <= max)?.[1] ?? STR_18_DEFAULT;
  }
  if (str === 18) return STR_18_DEFAULT;
  return STR_BASE.find(([max]) => str <= max)?.[1] ?? STR_BASE[STR_BASE.length - 1][1];
}

// ---------- Dexterity ----------

const DEX_MODS: [number, DexMods][] = [
  [3,  { rctAdj: -3, mislAdj: -3, defAdj:  4 }],
  [4,  { rctAdj: -2, mislAdj: -2, defAdj:  3 }],
  [5,  { rctAdj: -1, mislAdj: -1, defAdj:  2 }],
  [6,  { rctAdj:  0, mislAdj:  0, defAdj:  1 }],
  [14, { rctAdj:  0, mislAdj:  0, defAdj:  0 }],  // covers 7–14
  [15, { rctAdj:  0, mislAdj:  0, defAdj: -1 }],
  [16, { rctAdj:  1, mislAdj:  1, defAdj: -2 }],
  [17, { rctAdj:  2, mislAdj:  2, defAdj: -3 }],
  [18, { rctAdj:  2, mislAdj:  2, defAdj: -4 }],
];

export function calcDexMods(dex: number): DexMods {
  return DEX_MODS.find(([max]) => dex <= max)?.[1] ?? DEX_MODS[DEX_MODS.length - 1][1];
}

// ---------- Constitution ----------

const CON_BASE: [number, ConMods][] = [
  [3,  { hpAdj: -2, sysShk: 25, resSurv:  30, poisonSv: -2, regen: 0 }],
  [4,  { hpAdj: -1, sysShk: 40, resSurv:  45, poisonSv:  0, regen: 0 }],
  [5,  { hpAdj: -1, sysShk: 45, resSurv:  50, poisonSv:  0, regen: 0 }],
  [6,  { hpAdj: -1, sysShk: 50, resSurv:  55, poisonSv:  0, regen: 0 }],
  [7,  { hpAdj:  0, sysShk: 55, resSurv:  60, poisonSv:  0, regen: 0 }],
  [8,  { hpAdj:  0, sysShk: 60, resSurv:  65, poisonSv:  0, regen: 0 }],
  [9,  { hpAdj:  0, sysShk: 65, resSurv:  70, poisonSv:  0, regen: 0 }],
  [10, { hpAdj:  0, sysShk: 70, resSurv:  75, poisonSv:  0, regen: 0 }],
  [11, { hpAdj:  0, sysShk: 75, resSurv:  80, poisonSv:  0, regen: 0 }],
  [12, { hpAdj:  0, sysShk: 80, resSurv:  85, poisonSv:  0, regen: 0 }],
  [13, { hpAdj:  0, sysShk: 85, resSurv:  90, poisonSv:  0, regen: 0 }],
  [14, { hpAdj:  0, sysShk: 88, resSurv:  92, poisonSv:  0, regen: 0 }],
  [15, { hpAdj:  1, sysShk: 90, resSurv:  94, poisonSv:  0, regen: 0 }],
  [16, { hpAdj:  2, sysShk: 95, resSurv:  96, poisonSv:  0, regen: 0 }],
  [17, { hpAdj:  2, sysShk: 97, resSurv:  98, poisonSv:  0, regen: 0 }],
  [18, { hpAdj:  2, sysShk: 99, resSurv: 100, poisonSv:  0, regen: 0 }],
];

export function calcConMods(con: number, isWarrior: boolean): ConMods {
  const base = CON_BASE.find(([max]) => con <= max)?.[1] ?? CON_BASE[CON_BASE.length - 1][1];
  // Warriors gain an extra +1/+2 HP per die at CON 17/18
  if (isWarrior && con === 17) return { ...base, hpAdj: 3 };
  if (isWarrior && con === 18) return { ...base, hpAdj: 4 };
  return base;
}

// ---------- Intelligence ----------

const INT_MODS: [number, IntMods][] = [
  [8,  { noLang: 1, splLvl: 0, chnLearn:  0, maxSplPerLvl:  0, splImun: 0 }],  // covers 3–8
  [9,  { noLang: 2, splLvl: 4, chnLearn: 35, maxSplPerLvl:  6, splImun: 0 }],
  [10, { noLang: 2, splLvl: 5, chnLearn: 40, maxSplPerLvl:  7, splImun: 0 }],
  [11, { noLang: 2, splLvl: 5, chnLearn: 45, maxSplPerLvl:  7, splImun: 0 }],
  [12, { noLang: 3, splLvl: 6, chnLearn: 50, maxSplPerLvl:  7, splImun: 0 }],
  [13, { noLang: 3, splLvl: 6, chnLearn: 55, maxSplPerLvl:  7, splImun: 0 }],
  [14, { noLang: 4, splLvl: 7, chnLearn: 60, maxSplPerLvl:  9, splImun: 0 }],
  [15, { noLang: 4, splLvl: 7, chnLearn: 65, maxSplPerLvl: 11, splImun: 0 }],
  [16, { noLang: 5, splLvl: 8, chnLearn: 70, maxSplPerLvl: 11, splImun: 0 }],
  [17, { noLang: 6, splLvl: 8, chnLearn: 75, maxSplPerLvl: 14, splImun: 0 }],
  [18, { noLang: 7, splLvl: 9, chnLearn: 85, maxSplPerLvl: 18, splImun: 0 }],
];

export function calcIntMods(int: number): IntMods {
  return INT_MODS.find(([max]) => int <= max)?.[1] ?? INT_MODS[INT_MODS.length - 1][1];
}

// ---------- Wisdom ----------

const WIS_MODS: [number, WisMods][] = [
  [3,  { magDefAdj: -3, bonusSp: 0, chnFail: 50, splImmune: 0 }],
  [4,  { magDefAdj: -2, bonusSp: 0, chnFail: 45, splImmune: 0 }],
  [5,  { magDefAdj: -1, bonusSp: 0, chnFail: 40, splImmune: 0 }],
  [6,  { magDefAdj: -1, bonusSp: 0, chnFail: 35, splImmune: 0 }],
  [7,  { magDefAdj: -1, bonusSp: 0, chnFail: 30, splImmune: 0 }],
  [8,  { magDefAdj:  0, bonusSp: 0, chnFail: 25, splImmune: 0 }],
  [9,  { magDefAdj:  0, bonusSp: 0, chnFail: 20, splImmune: 0 }],
  [10, { magDefAdj:  0, bonusSp: 0, chnFail: 15, splImmune: 0 }],
  [11, { magDefAdj:  0, bonusSp: 0, chnFail: 10, splImmune: 0 }],
  [12, { magDefAdj:  0, bonusSp: 0, chnFail:  5, splImmune: 0 }],
  [14, { magDefAdj:  0, bonusSp: 1, chnFail:  0, splImmune: 0 }],  // covers 13–14
  [15, { magDefAdj:  1, bonusSp: 2, chnFail:  0, splImmune: 0 }],
  [16, { magDefAdj:  2, bonusSp: 2, chnFail:  0, splImmune: 0 }],
  [17, { magDefAdj:  3, bonusSp: 3, chnFail:  0, splImmune: 0 }],
  [18, { magDefAdj:  4, bonusSp: 4, chnFail:  0, splImmune: 0 }],
];

export function calcWisMods(wis: number): WisMods {
  return WIS_MODS.find(([max]) => wis <= max)?.[1] ?? WIS_MODS[WIS_MODS.length - 1][1];
}

// ---------- Charisma ----------

const CHR_MODS: [number, ChrMods][] = [
  [3,  { mxHench:  1, loyalBs: -6, reactAdj: -5 }],
  [4,  { mxHench:  1, loyalBs: -5, reactAdj: -4 }],
  [5,  { mxHench:  2, loyalBs: -4, reactAdj: -3 }],
  [6,  { mxHench:  2, loyalBs: -3, reactAdj: -2 }],
  [7,  { mxHench:  3, loyalBs: -2, reactAdj: -1 }],
  [8,  { mxHench:  3, loyalBs: -1, reactAdj:  0 }],
  [11, { mxHench:  4, loyalBs:  0, reactAdj:  0 }],  // covers 9–11
  [12, { mxHench:  5, loyalBs:  0, reactAdj:  0 }],
  [13, { mxHench:  5, loyalBs:  0, reactAdj:  1 }],
  [14, { mxHench:  6, loyalBs:  1, reactAdj:  2 }],
  [15, { mxHench:  7, loyalBs:  3, reactAdj:  3 }],
  [16, { mxHench:  8, loyalBs:  4, reactAdj:  5 }],
  [17, { mxHench: 10, loyalBs:  6, reactAdj:  6 }],
  [18, { mxHench: 15, loyalBs:  8, reactAdj:  7 }],
];

export function calcChrMods(chr: number): ChrMods {
  return CHR_MODS.find(([max]) => chr <= max)?.[1] ?? CHR_MODS[CHR_MODS.length - 1][1];
}
