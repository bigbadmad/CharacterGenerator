import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cv, buildSheetData, exportCharacterSheet, CharacterData } from '../src/exporter.js';

const baseChar: CharacterData = {
  className: 'fighter',
  level: '3',
  race: 'human',
  str: '16', dex: '13', con: '14', int: '10', wis: '12', chr: '9',
  hitProb: '0', dmgAdj: '1', wgtAllow: '70', maxPress: '195', opnDoor: '8', bbLg: '10',
  rctnAdj: '0', missileAdj: '0', defAdj: '-2',
  hpAdj: '0', sysShk: '88', resSurv: '92', poisonSv: '0', regen: '0',
  noLang: '2', splLvl: '5', lrnSpl: '40', splPerLvl: '7', splImun: '0',
  mgcDefAdj: '0', bonusSp: '1', chnFail: '5', splImmune: '0',
  mxHench: '4', loyalBs: '0', reactAdj: '0',
  hp: '24', thac0: '18',
  para: '13', rod: '15', poly: '14', breath: '16', spell: '15',
};

// -- cv() --------------------------------------------------------------------

describe('cv()', () => {
  it('converts numeric strings to numbers', () => {
    expect(cv('13')).toBe(13);
    expect(cv('0')).toBe(0);
    expect(cv('-2')).toBe(-2);
  });

  it('returns empty string for empty input', () => {
    expect(cv('')).toBe('');
  });

  it('preserves non-numeric strings', () => {
    expect(cv('Nil')).toBe('Nil');
    expect(cv('fighter')).toBe('fighter');
  });

  it('converts decimal strings to numbers', () => {
    expect(cv('3.14')).toBe(3.14);
    expect(cv('0.5')).toBe(0.5);
  });
});

// -- buildSheetData() --------------------------------------------------------

describe('buildSheetData()', () => {
  let aoa: (string | number)[][];

  beforeEach(() => {
    aoa = buildSheetData(baseChar);
  });

  it('produces 50 rows', () => {
    expect(aoa).toHaveLength(50);
  });

  it('every row has 15 columns', () => {
    aoa.forEach((row, i) => {
      expect(row, `row ${i} length`).toHaveLength(15);
    });
  });

  // Row indices are 0-based; the CSV rows are 1-based in comments.

  it('row 0 contains header labels', () => {
    expect(aoa[0][0]).toBe('Name');
    expect(aoa[0][1]).toBe('Class');
    expect(aoa[0][2]).toBe('Level');
  });

  it('row 1 contains class and level', () => {
    expect(aoa[1][1]).toBe('fighter');
    expect(aoa[1][2]).toBe(3); // cv('3') → 3
  });

  it('row 5 contains section headers', () => {
    expect(aoa[5][0]).toBe('Abilities');
    expect(aoa[5][7]).toBe('Movement');
    expect(aoa[5][11]).toBe('Saving throws');
  });

  it('row 6 contains strength labels and para save', () => {
    expect(aoa[6][0]).toBe('Strength');
    expect(aoa[6][11]).toBe('Paralyze/Poison');
    expect(aoa[6][12]).toBe(13); // cv(para='13')
  });

  it('row 7 contains strength data and rod save', () => {
    expect(aoa[7][0]).toBe(16); // str
    expect(aoa[7][1]).toBe(0);  // hitProb
    expect(aoa[7][2]).toBe(1);  // dmgAdj
    expect(aoa[7][3]).toBe(70); // wgtAllow
    expect(aoa[7][11]).toBe('Rod/Staff/Wand');
    expect(aoa[7][12]).toBe(15); // rod
  });

  it('row 9 contains dexterity data and breath save', () => {
    expect(aoa[9][0]).toBe(13); // dex
    expect(aoa[9][11]).toBe('Breath weapon');
    expect(aoa[9][12]).toBe(16); // breath
  });

  it('row 10 contains constitution labels and spell save', () => {
    expect(aoa[10][0]).toBe('Constitution');
    expect(aoa[10][11]).toBe('Spells');
    expect(aoa[10][12]).toBe(15); // spell
  });

  it('row 11 contains constitution data', () => {
    expect(aoa[11][0]).toBe(14); // con
  });

  it('row 19 contains armour section header', () => {
    expect(aoa[19][0]).toBe('Armour');
    expect(aoa[19][3]).toBe('Hit points');
  });

  it('row 21 contains hp and thac0', () => {
    expect(aoa[21][4]).toBe(24);  // hp
    expect(aoa[21][8]).toBe(18);  // thac0
  });

  it('spell level rows 41-49 contain 1-9 in column 0', () => {
    for (let i = 0; i < 9; i++) {
      expect(aoa[41 + i][0]).toBe(i + 1);
    }
  });

  it('handles empty ability values gracefully', () => {
    const empty: CharacterData = { ...baseChar, str: '', hp: '', thac0: '' };
    const rows = buildSheetData(empty);
    expect(rows[7][0]).toBe('');  // empty str → ''
    expect(rows[21][4]).toBe(''); // empty hp  → ''
    expect(rows[21][8]).toBe(''); // empty thac0 → ''
  });

  it('row 8 contains dexterity labels and poly save', () => {
    expect(aoa[8][0]).toBe('Dexterity');
    expect(aoa[8][11]).toBe('Petrify/Polymorph');
    expect(aoa[8][12]).toBe(14); // cv(poly='14')
  });

  it('row 12 contains intelligence labels', () => {
    expect(aoa[12][0]).toBe('Intelligence');
  });

  it('row 13 contains intelligence data', () => {
    expect(aoa[13][0]).toBe(10); // int
    expect(aoa[13][1]).toBe(2);  // noLang
    expect(aoa[13][2]).toBe(5);  // splLvl
    expect(aoa[13][3]).toBe(40); // lrnSpl
    expect(aoa[13][4]).toBe(7);  // splPerLvl
    expect(aoa[13][5]).toBe(0);  // splImun
  });

  it('row 14 contains wisdom labels', () => {
    expect(aoa[14][0]).toBe('Wisdom');
  });

  it('row 15 contains wisdom data', () => {
    expect(aoa[15][0]).toBe(12); // wis
    expect(aoa[15][1]).toBe(0);  // mgcDefAdj
    expect(aoa[15][2]).toBe(1);  // bonusSp
    expect(aoa[15][3]).toBe(5);  // chnFail
    expect(aoa[15][4]).toBe(0);  // splImmune
  });

  it('row 16 contains charisma labels', () => {
    expect(aoa[16][0]).toBe('Charisma');
  });

  it('row 17 contains charisma data', () => {
    expect(aoa[17][0]).toBe(9); // chr
    expect(aoa[17][1]).toBe(4); // mxHench
    expect(aoa[17][2]).toBe(0); // loyalBs
    expect(aoa[17][3]).toBe(0); // reactAdj
  });

  it('row 40 contains spells/day header', () => {
    expect(aoa[40][0]).toBe('Spells/day');
    expect(aoa[40][2]).toBe('Spell list');
    expect(aoa[40][11]).toBe('Notes');
  });
});

