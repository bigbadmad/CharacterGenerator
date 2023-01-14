interface RaceClassLimits { 
    human: classes[];
    dwarf: classes[];
    elf: classes[];
    halfElf: classes[];
    gnome: classes[];
    halfling: classes[];
}
// Global class object 2
let gen:any;

interface THAC0S {
    fighter: number[];
    rogue: number[];
    cleric: number[];
    mage: number[];
}

interface ISavingThrows {
    fighter: IClassSavingThrows;
    cleric: IClassSavingThrows;
    rogue: IClassSavingThrows;
    mage: IClassSavingThrows;
}
  
interface IClassSavingThrows {
    para: number[];
    rod: number[];
    poly: number[];
    breath: number[];
    spell: number[];
}

enum classes{
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

enum races{
    human = 'human',
    dwarf = 'dwarf',
    elf = 'elf',
    gnome = 'gnome',
    halfling = 'halfling',
    halfElf = 'halfElf'
}

const raceClassLimits : RaceClassLimits = { 
    human:[classes.fighter, classes.thief, classes.cleric, classes.mage, classes.bard, classes.paladin, classes.ranger, classes.druid, classes.illusionist],
    dwarf:[classes.fighter, classes.cleric, classes.thief],
    elf:[classes.fighter, classes.ranger, classes.cleric, classes.thief, classes.bard, classes.mage],
    halfElf:[classes.fighter, classes.paladin, classes.ranger, classes.cleric, classes.druid, classes.thief, classes.bard, classes.mage],
    gnome:[classes.fighter, classes.cleric, classes.thief, classes.illusionist],
    halfling:[classes.fighter, classes.cleric, classes.thief]
};

const thac0s: THAC0S = {
    fighter: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    rogue: [20, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11],
    cleric: [20, 20, 20, 18, 18, 18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10, 8, 8],
    mage: [20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 16, 15, 15, 15, 14, 14],
};

const savingThrows: ISavingThrows = {
    fighter:{
        para:[14, 14, 13, 13, 11, 11, 10, 10, 8, 8, 7, 7, 5, 5, 4, 4, 3, 3, 3, 3],
        rod:[16, 16, 15, 15, 13, 13, 12, 12, 10, 10, 9, 9, 7, 7, 6, 6, 5, 5, 5, 5],
        poly:[15, 15, 14, 14, 12, 12, 11, 11, 9, 9, 8, 8, 6, 6, 5, 5, 4, 4, 4, 4],
        breath:[17, 17, 16, 16, 13, 13, 12, 12, 9, 9, 8, 8, 5, 5, 4, 4, 4, 4, 4, 4],
        spell:[17, 17, 16, 16, 14, 14, 13, 13, 11, 11, 10, 10, 8, 8, 7, 7, 6, 6, 6, 6]
    },
    cleric:{
        para:[10, 10, 10, 9, 9, 9, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4, 2, 2],
        rod:[14, 14, 14, 13, 13, 13, 11, 11, 11, 10, 10, 1, 9, 9, 9, 8, 8, 8, 6, 6],
        poly:[13, 13, 13, 12, 12, 12, 10, 10, 10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 5, 5],
        breath:[16, 16, 16, 15, 15, 15, 13, 13, 13, 12, 12, 12, 11, 11, 11, 10, 10, 10, 8, 8],
        spell:[15, 15, 15, 14, 14, 14, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9, 7, 7]
    },
    rogue:{
        para:[13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9],
        rod:[14, 14, 14, 14, 12, 12, 12, 12, 10, 10, 10, 10, 8, 8, 8, 8, 6, 6, 6, 6],
        poly:[12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10, 9, 9, 9, 9, 8, 8, 8, 8],
        breath:[16, 16, 16, 15, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 13, 12, 12, 12, 12],
        spell:[15, 15, 15, 15, 13, 13, 13, 13, 11, 11, 11, 11, 9, 9, 9, 9, 7, 7, 7, 7]
    },
    mage:{
        para:[14, 14, 14, 14, 14, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 10, 10, 10, 10, 10],
        rod:[11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5],
        poly:[13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9, 7, 7, 7, 7, 7],
        breath:[15, 15, 15, 15, 15, 13, 13, 13, 13, 13, 11, 11, 11, 11, 11, 9, 9, 9, 9, 9],
        spell:[12, 12, 12, 12, 12, 10, 10, 10, 10, 10, 8, 8, 8, 8, 8, 6, 6, 6, 6, 6]
    }
}

window.onload = () => {
    gen = new Generator(<HTMLInputElement>document.getElementById("roll"));
    gen.setup();
};

// Pass through methods for dropdowns
function setOne(ddl: HTMLSelectElement, box: string){
    gen.setOne(ddl,box);
};

function setRace(ddl: HTMLSelectElement){
    gen.setRace(ddl);
};

function setClass(ddl: HTMLSelectElement){
    gen.setClass(ddl);
};

function setLevel(ddl: HTMLSelectElement){
    gen.setLevel(ddl);
};

function noRollType(){
    gen.dmMode()
}

function rollerType(){
    gen.genMode()
}

class Generator {
    constructor(rollButton: HTMLInputElement){this.rollButton = rollButton};
    rollButton: HTMLInputElement; // roll the dice button
    // class level variables
    hp = 0;
    ac = 10;
    level = 1;

