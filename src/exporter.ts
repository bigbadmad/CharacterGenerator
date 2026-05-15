// SheetJS is loaded via CDN script tag in index.html
declare const XLSX: any;

export interface CharacterData {
  className: string;
  level: string;
  race: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  chr: string;
  hitProb: string;
  dmgAdj: string;
  wgtAllow: string;
  maxPress: string;
  opnDoor: string;
  bbLg: string;
  rctnAdj: string;
  missileAdj: string;
  defAdj: string;
  hpAdj: string;
  sysShk: string;
  resSurv: string;
  poisonSv: string;
  regen: string;
  noLang: string;
  splLvl: string;
  lrnSpl: string;
  splPerLvl: string;
  splImun: string;
  mgcDefAdj: string;
  bonusSp: string;
  chnFail: string;
  splImmune: string;
  mxHench: string;
  loyalBs: string;
  reactAdj: string;
  hp: string;
  thac0: string;
  para: string;
  rod: string;
  poly: string;
  breath: string;
  spell: string;
  height: string;
  weight: string;
  age: string;
  startingGold: string;
  alignment: string;
  wpSlots: string;
  nwpSlots: string;
  // Thief skill totals
  thiefPP?: string; thiefOL?: string; thiefFRT?: string; thiefMS?: string;
  thiefHIS?: string; thiefDN?: string; thiefCW?: string; thiefRL?: string;
  // Bard skill totals
  bardPP?: string; bardDN?: string; bardCW?: string; bardRL?: string;
  // Ranger skill totals
  rangerMS?: string; rangerHIS?: string;
  // Spell slots per level (index 0 = 1st level)
  spellSlots?: string[];
}

/** Convert a string to a number if possible, otherwise keep as string */
export function cv(val: string): string | number {
  if (val === '' || val === null || val === undefined) return '';
  const n = Number(val);
  return isNaN(n) ? val : n;
}

