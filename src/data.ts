import { Classes, Races, RaceClassLimits, THAC0S, ISavingThrows, HeightWeightTable, AgeTable, StartingMoneyTable } from './types.js';

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
// Starting gold = rollXdY(dice, sides) �- multiplier
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
