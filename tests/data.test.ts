import { describe, it, expect } from 'vitest';

// Import built JS to avoid TS import extension issues
import { raceClassLimits, thac0s, savingThrows, heightWeightTable, startingAgeTable, startingMoneyTable, classAlignmentRestrictions, proficiencySlotData, spellSlotsPerDay, thiefBaseSkills, thiefRaceAdjustments, bardBaseSkills, rangerSkillsByLevel } from '../dist/data.js';
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

describe('classAlignmentRestrictions', () => {
  it('paladin is restricted to Lawful Good only', () => {
    expect(classAlignmentRestrictions[Classes.paladin]).toEqual(['LG']);
  });

  it('druid is restricted to True Neutral only', () => {
    expect(classAlignmentRestrictions[Classes.druid]).toEqual(['TN']);
  });

  it('ranger is restricted to good alignments only', () => {
    const allowed = classAlignmentRestrictions[Classes.ranger]!;
    expect(allowed).toContain('LG');
    expect(allowed).toContain('NG');
    expect(allowed).toContain('CG');
    expect(allowed).not.toContain('LE');
    expect(allowed).not.toContain('CE');
    expect(allowed).not.toContain('NE');
  });

  it('fighter has no alignment restriction', () => {
    expect(classAlignmentRestrictions[Classes.fighter]).toBeUndefined();
  });
});

describe('proficiencySlotData', () => {
  it('warrior has 4 initial weapon profs', () => {
    expect(proficiencySlotData.warrior.wp.initial).toBe(4);
  });

  it('wizard has 1 initial weapon prof', () => {
    expect(proficiencySlotData.wizard.wp.initial).toBe(1);
  });

  it('all groups have positive initial and per values', () => {
    for (const group of ['warrior', 'rogue', 'priest', 'wizard'] as const) {
      const g = proficiencySlotData[group];
      expect(g.wp.initial).toBeGreaterThan(0);
      expect(g.nwp.initial).toBeGreaterThan(0);
      expect(g.wp.per).toBeGreaterThan(0);
      expect(g.nwp.per).toBeGreaterThan(0);
    }
  });
});

describe('spellSlotsPerDay', () => {
  it('mage has 20 levels of spell slots', () => {
    expect(spellSlotsPerDay[Classes.mage]).toHaveLength(20);
  });

  it('mage level 1 has exactly 1 first-level spell and no higher', () => {
    const slots = spellSlotsPerDay[Classes.mage]![0];
    expect(slots[0]).toBe(1);
    expect(slots.slice(1).every((n: number) => n === 0)).toBe(true);
  });

  it('mage level 20 has 9th-level spells', () => {
    const slots = spellSlotsPerDay[Classes.mage]![19];
    expect(slots[8]).toBeGreaterThan(0);
  });

  it('cleric has 20 levels of spell slots with 7 spell levels', () => {
    const table = spellSlotsPerDay[Classes.cleric]!;
    expect(table).toHaveLength(20);
    expect(table[0]).toHaveLength(7);
  });

  it('bard level 1 has no spells', () => {
    const slots = spellSlotsPerDay[Classes.bard]![0];
    expect(slots.every((n: number) => n === 0)).toBe(true);
  });

  it('bard level 2 has 1 first-level spell', () => {
    expect(spellSlotsPerDay[Classes.bard]![1][0]).toBe(1);
  });

  it('fighter has no spell slot entry', () => {
    expect(spellSlotsPerDay[Classes.fighter]).toBeUndefined();
  });

  it('illusionist shares the same table as mage', () => {
    expect(spellSlotsPerDay[Classes.illusionist]).toBe(spellSlotsPerDay[Classes.mage]);
  });

  it('paladin has 20 levels of spell slots', () => {
    expect(spellSlotsPerDay[Classes.paladin]).toHaveLength(20);
  });

  it('paladin levels 1-8 have no spells', () => {
    for (let i = 0; i < 8; i++) {
      const slots = spellSlotsPerDay[Classes.paladin]![i];
      expect(slots.every((n: number) => n === 0), `level ${i+1} should have no spells`).toBe(true);
    }
  });

  it('paladin level 9 has 1 first-level spell only', () => {
    const slots = spellSlotsPerDay[Classes.paladin]![8];
    expect(slots[0]).toBe(1);
    expect(slots.slice(1).every((n: number) => n === 0)).toBe(true);
  });

  it('paladin level 11 gains first 2nd-level spell', () => {
    expect(spellSlotsPerDay[Classes.paladin]![10]).toEqual([2, 1, 0, 0]);
  });

  it('paladin level 13 gains first 3rd-level spell', () => {
    expect(spellSlotsPerDay[Classes.paladin]![12]).toEqual([2, 2, 1, 0]);
  });

  it('paladin level 15 gains first 4th-level spell (3/2/1/1)', () => {
    expect(spellSlotsPerDay[Classes.paladin]![14]).toEqual([3, 2, 1, 1]);
  });

  it('paladin level 16 has correct slots (3/3/2/1)', () => {
    expect(spellSlotsPerDay[Classes.paladin]![15]).toEqual([3, 3, 2, 1]);
  });

  it('paladin level 20 has 3 slots of each of 4 spell levels', () => {
    const slots = spellSlotsPerDay[Classes.paladin]![19];
    expect(slots).toEqual([3, 3, 3, 3]);
  });

  it('ranger has 20 levels of spell slots', () => {
    expect(spellSlotsPerDay[Classes.ranger]).toHaveLength(20);
  });

  it('ranger levels 1-7 have no spells', () => {
    for (let i = 0; i < 7; i++) {
      const slots = spellSlotsPerDay[Classes.ranger]![i];
      expect(slots.every((n: number) => n === 0), `level ${i+1} should have no spells`).toBe(true);
    }
  });

  it('ranger level 8 has 1 first-level spell only', () => {
    const slots = spellSlotsPerDay[Classes.ranger]![7];
    expect(slots[0]).toBe(1);
    expect(slots.slice(1).every((n: number) => n === 0)).toBe(true);
  });

  it('ranger level 16+ has 3 slots of each of 3 spell levels', () => {
    for (let i = 15; i < 20; i++) {
      const slots = spellSlotsPerDay[Classes.ranger]![i];
      expect(slots).toEqual([3, 3, 3]);
    }
  });
});

