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

  it('THAC0 arrays have 20 entries and known values', () => {
    for (const [cls, arr] of Object.entries(thac0s)) {
      expect(Array.isArray(arr)).toBe(true);
      expect(arr.length).toBe(20);
    }
    expect(thac0s.fighter[0]).toBe(20);
    expect(thac0s.mage[19]).toBe(14);
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
});