/** Build the array-of-arrays sheet data from a CharacterData object */
export function buildSheetData(d: CharacterData): (string | number)[][] {
  const E = '';
  // Columns A–O (indices 0–14). Data values are placed in the row below their label row.
  // Saving throw values go in col M (index 12) on the same row as their col-L label.
  const aoa: (string | number)[][] = [
    // Row 1  - labels: Name / Class / Level / ...
    ['Name', 'Class', 'Level', 'Appearance', 'Religion', 'Hair', E, E, E, E, E, E, E, E, E],
    // Row 2  - data
    [E, d.className, cv(d.level), E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 3  - labels: biography
    ['Alignment', 'Weight', 'Height', 'Age', 'Eyes', 'Family/clan', E, E, E, E, E, E, E, E, E],
    // Row 4  - data
    [d.alignment, cv(d.weight), d.height, cv(d.age), E, E, E, E, E, E, E, E, E, E, E],
    // Row 5  - empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 6  - section headers
    ['Abilities', E, E, E, E, E, E, 'Movement', E, E, E, 'Saving throws', E, E, E],
    // Row 7  - Strength labels | Movement: Base | Save label: Paralyze/Poison | Save value
    ['Strength', 'hit prob', 'dmg adjust', 'wgt allow', 'max press', 'opn door', 'BB/LG', 'Base', E, E, E, 'Paralyze/Poison', cv(d.para), E, E],
    // Row 8  - Strength data | Movement: Light sub-label | Save label: Rod/Staff/Wand | Save value
    [cv(d.str), cv(d.hitProb), cv(d.dmgAdj), cv(d.wgtAllow), cv(d.maxPress), cv(d.opnDoor), cv(d.bbLg), 'Light', E, E, E, 'Rod/Staff/Wand', cv(d.rod), E, E],
    // Row 9  - Dexterity labels | Movement: Mod | Save label: Petrify/Polymorph | Save value
    ['Dexterity', 'rctn adj', 'missile adj', 'def adj', E, E, E, 'Mod', E, E, E, 'Petrify/Polymorph', cv(d.poly), E, E],
    // Row 10 - Dexterity data | Movement: Heavy | Save label: Breath weapon | Save value
    [cv(d.dex), cv(d.rctnAdj), cv(d.missileAdj), cv(d.defAdj), E, E, E, 'Heavy', E, E, E, 'Breath weapon', cv(d.breath), E, E],
    // Row 11 - Constitution labels | Movement: Svr | Save label: Spells | Save value
    ['Constitution', 'HP adj', 'sys shk', 'res surv', 'poison sv', 'regen', E, 'Svr', E, E, E, 'Spells', cv(d.spell), E, E],
    // Row 12 - Constitution data | Movement: Jog x2
    [cv(d.con), cv(d.hpAdj), cv(d.sysShk), cv(d.resSurv), cv(d.poisonSv), cv(d.regen), E, 'Jog', 'x2', E, E, E, E, E, E],
    // Row 13 - Intelligence labels | Movement: Run x3
    ['Intelligence', 'no. lang', 'spl lvl', 'lrn spl', 'spl/lvl', 'spl immune', E, 'Run', 'x3', E, E, E, E, E, E],
    // Row 14 - Intelligence data | Movement: Run x4
    [cv(d.int), cv(d.noLang), cv(d.splLvl), cv(d.lrnSpl), cv(d.splPerLvl), cv(d.splImun), E, 'Run', 'x4', E, E, E, E, E, E],
    // Row 15 - Wisdom labels | Movement: Run x5
    ['Wisdom', 'mgc def adj', 'bonus spls', 'spl fail', 'spl immune', E, E, 'Run', 'x5', E, E, E, E, E, E],
    // Row 16 - Wisdom data
    [cv(d.wis), cv(d.mgcDefAdj), cv(d.bonusSp), cv(d.chnFail), cv(d.splImmune), E, E, E, E, E, E, E, E, E, E],
    // Row 17 - Charisma labels
    ['Charisma', 'mx hench', 'loyal bse', 'rctn adj', E, E, E, E, E, E, E, E, E, E, E],
    // Row 18 - Charisma data
    [cv(d.chr), cv(d.mxHench), cv(d.loyalBs), cv(d.reactAdj), E, E, E, E, E, E, E, E, E, E, E],
    // Row 19 - empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 20 - section headers: Armour / Hit points / Weapon chart
    ['Armour', E, E, 'Hit points', E, 'Weapon chart', E, E, E, E, E, E, E, E, E],
    // Row 21 - column headers
    ['AC', E, 'Armour type', E, 'Wounds', 'Weapon', 'No. att/rnd', 'Att adj/dmg adj', 'Thac0', 'Dmg sm/l', 'Range', 'Weight', 'Size', 'Type', 'Speed'],
    // Row 22 - first AC entry / HP (col E) / THAC0 (col I)
    ['Surprised', E, E, E, cv(d.hp), E, E, E, cv(d.thac0), E, E, E, E, E, E],
    // Row 23
    ['Shieldless', E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 24
    ['Rear', E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 25 - empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 26 - Special attacks / Proficiencies / Equipment headers
    ['Special attacks', E, E, E, E, 'Proficiencies/skills/languages', E, E, E, 'Equipment', E, E, E, E, E],
    [E, E, E, E, E, d.wpSlots ? `Weapon slots: ${d.wpSlots}` : E, E, d.nwpSlots ? `NWP slots: ${d.nwpSlots}` : E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 30 - Special Abilities
    ['Special Abilities', E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 31 - Thief skills part 1
    [d.thiefPP ? 'Thief skills' : E, 'PP:', cv(d.thiefPP ?? ''), 'OL:', cv(d.thiefOL ?? ''), 'FRT:', cv(d.thiefFRT ?? ''), 'MS:', cv(d.thiefMS ?? ''), E, E, E, E, E, E],
    // Row 32 - Thief skills part 2
    [E, 'HIS:', cv(d.thiefHIS ?? ''), 'DN:', cv(d.thiefDN ?? ''), 'CW:', cv(d.thiefCW ?? ''), 'RL:', cv(d.thiefRL ?? ''), E, E, E, E, E, E],
    // Row 33 - Bard + Ranger skills
    [d.bardPP ? 'Bard skills' : E, 'PP:', cv(d.bardPP ?? ''), 'DN:', cv(d.bardDN ?? ''), 'CW:', cv(d.bardCW ?? ''), 'RL:', cv(d.bardRL ?? ''), d.rangerMS ? 'Ranger' : E, 'MS:', cv(d.rangerMS ?? ''), 'HIS:', cv(d.rangerHIS ?? ''), E],
    // Row 34 - empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 35 - XP / Money / Valuables / Magic items headers
    ['Experience Points', E, E, 'Money', E, 'Valuables', E, E, E, 'Magic items', E, E, E, E, E],
    [E, E, E, 'PP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'EP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'GP', cv(d.startingGold), E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'SP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'CP', E, E, E, E, E, E, E, E, E, E, E],
    // Row 41 - Spells/day header
    ['Spells/day', 'Slots', 'Spell list', E, E, E, E, E, E, E, E, 'Notes', E, E, E],
    // Rows 42–50 - spell levels 1–9
    [1, cv(d.spellSlots?.[0] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [2, cv(d.spellSlots?.[1] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [3, cv(d.spellSlots?.[2] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [4, cv(d.spellSlots?.[3] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [5, cv(d.spellSlots?.[4] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [6, cv(d.spellSlots?.[5] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [7, cv(d.spellSlots?.[6] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [8, cv(d.spellSlots?.[7] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
    [9, cv(d.spellSlots?.[8] ?? ''), E, E, E, E, E, E, E, E, E, E, E, E, E],
  ];
  return aoa;
}

export function exportCharacterSheet(d: CharacterData): void {
  const aoa = buildSheetData(d);
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Character Sheet');

  const safeName = (d.className || 'Character').replace(/\+/g, '-');
  XLSX.writeFile(wb, `${safeName}_Lvl${d.level || '1'}_Sheet.xlsx`);
}