    hitdice = 6;
    hitProb = 0;
    DmgAdj = 0;

    isFighter = false;

    hpAdj = 0;
    // str
    wghtAllow = 0;
    MxPres = 0;
    opDrs = 0;
    bndBrs = 0;

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
    labelRctAdj: any;
    labelMislAdj: any;
    labelDefAdj: any;
    labelHpAdj: any;
    labelSysShk: any;
    labelResSurv: any;
    labelPoisSv: any;
    labelRegen: any;
    labelNoLang:any;
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
    selectClass: any;
    selectRace: any;
    selectLevel: any;
    rollType: any;
    spinner: any;

    setup = () => {
        this.rollButton.addEventListener("click", this.roll);
        this.getControls();
    }
 
    // Get the page controls
    getControls = () => {
        this.inputOne = <HTMLInputElement>document.getElementById("one");
        this.inputTwo = <HTMLInputElement>document.getElementById("two");
        this.inputThree = <HTMLInputElement>document.getElementById("three");
        this.inputFour = <HTMLInputElement>document.getElementById("four");
        this.inputFive = <HTMLInputElement>document.getElementById("five");
        this.inputSix = <HTMLInputElement>document.getElementById("six");
        this.labelPercent = <HTMLLabelElement>document.getElementById("percent");

        this.stat1 = <HTMLSelectElement>document.getElementById("stat1");
        this.stat2 = <HTMLSelectElement>document.getElementById("stat2");
        this.stat3 = <HTMLSelectElement>document.getElementById("stat3");
        this.stat4 = <HTMLSelectElement>document.getElementById("stat4");
        this.stat5 = <HTMLSelectElement>document.getElementById("stat5");
        this.stat6 = <HTMLSelectElement>document.getElementById("stat6");

        this.inputStr = <HTMLInputElement>document.getElementById("str");
        this.inputDex = <HTMLInputElement>document.getElementById("dex");
        this.inputCon = <HTMLInputElement>document.getElementById("con");
        this.inputWis = <HTMLInputElement>document.getElementById("wis");
        this.inputInt = <HTMLInputElement>document.getElementById("int");
        this.inputChr = <HTMLInputElement>document.getElementById("chr");

        this.labelPercent = <HTMLLabelElement>document.getElementById("percent");
        this.labelWgtAllow = <HTMLLabelElement>document.getElementById("wghtAllow");
        this.labelMxPress = <HTMLLabelElement>document.getElementById("MxPres");
        this.labelOpDrs = <HTMLLabelElement>document.getElementById("opDrs");
        this.labelBndBrs = <HTMLLabelElement>document.getElementById("bndBrs");
        this.labelRctAdj = <HTMLLabelElement>document.getElementById("rctAdj");
        this.labelMislAdj = <HTMLLabelElement>document.getElementById("mislAdj");
        this.labelDefAdj = <HTMLLabelElement>document.getElementById("defAdj");
        this.labelHpAdj = <HTMLLabelElement>document.getElementById("hpAdj");
        this.labelSysShk = <HTMLLabelElement>document.getElementById("sysShk");
        this.labelResSurv = <HTMLLabelElement>document.getElementById("resSurv");
        this.labelPoisSv = <HTMLLabelElement>document.getElementById("posSv");
        this.labelRegen = <HTMLLabelElement>document.getElementById("regen");
        this.labelNoLang = <HTMLLabelElement>document.getElementById("noOfLang");
        this.labelSplLvl = <HTMLLabelElement>document.getElementById("spellLvl");
        this.labelChLrn = <HTMLLabelElement>document.getElementById("chnLearn");
        this.labelMxSplPLvl = <HTMLLabelElement>document.getElementById("maxSplPerLvl");
        this.labelSplImun = <HTMLLabelElement>document.getElementById("splImun");
        this.labelMagDefAdj = <HTMLLabelElement>document.getElementById("magDefAdj");
        this.labelBonusSp = <HTMLLabelElement>document.getElementById("BonusSp");
        this.labelChnFail = <HTMLLabelElement>document.getElementById("chnFail");
        this.labelSplImmune = <HTMLLabelElement>document.getElementById("splImmune");
        this.labelMxHench = <HTMLLabelElement>document.getElementById("mxHench");
        this.labelLoyaltyBs = <HTMLLabelElement>document.getElementById("loyaltyBs");
        this.labelReactAdj = <HTMLLabelElement>document.getElementById("ReactAdj");
        this.labelHp = <HTMLLabelElement>document.getElementById("hp");
        this.labelThac0 = <HTMLElement>document.getElementById("thaco");
        this.labelSvBreath = <HTMLElement>document.getElementById("breath");
        this.labelSvPara = <HTMLElement>document.getElementById("para");
        this.labelSvPoly = <HTMLElement>document.getElementById("poly");
        this.labelSvRod = <HTMLElement>document.getElementById("rod");
        this.labelSvSpell = <HTMLElement>document.getElementById("spell");

        this.selectRace = <HTMLSelectElement>document.getElementById("race");
        this.selectClass = <HTMLSelectElement>document.getElementById("class");
        this.selectLevel = <HTMLSelectElement>document.getElementById("lvl");

        this.rollType = document.getElementsByName('rolltype');
        this.spinner = <HTMLElement>document.getElementById("spinner");
    }

