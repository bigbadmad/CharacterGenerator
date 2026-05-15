import { Classes, Races, Alignment, THAC0S, Gender } from './types.js';
import { raceClassLimits, thac0s, savingThrows, heightWeightTable, startingAgeTable, startingMoneyTable, classAlignmentRestrictions, proficiencySlotData, spellSlotsPerDay, thiefBaseSkills, thiefRaceAdjustments, bardBaseSkills, rangerSkillsByLevel } from './data.js';
import { comboToLabel, getEligibleMulticlassCombos, meetsClassMinimums, AbilityScores } from './multiclass.js';
import { rollDie, roll3d6, roll4d6DropLowest, rollXdY } from './dice.js';
import { exportCharacterSheet } from './exporter.js';

export class Generator {
  constructor(rollButton: HTMLInputElement) { this.rollButton = rollButton; }
  rollButton: HTMLInputElement;

  // class level variables
  hp = 0;
  ac = 10;
  level = 1;

  hitdice = 6;
  isFighter = false;

  hpAdj = 0;
  // str
  wghtAllow = 0;
  MxPres = 0;
  opDrs = 0;
  bndBrs = 0;
  hitProb = 0;
  DmgAdj = 0;

  // Physical & background
  gender: Gender | '' = '';
  height = '';
  weight = 0;
  age = 0;
  startingGold = 0;
  baseAge = 0;
  baseGold = 0;

  // Attributes
  strInit = 0;
  dexInit = 0;
  conInit = 0;
  intInit = 0;
  wisInit = 0;
  chrInit = 0;

  // racial attribute mods
  strMod = 0;
  dexMod = 0;
  conMod = 0;
  intMod = 0;
  wisMod = 0;
  chrMod = 0;

  inputOne: any;
  inputTwo: any;
  inputThree: any;
  inputFour: any;
  inputFive: any;
  inputSix: any;
  labelPercent: any;
  stat1: any;
  stat2: any;
  stat3: any;
  stat4: any;
  stat5: any;
  stat6: any;
  inputStr: any;
  inputDex: any;
  inputCon: any;
  inputWis: any;
  inputInt: any;
  inputChr: any;
  labelWgtAllow: any;
  labelMxPress: any;
  labelOpDrs: any;
  labelBndBrs: any;
  labelHitProb: any;
  labelDmgAdj: any;
  labelRctAdj: any;
  labelMislAdj: any;
  labelDefAdj: any;
  labelHpAdj: any;
  labelSysShk: any;
  labelResSurv: any;
  labelPoisSv: any;
  labelRegen: any;
  labelNoLang: any;
  labelSplLvl: any;
  labelChLrn: any;
  labelMxSplPLvl: any;
  labelSplImun: any;
  labelMagDefAdj: any;
  labelBonusSp: any;
  labelChnFail: any;
  labelSplImmune: any;
  labelMxHench: any;
  labelLoyaltyBs: any;
  labelReactAdj: any;
  labelHp: any;
  labelThac0: any;
  labelSvPara: any;
  labelSvRod: any;
  labelSvPoly: any;
  labelSvSpell: any;
  labelSvBreath: any;
  labelHeight: any;
  labelWeight: any;
  labelAge: any;
  labelGold: any;
  selectClass: any;
  selectMulticlass: any;
  selectRace: any;
  selectLevel: any;
  selectGender: any;
  rollType: any;
  spinner: any;

  // Alignment
  selectAlignment: any;

  // Proficiency slots
  profsCard: any;
  labelWpSlots: any;
  labelNwpSlots: any;

  // Spell slots
  spellsCard: any;
  spellsDl: any;

  // Thief skills
  thiefSkillsCard: any;
  tsAvail: any;
  tsUsed: any;
  tsRemain: any;
  thiefSkillBases: HTMLElement[] = [];
  thiefSkillAdds: HTMLInputElement[] = [];
  thiefSkillTotals: HTMLElement[] = [];
  thiefSkillBaseValues: number[] = [0,0,0,0,0,0,0,0];

  // Bard skills
  bardSkillsCard: any;
  bsAvail: any;
  bsUsed: any;
  bsRemain: any;
  bardSkillBases: HTMLElement[] = [];
  bardSkillAdds: HTMLInputElement[] = [];
  bardSkillTotals: HTMLElement[] = [];
  bardSkillBaseValues: number[] = [0,0,0,0];

  // Ranger skills
  rangerSkillsCard: any;
  rangerMsDisplay: HTMLElement | null = null;
  rangerHisDisplay: HTMLElement | null = null;

  setup = () => {
    this.rollButton.addEventListener('click', this.roll);
    this.getControls();
  };