describe('thiefBaseSkills', () => {
  it('has all 8 skill keys', () => {
    for (const key of ['pp', 'ol', 'frt', 'ms', 'his', 'dn', 'cw', 'rl']) {
      expect(thiefBaseSkills).toHaveProperty(key);
    }
  });

  it('climb walls base is 60', () => {
    expect(thiefBaseSkills.cw).toBe(60);
  });

  it('read languages base is 0', () => {
    expect(thiefBaseSkills.rl).toBe(0);
  });
});

describe('thiefRaceAdjustments', () => {
  const ALL_RACES = ['human', 'dwarf', 'elf', 'gnome', 'halfling', 'halfElf'];

  it('has entries for all six races', () => {
    for (const race of ALL_RACES) {
      expect(thiefRaceAdjustments).toHaveProperty(race);
    }
  });

  it('human has all zero adjustments', () => {
    const h = thiefRaceAdjustments['human'];
    for (const val of Object.values(h)) {
      expect(val).toBe(0);
    }
  });

  it('halfling gets a bonus to move silently and hide in shadows', () => {
    expect(thiefRaceAdjustments['halfling'].ms).toBeGreaterThan(0);
    expect(thiefRaceAdjustments['halfling'].his).toBeGreaterThan(0);
  });

  it('dwarf gets a bonus to open locks and find/remove traps', () => {
    expect(thiefRaceAdjustments['dwarf'].ol).toBeGreaterThan(0);
    expect(thiefRaceAdjustments['dwarf'].frt).toBeGreaterThan(0);
  });
});

describe('bardBaseSkills', () => {
  it('has exactly the 4 bard skills', () => {
    expect(Object.keys(bardBaseSkills)).toEqual(['pp', 'dn', 'cw', 'rl']);
  });

  it('climb walls base is 60', () => {
    expect(bardBaseSkills.cw).toBe(60);
  });

  it('read languages base is 0', () => {
    expect(bardBaseSkills.rl).toBe(0);
  });

  it('pick pockets base is 15', () => {
    expect(bardBaseSkills.pp).toBe(15);
  });
});

describe('rangerSkillsByLevel', () => {
  it('has 16 entries', () => {
    expect(rangerSkillsByLevel).toHaveLength(16);
  });

  it('level 1 has ms=15 and his=10', () => {
    expect(rangerSkillsByLevel[0]).toEqual({ ms: 15, his: 10 });
  });

  it('level 12 has ms=94 and his=77', () => {
    expect(rangerSkillsByLevel[11]).toEqual({ ms: 94, his: 77 });
  });

  it('levels 15 and 16 cap both skills at 99%', () => {
    expect(rangerSkillsByLevel[14]).toEqual({ ms: 99, his: 99 });
    expect(rangerSkillsByLevel[15]).toEqual({ ms: 99, his: 99 });
  });

  it('move silently is always higher than hide in shadows', () => {
    for (const entry of rangerSkillsByLevel) {
      expect(entry.ms).toBeGreaterThanOrEqual(entry.his);
    }
  });
});
