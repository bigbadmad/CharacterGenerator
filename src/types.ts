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

export enum Races {
  human = 'human',
  dwarf = 'dwarf',
  elf = 'elf',
  gnome = 'gnome',
  halfling = 'halfling',
  halfElf = 'halfElf'
}
