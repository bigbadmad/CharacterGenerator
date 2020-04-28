// Global class object
let gen:any;

window.onload = () => {
	gen = new Generator(<HTMLInputElement>document.getElementById("roll"));
	gen.setup();
};

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
	// dex
	rctAdj = 0;
	mislAdj = 0;
	defAdj = 0;
	// con
	hpAdj = 0;
	sysShk = 0;
	resSurv = 0;
	posSv = 0;
	regen = 0;
	// int
	noOfLang = 0;
	spellLvl = 0;
	chnLearn = 0;
	maxSplPerLvl = 0;
	splImun = 0;
	// str
	wghtAllow = 0;
	MxPres = 0;
	opDrs = 0;
	bndBrs = 0;
	// wis
	magDefAdj = 0;
	BonusSp = 0;
	chnFail = 0;
	splImmune = 0;
	// char
	mxHench = 0;
	loyaltyBs = 0;
	ReactAdj = 0;

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

	setup = () => {
		this.rollButton.addEventListener("click", this.roll);
	}

	// roll stats and clear old values etc
	roll = () => {
		this.isFighter = false;
		(<HTMLInputElement>document.getElementById("one")).value = this.fourD6().toString();
		(<HTMLInputElement>document.getElementById("two")).value = this.fourD6().toString();
		(<HTMLInputElement>document.getElementById("three")).value = this.fourD6().toString();
		(<HTMLInputElement>document.getElementById("four")).value = this.fourD6().toString();
		(<HTMLInputElement>document.getElementById("five")).value = this.fourD6().toString();
		(<HTMLInputElement>document.getElementById("six")).value = this.fourD6().toString();
		
		(<HTMLLabelElement>document.getElementById("percent")).innerText = '';

		let stat1 = <HTMLSelectElement>document.getElementById("stat1");
		stat1.disabled = false;
		stat1.selectedIndex = 0;
		let opt1 = stat1.getElementsByTagName("option");
		Array.prototype.slice.call(opt1, 0 ).forEach(this.enableOpts);
		(<HTMLInputElement>document.getElementById("str")).value = '';
		
		let stat2 = <HTMLSelectElement>document.getElementById("stat2");
		stat2.disabled = false;
		stat2.selectedIndex = 0;
		let opt2 = stat2.getElementsByTagName("option");
		Array.prototype.slice.call(opt2, 0 ).forEach(this.enableOpts);
		(<HTMLInputElement>document.getElementById("dex")).value = '';
		
		let stat3 = <HTMLSelectElement>document.getElementById("stat3");
		stat3.disabled = false;
		stat3.selectedIndex = 0;
		let opt3 = stat3.getElementsByTagName("option");
		Array.prototype.slice.call(opt3, 0 ).forEach(this.enableOpts);
		(<HTMLInputElement>document.getElementById("con")).value = '';
		
		let stat4 = <HTMLSelectElement>document.getElementById("stat4");
		stat4.disabled = false;
		stat4.selectedIndex = 0;
		let opt4 = stat4.getElementsByTagName("option");
		Array.prototype.slice.call(opt4, 0 ).forEach(this.enableOpts);
		(<HTMLInputElement>document.getElementById("int")).value = '';
		
		let stat5 = <HTMLSelectElement>document.getElementById("stat5");
		stat5.disabled = false;
		stat5.selectedIndex = 0;
		let opt5 = stat5.getElementsByTagName("option");
		Array.prototype.slice.call(opt5, 0 ).forEach(this.enableOpts);
		(<HTMLInputElement>document.getElementById("wis")).value = '';
		
		let stat6 = <HTMLSelectElement>document.getElementById("stat6");
		stat6.disabled = false;
		stat6.selectedIndex = 0;
		let opt6 = stat6.getElementsByTagName("option");
		Array.prototype.slice.call(opt6, 0 ).forEach(this.enableOpts);
		(<HTMLInputElement>document.getElementById("chr")).value = '';
	}

	// re-enable dropdown option
	enableOpts = (item: HTMLOptionElement, index: number) => {
		item.disabled = false;
	}

	// assign stat from dropdown
	setOne = (ddl: HTMLSelectElement, box: string) => {
		let val = parseInt((<HTMLInputElement>document.getElementById(box)).value);
		switch(ddl.selectedIndex){
			case 1:
				this.strInit = val;
				(<HTMLInputElement>document.getElementById("str")).value = this.strInit.toString();
				ddl.disabled = true;
				this.removeOption(1);
				this.checkForStrMods(this.strInit);
				break;
			case 2:
				this.dexInit = val;
				(<HTMLInputElement>document.getElementById("dex")).value = this.dexInit.toString();
				ddl.disabled = true;
				this.removeOption(2);
				this.setDexMods(this.dexInit);
				break;
			case 3:
				this.conInit = val;
				(<HTMLInputElement>document.getElementById("con")).value = this.conInit.toString();
				ddl.disabled = true;
				this.removeOption(3);
				this.setConMods(this.conInit);
				break;
			case 4:
				this.intInit = val;
				(<HTMLInputElement>document.getElementById("int")).value = this.intInit.toString();
				ddl.disabled = true;
				this.removeOption(4);
				this.setIntMods(this.intInit);
				break;
			case 5:
				this.wisInit = val;
				(<HTMLInputElement>document.getElementById("wis")).value = this.wisInit.toString();
				ddl.disabled = true;
				this.removeOption(5);
				this.setWisMods(this.wisInit);
				break;
			case 6:
				this.chrInit = val;
				(<HTMLInputElement>document.getElementById("chr")).value = this.chrInit.toString();
				ddl.disabled = true;
				this.removeOption(6);
				this.setCharMods(this.chrInit);
				break;
			default:
				break;				
		}
	}

	// calculate strength modifiers
	checkForStrMods = (str: number) => {
		let prcStr = 101;
		if(str == 18 && this.isFighter){
			prcStr = this.getRndInteger(1,100);
			(<HTMLLabelElement>document.getElementById("percent")).innerText = prcStr.toString();
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
		this.wghtAllow = wAllow, this.MxPres = mPres, this.opDrs = oDrs, this.bndBrs = bBrs;
		(<HTMLLabelElement>document.getElementById("wghtAllow")).innerText = this.wghtAllow.toString();
		(<HTMLLabelElement>document.getElementById("MxPres")).innerHTML = this.MxPres.toString();
		(<HTMLLabelElement>document.getElementById("opDrs")).innerHTML = this.opDrs.toString();
		(<HTMLLabelElement>document.getElementById("bndBrs")).innerHTML = this.bndBrs.toString();
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
		this.rctAdj = rAdj, this.mislAdj = msAdj, this.defAdj = dAdj;
		(<HTMLLabelElement>document.getElementById("rctAdj")).innerHTML = this.rctAdj.toString();
		(<HTMLLabelElement>document.getElementById("mislAdj")).innerHTML = this.mislAdj.toString();
		(<HTMLLabelElement>document.getElementById("defAdj")).innerHTML = this.defAdj.toString();
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
		this.hpAdj = hpA, this.sysShk = sys, this.resSurv = res, this.posSv = pos, this.regen = reg;
		(<HTMLLabelElement>document.getElementById("hpAdj")).innerHTML = this.hpAdj.toString();
		(<HTMLLabelElement>document.getElementById("sysShk")).innerHTML = this.sysShk.toString();
		(<HTMLLabelElement>document.getElementById("resSurv")).innerHTML = this.resSurv.toString();
		(<HTMLLabelElement>document.getElementById("posSv")).innerHTML = this.posSv.toString();
		(<HTMLLabelElement>document.getElementById("regen")).innerHTML = this.regen.toString();
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
		this.noOfLang = noLan, this.spellLvl = sLvl, this.chnLearn = chnLn, this.maxSplPerLvl = max, this.splImun = imun;
		(<HTMLLabelElement>document.getElementById("noOfLang")).innerHTML = this.noOfLang.toString();
		(<HTMLLabelElement>document.getElementById("spellLvl")).innerHTML = this.spellLvl.toString();
		(<HTMLLabelElement>document.getElementById("chnLearn")).innerHTML = this.chnLearn.toString();
		(<HTMLLabelElement>document.getElementById("maxSplPerLvl")).innerHTML = this.maxSplPerLvl.toString();
		(<HTMLLabelElement>document.getElementById("splImun")).innerHTML = this.splImun.toString();
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
		this.magDefAdj = mDef, this.BonusSp = bSp, this.chnFail = cnFl, this.splImmune = imun;
		(<HTMLLabelElement>document.getElementById("magDefAdj")).innerHTML = this.magDefAdj.toString();
		(<HTMLLabelElement>document.getElementById("BonusSp")).innerHTML = this.BonusSp.toString();
		(<HTMLLabelElement>document.getElementById("chnFail")).innerHTML = this.chnFail.toString();
		(<HTMLLabelElement>document.getElementById("splImmune")).innerHTML = this.splImmune.toString();
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
		this.mxHench = hench, this.loyaltyBs = loyal, this.ReactAdj = react;
		(<HTMLLabelElement>document.getElementById("mxHench")).innerHTML = this.mxHench.toString();
		(<HTMLLabelElement>document.getElementById("loyaltyBs")).innerHTML = this.loyaltyBs.toString();
		(<HTMLLabelElement>document.getElementById("ReactAdj")).innerHTML = this.ReactAdj.toString();
	}

	// Disable statistic option after its selected
	removeOption = (index: number) => {
		let op1 = (<HTMLSelectElement>document.getElementById("stat1")).getElementsByTagName("option");
		op1[index].disabled = true;
		let op2 = (<HTMLSelectElement>document.getElementById("stat2")).getElementsByTagName("option");
		op2[index].disabled = true;
		let op3 = (<HTMLSelectElement>document.getElementById("stat3")).getElementsByTagName("option");
		op3[index].disabled = true;
		let op4 = (<HTMLSelectElement>document.getElementById("stat4")).getElementsByTagName("option");
		op4[index].disabled = true;
		let op5 = (<HTMLSelectElement>document.getElementById("stat5")).getElementsByTagName("option");
		op5[index].disabled = true;
		let op6 = (<HTMLSelectElement>document.getElementById("stat6")).getElementsByTagName("option");
		op6[index].disabled = true;
	}

	// throw 4d6 remove lowest roll
	fourD6 = () => {
		let one = this.getRndInteger(1,6);
		let two = this.getRndInteger(1,6);
		let 
		three = this.getRndInteger(1,6);
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
		max = max + 1;
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
		(<HTMLInputElement>document.getElementById("con")).value = (this.conInit + this.conMod).toString();
		(<HTMLInputElement>document.getElementById("chr")).value = (this.chrInit + this.chrMod).toString();
		(<HTMLInputElement>document.getElementById("dex")).value = (this.dexInit + this.dexMod).toString();
		(<HTMLInputElement>document.getElementById("con")).value = (this.conInit + this.conMod).toString();
		(<HTMLInputElement>document.getElementById("int")).value = (this.intInit + this.intMod).toString();
		(<HTMLInputElement>document.getElementById("wis")).value = (this.wisInit + this.wisMod).toString();
		(<HTMLInputElement>document.getElementById("dex")).value = (this.dexInit + this.dexMod).toString();
		(<HTMLInputElement>document.getElementById("str")).value = (this.strInit + this.strMod).toString();
	}

	// Add racial mods
	setRace = (ddl: HTMLSelectElement) => {
		switch(ddl.selectedIndex){
			case 1://human
			this.zeroMOds();
			this.applyRacialMods();
				break;
			case 2://dwarf
				// + 1 con - 1 chr
				// remove mage class option
				this.zeroMOds();
				this.conMod = 1; 
				this.chrMod = -1;
				this.applyRacialMods();
				break;
			case 3://elf
				// + 1 dex - 1 con
				this.zeroMOds();
				this.dexMod = 1;
				this.conMod = -1;
				this.applyRacialMods()
				break;
			case 4://gnome
			// + 1 int - 1 wisdom
				this.zeroMOds();
				this.intMod = 1;
				this.wisMod = -1;
				this.applyRacialMods();
				break;
			case 5://halfling
				// + 1 dex - 1 str
				this.zeroMOds();
				this.dexMod = 1;
				this.strMod = -1;
				this.applyRacialMods();
				break;
			case 6://half elf
				this.zeroMOds();
				this.applyRacialMods();
				break;
			default:
				this.zeroMOds();
				this.applyRacialMods();
				break;
		}	
	}

	// Calculate hp and thac0
	setLevel = (ddl: HTMLSelectElement) => {	
		let hp = <HTMLLabelElement>document.getElementById("hp");
		let hit = 0;
		for(let i = 0; i < ddl.selectedIndex; i++){
			hit += this.calcHPRoll();
		}
		hp.innerHTML = hit.toString();
	}

	// Hit dice roll with con mod, minimum roll 1
	calcHPRoll = () => {
		let hp = this.getRndInteger(1, this.hitdice) + this.hpAdj;
		if (hp < 1)
			return 1
		else
			return hp;
	}
}