import { describe, it, expect } from 'vitest';

import { Classes, Races } from '../src/types.js';
import {
  classMinimums,
  comboToLabel,
  meetsClassMinimums,
  qualifiesForCombo,
  getAllowedCombosForRace,
  getEligibleMulticlassCombos,
} from '../src/multiclass.js';

describe('multiclass rules', () => {
  it('class minimums include key classes', () => {
    expect(classMinimums[Classes.fighter]).toBeTruthy();
    expect(classMinimums[Classes.ranger]?.str).toBe(13);
    expect(classMinimums[Classes.illusionist]?.dex).toBe(16);
    expect(classMinimums[Classes.illusionist]?.int).toBe(9);
  });

  it('eligible combos are filtered by abilities', () => {
    const abil = { str: 13, dex: 13, con: 14, int: 9, wis: 14, chr: 10 };
    const combos = getEligibleMulticlassCombos(Races.elf, abil);
    const labels = combos.map(c => c.join('+'));
    // fighter/ranger is not a valid combo (ranger is a warrior subclass of fighter)
    expect(labels).not.toContain([Classes.fighter, Classes.ranger].join('+'));
    // cleric/ranger is valid (different class groups)
    expect(labels).toContain([Classes.cleric, Classes.ranger].join('+'));
    // should not include fighter/thief if dex below 9 (set to 8 ensures removal)
    const combos2 = getEligibleMulticlassCombos(Races.elf, { ...abil, dex: 8 });
    const labels2 = combos2.map(c => c.join('+'));
    expect(labels2).not.toContain([Classes.fighter, Classes.thief].join('+'));
  });

  it('half-elf can qualify for four-class if meets minimums', () => {
    const abil = { str: 12, dex: 9, con: 9, int: 9, wis: 13, chr: 17 };
    const combos = getEligibleMulticlassCombos(Races.halfElf, abil);
    expect(combos.map(c => c.join('+'))).toContain(
      [Classes.cleric, Classes.fighter, Classes.mage, Classes.thief].join('+')
    );
  });

  it('comboToLabel formats classes with slash separators', () => {
    expect(comboToLabel([Classes.fighter, Classes.mage])).toBe('fighter / mage');
    expect(comboToLabel([Classes.cleric, Classes.fighter, Classes.mage])).toBe('cleric / fighter / mage');
  });

  it('meetsClassMinimums returns true when all abilities satisfy requirements', () => {
    const abil = { str: 13, dex: 16, con: 0, int: 15, wis: 0, chr: 0 };
    expect(meetsClassMinimums(abil, Classes.illusionist)).toBe(true);
  });

  it('meetsClassMinimums returns false when one ability falls short', () => {
    const abil = { str: 13, dex: 15, con: 0, int: 15, wis: 0, chr: 0 }; // dex 15 < 16
    expect(meetsClassMinimums(abil, Classes.illusionist)).toBe(false);
  });

  it('qualifiesForCombo returns true when all classes pass minimums', () => {
    const abil = { str: 9, dex: 9, con: 0, int: 9, wis: 9, chr: 0 };
    expect(qualifiesForCombo(abil, [Classes.fighter, Classes.cleric])).toBe(true);
  });

  it('qualifiesForCombo returns false when one class fails minimums', () => {
    const abil = { str: 9, dex: 9, con: 0, int: 9, wis: 8, chr: 0 }; // wis 8 < 9 for cleric
    expect(qualifiesForCombo(abil, [Classes.fighter, Classes.cleric])).toBe(false);
  });

  it('human has no allowed multiclass combos', () => {
    expect(getAllowedCombosForRace(Races.human)).toEqual([]);
  });

  it('dwarf has exactly three two-class combos', () => {
    const combos = getAllowedCombosForRace(Races.dwarf);
    const labels = combos.map(c => c.join('+'));
    expect(labels).toContain('cleric+fighter');
    expect(labels).toContain('cleric+thief');
    expect(labels).toContain('fighter+thief');
    expect(combos).toHaveLength(3);
  });
});

describe('class ability minimums', () => {
  it('paladin requires str 12, con 9, wis 13, chr 17', () => {
    const good = { str: 12, dex: 0, con: 9, int: 0, wis: 13, chr: 17 };
    expect(meetsClassMinimums(good, Classes.paladin)).toBe(true);
    expect(meetsClassMinimums({ ...good, str: 11 }, Classes.paladin)).toBe(false);
    expect(meetsClassMinimums({ ...good, con: 8 },  Classes.paladin)).toBe(false);
    expect(meetsClassMinimums({ ...good, wis: 12 }, Classes.paladin)).toBe(false);
    expect(meetsClassMinimums({ ...good, chr: 16 }, Classes.paladin)).toBe(false);
  });

  it('ranger requires str 13, dex 13, con 14, wis 14', () => {
    const good = { str: 13, dex: 13, con: 14, int: 0, wis: 14, chr: 0 };
    expect(meetsClassMinimums(good, Classes.ranger)).toBe(true);
    expect(meetsClassMinimums({ ...good, str: 12 }, Classes.ranger)).toBe(false);
    expect(meetsClassMinimums({ ...good, con: 13 }, Classes.ranger)).toBe(false);
  });

  it('druid requires wis 12, chr 15', () => {
    const good = { str: 0, dex: 0, con: 0, int: 0, wis: 12, chr: 15 };
    expect(meetsClassMinimums(good, Classes.druid)).toBe(true);
    expect(meetsClassMinimums({ ...good, chr: 14 }, Classes.druid)).toBe(false);
  });

  it('illusionist requires dex 16, int 9', () => {
    const good = { str: 0, dex: 16, con: 0, int: 9, wis: 0, chr: 0 };
    expect(meetsClassMinimums(good, Classes.illusionist)).toBe(true);
    expect(meetsClassMinimums({ ...good, dex: 15 }, Classes.illusionist)).toBe(false);
    expect(meetsClassMinimums({ ...good, int: 8 },  Classes.illusionist)).toBe(false);
  });

  it('bard requires dex 12, int 13, chr 15', () => {
    const good = { str: 0, dex: 12, con: 0, int: 13, wis: 0, chr: 15 };
    expect(meetsClassMinimums(good, Classes.bard)).toBe(true);
    expect(meetsClassMinimums({ ...good, dex: 11 }, Classes.bard)).toBe(false);
    expect(meetsClassMinimums({ ...good, int: 12 }, Classes.bard)).toBe(false);
    expect(meetsClassMinimums({ ...good, chr: 14 }, Classes.bard)).toBe(false);
  });
});
