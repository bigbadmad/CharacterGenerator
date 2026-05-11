import { describe, it, expect } from 'vitest';

// Import built JS to avoid TS import extension issues
import { raceClassLimits, thac0s, savingThrows, heightWeightTable, startingAgeTable, startingMoneyTable } from '../dist/data.js';
import { Classes } from '../dist/types.js';

describe('data tables', () => {
  it('raceClassLimits includes expected classes', () => {
    expect(raceClassLimits.human).toContain(Classes.fighter);
    expect(raceClassLimits.elf).toContain(Classes.ranger);
    expect(raceClassLimits.dwarf).toEqual(
      expect.arrayContaining([Classes.fighter, Classes.cleric, Classes.thief])
    );
  });

  it('gnome includes illusionist but not paladin or ranger', () => {
    expect(raceClassLimits.gnome).toContain(Classes.illusionist);
    expect(raceClassLimits.gnome).not.toContain(Classes.paladin);
    expect(raceClassLimits.gnome).not.toContain(Classes.ranger);
  });

  it('halfling has exactly fighter, cleric and thief', () => {
    expect(raceClassLimits.halfling).toHaveLength(3);
    expect(raceClassLimits.halfling).toEqual(
      expect.arrayContaining([Classes.fighter, Classes.cleric, Classes.thief])
    );
  });

  it('THAC0 arrays have 20 entries and known values', () => {
    for (const [cls, arr] of Object.entries(thac0s)) {
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(20);
    }
    expect(thac0s.fighter[0]).toBe(20);
    expect(thac0s.mage[19]).toBe(14);
  });

  it('rogue THAC0 starts at 20 and ends at 11', () => {
    expect(thac0s.rogue[0]).toBe(20);
    expect(thac0s.rogue[19]).toBe(11);
  });

  it('cleric THAC0 starts at 20 and ends at 8', () => {
    expect(thac0s.cleric[0]).toBe(20);
    expect(thac0s.cleric[19]).toBe(8);
  });

  it('savingThrows have all categories with 20 entries each', () => {
    for (const [cls, tables] of Object.entries(savingThrows)) {
      for (const key of ['para', 'rod', 'poly', 'breath', 'spell'] as const) {
        const arr = tables[key];
        expect(Array.isArray(arr)).toBe(true);
        expect(arr.length).toBe(20);
      }
    }
  });

  it('fighter para save at level 1 is 14', () => {
    expect(savingThrows.fighter.para[0]).toBe(14);
  });

  it('mage rod save at level 1 is 11', () => {
    expect(savingThrows.mage.rod[0]).toBe(11);
  });
});

const ALL_RACES = ['human', 'dwarf', 'elf', 'gnome', 'halfling', 'halfElf'];
const ALL_CLASSES = ['fighter', 'paladin', 'ranger', 'cleric', 'druid', 'mage', 'illusionist', 'thief', 'bard'];

describe('heightWeightTable', () => {
  it('has entries for all six races', () => {
    for (const race of ALL_RACES) {
      expect(heightWeightTable, `missing race: ${race}`).toHaveProperty(race);
    }
  });

  it('each race has male and female entries', () => {
    for (const race of ALL_RACES) {
      expect(heightWeightTable[race]).toHaveProperty('male');
      expect(heightWeightTable[race]).toHaveProperty('female');
    }
  });

  it('each entry has all required numeric fields', () => {
    for (const race of ALL_RACES) {
      for (const gender of ['male', 'female'] as const) {
        const e = heightWeightTable[race][gender];
        for (const field of ['htBase', 'htDice', 'htSides', 'wtBase', 'wtDice', 'wtSides']) {
          expect(typeof e[field as keyof typeof e], `${race}.${gender}.${field}`).toBe('number');
        }
      }
    }
  });

  it('human male has htBase 60 and female htBase 59', () => {
    expect(heightWeightTable.human.male.htBase).toBe(60);
    expect(heightWeightTable.human.female.htBase).toBe(59);
  });

  it('dwarf is shorter than human (smaller htBase)', () => {
    expect(heightWeightTable.dwarf.male.htBase).toBeLessThan(heightWeightTable.human.male.htBase);
  });
});

describe('startingAgeTable', () => {
  it('has entries for all six races', () => {
    for (const race of ALL_RACES) {
      expect(startingAgeTable, `missing race: ${race}`).toHaveProperty(race);
    }
  });

  it('human has entries for all nine classes', () => {
    for (const cls of ALL_CLASSES) {
      expect(startingAgeTable.human, `human missing class: ${cls}`).toHaveProperty(cls);
    }
  });

  it('each entry has base, dice, and sides as numbers', () => {
    for (const race of ALL_RACES) {
      for (const [cls, entry] of Object.entries(startingAgeTable[race])) {
        expect(typeof entry.base,  `${race}.${cls}.base`).toBe('number');
        expect(typeof entry.dice,  `${race}.${cls}.dice`).toBe('number');
        expect(typeof entry.sides, `${race}.${cls}.sides`).toBe('number');
      }
    }
  });

  it('non-human races have plausible base ages (> human base)', () => {
    expect(startingAgeTable.elf.fighter.base).toBeGreaterThan(startingAgeTable.human.fighter.base);
    expect(startingAgeTable.dwarf.fighter.base).toBeGreaterThan(startingAgeTable.human.fighter.base);
  });

  it('dwarf has no paladin entry (class not available to dwarves)', () => {
    expect(startingAgeTable.dwarf).not.toHaveProperty('paladin');
  });
});

describe('startingMoneyTable', () => {
  it('has entries for all nine classes', () => {
    for (const cls of ALL_CLASSES) {
      expect(startingMoneyTable, `missing class: ${cls}`).toHaveProperty(cls);
    }
  });

  it('each entry has dice, sides, and multiplier as numbers', () => {
    for (const [cls, entry] of Object.entries(startingMoneyTable)) {
      expect(typeof entry.dice,       `${cls}.dice`).toBe('number');
      expect(typeof entry.sides,      `${cls}.sides`).toBe('number');
      expect(typeof entry.multiplier, `${cls}.multiplier`).toBe('number');
    }
  });

  it('all multipliers are 10 (PHB Table 23)', () => {
    for (const [cls, entry] of Object.entries(startingMoneyTable)) {
      expect(entry.multiplier, `${cls}.multiplier`).toBe(10);
    }
  });

  it('fighters roll more dice than mages', () => {
    expect(startingMoneyTable.fighter.dice).toBeGreaterThan(startingMoneyTable.mage.dice);
  });
});
