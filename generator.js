// Global variables
var hp = 0;
var ac = 10;
var level = 1;

var hitdice = 6;
var hitProb = 0;
var DmgAdj = 0;

var isFighter = false;
// dex
var rctAdj = 0;
var mislAdj = 0;
var defAdj = 0;
// con
var hpAdj = 0;
var sysShk = 0;
var resSurv = 0;
var posSv = 0;
var regen = 0;
// int
var noOfLang = 0;
var spellLvl = 0;
var chnLearn = 0;
var maxSplPerLvl = 0;
var splImun = 0;
// str
var wghtAllow = 0;
var MxPres = 0;
var opDrs = 0;
var bndBrs = 0;
// wis
var magDefAdj = 0;
var BonusSp = 0;
var chnFail = 0;
var splImmune = 0;
// char
var mxHench = 0;
var loyaltyBs = 0;
var ReactAdj = 0;

// set roll button's click
window.onload = (event) => {
	document.getElementById("roll").addEventListener("click", roll);
};

// roll stats and clear odl values etc
function roll(){
	isFighter = false;
	
	document.getElementById("one").value = fourD6();
	document.getElementById("two").value = fourD6();
	document.getElementById("three").value = fourD6();
	document.getElementById("four").value = fourD6();
	document.getElementById("five").value = fourD6();
	document.getElementById("six").value = fourD6();
	
	document.getElementById("percent").innerHTML = '';

	let stat1 = document.getElementById("stat1");
	stat1.disabled = false;
	stat1.selectedIndex = 0;
	let opt1 = stat1.getElementsByTagName("option");
	Array.prototype.slice.call(opt1, 0 ).forEach(enableOpts);
	document.getElementById("str").value = '';
	
	let stat2 = document.getElementById("stat2");
	stat2.disabled = false;
	stat2.selectedIndex = 0;
	let opt2 = stat2.getElementsByTagName("option");
	Array.prototype.slice.call(opt2, 0 ).forEach(enableOpts);
	document.getElementById("dex").value = '';
	
	let stat3 = document.getElementById("stat3");
	stat3.disabled = false;
	stat3.selectedIndex = 0;
	let opt3 = stat3.getElementsByTagName("option");
	Array.prototype.slice.call(opt3, 0 ).forEach(enableOpts);
	document.getElementById("con").value = '';
	
	let stat4 = document.getElementById("stat4");
	stat4.disabled = false;
	stat4.selectedIndex = 0;
	let opt4 = stat4.getElementsByTagName("option");
	Array.prototype.slice.call(opt4, 0 ).forEach(enableOpts);
	document.getElementById("int").value = '';
	
	let stat5 = document.getElementById("stat5");
	stat5.disabled = false;
	stat5.selectedIndex = 0;
	let opt5 = stat5.getElementsByTagName("option");
	Array.prototype.slice.call(opt5, 0 ).forEach(enableOpts);
	document.getElementById("wis").value = '';
	
	let stat6 = document.getElementById("stat6");
	stat6.disabled = false;
	stat6.selectedIndex = 0;
	let opt6 = stat6.getElementsByTagName("option");
	Array.prototype.slice.call(opt6, 0 ).forEach(enableOpts);
	document.getElementById("chr").value = '';
}

// re-enable dropdwon option
function enableOpts(item, index){
	item.disabled = false;
}

// assign stat from dropdown
function setOne(ddl, box){
	switch(ddl.selectedIndex){
		case 1:
			document.getElementById("str").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(1);
			checkForStrMods(document.getElementById(box).value);
			break;
		case 2:
			document.getElementById("dex").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(2);
			setDexMods(document.getElementById(box).value);
			break;
		case 3:
			document.getElementById("con").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(3);
			setConMods(document.getElementById(box).value);
			break;
		case 4:
			document.getElementById("int").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(4);
			setIntMods(document.getElementById(box).value);
			break;
		case 5:
			document.getElementById("wis").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(5);
			setWisMods(document.getElementById(box).value);
			break;
		case 6:
			document.getElementById("chr").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(6);
			setCharMods(document.getElementById(box).value);
			break;
		default:
			break;				
	}
}