  // Get the page controls
  getControls = () => {
    this.inputOne = document.getElementById('one') as HTMLInputElement;
    this.inputTwo = document.getElementById('two') as HTMLInputElement;
    this.inputThree = document.getElementById('three') as HTMLInputElement;
    this.inputFour = document.getElementById('four') as HTMLInputElement;
    this.inputFive = document.getElementById('five') as HTMLInputElement;
    this.inputSix = document.getElementById('six') as HTMLInputElement;
    this.labelPercent = document.getElementById('percent') as HTMLLabelElement;

    this.stat1 = document.getElementById('stat1') as HTMLSelectElement;
    this.stat2 = document.getElementById('stat2') as HTMLSelectElement;
    this.stat3 = document.getElementById('stat3') as HTMLSelectElement;
    this.stat4 = document.getElementById('stat4') as HTMLSelectElement;
    this.stat5 = document.getElementById('stat5') as HTMLSelectElement;
    this.stat6 = document.getElementById('stat6') as HTMLSelectElement;

    this.inputStr = document.getElementById('str') as HTMLInputElement;
    this.inputDex = document.getElementById('dex') as HTMLInputElement;
    this.inputCon = document.getElementById('con') as HTMLInputElement;
    this.inputWis = document.getElementById('wis') as HTMLInputElement;
    this.inputInt = document.getElementById('int') as HTMLInputElement;
    this.inputChr = document.getElementById('chr') as HTMLInputElement;

    this.labelWgtAllow = document.getElementById('wghtAllow') as HTMLLabelElement;
    this.labelMxPress = document.getElementById('MxPres') as HTMLLabelElement;
    this.labelOpDrs = document.getElementById('opDrs') as HTMLLabelElement;
    this.labelBndBrs = document.getElementById('bndBrs') as HTMLLabelElement;
    this.labelHitProb = document.getElementById('hitProb') as HTMLLabelElement;
    this.labelDmgAdj = document.getElementById('dmgAdj') as HTMLLabelElement;
    this.labelRctAdj = document.getElementById('rctAdj') as HTMLLabelElement;
    this.labelMislAdj = document.getElementById('mislAdj') as HTMLLabelElement;
    this.labelDefAdj = document.getElementById('defAdj') as HTMLLabelElement;
    this.labelHpAdj = document.getElementById('hpAdj') as HTMLLabelElement;
    this.labelSysShk = document.getElementById('sysShk') as HTMLLabelElement;
    this.labelResSurv = document.getElementById('resSurv') as HTMLLabelElement;
    this.labelPoisSv = document.getElementById('posSv') as HTMLLabelElement;
    this.labelRegen = document.getElementById('regen') as HTMLLabelElement;
    this.labelNoLang = document.getElementById('noOfLang') as HTMLLabelElement;
    this.labelSplLvl = document.getElementById('spellLvl') as HTMLLabelElement;
    this.labelChLrn = document.getElementById('chnLearn') as HTMLLabelElement;
    this.labelMxSplPLvl = document.getElementById('maxSplPerLvl') as HTMLLabelElement;
    this.labelSplImun = document.getElementById('splImun') as HTMLLabelElement;
    this.labelMagDefAdj = document.getElementById('magDefAdj') as HTMLLabelElement;
    this.labelBonusSp = document.getElementById('BonusSp') as HTMLLabelElement;
    this.labelChnFail = document.getElementById('chnFail') as HTMLLabelElement;
    this.labelSplImmune = document.getElementById('splImmune') as HTMLLabelElement;
    this.labelMxHench = document.getElementById('mxHench') as HTMLLabelElement;
    this.labelLoyaltyBs = document.getElementById('loyaltyBs') as HTMLLabelElement;
    this.labelReactAdj = document.getElementById('ReactAdj') as HTMLLabelElement;
    this.labelHp = document.getElementById('hp') as HTMLLabelElement;
    this.labelThac0 = document.getElementById('thaco') as HTMLElement;
    this.labelSvBreath = document.getElementById('breath') as HTMLElement;
    this.labelSvPara = document.getElementById('para') as HTMLElement;
    this.labelSvPoly = document.getElementById('poly') as HTMLElement;
    this.labelSvRod = document.getElementById('rod') as HTMLElement;
    this.labelSvSpell = document.getElementById('spell') as HTMLElement;

    this.selectRace = document.getElementById('race') as HTMLSelectElement;
    this.selectClass = document.getElementById('class') as HTMLSelectElement;
  this.selectMulticlass = document.getElementById('multiclass') as HTMLSelectElement | null;
    this.selectLevel = document.getElementById('lvl') as HTMLSelectElement;
    this.selectGender = document.getElementById('gender') as HTMLSelectElement;

    this.labelHeight = document.getElementById('charHeight') as HTMLElement;
    this.labelWeight = document.getElementById('charWeight') as HTMLElement;
    this.labelAge    = document.getElementById('charAge')    as HTMLElement;
    this.labelGold   = document.getElementById('charGold')   as HTMLElement;

    this.rollType = document.getElementsByName('rolltype') as any;
    this.spinner = document.getElementById('spinner') as HTMLElement;

    this.selectAlignment = document.getElementById('alignment') as HTMLSelectElement;
    this.profsCard = document.getElementById('profs-card');
    this.labelWpSlots = document.getElementById('wpSlots');
    this.labelNwpSlots = document.getElementById('nwpSlots');
    this.spellsCard = document.getElementById('spells-card');
    this.spellsDl = document.getElementById('spells-dl');
    this.thiefSkillsCard = document.getElementById('thief-skills-card');
    this.tsAvail = document.getElementById('ts-avail');
    this.tsUsed = document.getElementById('ts-used');
    this.tsRemain = document.getElementById('ts-remain');
    const skillIds = ['pp','ol','frt','ms','his','dn','cw','rl'];
    this.thiefSkillBases = skillIds.map(id => document.getElementById(`ts-${id}-base`) as HTMLElement);
    this.thiefSkillAdds = skillIds.map(id => document.getElementById(`ts-${id}-add`) as HTMLInputElement);
    this.thiefSkillTotals = skillIds.map(id => document.getElementById(`ts-${id}-total`) as HTMLElement);
    this.bardSkillsCard = document.getElementById('bard-skills-card');
    this.bsAvail = document.getElementById('bs-avail');
    this.bsUsed = document.getElementById('bs-used');
    this.bsRemain = document.getElementById('bs-remain');
    const bardSkillIds = ['pp','dn','cw','rl'];
    this.bardSkillBases = bardSkillIds.map(id => document.getElementById(`bs-${id}-base`) as HTMLElement);
    this.bardSkillAdds = bardSkillIds.map(id => document.getElementById(`bs-${id}-add`) as HTMLInputElement);
    this.bardSkillTotals = bardSkillIds.map(id => document.getElementById(`bs-${id}-total`) as HTMLElement);
    this.rangerSkillsCard = document.getElementById('ranger-skills-card');
    this.rangerMsDisplay = document.getElementById('rs-ms');
    this.rangerHisDisplay = document.getElementById('rs-his');
  };

  // Compose current ability scores (after racial mods) from inputs
  private getAbilities = (): AbilityScores => ({
    str: parseInt(this.inputStr.value || '0') || 0,
    dex: parseInt(this.inputDex.value || '0') || 0,
    con: parseInt(this.inputCon.value || '0') || 0,
    int: parseInt(this.inputInt.value || '0') || 0,
    wis: parseInt(this.inputWis.value || '0') || 0,
    chr: parseInt(this.inputChr.value || '0') || 0,
  });

  // Update multiclass selector based on race and ability minimums
  private refreshMulticlassOptions = () => {
    if (!this.selectMulticlass) return;
    const el = this.selectMulticlass as HTMLSelectElement;
    const raceIdx = (this.selectRace as HTMLSelectElement).selectedIndex;
    let race: Races | null = null;
    switch (raceIdx) {
      case 1: race = Races.human; break;
      case 2: race = Races.dwarf; break;
      case 3: race = Races.elf; break;
      case 4: race = Races.gnome; break;
      case 5: race = Races.halfling; break;
      case 6: race = Races.halfElf; break;
      default: race = null;
    }

    // Humans have no multiclass; hide unless eligible combos exist
    if (!race || race === Races.human) {
      el.style.display = 'none';
      el.innerHTML = '';
      return;
    }

    const abilities = this.getAbilities();
    const combos = getEligibleMulticlassCombos(race, abilities);
    el.innerHTML = '';
    for (const combo of combos) {
      const opt = document.createElement('option');
      opt.value = combo.join('+');
      opt.text = comboToLabel(combo);
      el.appendChild(opt);
    }
    el.size = Math.min(Math.max(combos.length, 2), 8);
    el.style.display = combos.length ? '' : 'none';
  };

  clearVals = (stat: HTMLSelectElement) => {
    stat.disabled = false;
    stat.selectedIndex = 0;
    const opt = stat.getElementsByTagName('option');
    Array.prototype.slice.call(opt, 0).forEach(this.enableOpts);
  };

  // roll stats and clear old values etc
  roll = () => {
    this.spinnerOn();
    this.clearControls();
    if (this.rollType[0].checked) {
      this.inputOne.value = roll4d6DropLowest();
      this.inputTwo.value = roll4d6DropLowest();
      this.inputThree.value = roll4d6DropLowest();
      this.inputFour.value = roll4d6DropLowest();
      this.inputFive.value = roll4d6DropLowest();
      this.inputSix.value = roll4d6DropLowest();
      this.spinnerOff();
    } else if (this.rollType[1].checked) {
      this.inputOne.value = roll3d6();
      this.inputTwo.value = roll3d6();
      this.inputThree.value = roll3d6();
      this.inputFour.value = roll3d6();
      this.inputFive.value = roll3d6();
      this.inputSix.value = roll3d6();
      this.spinnerOff();
    }
  };

  spinnerOn = () => { this.spinner.style.display = 'block'; };
  spinnerOff = () => { this.spinner.style.display = 'none'; };

