import { describe, it, expect } from 'vitest';

// Import built JS to avoid TS import extension issues
import { raceClassLimits, thac0s, savingThrows } from '../dist/data.js';
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
