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
}

/** Convert a string to a number if possible, otherwise keep as string */
function cv(val: string): string | number {
  if (val === '' || val === null || val === undefined) return '';
  const n = Number(val);
  return isNaN(n) ? val : n;
}

export function exportCharacterSheet(d: CharacterData): void {
  const E = '';

  // Array-of-arrays matching the original character sheet CSV layout.
  // Columns A–O (indices 0–14). Data values are placed in the row below their label row.
  // Saving throw values go in col M (index 12) on the same row as their col-L label.
  const aoa: (string | number)[][] = [
    // Row 1  — labels: Name / Class / Level / ...
    ['Name', 'Class', 'Level', 'Appearance', 'Religion', 'Hair', E, E, E, E, E, E, E, E, E],
    // Row 2  — data
    [E, d.className, cv(d.level), E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 3  — labels: biography
    ['Alignment', 'Weight', 'Height', 'Social Class', 'Eyes', 'Family/clan', E, E, E, E, E, E, E, E, E],
    // Row 4  — data (manual fill)
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 5  — empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 6  — section headers
    ['Abilities', E, E, E, E, E, E, 'Movement', E, E, E, 'Saving throws', E, E, E],
    // Row 7  — Strength labels | Movement: Base | Save label: Paralyze/Poison | Save value
    ['Strength', 'hit prob', 'dmg adjust', 'wgt allow', 'max press', 'opn door', 'BB/LG', 'Base', E, E, E, 'Paralyze/Poison', cv(d.para), E, E],
    // Row 8  — Strength data | Movement: Light sub-label | Save label: Rod/Staff/Wand | Save value
    [cv(d.str), cv(d.hitProb), cv(d.dmgAdj), cv(d.wgtAllow), cv(d.maxPress), cv(d.opnDoor), cv(d.bbLg), 'Light', E, E, E, 'Rod/Staff/Wand', cv(d.rod), E, E],
    // Row 9  — Dexterity labels | Movement: Mod | Save label: Petrify/Polymorph | Save value
    ['Dexterity', 'rctn adj', 'missile adj', 'def adj', E, E, E, 'Mod', E, E, E, 'Petrify/Polymorph', cv(d.poly), E, E],
    // Row 10 — Dexterity data | Movement: Heavy | Save label: Breath weapon | Save value
    [cv(d.dex), cv(d.rctnAdj), cv(d.missileAdj), cv(d.defAdj), E, E, E, 'Heavy', E, E, E, 'Breath weapon', cv(d.breath), E, E],
    // Row 11 — Constitution labels | Movement: Svr | Save label: Spells | Save value
    ['Constitution', 'HP adj', 'sys shk', 'res surv', 'poison sv', 'regen', E, 'Svr', E, E, E, 'Spells', cv(d.spell), E, E],
    // Row 12 — Constitution data | Movement: Jog x2
    [cv(d.con), cv(d.hpAdj), cv(d.sysShk), cv(d.resSurv), cv(d.poisonSv), cv(d.regen), E, 'Jog', 'x2', E, E, E, E, E, E],
    // Row 13 — Intelligence labels | Movement: Run x3
    ['Intelligence', 'no. lang', 'spl lvl', 'lrn spl', 'spl/lvl', 'spl immune', E, 'Run', 'x3', E, E, E, E, E, E],
    // Row 14 — Intelligence data | Movement: Run x4
    [cv(d.int), cv(d.noLang), cv(d.splLvl), cv(d.lrnSpl), cv(d.splPerLvl), cv(d.splImun), E, 'Run', 'x4', E, E, E, E, E, E],
    // Row 15 — Wisdom labels | Movement: Run x5
    ['Wisdom', 'mgc def adj', 'bonus spls', 'spl fail', 'spl immune', E, E, 'Run', 'x5', E, E, E, E, E, E],
    // Row 16 — Wisdom data
    [cv(d.wis), cv(d.mgcDefAdj), cv(d.bonusSp), cv(d.chnFail), cv(d.splImmune), E, E, E, E, E, E, E, E, E, E],
    // Row 17 — Charisma labels
    ['Charisma', 'mx hench', 'loyal bse', 'rctn adj', E, E, E, E, E, E, E, E, E, E, E],
    // Row 18 — Charisma data
    [cv(d.chr), cv(d.mxHench), cv(d.loyalBs), cv(d.reactAdj), E, E, E, E, E, E, E, E, E, E, E],
    // Row 19 — empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 20 — section headers: Armour / Hit points / Weapon chart
    ['Armour', E, E, 'Hit points', E, 'Weapon chart', E, E, E, E, E, E, E, E, E],
    // Row 21 — column headers
    ['AC', E, 'Armour type', E, 'Wounds', 'Weapon', 'No. att/rnd', 'Att adj/dmg adj', 'Thac0', 'Dmg sm/l', 'Range', 'Weight', 'Size', 'Type', 'Speed'],
    // Row 22 — first AC entry / HP (col E) / THAC0 (col I)
    ['Surprised', E, E, E, cv(d.hp), E, E, E, cv(d.thac0), E, E, E, E, E, E],
    // Row 23
    ['Shieldless', E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 24
    ['Rear', E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 25 — empty
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 26 — Special attacks / Proficiencies / Equipment headers
    ['Special attacks', E, E, E, E, 'Proficiencies/skills/languages', E, E, E, 'Equipment', E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 30 — Special Abilities
    ['Special Abilities', E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    // Row 35 — XP / Money / Valuables / Magic items headers
    ['Experience Points', E, E, 'Money', E, 'Valuables', E, E, E, 'Magic items', E, E, E, E, E],
    [E, E, E, 'PP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'EP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'GP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'SP', E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, 'CP', E, E, E, E, E, E, E, E, E, E, E],
    // Row 41 — Spells/day header
    ['Spells/day', E, 'Spell list', E, E, E, E, E, E, E, E, 'Notes', E, E, E],
    // Rows 42–50 — spell levels 1–9
    [1, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [2, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [4, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [5, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [6, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [7, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [8, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [9, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
  ];

  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Character Sheet');

  const safeName = (d.className || 'Character').replace(/\+/g, '-');
  XLSX.writeFile(wb, `${safeName}_Lvl${d.level || '1'}_Sheet.xlsx`);
}