// calculate strength modifiers
function checkForStrMods(str){
	debugger;
	let prcStr = 101;
	if(str == 18 && isFighter){
		prcStr = getRndInteger(1,100);
		document.getElementById("percent").innerHTML = prcStr;
	}
	switch(parseInt(str)){
		case 3:
			hitProb = -3;
			DmgAdj = -1;
			setStrChecks(5, 10, 2, 0);
			break;
		case 4:
		case 5:
			hitProb = -2;
			DmgAdj = -1;
			setStrChecks(10, 25, 3, 0);
			break;
		case 6:
		case 7:
			hitProb = -1;
			DmgAdj = 0;
			setStrChecks(20, 55, 4, 0);
			break;
		case 8:
		case 9:
			hitProb = 0;
			DmgAdj = 0;
			setStrChecks(35, 90, 5, 1);
			break;
		case 10:
		case 11:
			hitProb = 0;
			DmgAdj = 0;
			setStrChecks(40, 115, 6, 2);
			break;
		case 12:
		case 13:
			hitProb = 0;
			DmgAdj = 0;
			setStrChecks(45, 140, 7, 4);
			break;
		case 14:
		case 15:
			hitProb = 0;
			DmgAdj = 0;
			setStrChecks(55, 170, 8, 7);
			break;
		case 16:
			hitProb = 0;
			DmgAdj = 1;
			setStrChecks(70, 195, 8, 10);
			break;
		case 17:
			hitProb = 1;
			DmgAdj = 1;
			setStrChecks(85, 220, 10, 13);
			break;
		case 18:
			switch(true){
				case prcStr < 51:
					hitProb = 1;
					DmgAdj = 3;
					setStrChecks(135, 280, 12, 20);
					break;
				case prcStr < 76:
					hitProb = 2;
					DmgAdj = 3;
					setStrChecks(160, 305, 13, 25);				
					break;
				case prcStr < 91:
					hitProb = 2;
					DmgAdj = 4;
					setStrChecks(185, 330, 14, 30);
					break;
				case prcStr < 100:
					hitProb = 2;
					DmgAdj = 5;
					setStrChecks(235, 380, 15, 35);
					break;
				case prcStr == 100:
					hitProb = 3;
					DmgAdj = 6;
					setStrChecks(335, 480, 16, 40);
					wghtAllow = 335;
					MxPres = 480;
					opDrs = 16;
					bndBrs = 40;
				default:
					hitProb = 1;
					DmgAdj = 2;
					setStrChecks(110, 255, 11, 16);
			}
			break;
	}
}

// set strength adjustments
function setStrChecks(wAllow, mPres, oDrs ,bBrs){
	wghtAllow = wAllow, MxPres = mPres, opDrs = oDrs, bndBrs = bBrs;
	document.getElementById("wghtAllow").innerHTML = wghtAllow;
	document.getElementById("MxPres").innerHTML = MxPres;
	document.getElementById("opDrs").innerHTML = opDrs;
	document.getElementById("bndBrs").innerHTML = bndBrs;
}

// calculate dexterity modifiers
function setDexMods(dex){
	dex = parseInt(dex);
	switch(dex){
		case 3:
			setDexAdj(-3, -3, 4);
			break;
		case 4:
			setDexAdj(-2, -2, 3);
			break;
		case 5:
			setDexAdj(-1, -1, 2);
			break;
		case 6:
			setDexAdj(0, 0, 1);
			break;
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
		case 13:
		case 14:
			setDexAdj(0, 0, 0);
			break;
		case 15:
			setDexAdj(0, 0, -1);
			break;
		case 16:
			setDexAdj(1, 1, -2);
			break;
		case 17:
			setDexAdj(2, 2, -3);
			break;
		case 18:
			setDexAdj(2, 2, -4);
			break;
		default:
			break;
	}
}

// set dexterity adj
function setDexAdj(rAdj, msAdj, dAdj){
	rctAdj = rAdj, mislAdj = msAdj, defAdj = dAdj;
	document.getElementById("rctAdj").innerHTML = rctAdj;
	document.getElementById("mislAdj").innerHTML = mislAdj;
	document.getElementById("defAdj").innerHTML = defAdj;
}