    clearVals = (stat:HTMLSelectElement) => {
        stat.disabled = false;
        stat.selectedIndex = 0;
        let opt = stat.getElementsByTagName("option");
        Array.prototype.slice.call(opt, 0 ).forEach(this.enableOpts);
    }

    // roll stats and clear old values etc
    roll = () => {
        this.spinnerOn();
        this.clearControls();
        if(this.rollType[0].checked) {
            this.fourD6().then((value) => {
                this.inputOne.value = value;
            });
            this.fourD6().then((value) => {
                this.inputTwo.value = value;
            });
            this.fourD6().then((value) => {
                this.inputThree.value = value;
            });
            this.fourD6().then((value) => {
                this.inputFour.value = value;
            });
            this.fourD6().then((value) => {
                this.inputFive.value = value;
            });
            this.fourD6().then((value) => {
                this.inputSix.value = value;
                this.spinnerOff();
            });
        }
        else if(this.rollType[1].checked){
            this.threeD6().then((value) => {
                this.inputOne.value = value;
            });
            this.threeD6().then((value) => {
                this.inputTwo.value = value;
            });
            this.threeD6().then((value) => {
                this.inputThree.value = value;
            });
            this.threeD6().then((value) => {
                this.inputFour.value = value;
            });
            this.threeD6().then((value) => {
                this.inputFive.value = value;
            });
            this.threeD6().then((value) => {
                this.inputSix.value = value;
                this.spinnerOff();
            });
        }
    }

    spinnerOn = () => {
        this.spinner.style.display = "block"
    }

    spinnerOff = () => {
        this.spinner.style.display = "none"
    }

