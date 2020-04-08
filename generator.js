// Global variables
var hp = 0;
var ac = 10;
var level = 1;

var hitdice = 6;
var hitProb = 0;
var DmgAdj = 0;

var isFighter = false;

var wghtAllow = 0;
var MxPres = 0;
var opDrs = 0;
var bndBrs = 0;

window.onload = (event) => {
	document.getElementById("roll").addEventListener("click", roll);
};

function roll(){
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

function enableOpts(item, index){
	item.disabled = false;
}

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
			break;
		case 3:
			document.getElementById("con").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(3);
			break;
		case 4:
			document.getElementById("int").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(4);
			break;
		case 5:
			document.getElementById("wis").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(5);
			break;
		case 6:
			document.getElementById("chr").value = document.getElementById(box).value;
			ddl.disabled = true;
			removeOption(6);
			break;
		default:
			break;				
	}
}

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

function setStrChecks(wAllow, mPres, oDrs ,bBrs){
	wghtAllow = wAllow, MxPres = mPres, opDrs = oDrs, bndBrs = bBrs;
	document.getElementById("wghtAllow").innerHTML = wghtAllow;
	document.getElementById("MxPres").innerHTML = MxPres;
	document.getElementById("opDrs").innerHTML = opDrs;
	document.getElementById("bndBrs").innerHTML = bndBrs;
}

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

function fourD6(){
	let one = getRndInteger(1,6);
	let two = getRndInteger(1,6);
	let three = getRndInteger(1,6);
	let four = getRndInteger(1,6);
	let lowest = Math.min(one, two, three, four);
	return (one + two + three + four) - lowest;
}

function getRndInteger(min, max) {
	max = max + 1;
	return Math.floor(Math.random() * (max - min) ) + min;
}

function setClass(ddl){
	switch(ddl.selectedIndex){
		case 1:// Fighters
		case 6:
		case 7:
			isFighter = true;
			checkForStrMods(document.getElementById("str").value);
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

function setLevel(ddl){	
	let hp = document.getElementById("hp");
	let hit = 0;
	for(i = 0; i < ddl.selectedIndex; i++){
		hit += getRndInteger(1, hitdice);
	}
	hp.innerHTML = hit;
}