  clearControls = () => {
    this.isFighter = false;
    this.inputOne.value = '';
    this.inputTwo.value = '';
    this.inputThree.value = '';
    this.inputFour.value = '';
    this.inputFive.value = '';
    this.inputSix.value = '';
    this.labelPercent.value = '';

    this.clearVals(this.stat1);
    this.clearVals(this.stat2);
    this.clearVals(this.stat3);
    this.clearVals(this.stat4);
    this.clearVals(this.stat5);
    this.clearVals(this.stat6);

    this.inputStr.value = '';
    this.inputDex.value = '';
    this.inputCon.value = '';
    this.inputWis.value = '';
    this.inputInt.value = '';
    this.inputChr.value = '';

    this.labelPercent.textContent = '';
    this.labelWgtAllow.textContent = '';
    this.labelMxPress.textContent = '';
    this.labelOpDrs.textContent = '';
    this.labelBndBrs.textContent = '';
    this.labelHitProb.textContent = '';
    this.labelDmgAdj.textContent = '';
    this.labelRctAdj.textContent = '';
    this.labelMislAdj.textContent = '';
    this.labelDefAdj.textContent = '';
    this.labelHpAdj.textContent = '';
    this.labelSysShk.textContent = '';
    this.labelResSurv.textContent = '';
    this.labelPoisSv.textContent = '';
    this.labelRegen.textContent = '';
    this.labelNoLang.textContent = '';
    this.labelSplLvl.textContent = '';
    this.labelChLrn.textContent = '';
    this.labelMxSplPLvl.textContent = '';
    this.labelSplImun.textContent = '';
    this.labelMagDefAdj.textContent = '';
    this.labelBonusSp.textContent = '';
    this.labelChnFail.textContent = '';
    this.labelSplImmune.textContent = '';
    this.labelMxHench.textContent = '';
    this.labelLoyaltyBs.textContent = '';
    this.labelReactAdj.textContent = '';
    this.labelHp.textContent = '';
    this.labelThac0.textContent = '';
    this.labelSvPara.textContent = '';
    this.labelSvRod.textContent = '';
    this.labelSvPoly.textContent = '';
    this.labelSvSpell.textContent = '';
    this.labelSvBreath.textContent = '';
    this.selectClass.selectedIndex = 0;
    if (this.selectMulticlass) {
      this.selectMulticlass.selectedIndex = 0;
    }
    this.selectLevel.selectedIndex = 0;
    this.selectRace.selectedIndex = 0;
    if (this.selectGender) this.selectGender.selectedIndex = 0;
    this.gender = '';
    this.height = '';
    this.weight = 0;
    this.age = 0;
    this.startingGold = 0;
    this.baseAge = 0;
    this.baseGold = 0;
    if (this.labelHeight) this.labelHeight.textContent = '';
    if (this.labelWeight) this.labelWeight.textContent = '';
    if (this.labelAge)    this.labelAge.textContent    = '';
    if (this.labelGold)   this.labelGold.textContent   = '';
    this.refreshMulticlassOptions();
    if (this.selectAlignment) {
      const sel = this.selectAlignment as HTMLSelectElement;
      sel.value = '';
      sel.disabled = false;
      for (const opt of Array.from(sel.options)) (opt as HTMLOptionElement).disabled = false;
    }
    if (this.profsCard) this.profsCard.style.display = 'none';
    if (this.spellsCard) this.spellsCard.style.display = 'none';
    if (this.thiefSkillsCard) this.thiefSkillsCard.style.display = 'none';
    this.thiefSkillAdds.forEach(input => { if (input) input.value = '0'; });
    if (this.tsAvail) this.tsAvail.textContent = '0';
    if (this.tsUsed) this.tsUsed.textContent = '0';
    if (this.tsRemain) this.tsRemain.textContent = '0';
    if (this.bardSkillsCard) this.bardSkillsCard.style.display = 'none';
    this.bardSkillAdds.forEach(input => { if (input) input.value = '0'; });
    if (this.bsAvail) this.bsAvail.textContent = '0';
    if (this.bsUsed) this.bsUsed.textContent = '0';
    if (this.bsRemain) this.bsRemain.textContent = '0';
    if (this.rangerSkillsCard) this.rangerSkillsCard.style.display = 'none';
  };

  // re-enable dropdown option
  enableOpts = (item: HTMLOptionElement) => { item.disabled = false; };
  // disable dropdown option
  disableOpts = (item: HTMLOptionElement) => { item.disabled = true; };

  getInputValue = (box: string) => {
    switch (box) {
      case 'one': return this.inputOne.value;
      case 'two': return this.inputTwo.value;
      case 'three': return this.inputThree.value;
      case 'four': return this.inputFour.value;
      case 'five': return this.inputFive.value;
      case 'six': return this.inputSix.value;
      default: throw Error('Unknown input');
    }
  };

  // assign stat from dropdown
  setOne = (ddl: HTMLSelectElement, box: string) => {
    const val = parseInt(this.getInputValue(box));
    switch (ddl.selectedIndex) {
      case 1:
        this.strInit = val;
        this.inputStr.value = this.strInit.toString();
        this.removeOption(1);
        this.checkForStrMods(this.strInit);
        break;
      case 2:
        this.dexInit = val;
        this.inputDex.value = this.dexInit.toString();
        this.removeOption(2);
        this.setDexMods(this.dexInit);
        break;
      case 3:
        this.conInit = val;
        this.inputCon.value = this.conInit.toString();
        this.removeOption(3);
        this.setConMods(this.conInit);
        break;
      case 4:
        this.intInit = val;
        this.inputInt.value = this.intInit.toString();
        this.removeOption(4);
        this.setIntMods(this.intInit);
        break;
      case 5:
        this.wisInit = val;
        this.inputWis.value = this.wisInit.toString();
        this.removeOption(5);
        this.setWisMods(this.wisInit);
        break;
      case 6:
        this.chrInit = val;
        this.inputChr.value = this.chrInit.toString();
        this.removeOption(6);
        this.setCharMods(this.chrInit);
        break;
      default:
        throw new Error('Impossible stat selected');
    }
    ddl.disabled = true;
  // Stats changed; recompute multiclass and single-class options
  this.refreshMulticlassOptions();
  this.refreshClassDdl();
  };

  // calculate strength modifiers
  checkForStrMods = (str: number) => {
    let prcStr = 101;
    if (str === 18 && this.isFighter) {
      this.spinnerOn();
      prcStr = rollDie(100);
      this.spinnerOff();
      this.labelPercent.textContent = prcStr.toString();
    }
    switch (str) {
      case 3:
        this.setStrChecks(-3, -1, 5, 10, 2, 0); break;
      case 4:
      case 5:
        this.setStrChecks(-2, -1, 10, 25, 3, 0); break;
      case 6:
      case 7:
        this.setStrChecks(-1, 0, 20, 55, 4, 0); break;
      case 8:
      case 9:
        this.setStrChecks(0, 0, 35, 90, 5, 1); break;
      case 10:
      case 11:
        this.setStrChecks(0, 0, 40, 115, 6, 2); break;
      case 12:
      case 13:
        this.setStrChecks(0, 0, 45, 140, 7, 4); break;
      case 14:
      case 15:
        this.setStrChecks(0, 0, 55, 170, 8, 7); break;
      case 16:
        this.setStrChecks(0, 1, 70, 195, 8, 10); break;
      case 17:
        this.setStrChecks(1, 1, 85, 220, 10, 13); break;
      case 18:
        switch (true) {
          case prcStr < 51:
            this.setStrChecks(1, 3, 135, 280, 12, 20); break;
          case prcStr < 76:
            this.setStrChecks(2, 3, 160, 305, 13, 25); break;
          case prcStr < 91:
            this.setStrChecks(2, 4, 185, 330, 14, 30); break;
          case prcStr < 100:
            this.setStrChecks(2, 5, 235, 380, 15, 35); break;
          case prcStr === 100:
            this.setStrChecks(3, 6, 335, 480, 16, 40); break;
          default:
            this.setStrChecks(1, 2, 110, 255, 11, 16); break;
        }
        break;
    }
  };