    clearControls = () => {
        this.isFighter = false;
        this.inputOne.value = '';
        this.inputTwo.value = '';
        this.inputThree.value = '';
        this.inputFour.value = '';
        this.inputFive.value = '';
        this.inputSix.value = '';
        this.labelPercent.value = '';

        this.stat1.selectedIndex = 0;
        this.stat2.selectedIndex = 0;
        this.stat3.selectedIndex = 0;
        this.stat4.selectedIndex = 0;
        this.stat5.selectedIndex = 0;
        this.stat6.selectedIndex = 0;

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

        this.labelPercent.textContent = '';
        this.inputStr.value = '';
        this.inputDex.value = '';
        this.inputCon.value = '';
        this.inputInt.value = '';
        this.inputWis.value = '';
        this.inputChr.value = '';

        this.clearVals(this.stat1);
        this.clearVals(this.stat2);
        this.clearVals(this.stat3);
        this.clearVals(this.stat4);
        this.clearVals(this.stat5);
        this.clearVals(this.stat6);

        this.selectRace.selectedIndex = 0;
        this.selectClass.selectedIndex = 0;
        this.selectLevel.selectedIndex = 0;
    }

    // re-enable dropdown option
    enableOpts = (item: HTMLOptionElement) => {
        item.disabled = false;
    }

    // disable dropdown option
    disableOpts = (item: HTMLOptionElement) => {
        item.disabled = true;
    }

    getInputValue = (box: string) => {
        switch(box){
            case "one":
                return this.inputOne.value;
            case "two":
                return this.inputTwo.value;
            case "three":
                return this.inputThree.value;
            case "four":
                return this.inputFour.value;
            case "five":
                return this.inputFive.value;
            case "six":
                return this.inputSix.value;
            default:
                throw Error("Unknown input");
        }
    }

    // assign stat from dropdown
    setOne = (ddl: HTMLSelectElement, box: string) => {
        let val = parseInt(this.getInputValue(box));
        switch(ddl.selectedIndex){
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
                throw new Error("Impossible stat selected");
        }
        ddl.disabled = true;
    }

    // calculate strength modifiers
    checkForStrMods = async (str: number) => {
        let prcStr = 101;
        if(str == 18 && this.isFighter){
            this.spinnerOn();
            prcStr = await this.rollTheDice(100);
            this.spinnerOff();
            this.labelPercent.textContent = prcStr.toString();
        }
        switch(str){
            case 3:
                this.hitProb = -3;
                this.DmgAdj = -1;
                this.setStrChecks(5, 10, 2, 0);
                break;
            case 4:
            case 5:
                this.hitProb = -2;
                this.DmgAdj = -1;
                this.setStrChecks(10, 25, 3, 0);
                break;
            case 6:
            case 7:
                this.hitProb = -1;
                this.DmgAdj = 0;
                this.setStrChecks(20, 55, 4, 0);
                break;
            case 8:
            case 9:
                this.hitProb = 0;
                this.DmgAdj = 0;
                this.setStrChecks(35, 90, 5, 1);
                break;
            case 10:
            case 11:
                this.hitProb = 0;
                this.DmgAdj = 0;
                this.setStrChecks(40, 115, 6, 2);
                break;
            case 12:
            case 13:
                this.hitProb = 0;
                this.DmgAdj = 0;
                this.setStrChecks(45, 140, 7, 4);
                break;
            case 14:
            case 15:
                this.hitProb = 0;
                this.DmgAdj = 0;
                this.setStrChecks(55, 170, 8, 7);
                break;
            case 16:
                this.hitProb = 0;
                this.DmgAdj = 1;
                this.setStrChecks(70, 195, 8, 10);
                break;
            case 17:
                this.hitProb = 1;
                this.DmgAdj = 1;
                this.setStrChecks(85, 220, 10, 13);
                break;
            case 18:
                switch(true){
                    case prcStr < 51:
                        this.hitProb = 1;
                        this.DmgAdj = 3;
                        this.setStrChecks(135, 280, 12, 20);
                        break;
                    case prcStr < 76:
                        this.hitProb = 2;
                        this.DmgAdj = 3;
                        this.setStrChecks(160, 305, 13, 25);                
                        break;
                    case prcStr < 91:
                        this.hitProb = 2;
                        this.DmgAdj = 4;
                        this.setStrChecks(185, 330, 14, 30);
                        break;
                    case prcStr < 100:
                        this.hitProb = 2;
                        this.DmgAdj = 5;
                        this.setStrChecks(235, 380, 15, 35);
                        break;
                    case prcStr == 100:
                        this.hitProb = 3;
                        this.DmgAdj = 6;
                        this.setStrChecks(335, 480, 16, 40);
                        this.wghtAllow = 335;
                        this.MxPres = 480;
                        this.opDrs = 16;
                        this.bndBrs = 40;
                    default:
                        this.hitProb = 1;
                        this.DmgAdj = 2;
                        this.setStrChecks(110, 255, 11, 16);
                }
                break;
        }
    }

