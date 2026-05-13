// Shared types and enums

export interface RaceClassLimits {
  human: Classes[];
  dwarf: Classes[];
  elf: Classes[];
  halfElf: Classes[];
  gnome: Classes[];
  halfling: Classes[];
}

export interface THAC0S {
  fighter: number[];
  rogue: number[];
  cleric: number[];
  mage: number[];
}

export interface ISavingThrows {
  fighter: IClassSavingThrows;
  cleric: IClassSavingThrows;
  rogue: IClassSavingThrows;
  mage: IClassSavingThrows;
}

export interface IClassSavingThrows {
  para: number[];
  rod: number[];
  poly: number[];
  breath: number[];
  spell: number[];
}

export enum Classes {
  fighter = 'fighter',
  thief = 'thief',
  cleric = 'cleric',
  mage = 'mage',
  bard = 'bard',
  paladin = 'paladin',
  ranger = 'ranger',
  druid = 'druid',
  illusionist = 'illusionist'
}

export enum Alignment {
  LG = 'LG',
  LN = 'LN',
  LE = 'LE',
  NG = 'NG',
  TN = 'TN',
  NE = 'NE',
  CG = 'CG',
  CN = 'CN',
  CE = 'CE',
}

export enum Races {
  human = 'human',
  dwarf = 'dwarf',
  elf = 'elf',
  gnome = 'gnome',
  halfling = 'halfling',
  halfElf = 'halfElf'
}

export type Gender = 'male' | 'female';

export interface PhysicalEntry {
  htBase: number;
  htDice: number;
  htSides: number;
  wtBase: number;
  wtDice: number;
  wtSides: number;
}

export interface HeightWeightTable {
  [race: string]: { male: PhysicalEntry; female: PhysicalEntry };
}

export interface AgeEntry {
  base: number;
  dice: number;
  sides: number;
}

export type AgeTable = { [race: string]: { [classKey: string]: AgeEntry } };

export interface MoneyEntry {
  dice: number;
  sides: number;
  multiplier: number;
}

export type StartingMoneyTable = { [classKey: string]: MoneyEntry };
