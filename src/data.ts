import { Classes, Races, RaceClassLimits, THAC0S, ISavingThrows } from './types.js';

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