    // set strength adjustments
    setStrChecks = (wAllow: number, mPres: number, oDrs: number ,bBrs: number) => {
        this.labelWgtAllow.textContent = wAllow.toString();
        this.labelMxPress.innerHTML = mPres.toString();
        this.labelOpDrs.innerHTML = oDrs.toString();
        this.labelBndBrs.innerHTML = bBrs.toString();
    }

    // calculate dexterity modifiers
    setDexMods = (dex: number) => {
        switch(dex){
            case 3:
                this.setDexAdj(-3, -3, 4);
                break;
            case 4:
                this.setDexAdj(-2, -2, 3);
                break;
            case 5:
                this.setDexAdj(-1, -1, 2);
                break;
            case 6:
                this.setDexAdj(0, 0, 1);
                break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                this.setDexAdj(0, 0, 0);
                break;
            case 15:
                this.setDexAdj(0, 0, -1);
                break;
            case 16:
                this.setDexAdj(1, 1, -2);
                break;
            case 17:
                this.setDexAdj(2, 2, -3);
                break;
            case 18:
                this.setDexAdj(2, 2, -4);
                break;
            default:
                break;
        }
    }

    // set dexterity adj
    setDexAdj = (rAdj: number, msAdj: number, dAdj:number) => {
        this.labelRctAdj.innerHTML = rAdj.toString();
        this.labelMislAdj.innerHTML = msAdj.toString();
        this.labelDefAdj.innerHTML = dAdj.toString();
    }

    // calculate con modifiers
    setConMods = (con: number) => {
        switch(con){
            case 3:
                this.setConAdj(-2, 25, 30, -2, 0);
                break;
            case 4:
                this.setConAdj(-1, 40, 45, 0, 0);
                break;
            case 5:
                this.setConAdj(-1, 45, 50, 0, 0);
                break;
            case 6:
                this.setConAdj(-1, 50, 55, 0, 0);
                break;
            case 7:
                this.setConAdj(0, 55, 60, 0, 0);
                break;
            case 8:
                this.setConAdj(0, 60, 65, 0, 0);
                break;
            case 9:
                this.setConAdj(0, 65, 70, 0, 0);
                break;
            case 10:
                this.setConAdj(0, 70, 75, 0, 0);
                break;
            case 11:
                this.setConAdj(0, 75, 80, 0, 0);
                break;
            case 12:
                this.setConAdj(0, 80, 85, 0, 0);
                break;
            case 13:
                this.setConAdj(0, 85, 90, 0, 0);
                break;
            case 14:
                this.setConAdj(0, 88, 92, 0, 0);
                break;
            case 15:
                this.setConAdj(1, 90, 94, 0, 0);
                break;
            case 16:
                this.setConAdj(2, 95, 96, 0, 0);
                break;
            case 17:
                this.setConAdj(2, 97, 98, 0, 0);
                break;
            case 18:
                this.setConAdj(2, 99, 100, 0, 0);
                break;
            default:
                break;
        }
        if(this.isFighter){
            switch(con){
                case 17:
                    this.setConAdj(3, 97, 98, 0, 0);
                    break;
                case 18:
                    this.setConAdj(4, 99, 100, 0, 0);
                    break;
            }
        }
    }

    // set consititution adj
    setConAdj = (hpA: number, sys: number, res: number, pos: number, reg: number) => {
        this.hpAdj = hpA;
        this.labelHpAdj.innerHTML = hpA.toString();
        this.labelSysShk.innerHTML = sys.toString();
        this.labelResSurv.innerHTML = res.toString();
        this.labelPoisSv.innerHTML = pos.toString();
        this.labelRegen.innerHTML = reg.toString();
    }