// calculate con modifiers
function setConMods(con){
	con = parseInt(con);
	switch(con){
		case 3:
			setConAdj(-2, 25, 30, -2, 0);
			break;
		case 4:
			setConAdj(-1, 40, 45, 0, 0);
			break;
		case 5:
			setConAdj(-1, 45, 50, 0, 0);
			break;
		case 6:
			setConAdj(-1, 50, 55, 0, 0);
			break;
		case 7:
			setConAdj(0, 55, 60, 0, 0);
			break;
		case 8:
			setConAdj(0, 60, 65, 0, 0);
			break;
		case 9:
			setConAdj(0, 65, 70, 0, 0);
			break;
		case 10:
			setConAdj(0, 70, 75, 0, 0);
			break;
		case 11:
			setConAdj(0, 75, 80, 0, 0);
			break;
		case 12:
			setConAdj(0, 80, 85, 0, 0);
			break;
		case 13:
			setConAdj(0, 85, 90, 0, 0);
			break;
		case 14:
			setConAdj(0, 88, 92, 0, 0);
			break;
		case 15:
			setConAdj(1, 90, 94, 0, 0);
			break;
		case 16:
			setConAdj(2, 95, 96, 0, 0);
			break;
		case 17:
			setConAdj(2, 97, 98, 0, 0);
			break;
		case 18:
			setConAdj(2, 99, 100, 0, 0);
			break;
		default:
			break;
	}
	if(isFighter){
		switch(con){
			case 17:
				setConAdj(3, 97, 98, 0, 0);
				break;
			case 18:
				setConAdj(4, 99, 100, 0, 0);
				break;
		}
	}
}

// set consititution adj
function setConAdj(hpA, sys, res, pos, reg){
	hpAdj = hpA, sysShk = sys, resSurv = res, posSv = pos, regen = reg;
	document.getElementById("hpAdj").innerHTML = hpAdj;
	document.getElementById("sysShk").innerHTML = sysShk;
	document.getElementById("resSurv").innerHTML = resSurv;
	document.getElementById("posSv").innerHTML = posSv;
	document.getElementById("regen").innerHTML = regen;
}

// calculate intelligence modifiers
function setIntMods(int){
	debugger;
	int = parseInt(int);
	switch(int){
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
			setIntAdj(1, 0, 0, 0, 0);
			break;
		case 9:
			setIntAdj(2, 4, 35, 6, 0);
			break;
		case 10:
			setIntAdj(2, 5, 40, 7, 0);
			break;
		case 11:
			setIntAdj(2, 5, 45, 7, 0);
			break;
		case 12:
			setIntAdj(3, 6, 50, 7, 0);
			break;
		case 13:
			setIntAdj(3, 6, 55, 7, 0);
			break;
		case 14:
			setIntAdj(4, 7, 60, 9, 0);
			break;
		case 15:
			setIntAdj(4, 7, 65, 11, 0);
			break;
		case 16:
			setIntAdj(5, 8, 70, 11, 0);
			break;
		case 17:
			setIntAdj(6, 8, 75, 14, 0);
			break;
		case 18:
			setIntAdj(7, 9, 85, 18, 0);
			break;
		default:
			break;
	}
}

// set intelligence adjustments
function setIntAdj(noLan, sLvl, chnLn, max, imun){
	noOfLang = noLan, spellLvl = sLvl, chnLearn = chnLn, maxSplPerLvl = max, splImun = imun;
	document.getElementById("noOfLang").innerHTML = noOfLang;
	document.getElementById("spellLvl").innerHTML = spellLvl;
	document.getElementById("chnLearn").innerHTML = chnLearn;
	document.getElementById("maxSplPerLvl").innerHTML = maxSplPerLvl;
	document.getElementById("splImun").innerHTML = splImun;
}

// calculate wisdom modifiers
function setWisMods(wis){
	wis = parseInt(wis);
	switch(wis){
		case 3:
			setWisAdj(-3, 0, 50, 0);
			break;
		case 4:
			setWisAdj(-2, 0, 45, 0);
			break;
		case 5:
			setWisAdj(-1, 0, 40, 0);
			break;
		case 6:
			setWisAdj(-1, 0, 35, 0);
			break;
		case 7:
			setWisAdj(-1, 0, 30, 0);
			break;
		case 8:
			setWisAdj(0, 0, 25, 0);
			break;
		case 9:
			setWisAdj(0, 0, 20, 0);
			break;
		case 10:
			setWisAdj(0, 0, 15, 0);
			break;
		case 11:
			setWisAdj(0, 0, 10, 0);
			break;
		case 12:
			setWisAdj(0, 0, 5, 0);
			break;
		case 13:
		case 14:
			setWisAdj(0, 1, 0, 0);
			break;
		case 15:
			setWisAdj(1, 2, 0, 0);
			break;
		case 16:
			setWisAdj(2, 2, 0, 0);
			break;
		case 17:
			setWisAdj(3, 3, 0, 0);
			break;
		case 18:
			setWisAdj(4, 4, 0, 0);
			break;
		default:
			break;
	}
}