  // set strength adjustments
  setStrChecks = (hitProb: number, dmgAdj: number, wAllow: number, mPres: number, oDrs: number, bBrs: number) => {
    this.hitProb = hitProb;
    this.DmgAdj = dmgAdj;
    this.labelWgtAllow.textContent = wAllow.toString();
    this.labelMxPress.textContent = mPres.toString();
    this.labelOpDrs.textContent = oDrs.toString();
    this.labelBndBrs.textContent = bBrs.toString();
    this.labelHitProb.textContent = hitProb.toString();
    this.labelDmgAdj.textContent = dmgAdj.toString();
  };

  // calculate dexterity modifiers
  setDexMods = (dex: number) => {
    switch (dex) {
      case 3: this.setDexAdj(-3, -3, 4); break;
      case 4: this.setDexAdj(-2, -2, 3); break;
      case 5: this.setDexAdj(-1, -1, 2); break;
      case 6: this.setDexAdj(0, 0, 1); break;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14: this.setDexAdj(0, 0, 0); break;
      case 15: this.setDexAdj(0, 0, -1); break;
      case 16: this.setDexAdj(1, 1, -2); break;
      case 17: this.setDexAdj(2, 2, -3); break;
      case 18: this.setDexAdj(2, 2, -4); break;
      default: break;
    }
  };

  // set dexterity adj
  setDexAdj = (rAdj: number, msAdj: number, dAdj: number) => {
    this.labelRctAdj.innerHTML = rAdj.toString();
    this.labelMislAdj.innerHTML = msAdj.toString();
    this.labelDefAdj.innerHTML = dAdj.toString();
  };

  // calculate con modifiers
  setConMods = (con: number) => {
    switch (con) {
      case 3: this.setConAdj(-2, 25, 30, -2, 0); break;
      case 4: this.setConAdj(-1, 40, 45, 0, 0); break;
      case 5: this.setConAdj(-1, 45, 50, 0, 0); break;
      case 6: this.setConAdj(-1, 50, 55, 0, 0); break;
      case 7: this.setConAdj(0, 55, 60, 0, 0); break;
      case 8: this.setConAdj(0, 60, 65, 0, 0); break;
      case 9: this.setConAdj(0, 65, 70, 0, 0); break;
      case 10: this.setConAdj(0, 70, 75, 0, 0); break;
      case 11: this.setConAdj(0, 75, 80, 0, 0); break;
      case 12: this.setConAdj(0, 80, 85, 0, 0); break;
      case 13: this.setConAdj(0, 85, 90, 0, 0); break;
      case 14: this.setConAdj(0, 88, 92, 0, 0); break;
      case 15: this.setConAdj(1, 90, 94, 0, 0); break;
      case 16: this.setConAdj(2, 95, 96, 0, 0); break;
      case 17: this.setConAdj(2, 97, 98, 0, 0); break;
      case 18: this.setConAdj(2, 99, 100, 0, 0); break;
      default: break;
    }
    if (this.isFighter) {
      switch (con) {
        case 17: this.setConAdj(3, 97, 98, 0, 0); break;
        case 18: this.setConAdj(4, 99, 100, 0, 0); break;
      }
    }
  };

  // set consititution adj
  setConAdj = (hpA: number, sys: number, res: number, pos: number, reg: number) => {
    this.hpAdj = hpA;
    this.labelHpAdj.innerHTML = hpA.toString();
    this.labelSysShk.innerHTML = sys.toString();
    this.labelResSurv.innerHTML = res.toString();
    this.labelPoisSv.innerHTML = pos.toString();
    this.labelRegen.innerHTML = reg.toString();
  };

  // calculate intelligence modifiers
  setIntMods = (int: number) => {
    switch (int) {
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8: this.setIntAdj(1, 0, 0, 0, 0); break;
      case 9: this.setIntAdj(2, 4, 35, 6, 0); break;
      case 10: this.setIntAdj(2, 5, 40, 7, 0); break;
      case 11: this.setIntAdj(2, 5, 45, 7, 0); break;
      case 12: this.setIntAdj(3, 6, 50, 7, 0); break;
      case 13: this.setIntAdj(3, 6, 55, 7, 0); break;
      case 14: this.setIntAdj(4, 7, 60, 9, 0); break;
      case 15: this.setIntAdj(4, 7, 65, 11, 0); break;
      case 16: this.setIntAdj(5, 8, 70, 11, 0); break;
      case 17: this.setIntAdj(6, 8, 75, 14, 0); break;
      case 18: this.setIntAdj(7, 9, 85, 18, 0); break;
      default: break;
    }
  };

  // set intelligence adjustments
  setIntAdj = (noLan: number, sLvl: number, chnLn: number, max: number, imun: number) => {
    this.labelNoLang.innerHTML = noLan.toString();
    this.labelSplLvl.innerHTML = sLvl.toString();
    this.labelChLrn.innerHTML = chnLn.toString();
    this.labelMxSplPLvl.innerHTML = max.toString();
    this.labelSplImun.innerHTML = imun.toString();
  };

  // calculate wisdom modifiers
  setWisMods = (wis: number) => {
    switch (wis) {
      case 3: this.setWisAdj(-3, 0, 50, 0); break;
      case 4: this.setWisAdj(-2, 0, 45, 0); break;
      case 5: this.setWisAdj(-1, 0, 40, 0); break;
      case 6: this.setWisAdj(-1, 0, 35, 0); break;
      case 7: this.setWisAdj(-1, 0, 30, 0); break;
      case 8: this.setWisAdj(0, 0, 25, 0); break;
      case 9: this.setWisAdj(0, 0, 20, 0); break;
      case 10: this.setWisAdj(0, 0, 15, 0); break;
      case 11: this.setWisAdj(0, 0, 10, 0); break;
      case 12: this.setWisAdj(0, 0, 5, 0); break;
      case 13:
      case 14: this.setWisAdj(0, 1, 0, 0); break;
      case 15: this.setWisAdj(1, 2, 0, 0); break;
      case 16: this.setWisAdj(2, 2, 0, 0); break;
      case 17: this.setWisAdj(3, 3, 0, 0); break;
      case 18: this.setWisAdj(4, 4, 0, 0); break;
      default: break;
    }
  };

  // set wisdom adjustments
  setWisAdj = (mDef: number, bSp: number, cnFl: number, imun: number) => {
    this.labelMagDefAdj.innerHTML = mDef.toString();
    this.labelBonusSp.innerHTML = bSp.toString();
    this.labelChnFail.innerHTML = cnFl.toString();
    this.labelSplImmune.innerHTML = imun.toString();
  };

  // Calculate charisma modifiers
  setCharMods = (chr: number) => {
    switch (chr) {
      case 3: this.setCharAdj(1, -6, -5); break;
      case 4: this.setCharAdj(1, -5, -4); break;
      case 5: this.setCharAdj(2, -4, -3); break;
      case 6: this.setCharAdj(2, -3, -2); break;
      case 7: this.setCharAdj(3, -2, -1); break;
      case 8: this.setCharAdj(3, -1, 0); break;
      case 9:
      case 10:
      case 11: this.setCharAdj(4, 0, 0); break;
      case 12: this.setCharAdj(5, 0, 0); break;
      case 13: this.setCharAdj(5, 0, 1); break;
      case 14: this.setCharAdj(6, 1, 2); break;
      case 15: this.setCharAdj(7, 3, 3); break;
      case 16: this.setCharAdj(8, 4, 5); break;
      case 17: this.setCharAdj(10, 6, 6); break;
      case 18: this.setCharAdj(15, 8, 7); break;
      default: break;
    }
  };