    // calculate intelligence modifiers
    setIntMods = (int: number) => {
        switch(int){
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                this.setIntAdj(1, 0, 0, 0, 0);
                break;
            case 9:
                this.setIntAdj(2, 4, 35, 6, 0);
                break;
            case 10:
                this.setIntAdj(2, 5, 40, 7, 0);
                break;
            case 11:
                this.setIntAdj(2, 5, 45, 7, 0);
                break;
            case 12:
                this.setIntAdj(3, 6, 50, 7, 0);
                break;
            case 13:
                this.setIntAdj(3, 6, 55, 7, 0);
                break;
            case 14:
                this.setIntAdj(4, 7, 60, 9, 0);
                break;
            case 15:
                this.setIntAdj(4, 7, 65, 11, 0);
                break;
            case 16:
                this.setIntAdj(5, 8, 70, 11, 0);
                break;
            case 17:
                this.setIntAdj(6, 8, 75, 14, 0);
                break;
            case 18:
                this.setIntAdj(7, 9, 85, 18, 0);
                break;
            default:
                break;
        }
    }

    // set intelligence adjustments
    setIntAdj = (noLan: number, sLvl: number, chnLn: number, max: number, imun: number) => {
        this.labelNoLang.innerHTML = noLan.toString();
        this.labelSplLvl.innerHTML = sLvl.toString();
        this.labelChLrn.innerHTML = chnLn.toString();
        this.labelMxSplPLvl.innerHTML = max.toString();
        this.labelSplImun.innerHTML = imun.toString();
    }

    // calculate wisdom modifiers
    setWisMods = (wis: number) => {
        switch(wis){
            case 3:
                this.setWisAdj(-3, 0, 50, 0);
                break;
            case 4:
                this.setWisAdj(-2, 0, 45, 0);
                break;
            case 5:
                this.setWisAdj(-1, 0, 40, 0);
                break;
            case 6:
                this.setWisAdj(-1, 0, 35, 0);
                break;
            case 7:
                this.setWisAdj(-1, 0, 30, 0);
                break;
            case 8:
                this.setWisAdj(0, 0, 25, 0);
                break;
            case 9:
                this.setWisAdj(0, 0, 20, 0);
                break;
            case 10:
                this.setWisAdj(0, 0, 15, 0);
                break;
            case 11:
                this.setWisAdj(0, 0, 10, 0);
                break;
            case 12:
                this.setWisAdj(0, 0, 5, 0);
                break;
            case 13:
            case 14:
                this.setWisAdj(0, 1, 0, 0);
                break;
            case 15:
                this.setWisAdj(1, 2, 0, 0);
                break;
            case 16:
                this.setWisAdj(2, 2, 0, 0);
                break;
            case 17:
                this.setWisAdj(3, 3, 0, 0);
                break;
            case 18:
                this.setWisAdj(4, 4, 0, 0);
                break;
            default:
                break;
        }
    }

    // set wisdom adjustments
    setWisAdj = (mDef: number, bSp: number, cnFl: number, imun: number) => {
        this.labelMagDefAdj.innerHTML = mDef.toString();
        this.labelBonusSp.innerHTML = bSp.toString();
        this.labelChnFail.innerHTML = cnFl.toString();
        this.labelSplImmune.innerHTML = imun.toString();
    }

    // Calculate charisma modifiers
    setCharMods = (chr: number) => {
        switch(chr){
            case 3:
                this.setCharAdj(1, -6, -5);
                break;
            case 4:
                this.setCharAdj(1, -5, -4);
                break;
            case 5:
                this.setCharAdj(2, -4, -3);
                break;
            case 6:
                this.setCharAdj(2, -3, -2);
                break;
            case 7:
                this.setCharAdj(3, -2, -1);
                break;
            case 8:
                this.setCharAdj(3, -1, 0);
                break;
            case 9:
            case 10:
            case 11:
                this.setCharAdj(4, 0, 0);
                break;
            case 12:
                this.setCharAdj(5, 0, 0);
                break;
            case 13:
                this.setCharAdj(5, 0, 1);
                break;
            case 14:
                this.setCharAdj(6, 1, 2);
                break;
            case 15:
                this.setCharAdj(7, 3, 3);
                break;
            case 16:
                this.setCharAdj(8, 4, 5);
                break;
            case 17:
                this.setCharAdj(10, 6, 6);
                break;
            case 18:
                this.setCharAdj(15, 8, 7);
                break;
            default:
                break;
        }
    }

