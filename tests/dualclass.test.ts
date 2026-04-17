import { describe, it, expect } from 'vitest';

import { Classes } from '../src/types.js';
import {
  primeRequisite,
  DUAL_FROM_MIN,
  DUAL_TO_MIN,
  getEligibleDualClassCombos,
  dualClassLabel,
} from '../src/dualclass.js';

describe('dual-class rules', () => {
  it('prime requisites map warrior classes to str', () => {
    expect(primeRequisite[Classes.fighter]).toBe('str');
    expect(primeRequisite[Classes.paladin]).toBe('str');
    expect(primeRequisite[Classes.ranger]).toBe('str');
  });

  it('prime requisites map priest classes to wis', () => {
    expect(primeRequisite[Classes.cleric]).toBe('wis');
    expect(primeRequisite[Classes.druid]).toBe('wis');
  });

  it('prime requisites map wizard classes to int', () => {
    expect(primeRequisite[Classes.mage]).toBe('int');
    expect(primeRequisite[Classes.illusionist]).toBe('int');
  });

  it('prime requisites map rogue classes to dex', () => {
    expect(primeRequisite[Classes.thief]).toBe('dex');
    expect(primeRequisite[Classes.bard]).toBe('dex');
  });

  it('DUAL_FROM_MIN is 15 and DUAL_TO_MIN is 17', () => {
    expect(DUAL_FROM_MIN).toBe(15);
    expect(DUAL_TO_MIN).toBe(17);
  });

  it('returns no combos when all scores are zero', () => {
    const abil = { str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0 };
    expect(getEligibleDualClassCombos(abil)).toEqual([]);
  });

  it('requires 15+ in from-class prime req', () => {
    // str=14 is one short for warrior from-classes
    const abil = { str: 14, dex: 18, con: 0, int: 17, wis: 17, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    const froms = combos.map(([from]) => from);
    expect(froms).not.toContain(Classes.fighter);
    expect(froms).not.toContain(Classes.paladin);
    expect(froms).not.toContain(Classes.ranger);
  });

  it('requires 17+ in to-class prime req', () => {
    // str=18 qualifies fighter as from; int=16 is one short for mage as to
    const abil = { str: 18, dex: 9, con: 0, int: 16, wis: 9, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    const tos = combos.map(([, to]) => to);
    expect(tos).not.toContain(Classes.mage);
    expect(tos).not.toContain(Classes.illusionist);
  });

  it('does not include same-class combos', () => {
    // All stats high enough to qualify any class as either from or to
    const abil = { str: 18, dex: 18, con: 0, int: 18, wis: 18, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    for (const [from, to] of combos) {
      expect(from).not.toBe(to);
    }
  });

  it('fighter → mage is eligible when str>=15 and int>=17', () => {
    const abil = { str: 15, dex: 9, con: 0, int: 17, wis: 9, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    const labels = combos.map(([f, t]) => `${f}>${t}`);
    expect(labels).toContain('fighter>mage');
  });

  it('fighter → mage is not eligible when str=15 but int=16', () => {
    const abil = { str: 15, dex: 9, con: 0, int: 16, wis: 9, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    const labels = combos.map(([f, t]) => `${f}>${t}`);
    expect(labels).not.toContain('fighter>mage');
  });

  it('mage → fighter is eligible when int>=15 and str>=17', () => {
    const abil = { str: 17, dex: 9, con: 0, int: 15, wis: 9, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    const labels = combos.map(([f, t]) => `${f}>${t}`);
    expect(labels).toContain('mage>fighter');
  });

  it('all nine classes appear as potential from-classes when all prime reqs >= 15', () => {
    const abil = { str: 18, dex: 18, con: 0, int: 18, wis: 18, chr: 0 };
    const combos = getEligibleDualClassCombos(abil);
    const fromSet = new Set(combos.map(([f]) => f));
    expect(fromSet.size).toBe(9);
  });

  it('dualClassLabel formats as "from → to"', () => {
    expect(dualClassLabel(Classes.fighter, Classes.mage)).toBe('fighter → mage');
    expect(dualClassLabel(Classes.cleric, Classes.thief)).toBe('cleric → thief');
  });
});