  // Set charisma adj
  setCharAdj = (hench: number, loyal: number, react: number) => {
    this.labelMxHench.innerHTML = hench.toString();
    this.labelLoyaltyBs.innerHTML = loyal.toString();
    this.labelReactAdj.innerHTML = react.toString();
  };

  // Disable statistic option after its selected
  removeOption = (index: number) => {
    this.disableOpts(this.stat1.getElementsByTagName('option')[index]);
    this.disableOpts(this.stat2.getElementsByTagName('option')[index]);
    this.disableOpts(this.stat3.getElementsByTagName('option')[index]);
    this.disableOpts(this.stat4.getElementsByTagName('option')[index]);
    this.disableOpts(this.stat5.getElementsByTagName('option')[index]);
    this.disableOpts(this.stat6.getElementsByTagName('option')[index]);
  };

  // Derive meta-class for multi or single selection (for THAC0/Saves and con/fighter flags)
  private getSelectedClasses = (): Classes[] => {
    const multi = this.selectMulticlass as HTMLSelectElement | null;
    if (multi && multi.style.display !== 'none' && multi.selectedOptions && multi.selectedOptions.length > 0) {
      const selectedClasses: Classes[] = [];
      for (const option of Array.from(multi.selectedOptions)) {
        const value = option.value; // e.g., "fighter+mage"
        if (value) {
          selectedClasses.push(...(value.split('+') as Classes[]));
        }
      }
      if (selectedClasses.length > 0) {
        return selectedClasses;
      }
    }
    const single = this.selectClass as HTMLSelectElement;
    const v = single.options[single.selectedIndex]?.value as Classes | undefined;
    return v ? [v] : [];
  };

  private getMetaClass = (classes: Classes[]): keyof THAC0S => {
    // Order of precedence for meta tables: fighter > cleric > rogue > mage
    if (classes.some(c => c === Classes.fighter || c === Classes.paladin || c === Classes.ranger)) return 'fighter';
    if (classes.some(c => c === Classes.cleric || c === Classes.druid)) return 'cleric';
    if (classes.some(c => c === Classes.thief || c === Classes.bard)) return 'rogue';
    return 'mage';
  };

  // Returns the race key used in data tables (e.g. 'halfElf'), or '' if none selected
  private getCurrentRaceKey = (): string => {
    return (this.selectRace as HTMLSelectElement).value || '';
  };

  // Clear height/weight state and UI labels
  private clearPhysical = () => {
    this.height = '';
    this.weight = 0;
    if (this.labelHeight) this.labelHeight.textContent = '';
    if (this.labelWeight) this.labelWeight.textContent = '';
  };

  // Roll and display height and weight based on current race + gender
  calcPhysical = () => {
    const raceKey = this.getCurrentRaceKey();
    if (!raceKey || !this.gender) { this.clearPhysical(); return; }
    const entry = heightWeightTable[raceKey]?.[this.gender];
    if (!entry) { this.clearPhysical(); return; }
    const totalInches = entry.htBase + rollXdY(entry.htDice, entry.htSides);
    this.height = `${Math.floor(totalInches / 12)}'${totalInches % 12}"`;
    this.weight = entry.wtBase + rollXdY(entry.wtDice, entry.wtSides);
    if (this.labelHeight) this.labelHeight.textContent = this.height;
    if (this.labelWeight) this.labelWeight.textContent = `${this.weight} lbs`;
  };

  // Set gender and re-roll physical stats
  setGender = (ddl: HTMLSelectElement) => {
    this.gender = ddl.value as Gender | '';
    this.calcPhysical();
  };

  // Roll starting age from race + class tables; for multiclass takes the oldest result
  calcAge = () => {
    const raceKey = this.getCurrentRaceKey();
    if (!raceKey) { this.baseAge = 0; this.age = 0; if (this.labelAge) this.labelAge.textContent = ''; return; }
    const classes = this.getSelectedClasses();
    if (!classes.length) { this.baseAge = 0; this.age = 0; if (this.labelAge) this.labelAge.textContent = ''; return; }
    const raceAges = startingAgeTable[raceKey];
    if (!raceAges) { this.baseAge = 0; this.age = 0; if (this.labelAge) this.labelAge.textContent = ''; return; }
    let maxAge = 0;
    for (const cls of classes) {
      const entry = raceAges[cls];
      if (!entry) continue;
      const rolled = entry.base + rollXdY(entry.dice, entry.sides);
      if (rolled > maxAge) maxAge = rolled;
    }
    if (!maxAge) { this.baseAge = 0; this.age = 0; if (this.labelAge) this.labelAge.textContent = ''; return; }
    this.baseAge = maxAge;
    this.applyLevelToAgeGold();
  };

  // Roll starting gold from class tables; for multiclass takes the highest result
  calcMoney = () => {
    const classes = this.getSelectedClasses();
    if (!classes.length) { this.baseGold = 0; this.startingGold = 0; if (this.labelGold) this.labelGold.textContent = ''; return; }
    let maxGold = 0;
    for (const cls of classes) {
      const entry = startingMoneyTable[cls];
      if (!entry) continue;
      const rolled = rollXdY(entry.dice, entry.sides) * entry.multiplier;
      if (rolled > maxGold) maxGold = rolled;
    }
    if (!maxGold) { this.baseGold = 0; this.startingGold = 0; if (this.labelGold) this.labelGold.textContent = ''; return; }
    this.baseGold = maxGold;
    this.applyLevelToAgeGold();
  };

  // Apply level bonus (each level above 1st adds 1 year and 10 gp) to the rolled base values
  private applyLevelToAgeGold = () => {
    const level = parseInt((this.selectLevel as HTMLSelectElement)?.value || '0');
    const bonus = Math.max(0, level - 1);
    this.age = this.baseAge ? this.baseAge + bonus : 0;
    this.startingGold = this.baseGold ? this.baseGold + bonus * 10 : 0;
    if (this.labelAge) this.labelAge.textContent = this.age ? this.age.toString() : '';
    if (this.labelGold) this.labelGold.textContent = this.startingGold ? `${this.startingGold} gp` : '';
  };

  // Set the class (single or multiclass)
  setClass = (ddl: HTMLSelectElement) => {
    const selected = this.getSelectedClasses();
    const hasFightery = selected.some(c => c === Classes.fighter || c === Classes.paladin || c === Classes.ranger);
    this.isFighter = hasFightery;
    this.checkForStrMods(this.strInit);
    this.setConMods(this.conInit);

    // Hit dice heuristic: pick the highest HD among selected classes (Ftr d10, Priest d8, Rogue d6, Wizard d4)
    const hdFor = (c: Classes) => {
      switch (c) {
        case Classes.fighter:
        case Classes.paladin:
        case Classes.ranger: return 10;
        case Classes.cleric:
        case Classes.druid: return 8;
        case Classes.thief:
        case Classes.bard: return 6;
        case Classes.mage:
        case Classes.illusionist: return 4;
        default: return 6;
      }
    };
    if (selected.length) {
      const hds = selected.map(hdFor) as number[];
      this.hitdice = Math.max(...hds);
      this.calcAge();
      this.calcMoney();
      this.applyAlignmentRestrictions(selected);
      this.calcProfSlots();
      this.calcSpellSlots();
      this.updateThiefSkillsVisibility();
      this.updateBardSkillsVisibility();
      this.updateRangerSkillsVisibility();
      return;
    }

    // No class selected: clear all dependent state
    if (!selected.length) {
      this.applyAlignmentRestrictions([]);
      this.calcProfSlots();
      this.calcSpellSlots();
      this.updateThiefSkillsVisibility();
      this.updateBardSkillsVisibility();
      this.updateRangerSkillsVisibility();
      return;
    }

    // Fallback to legacy single-class by dropdown index
    switch (ddl.selectedIndex) {
      case 1: // Fighters
      case 6:
      case 7:
        this.isFighter = true;
        this.checkForStrMods(this.strInit);
        this.setConMods(this.conInit);
        this.hitdice = 10;
        break;
      case 2: // Rogues
      case 5:
        this.hitdice = 6;
        break;
      case 3: // Priests
      case 8:
        this.hitdice = 8;
        break;
      case 4: // Wizards
        this.hitdice = 4;
        break;
      default:
        throw new Error('Unknown class type');
    }
    this.calcAge();
    this.calcMoney();
    this.applyAlignmentRestrictions(this.getSelectedClasses());
    this.calcProfSlots();
    this.calcSpellSlots();
    this.updateThiefSkillsVisibility();
    this.updateBardSkillsVisibility();
    this.updateRangerSkillsVisibility();
  };