    // Set charisma adj
    setCharAdj = (hench: number, loyal: number, react: number) => {
        this.labelMxHench.innerHTML = hench.toString();
        this.labelLoyaltyBs.innerHTML = loyal.toString();
        this.labelReactAdj.innerHTML = react.toString();
    }

    // Disable statistic option after its selected
    removeOption = (index: number) => {
        this.disableOpts(this.stat1.getElementsByTagName("option")[index]);
        this.disableOpts(this.stat2.getElementsByTagName("option")[index]);
        this.disableOpts(this.stat3.getElementsByTagName("option")[index]);
        this.disableOpts(this.stat4.getElementsByTagName("option")[index]);
        this.disableOpts(this.stat5.getElementsByTagName("option")[index]);
        this.disableOpts(this.stat6.getElementsByTagName("option")[index]);
    }

    // throw 4d6 remove lowest roll
    fourD6 = async () => {
        let one = await this.rollTheDice(6);
        let two = await this.rollTheDice(6);
        let three = await this.rollTheDice(6);
        let four = await this.rollTheDice(6);
        let lowest = Math.min(one, two, three, four);
        return (one + two + three + four) - lowest;
    }

    // throw 3d6
    threeD6 = async () => {
        let one = await this.rollTheDice(6);
        let two = await this.rollTheDice(6);
        let three = await this.rollTheDice(6);
        return one + two + three;
    }

    // random number generator
    rollTheDice(die: number) {
        const random = new Uint32Array(1);
        window.crypto.getRandomValues(random);
        return (random[0] % die) + 1;
      }

    // Set the class
    setClass = (ddl: HTMLSelectElement) => {
        switch(ddl.selectedIndex){
            case 1:// Fighters
            case 6:
            case 7:
                this.isFighter = true;
                this.checkForStrMods(this.strInit);
                this.setConMods(this.conInit);
                this.hitdice = 10;
                break;
            case 2:// Rogues
            case 5:
                this.hitdice = 6;
                break;
            case 3:// Priests
            case 8:
                this.hitdice = 8;
                break;
            case 4:// Wizards
            this.hitdice = 4;
                break;
            default:
                throw new Error("Uknown class type");
                
        }
    }

    zeroMOds = () => {
        this.strMod = 0;
        this.dexMod = 0;
        this.conMod = 0;
        this.intMod = 0;
        this.wisMod = 0;
        this.chrMod = 0;
    }

    applyRacialMods = () => {
        this.inputStr.value = (this.strMod == 0 ? this.inputStr.value : parseInt(this.inputStr.value) + this.strMod).toString();
        this.inputDex.value = (this.dexMod == 0 ? this.inputDex.value : parseInt(this.inputDex.value) + this.dexMod).toString();
        this.inputChr.value = (this.chrMod == 0 ? this.inputChr.value : parseInt(this.inputChr.value) + this.chrMod).toString();
        this.inputCon.value = (this.conMod == 0 ? this.inputCon.value : parseInt(this.inputCon.value) + this.conMod).toString();
        this.inputInt.value = (this.intMod == 0 ? this.inputInt.value : parseInt(this.inputInt.value) + this.intMod).toString();
        this.inputWis.value = (this.wisMod == 0 ? this.inputWis.value : parseInt(this.inputWis.value) + this.wisMod).toString();
    }

    disableSelectionOpts(options:HTMLOptionElement[]) {
        for(var i = 0; i < options.length; i++){
            options[i].disabled = true;
        }
    }

    enableSelectOptionByVal = (options:HTMLOptionElement[], type: string) => {
        for(var i = 1; i < options.length; i++){
            if(options[i].value === type)
                options[i].disabled = false;
        }
    }