// set wisdom adjustments
function setWisAdj(mDef, bSp, cnFl, imun){
	magDefAdj = mDef, BonusSp = bSp, chnFail = cnFl, splImmune = imun;
	document.getElementById("magDefAdj").innerHTML = magDefAdj;
	document.getElementById("BonusSp").innerHTML = BonusSp;
	document.getElementById("chnFail").innerHTML = chnFail;
	document.getElementById("splImmune").innerHTML = splImmune;
}

// Calculate charisma modifiers
function setCharMods(chr){
	chr = parseInt(chr);
	switch(chr){
		case 3:
			setCharAdj(1, -6, -5);
			break;
		case 4:
			setCharAdj(1, -5, -4);
			break;
		case 5:
			setCharAdj(2, -4, -3);
			break;
		case 6:
			setCharAdj(2, -3, -2);
			break;
		case 7:
			setCharAdj(3, -2, -1);
			break;
		case 8:
			setCharAdj(3, -1, 0);
			break;
		case 9:
		case 10:
		case 11:
			setCharAdj(4, 0, 0);
			break;
		case 12:
			setCharAdj(5, 0, 0);
			break;
		case 13:
			setCharAdj(5, 0, 1);
			break;
		case 14:
			setCharAdj(6, 1, 2);
			break;
		case 15:
			setCharAdj(7, 3, 3);
			break;
		case 16:
			setCharAdj(8, 4, 5);
			break;
		case 17:
			setCharAdj(10, 6, 6);
			break;
		case 18:
			setCharAdj(15, 8, 7);
			break;
		default:
			break;
	}
}

// Set charisma adj
function setCharAdj(hench, loyal, react){
	mxHench = hench, loyaltyBs = loyal, ReactAdj = react;
	document.getElementById("mxHench").innerHTML = mxHench;
	document.getElementById("loyaltyBs").innerHTML = loyaltyBs;
	document.getElementById("ReactAdj").innerHTML = ReactAdj;
}

// Disable statistic option after its selected
function removeOption(index){
	let op1 = document.getElementById("stat1").getElementsByTagName("option");
	op1[index].disabled = true;
	let op2 = document.getElementById("stat2").getElementsByTagName("option");
	op2[index].disabled = true;
	let op3 = document.getElementById("stat3").getElementsByTagName("option");
	op3[index].disabled = true;
	let op4 = document.getElementById("stat4").getElementsByTagName("option");
	op4[index].disabled = true;
	let op5 = document.getElementById("stat5").getElementsByTagName("option");
	op5[index].disabled = true;
	let op6 = document.getElementById("stat6").getElementsByTagName("option");
	op6[index].disabled = true;
}

// throw 4d6 remove lowest roll
function fourD6(){
	let one = getRndInteger(1,6);
	let two = getRndInteger(1,6);
	let three = getRndInteger(1,6);
	let four = getRndInteger(1,6);
	let lowest = Math.min(one, two, three, four);
	return (one + two + three + four) - lowest;
}

// throw 3d6
function threeD6(){
	let one = getRndInteger(1,6);
	let two = getRndInteger(1,6);
	let three = getRndInteger(1,6);
	return one + two + three;
}

// random number generator
function getRndInteger(min, max) {
	max = max + 1;
	return Math.floor(Math.random() * (max - min) ) + min;
}

// Set the class
function setClass(ddl){
	switch(ddl.selectedIndex){
		case 1:// Fighters
		case 6:
		case 7:
			isFighter = true;
			checkForStrMods(document.getElementById("str").value);
			setConMods(document.getElementById("con").value);
			hitdice = 10;
			break;
		case 2:// Rogues
		case 5:
			hitdice = 6;
			break;
		case 3:// Priests
		case 8:
			hitdice = 8;
			break;
		case 4:// Wizards
			hitdice = 4;
			break;
		default:
			break;
	}
}

// Add racial mods
function setRace(ddl){
	switch(ddl.selectedIndex){
		case 1://human
			break;
		case 2://dwarf
			break;
		case 3://elf
			break;
		case 4://gnome
			break;
		case 5://halfling
			break;
		case 6://half elf
			break;
		case 7://half orc
			break;
		default:
			break;
	}	
}

// Calculate hp
function setLevel(ddl){	
	let hp = document.getElementById("hp");
	let hit = 0;
	for(i = 0; i < ddl.selectedIndex; i++){
		hit += calcHPRoll();
	}
	hp.innerHTML = hit;
}

// Hit dice roll with con mod, minimum roll 1
function calcHPRoll(){
	let hp = getRndInteger(1, hitdice) + hpAdj;
	if (hp < 1)
		return 1
	else
		return hp;
}