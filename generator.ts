// Global class object
let gen:any;

enum classes{
	fighter = 0,
	thief = 1,
	cleric = 2,
	mage = 3,
	bard = 4,
	paladin = 5,
	ranger = 6,
	druid = 7,
	illusionist = 8
}

enum races{
	human,
	dwarf,
	elf,
	gnome,
	halfling,
	halfElf
}

let raceClassLimits = {
	human:[classes.fighter,classes.thief,classes.cleric,classes.mage,classes.bard,classes.paladin,classes.ranger,classes.druid,classes.illusionist],
	dwarf:[classes.fighter,classes.cleric,classes.thief],
	elf:[ classes.fighter,classes.ranger,classes.cleric,classes.thief,classes.bard,classes.mage],
	halfElf:[classes.fighter,classes.paladin,classes.ranger,classes.cleric,classes.druid,classes.thief,classes.bard,classes.mage],
	gnome:[classes.fighter,classes.cleric,classes.thief,classes.mage,classes.illusionist],
	halfling:[classes.fighter,classes.cleric,classes.thief]
};

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
	labelPercent: any;
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
	selectClass: any;
	selectRace: any;
	selectLevel: any;

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

		this.selectRace = <HTMLSelectElement>document.getElementById("race");
		this.selectClass = <HTMLSelectElement>document.getElementById("class");
		this.selectLevel = <HTMLSelectElement>document.getElementById("lvl");
	}

	clearVals = (stat:HTMLSelectElement) => {
		stat.disabled = false;
		stat.selectedIndex = 0;
		let opt = stat.getElementsByTagName("option");
		Array.prototype.slice.call(opt, 0 ).forEach(this.enableOpts);
	}

	// roll stats and clear old values etc
	roll = () => {
		this.clearControls();
		this.inputOne.value = this.fourD6().toString();
		this.inputTwo.value = this.fourD6().toString();
		this.inputThree.value = this.fourD6().toString();
		this.inputFour.value = this.fourD6().toString();
		this.inputFive.value = this.fourD6().toString();
		this.inputSix.value = this.fourD6().toString();
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

		this.labelPercent.innerText = '';
		this.labelWgtAllow.innerText = '';
		this.labelMxPress.innerText = '';
		this.labelOpDrs.innerText = '';
		this.labelBndBrs.innerText = '';
		this.labelRctAdj.innerText = '';
		this.labelMislAdj.innerText = '';
		this.labelDefAdj.innerText = '';
		this.labelHpAdj.innerText = '';
		this.labelSysShk.innerText = '';
		this.labelResSurv.innerText = '';
		this.labelPoisSv.innerText = '';
		this.labelRegen.innerText = '';
		this.labelNoLang.innerText = '';
		this.labelSplLvl.innerText = '';
		this.labelChLrn.innerText = '';
		this.labelMxSplPLvl.innerText = '';
		this.labelSplImun.innerText = '';
		this.labelMagDefAdj.innerText = '';
		this.labelBonusSp.innerText = '';
		this.labelChnFail.innerText = '';
		this.labelSplImmune.innerText = '';
		this.labelMxHench.innerText = '';
		this.labelLoyaltyBs.innerText = '';
		this.labelReactAdj.innerText = '';
		this.labelHp.innerText = '';

		this.labelPercent.innerText = '';
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
				return Error("Unknown input");
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
				break;				
		}
		ddl.disabled = true;
	}

	// calculate strength modifiers
	checkForStrMods = (str: number) => {
		let prcStr = 101;
		if(str == 18 && this.isFighter){
			prcStr = this.getRndInteger(1,100);
			this.labelPercent.innerText = prcStr.toString();
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
		this.labelWgtAllow.innerText = wAllow.toString();
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
		this.stat1.getElementsByTagName("option")[index].disabled = true;
		this.stat2.getElementsByTagName("option")[index].disabled = true;
		this.stat3.getElementsByTagName("option")[index].disabled = true;
		this.stat4.getElementsByTagName("option")[index].disabled = true;
		this.stat5.getElementsByTagName("option")[index].disabled = true;
		this.stat6.getElementsByTagName("option")[index].disabled = true;
	}

	// throw 4d6 remove lowest roll
	fourD6 = () => {
		let one = this.getRndInteger(1,6);
		let two = this.getRndInteger(1,6);
		let three = this.getRndInteger(1,6);
		let four = this.getRndInteger(1,6);
		let lowest = Math.min(one, two, three, four);
		return (one + two + three + four) - lowest;
	}

	// throw 3d6
	threeD6(){
		let one = this.getRndInteger(1,6);
		let two = this.getRndInteger(1,6);
		let three = this.getRndInteger(1,6);
		return one + two + three;
	}

	// random number generator
	getRndInteger = (min: number, max: number) => {
		max++;
		return Math.floor(Math.random() * (max - min) ) + min;
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
				break;
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
		this.inputStr.value = (this.strInit + this.strMod).toString();
		this.inputDex.value = (this.dexInit + this.dexMod).toString();
		this.inputChr.value = (this.chrInit + this.chrMod).toString();
		this.inputCon.value = (this.conInit + this.conMod).toString();
		this.inputInt.value = (this.intInit + this.intMod).toString();
		this.inputWis.value = (this.wisInit + this.wisMod).toString();
	}

	enableClassDdl = (race: races) => {
		debugger;
		switch(race){
			case races.human:
				raceClassLimits.human.forEach(item => this.selectClass.getElementsByTagName("option")[item].disabled = false);
				break;
			case races.dwarf:
				raceClassLimits.dwarf.forEach(item => this.selectClass.getElementsByTagName("option")[item].disabled = false);
				break;
			case races.elf:
				raceClassLimits.elf.forEach(item => this.selectClass.getElementsByTagName("option")[item].disabled = false);
				break;
			case races.gnome:
				raceClassLimits.gnome.forEach(item => this.selectClass.getElementsByTagName("option")[item].disabled = false);
				break;
			case races.halfElf:
				raceClassLimits.halfElf.forEach(item => this.selectClass.getElementsByTagName("option")[item].disabled = false);
				break;
			case races.halfling:
				raceClassLimits.halfElf.forEach(item => this.selectClass.getElementsByTagName("option")[item].disabled = false);
				break;
			default:
				throw Error("No idea what species this is?");
				
		}
	}

	// Add racial mods
	setRace = (ddl: HTMLSelectElement) => {
		switch(ddl.selectedIndex){
			case 1://human
				this.zeroMOds();
				this.applyRacialMods();
				this.enableClassDdl(races.human);
				break;
			case 2://dwarf
				this.zeroMOds();
				this.conMod = 1; 
				this.chrMod = -1;
				this.applyRacialMods();
				this.enableClassDdl(races.dwarf);
				break;
			case 3://elf
				this.zeroMOds();
				this.dexMod = 1;
				this.conMod = -1;
				this.applyRacialMods();
				this.enableClassDdl(races.elf);
				break;
			case 4://gnome
				this.zeroMOds();
				this.intMod = 1;
				this.wisMod = -1;
				this.applyRacialMods();
				this.enableClassDdl(races.gnome);
				break;
			case 5://halfling				
				this.zeroMOds();
				this.dexMod = 1;
				this.strMod = -1;
				this.applyRacialMods();
				this.enableClassDdl(races.halfElf);
				break;
			case 6://half elf
				this.zeroMOds();
				this.applyRacialMods();
				this.enableClassDdl(races.halfElf);
				break;
			default:
				throw Error("How did you get here?");
		}	
	}

	// Calculate hp and thac0
	setLevel = (ddl: HTMLSelectElement) => {	
		let hit = 0;
		for(let i = 0; i < ddl.selectedIndex; i++){
			hit += this.calcHPRoll();
		}
		this.labelHp.innerHTML = hit.toString();
	}

	// Hit dice roll with con mod, minimum roll 1
	calcHPRoll = () => {
		let hp = this.getRndInteger(1, this.hitdice) + this.hpAdj;
		if (hp < 1)
			return 1
		else
			return hp;
	}
};