    enableClassDdl = (race: races) => {
        this.disableSelectionOpts(this.selectClass.getElementsByTagName("option"));
        switch(race){
            case races.human:
                raceClassLimits.human.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName("option"),item));
                break;
            case races.dwarf:
                raceClassLimits.dwarf.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName("option"),item));
                break;
            case races.elf:
                raceClassLimits.elf.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName("option"),item));
                break;
            case races.gnome:
                raceClassLimits.gnome.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName("option"),item));
                break;
            case races.halfElf:
                raceClassLimits.halfElf.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName("option"),item));
                break;
            case races.halfling:
                raceClassLimits.halfling.forEach(item => this.enableSelectOptionByVal(this.selectClass.getElementsByTagName("option"),item));
                break;
            default:
                throw Error("No idea what species this is?");
                
        }
    }

    dmMode = () => {
        this.clearControls();
        this.enableDisableStats(true);
        this.zeroMOds();
        this.strInit = 0;
        this.dexInit = 0;
        this.conInit = 0;
        this.intInit = 0;
        this.wisInit = 0;
        this.chrInit = 0; 
        this.rollButton.disabled = true;
        this.inputStr.readOnly = false;
        this.inputDex.readOnly = false;
        this.inputCon.readOnly = false;
        this.inputInt.readOnly = false;
        this.inputWis.readOnly = false;
        this.inputChr.readOnly = false;
    }

    genMode = () => {
        this.clearControls();
        this.enableDisableStats(false);
        this.rollButton.disabled = false;
        this.inputStr.readOnly = true;
        this.inputDex.readOnly = true;
        this.inputCon.readOnly = true;
        this.inputInt.readOnly = true;
        this.inputWis.readOnly = true;
        this.inputChr.readOnly = true;
    }

    enableDisableStats = (disable: boolean) => {
        this.inputOne.disabled = disable;
        this.inputTwo.disabled = disable;
        this.inputThree.disabled = disable;
        this.inputFour.disabled = disable;
        this.inputFive.disabled = disable;
        this.inputSix.disabled = disable;
        this.stat1.disabled = disable;
        this.stat2.disabled = disable;
        this.stat3.disabled = disable;
        this.stat4.disabled = disable;
        this.stat5.disabled = disable;
        this.stat6.disabled = disable;
    }

    // Add racial mods
    setRace = (ddl: HTMLSelectElement) => {
        this.zeroMOds();        
        switch(ddl.selectedIndex){
            case 1://human
                this.enableClassDdl(races.human);
                break;
            case 2://dwarf
                this.conMod = 1; 
                this.chrMod = -1;
                this.enableClassDdl(races.dwarf);
                break;
            case 3://elf
                this.dexMod = 1;
                this.conMod = -1;
                this.enableClassDdl(races.elf);
                break;
            case 4://gnome
                this.intMod = 1;
                this.wisMod = -1;
                this.enableClassDdl(races.gnome);
                break;
            case 5://halfling               
                this.dexMod = 1;
                this.strMod = -1;
                this.enableClassDdl(races.halfling);
                break;
            case 6://half elf
                this.enableClassDdl(races.halfElf);
                break;
            default:
                throw Error("Uknown race");
        }
        this.applyRacialMods();
    }

    // Calculate hp and thac0
    setLevel = async (ddl: HTMLSelectElement) => {  
        let hit = 0;
        for(let i = 0; i < ddl.selectedIndex; i++) {
            hit += await this.calcHPRoll();
        }
        this.labelHp.innerHTML = hit.toString();

        let classIndex = this.selectClass.selectedIndex;
        let classType: 'fighter' | 'rogue' | 'cleric' | 'mage' = 'fighter';
        switch (classIndex) {
            case 1: 
            case 6:
            case 7:
                classType = 'fighter';
                break;
            case 2:
            case 5:
                classType = 'rogue';
                break;
            case 9:
            case 4:
                classType = 'mage';
                break;
            case 3: 
            case 8:
                classType = 'cleric';
                break;
            default:
                throw new Error("Unknown meta class");  
        }
    
        this.setLabelValues(classType, ddl.selectedIndex -1);
    }

    // Hit dice roll with con mod, minimum roll 1
    calcHPRoll = async () => {
        let hp = await this.rollTheDice(this.hitdice) + this.hpAdj;
        return (hp < 1) ? 1 :  hp;
    }

    setLabelValues = (classType: keyof THAC0S, level: number) => {
        this.labelThac0.innerText = thac0s[classType][level];
        this.labelSvBreath.innerText = savingThrows[classType].breath[level];
        this.labelSvPara.innerText = savingThrows[classType].para[level];
        this.labelSvPoly.innerText = savingThrows[classType].poly[level];
        this.labelSvRod.innerText = savingThrows[classType].rod[level];
        this.labelSvSpell.innerText = savingThrows[classType].spell[level];
    } 
};