  zeroMOds = () => {
    this.strMod = 0; this.dexMod = 0; this.conMod = 0; this.intMod = 0; this.wisMod = 0; this.chrMod = 0;
  };

  applyRacialMods = () => {
    this.inputStr.value = (this.strMod == 0 ? this.inputStr.value : parseInt(this.inputStr.value) + this.strMod).toString();
    this.inputDex.value = (this.dexMod == 0 ? this.inputDex.value : parseInt(this.inputDex.value) + this.dexMod).toString();
    this.inputChr.value = (this.chrMod == 0 ? this.inputChr.value : parseInt(this.inputChr.value) + this.chrMod).toString();
    this.inputCon.value = (this.conMod == 0 ? this.inputCon.value : parseInt(this.inputCon.value) + this.conMod).toString();
    this.inputInt.value = (this.intMod == 0 ? this.inputInt.value : parseInt(this.inputInt.value) + this.intMod).toString();
    this.inputWis.value = (this.wisMod == 0 ? this.inputWis.value : parseInt(this.inputWis.value) + this.wisMod).toString();
  };

  disableSelectionOpts(options: HTMLOptionElement[]) {
    for (let i = 0; i < options.length; i++) { options[i].disabled = true; }
  }

  enableSelectOptionByVal = (options: HTMLOptionElement[], type: string) => {
    for (let i = 1; i < options.length; i++) { if (options[i].value === type) options[i].disabled = false; }
  };