// -- exportCharacterSheet() --------------------------------------------------

describe('exportCharacterSheet()', () => {
  const mockWriteFile = vi.fn();
  const mockAoaToSheet = vi.fn().mockReturnValue({});
  const mockBookNew = vi.fn().mockReturnValue({});
  const mockBookAppendSheet = vi.fn();

  beforeEach(() => {
    (globalThis as any).XLSX = {
      utils: {
        aoa_to_sheet: mockAoaToSheet,
        book_new: mockBookNew,
        book_append_sheet: mockBookAppendSheet,
      },
      writeFile: mockWriteFile,
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).XLSX;
  });

  it('calls XLSX.writeFile once', () => {
    exportCharacterSheet(baseChar);
    expect(mockWriteFile).toHaveBeenCalledOnce();
  });

  it('uses class and level in filename', () => {
    exportCharacterSheet(baseChar);
    const [, filename] = mockWriteFile.mock.calls[0];
    expect(filename).toBe('fighter_Lvl3_Sheet.xlsx');
  });

  it('replaces + with - in multiclass filename', () => {
    exportCharacterSheet({ ...baseChar, className: 'fighter+mage', level: '5' });
    const [, filename] = mockWriteFile.mock.calls[0];
    expect(filename).toBe('fighter-mage_Lvl5_Sheet.xlsx');
  });

  it('falls back to "Character" when className is empty', () => {
    exportCharacterSheet({ ...baseChar, className: '' });
    const [, filename] = mockWriteFile.mock.calls[0];
    expect(filename).toMatch(/^Character_Lvl/);
  });

  it('passes the aoa to aoa_to_sheet', () => {
    exportCharacterSheet(baseChar);
    const [aoa] = mockAoaToSheet.mock.calls[0];
    expect(Array.isArray(aoa)).toBe(true);
    expect(aoa).toHaveLength(50);
  });
});