  enableClassDdl = (race: Races) => {
    this.disableSelectionOpts(this.selectClass.getElementsByTagName('option'));
    switch (race) {
      case Races.human:
        raceClassLimits.human.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName('option'), item));
        break;
      case Races.dwarf:
        raceClassLimits.dwarf.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName('option'), item));
        break;
      case Races.elf:
        raceClassLimits.elf.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName('option'), item));
        break;
      case Races.gnome:
        raceClassLimits.gnome.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName('option'), item));
        break;
      case Races.halfElf:
        raceClassLimits.halfElf.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName('option'), item));
        break;
      case Races.halfling:
        raceClassLimits.halfling.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName('option'), item));
        break;
      default: throw Error('No idea what species this is?');
    }
    // Enforce ability score minimums on top of race-based filtering
    const abilities = this.getAbilities();
    const sel = this.selectClass as HTMLSelectElement;
    for (const opt of Array.from(sel.getElementsByTagName('option')) as HTMLOptionElement[]) {
      if (!opt.value || opt.disabled) continue;
      if (!meetsClassMinimums(abilities, opt.value as Classes)) opt.disabled = true;
    }
    if (sel.selectedIndex > 0 && sel.options[sel.selectedIndex]?.disabled) {
      sel.selectedIndex = 0;
      sel.dispatchEvent(new Event('change'));
    }
  };

  private refreshClassDdl = () => {
    const raceMap: Record<number, Races> = {
      1: Races.human, 2: Races.dwarf, 3: Races.elf,
      4: Races.gnome, 5: Races.halfling, 6: Races.halfElf,
    };
    const race = raceMap[(this.selectRace as HTMLSelectElement).selectedIndex];
    if (race) this.enableClassDdl(race);
  };

  private dmListeners: (() => void)[] = [];

  private addDmListener = (input: HTMLInputElement, handler: (val: number) => void) => {
    const fn = () => {
      const val = parseInt(input.value) || 0;
      handler(val);
      this.refreshMulticlassOptions();
      this.refreshClassDdl();
    };
    input.addEventListener('input', fn);
    this.dmListeners.push(() => input.removeEventListener('input', fn));
  };

  dmMode = () => {
    this.clearControls();
    this.enableDisableStats(true);
    this.zeroMOds();
    this.strInit = 0; this.dexInit = 0; this.conInit = 0; this.intInit = 0; this.wisInit = 0; this.chrInit = 0;
    this.rollButton.disabled = true;
    this.inputStr.readOnly = false; this.inputDex.readOnly = false; this.inputCon.readOnly = false;
    this.inputInt.readOnly = false; this.inputWis.readOnly = false; this.inputChr.readOnly = false;

    this.addDmListener(this.inputStr, (v) => { this.strInit = v; this.checkForStrMods(v); });
    this.addDmListener(this.inputDex, (v) => { this.dexInit = v; this.setDexMods(v); });
    this.addDmListener(this.inputCon, (v) => { this.conInit = v; this.setConMods(v); });
    this.addDmListener(this.inputInt, (v) => { this.intInit = v; this.setIntMods(v); });
    this.addDmListener(this.inputWis, (v) => { this.wisInit = v; this.setWisMods(v); });
    this.addDmListener(this.inputChr, (v) => { this.chrInit = v; this.setCharMods(v); });
  };

  genMode = () => {
    this.dmListeners.forEach(remove => remove());
    this.dmListeners = [];
    this.clearControls();
    this.enableDisableStats(false);
    this.rollButton.disabled = false;
    this.inputStr.readOnly = true; this.inputDex.readOnly = true; this.inputCon.readOnly = true;
    this.inputInt.readOnly = true; this.inputWis.readOnly = true; this.inputChr.readOnly = true;
  };

  enableDisableStats = (disable: boolean) => {
    this.inputOne.disabled = disable; this.inputTwo.disabled = disable; this.inputThree.disabled = disable;
    this.inputFour.disabled = disable; this.inputFive.disabled = disable; this.inputSix.disabled = disable;
    this.stat1.disabled = disable; this.stat2.disabled = disable; this.stat3.disabled = disable;
    this.stat4.disabled = disable; this.stat5.disabled = disable; this.stat6.disabled = disable;
  };

  // Add racial mods
  setRace = (ddl: HTMLSelectElement) => {
    this.zeroMOds();
    switch (ddl.selectedIndex) {
      case 1: this.enableClassDdl(Races.human); break; // human
      case 2: this.conMod = 1; this.chrMod = -1; this.enableClassDdl(Races.dwarf); break; // dwarf
      case 3: this.dexMod = 1; this.conMod = -1; this.enableClassDdl(Races.elf); break; // elf
      case 4: this.intMod = 1; this.wisMod = -1; this.enableClassDdl(Races.gnome); break; // gnome
      case 5: this.dexMod = 1; this.strMod = -1; this.enableClassDdl(Races.halfling); break; // halfling
      case 6: this.enableClassDdl(Races.halfElf); break; // half elf
      default: throw Error('Unknown race');
    }
    this.applyRacialMods();
  // Race changed; refresh multiclass options and re-roll physical/age
  this.refreshMulticlassOptions();
  this.calcPhysical();
  this.calcAge();
  this.calcThiefSkillBases();
  this.calcBardSkillBases();
  this.applyAlignmentRestrictions(this.getSelectedClasses());
  this.calcProfSlots();
  this.calcSpellSlots();
  this.updateThiefSkillsVisibility();
  this.updateBardSkillsVisibility();
  this.updateRangerSkillsVisibility();
  };

  // Calculate hp and thac0
  setLevel = (ddl: HTMLSelectElement) => {
    let hit = 0;
    for (let i = 0; i < ddl.selectedIndex; i++) { hit += this.calcHPRoll(); }
    this.labelHp.innerHTML = hit.toString();

    const sel = this.getSelectedClasses();
    const meta = sel.length ? this.getMetaClass(sel) : (() => {
      // derive from single-class dropdown
      const classIndex = this.selectClass.selectedIndex;
      switch (classIndex) {
        case 1:
        case 6:
        case 7: return 'fighter' as const;
        case 2:
        case 5: return 'rogue' as const;
        case 9:
        case 4: return 'mage' as const;
        case 3:
        case 8: return 'cleric' as const;
        default: throw new Error('Unknown meta class');
      }
    })();
    this.setLabelValues(meta, ddl.selectedIndex - 1);
    this.applyLevelToAgeGold();
    this.calcProfSlots();
    this.calcSpellSlots();
    this.updateThiefPoints();
    this.updateBardPoints();
    this.updateRangerDisplay();
  };

  // Hit dice roll with con mod, minimum roll 1
  calcHPRoll = () => {
    const hp = rollDie(this.hitdice) + this.hpAdj;
    return (hp < 1) ? 1 : hp;
  };

  setLabelValues = (classType: keyof THAC0S, level: number) => {
    this.labelThac0.innerText = thac0s[classType][level] as unknown as string;
    this.labelSvBreath.innerText = savingThrows[classType].breath[level] as unknown as string;
    this.labelSvPara.innerText = savingThrows[classType].para[level] as unknown as string;
    this.labelSvPoly.innerText = savingThrows[classType].poly[level] as unknown as string;
    this.labelSvRod.innerText = savingThrows[classType].rod[level] as unknown as string;
    this.labelSvSpell.innerText = savingThrows[classType].spell[level] as unknown as string;
  };

  getCharacterData = () => {
    const classes = this.getSelectedClasses();
    return {
      className: classes.join('+'),
      level:     (this.selectLevel as HTMLSelectElement).value || '',
      race:      (this.selectRace  as HTMLSelectElement).value || '',
      str:       this.inputStr?.value  || '',
      dex:       this.inputDex?.value  || '',
      con:       this.inputCon?.value  || '',
      int:       this.inputInt?.value  || '',
      wis:       this.inputWis?.value  || '',
      chr:       this.inputChr?.value  || '',
      hitProb:   this.hitProb.toString(),
      dmgAdj:    this.DmgAdj.toString(),
      wgtAllow:  this.labelWgtAllow?.textContent  || '',
      maxPress:  this.labelMxPress?.textContent   || '',
      opnDoor:   this.labelOpDrs?.textContent     || '',
      bbLg:      this.labelBndBrs?.textContent    || '',
      rctnAdj:   this.labelRctAdj?.textContent    || '',
      missileAdj:this.labelMislAdj?.textContent   || '',
      defAdj:    this.labelDefAdj?.textContent    || '',
      hpAdj:     this.labelHpAdj?.textContent     || '',
      sysShk:    this.labelSysShk?.textContent    || '',
      resSurv:   this.labelResSurv?.textContent   || '',
      poisonSv:  this.labelPoisSv?.textContent    || '',
      regen:     this.labelRegen?.textContent     || '',
      noLang:    this.labelNoLang?.textContent    || '',
      splLvl:    this.labelSplLvl?.textContent    || '',
      lrnSpl:    this.labelChLrn?.textContent     || '',
      splPerLvl: this.labelMxSplPLvl?.textContent || '',
      splImun:   this.labelSplImun?.textContent   || '',
      mgcDefAdj: this.labelMagDefAdj?.textContent || '',
      bonusSp:   this.labelBonusSp?.textContent   || '',
      chnFail:   this.labelChnFail?.textContent   || '',
      splImmune: this.labelSplImmune?.textContent || '',
      mxHench:   this.labelMxHench?.textContent   || '',
      loyalBs:   this.labelLoyaltyBs?.textContent || '',
      reactAdj:  this.labelReactAdj?.textContent  || '',
      hp:        this.labelHp?.textContent        || '',
      thac0:     this.labelThac0?.textContent     || '',
      para:      this.labelSvPara?.textContent    || '',
      rod:       this.labelSvRod?.textContent     || '',
      poly:      this.labelSvPoly?.textContent    || '',
      breath:    this.labelSvBreath?.textContent  || '',
      spell:     this.labelSvSpell?.textContent   || '',
      height:      this.height || '',
      weight:      this.weight ? this.weight.toString() : '',
      age:         this.age    ? this.age.toString()    : '',
      startingGold: this.startingGold ? this.startingGold.toString() : '',
      alignment:    (this.selectAlignment as HTMLSelectElement)?.value || '',
      wpSlots:      this.labelWpSlots?.textContent || '',
      nwpSlots:     this.labelNwpSlots?.textContent || '',
    };
  };

  setAlignment = (_ddl: HTMLSelectElement) => {};

  private applyAlignmentRestrictions = (classes: Classes[]) => {
    const sel = this.selectAlignment as HTMLSelectElement | null;
    if (!sel) return;
    let allowed: Alignment[] | null = null;
    for (const cls of classes) {
      const restriction = classAlignmentRestrictions[cls];
      if (!restriction) continue;
      allowed = allowed === null ? [...restriction] : allowed.filter(a => restriction.includes(a));
    }
    for (const opt of Array.from(sel.options)) {
      const o = opt as HTMLOptionElement;
      if (!o.value) continue;
      o.disabled = allowed !== null && !allowed.includes(o.value as Alignment);
    }
    if (allowed !== null && allowed.length === 1) {
      sel.value = allowed[0];
      sel.disabled = true;
    } else {
      sel.disabled = false;
      if (allowed !== null && sel.value && !allowed.includes(sel.value as Alignment)) sel.value = '';
    }
  };

  private calcProfSlots = () => {
    if (!this.profsCard) return;
    const classes = this.getSelectedClasses();
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    if (!classes.length || !level) {
      this.profsCard.style.display = 'none';
      if (this.labelWpSlots) this.labelWpSlots.textContent = '';
      if (this.labelNwpSlots) this.labelNwpSlots.textContent = '';
      return;
    }
    const getGroup = (c: Classes): keyof typeof proficiencySlotData => {
      if ([Classes.fighter, Classes.paladin, Classes.ranger].includes(c)) return 'warrior';
      if ([Classes.thief, Classes.bard].includes(c)) return 'rogue';
      if ([Classes.cleric, Classes.druid].includes(c)) return 'priest';
      return 'wizard';
    };
    let bestWp = 0, bestNwp = 0;
    for (const cls of classes) {
      const g = proficiencySlotData[getGroup(cls)];
      const wp = g.wp.initial + Math.floor((level - 1) / g.wp.per);
      const nwp = g.nwp.initial + Math.floor((level - 1) / g.nwp.per);
      if (wp > bestWp) bestWp = wp;
      if (nwp > bestNwp) bestNwp = nwp;
    }
    if (this.labelWpSlots) this.labelWpSlots.textContent = bestWp.toString();
    if (this.labelNwpSlots) this.labelNwpSlots.textContent = bestNwp.toString();
    this.profsCard.style.display = '';
  };

  private calcSpellSlots = () => {
    if (!this.spellsCard || !this.spellsDl) return;
    const classes = this.getSelectedClasses();
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    if (!classes.length || !level) { this.spellsCard.style.display = 'none'; return; }
    const casters = classes.filter(c => spellSlotsPerDay[c]);
    if (!casters.length) { this.spellsCard.style.display = 'none'; return; }
    this.spellsDl.innerHTML = '';
    const ordinals = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th'];
    casters.forEach(cls => {
      const table = spellSlotsPerDay[cls]!;
      const slots = table[level - 1];
      if (!slots) return;
      const lastNonZero = slots.reduce((m, c, i) => (c > 0 ? i : m), -1);
      if (lastNonZero < 0) return;
      if (casters.length > 1) {
        const dt = document.createElement('dt');
        dt.textContent = cls.charAt(0).toUpperCase() + cls.slice(1);
        dt.className = 'spell-class-header';
        this.spellsDl.appendChild(dt);
        this.spellsDl.appendChild(document.createElement('dd'));
      }
      for (let i = 0; i <= lastNonZero; i++) {
        const dt = document.createElement('dt');
        dt.textContent = ordinals[i];
        const dd = document.createElement('dd');
        dd.textContent = slots[i] > 0 ? slots[i].toString() : '—';
        this.spellsDl.appendChild(dt);
        this.spellsDl.appendChild(dd);
      }
    });
    if (this.spellsDl.children.length === 0) { this.spellsCard.style.display = 'none'; return; }
    this.spellsCard.style.display = '';
  };

  private updateThiefSkillsVisibility = () => {
    if (!this.thiefSkillsCard) return;
    const isThief = this.getSelectedClasses().includes(Classes.thief);
    this.thiefSkillsCard.style.display = isThief ? '' : 'none';
    if (isThief) { this.calcThiefSkillBases(); this.updateThiefPoints(); }
  };

  private calcThiefSkillBases = () => {
    if (!this.thiefSkillsCard || this.thiefSkillsCard.style.display === 'none') return;
    const raceKey = this.getCurrentRaceKey() || 'human';
    const adj = thiefRaceAdjustments[raceKey] ?? thiefRaceAdjustments['human'];
    this.thiefSkillBaseValues = [
      thiefBaseSkills.pp  + adj.pp,
      thiefBaseSkills.ol  + adj.ol,
      thiefBaseSkills.frt + adj.frt,
      thiefBaseSkills.ms  + adj.ms,
      thiefBaseSkills.his + adj.his,
      thiefBaseSkills.dn  + adj.dn,
      thiefBaseSkills.cw  + adj.cw,
      thiefBaseSkills.rl  + adj.rl,
    ];
    this.thiefSkillBaseValues.forEach((val, i) => {
      if (this.thiefSkillBases[i]) this.thiefSkillBases[i].textContent = `${val}%`;
    });
    this.updateThiefTotals();
  };

  private updateThiefPoints = () => {
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    const avail = level ? 60 + (level - 1) * 30 : 0;
    if (this.tsAvail) this.tsAvail.textContent = avail.toString();
    this.updateThiefTotals();
  };

  updateThiefSkills = () => { this.updateThiefTotals(); };

  private updateThiefTotals = () => {
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    const avail = level ? 60 + (level - 1) * 30 : 0;
    let used = 0;
    this.thiefSkillAdds.forEach((input, i) => {
      const added = Math.max(0, parseInt(input?.value || '0') || 0);
      used += added;
      const total = Math.min((this.thiefSkillBaseValues[i] || 0) + added, 95);
      if (this.thiefSkillTotals[i]) this.thiefSkillTotals[i].textContent = `${total}%`;
    });
    if (this.tsAvail) this.tsAvail.textContent = avail.toString();
    if (this.tsUsed) this.tsUsed.textContent = used.toString();
    if (this.tsRemain) {
      const remaining = avail - used;
      this.tsRemain.textContent = remaining.toString();
      this.tsRemain.style.color = remaining < 0 ? 'var(--accent)' : '';
    }
  };

  private updateBardSkillsVisibility = () => {
    if (!this.bardSkillsCard) return;
    const isBard = this.getSelectedClasses().includes(Classes.bard);
    this.bardSkillsCard.style.display = isBard ? '' : 'none';
    if (isBard) { this.calcBardSkillBases(); this.updateBardPoints(); }
  };

  private calcBardSkillBases = () => {
    if (!this.bardSkillsCard || this.bardSkillsCard.style.display === 'none') return;
    const raceKey = this.getCurrentRaceKey() || 'human';
    const adj = thiefRaceAdjustments[raceKey] ?? thiefRaceAdjustments['human'];
    this.bardSkillBaseValues = [
      bardBaseSkills.pp + adj.pp,
      bardBaseSkills.dn + adj.dn,
      bardBaseSkills.cw + adj.cw,
      bardBaseSkills.rl + adj.rl,
    ];
    this.bardSkillBaseValues.forEach((val, i) => {
      if (this.bardSkillBases[i]) this.bardSkillBases[i].textContent = `${val}%`;
    });
    this.updateBardTotals();
  };

  private updateBardPoints = () => {
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    const avail = level ? level * 20 : 0;
    if (this.bsAvail) this.bsAvail.textContent = avail.toString();
    this.updateBardTotals();
  };

  updateBardSkills = () => { this.updateBardTotals(); };

  private updateBardTotals = () => {
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    const avail = level ? level * 20 : 0;
    let used = 0;
    this.bardSkillAdds.forEach((input, i) => {
      const added = Math.max(0, parseInt(input?.value || '0') || 0);
      used += added;
      const total = Math.min((this.bardSkillBaseValues[i] || 0) + added, 95);
      if (this.bardSkillTotals[i]) this.bardSkillTotals[i].textContent = `${total}%`;
    });
    if (this.bsAvail) this.bsAvail.textContent = avail.toString();
    if (this.bsUsed) this.bsUsed.textContent = used.toString();
    if (this.bsRemain) {
      const remaining = avail - used;
      this.bsRemain.textContent = remaining.toString();
      this.bsRemain.style.color = remaining < 0 ? 'var(--accent)' : '';
    }
  };

  private updateRangerSkillsVisibility = () => {
    if (!this.rangerSkillsCard) return;
    const isRanger = this.getSelectedClasses().includes(Classes.ranger);
    this.rangerSkillsCard.style.display = isRanger ? '' : 'none';
    if (isRanger) this.updateRangerDisplay();
  };

  private updateRangerDisplay = () => {
    if (!this.rangerSkillsCard || this.rangerSkillsCard.style.display === 'none') return;
    const level = parseInt((this.selectLevel as HTMLSelectElement).value || '0');
    if (!level) return;
    const idx = Math.min(level, rangerSkillsByLevel.length) - 1;
    const { ms, his } = rangerSkillsByLevel[idx];
    if (this.rangerMsDisplay) this.rangerMsDisplay.textContent = `${ms}%`;
    if (this.rangerHisDisplay) this.rangerHisDisplay.textContent = `${his}%`;
  };

  exportSheet = () => exportCharacterSheet(this.getCharacterData());
}
