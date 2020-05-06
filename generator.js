"use strict";
// Global class object
var gen;
window.onload = function () {
    gen = new Generator(document.getElementById("roll"));
    gen.setup();
};
// Pass through methods for dropdowns
function setOne(ddl, box) {
    gen.setOne(ddl, box);
}
;
function setRace(ddl) {
    gen.setRace(ddl);
}
;
function setClass(ddl) {
    gen.setClass(ddl);
}
;
function setLevel(ddl) {
    gen.setLevel(ddl);
}
;
//
var Generator = /** @class */ (function () {
    function Generator(rollButton) {
        var _this = this;
        // class level variables
        this.hp = 0;
        this.ac = 10;
        this.level = 1;
        this.hitdice = 6;
        this.hitProb = 0;
        this.DmgAdj = 0;
        this.isFighter = false;
        this.hpAdj = 0;
        // str
        this.wghtAllow = 0;
        this.MxPres = 0;
        this.opDrs = 0;
        this.bndBrs = 0;
        // Attributes
        this.strInit = 0;
        this.dexInit = 0;
        this.conInit = 0;
        this.intInit = 0;
        this.wisInit = 0;
        this.chrInit = 0;
        // racial attribute mods
        this.strMod = 0;
        this.dexMod = 0;
        this.conMod = 0;
        this.intMod = 0;
        this.wisMod = 0;
        this.chrMod = 0;
        this.setup = function () {
            _this.rollButton.addEventListener("click", _this.roll);
            _this.getControls();
        };
        // Get the page controls
        this.getControls = function () {
            _this.inputOne = document.getElementById("one");
            _this.inputTwo = document.getElementById("two");
            _this.inputThree = document.getElementById("three");
            _this.inputFour = document.getElementById("four");
            _this.inputFive = document.getElementById("five");
            _this.inputSix = document.getElementById("six");
            _this.labelPercent = document.getElementById("percent");
            _this.stat1 = document.getElementById("stat1");
            _this.stat2 = document.getElementById("stat2");
            _this.stat3 = document.getElementById("stat3");
            _this.stat4 = document.getElementById("stat4");
            _this.stat5 = document.getElementById("stat5");
            _this.stat6 = document.getElementById("stat6");
            _this.inputStr = document.getElementById("str");
            _this.inputDex = document.getElementById("dex");
            _this.inputCon = document.getElementById("con");
            _this.inputWis = document.getElementById("wis");
            _this.inputInt = document.getElementById("int");
            _this.inputChr = document.getElementById("chr");
            _this.labelPercent = document.getElementById("percent");
            _this.labelWgtAllow = document.getElementById("wghtAllow");
            _this.labelMxPress = document.getElementById("MxPres");
            _this.labelOpDrs = document.getElementById("opDrs");
            _this.labelBndBrs = document.getElementById("bndBrs");
            _this.labelRctAdj = document.getElementById("rctAdj");
            _this.labelMislAdj = document.getElementById("mislAdj");
            _this.labelDefAdj = document.getElementById("defAdj");
            _this.labelHpAdj = document.getElementById("hpAdj");
            _this.labelSysShk = document.getElementById("sysShk");
            _this.labelResSurv = document.getElementById("resSurv");
            _this.labelPoisSv = document.getElementById("posSv");
            _this.labelRegen = document.getElementById("regen");
            _this.labelNoLang = document.getElementById("noOfLang");
            _this.labelSplLvl = document.getElementById("spellLvl");
            _this.labelChLrn = document.getElementById("chnLearn");
            _this.labelMxSplPLvl = document.getElementById("maxSplPerLvl");
            _this.labelSplImun = document.getElementById("splImun");
            _this.labelMagDefAdj = document.getElementById("magDefAdj");
            _this.labelBonusSp = document.getElementById("BonusSp");
            _this.labelChnFail = document.getElementById("chnFail");
            _this.labelSplImmune = document.getElementById("splImmune");
            _this.labelMxHench = document.getElementById("mxHench");
            _this.labelLoyaltyBs = document.getElementById("loyaltyBs");
            _this.labelReactAdj = document.getElementById("ReactAdj");
            _this.labelHp = document.getElementById("hp");
            _this.selectRace = document.getElementById("race");
            _this.selectClass = document.getElementById("class");
            _this.selectLevel = document.getElementById("lvl");
        };
        this.clearVals = function (stat) {
            stat.disabled = false;
            stat.selectedIndex = 0;
            var opt = stat.getElementsByTagName("option");
            Array.prototype.slice.call(opt, 0).forEach(_this.enableOpts);
        };
        // roll stats and clear old values etc
        this.roll = function () {
            _this.clearControls();
            _this.inputOne.value = _this.fourD6().toString();
            _this.inputTwo.value = _this.fourD6().toString();
            _this.inputThree.value = _this.fourD6().toString();
            _this.inputFour.value = _this.fourD6().toString();
            _this.inputFive.value = _this.fourD6().toString();
            _this.inputSix.value = _this.fourD6().toString();
        };
        this.clearControls = function () {
            _this.isFighter = false;
            _this.inputOne.value = '';
            _this.inputTwo.value = '';
            _this.inputThree.value = '';
            _this.inputFour.value = '';
            _this.inputFive.value = '';
            _this.inputSix.value = '';
            _this.labelPercent.value = '';
            _this.stat1.selectedIndex = 0;
            _this.stat2.selectedIndex = 0;
            _this.stat3.selectedIndex = 0;
            _this.stat4.selectedIndex = 0;
            _this.stat5.selectedIndex = 0;
            _this.stat6.selectedIndex = 0;
            _this.inputStr.value = '';
            _this.inputDex.value = '';
            _this.inputCon.value = '';
            _this.inputWis.value = '';
            _this.inputInt.value = '';
            _this.inputChr.value = '';
            _this.labelPercent.innerText = '';
            _this.labelWgtAllow.innerText = '';
            _this.labelMxPress.innerText = '';
            _this.labelOpDrs.innerText = '';
            _this.labelBndBrs.innerText = '';
            _this.labelRctAdj.innerText = '';
            _this.labelMislAdj.innerText = '';
            _this.labelDefAdj.innerText = '';
            _this.labelHpAdj.innerText = '';
            _this.labelSysShk.innerText = '';
            _this.labelResSurv.innerText = '';
            _this.labelPoisSv.innerText = '';
            _this.labelRegen.innerText = '';
            _this.labelNoLang.innerText = '';
            _this.labelSplLvl.innerText = '';
            _this.labelChLrn.innerText = '';
            _this.labelMxSplPLvl.innerText = '';
            _this.labelSplImun.innerText = '';
            _this.labelMagDefAdj.innerText = '';
            _this.labelBonusSp.innerText = '';
            _this.labelChnFail.innerText = '';
            _this.labelSplImmune.innerText = '';
            _this.labelMxHench.innerText = '';
            _this.labelLoyaltyBs.innerText = '';
            _this.labelReactAdj.innerText = '';
            _this.labelHp.innerText = '';
            _this.labelPercent.innerText = '';
            _this.inputStr.value = '';
            _this.inputDex.value = '';
            _this.inputCon.value = '';
            _this.inputInt.value = '';
            _this.inputWis.value = '';
            _this.inputChr.value = '';
            _this.clearVals(_this.stat1);
            _this.clearVals(_this.stat2);
            _this.clearVals(_this.stat3);
            _this.clearVals(_this.stat4);
            _this.clearVals(_this.stat5);
            _this.clearVals(_this.stat6);
            _this.selectRace.selectedIndex = 0;
            _this.selectClass.selectedIndex = 0;
            _this.selectLevel.selectedIndex = 0;
        };
        // re-enable dropdown option
        this.enableOpts = function (item) {
            item.disabled = false;
        };
        this.getInputValue = function (box) {
            switch (box) {
                case "one":
                    return _this.inputOne.value;
                case "two":
                    return _this.inputTwo.value;
                case "three":
                    return _this.inputThree.value;
                case "four":
                    return _this.inputFour.value;
                case "five":
                    return _this.inputFive.value;
                case "six":
                    return _this.inputSix.value;
                default:
                    return Error("Unknown input");
            }
        };
        // assign stat from dropdown
        this.setOne = function (ddl, box) {
            var val = parseInt(_this.getInputValue(box));
            switch (ddl.selectedIndex) {
                case 1:
                    _this.strInit = val;
                    _this.inputStr.value = _this.strInit.toString();
                    ddl.disabled = true;
                    _this.removeOption(1);
                    _this.checkForStrMods(_this.strInit);
                    break;
                case 2:
                    _this.dexInit = val;
                    _this.inputDex.value = _this.dexInit.toString();
                    ddl.disabled = true;
                    _this.removeOption(2);
                    _this.setDexMods(_this.dexInit);
                    break;
                case 3:
                    _this.conInit = val;
                    _this.inputCon.value = _this.conInit.toString();
                    ddl.disabled = true;
                    _this.removeOption(3);
                    _this.setConMods(_this.conInit);
                    break;
                case 4:
                    _this.intInit = val;
                    _this.inputInt.value = _this.intInit.toString();
                    ddl.disabled = true;
                    _this.removeOption(4);
                    _this.setIntMods(_this.intInit);
                    break;
                case 5:
                    _this.wisInit = val;
                    _this.inputWis.value = _this.wisInit.toString();
                    ddl.disabled = true;
                    _this.removeOption(5);
                    _this.setWisMods(_this.wisInit);
                    break;
                case 6:
                    _this.chrInit = val;
                    _this.inputChr.value = _this.chrInit.toString();
                    ddl.disabled = true;
                    _this.removeOption(6);
                    _this.setCharMods(_this.chrInit);
                    break;
                default:
                    break;
            }
        };
        // calculate strength modifiers
        this.checkForStrMods = function (str) {
            var prcStr = 101;
            if (str == 18 && _this.isFighter) {
                prcStr = _this.getRndInteger(1, 100);
                _this.labelPercent.innerText = prcStr.toString();
            }
            switch (str) {
                case 3:
                    _this.hitProb = -3;
                    _this.DmgAdj = -1;
                    _this.setStrChecks(5, 10, 2, 0);
                    break;
                case 4:
                case 5:
                    _this.hitProb = -2;
                    _this.DmgAdj = -1;
                    _this.setStrChecks(10, 25, 3, 0);
                    break;
                case 6:
                case 7:
                    _this.hitProb = -1;
                    _this.DmgAdj = 0;
                    _this.setStrChecks(20, 55, 4, 0);
                    break;
                case 8:
                case 9:
                    _this.hitProb = 0;
                    _this.DmgAdj = 0;
                    _this.setStrChecks(35, 90, 5, 1);
                    break;
                case 10:
                case 11:
                    _this.hitProb = 0;
                    _this.DmgAdj = 0;
                    _this.setStrChecks(40, 115, 6, 2);
                    break;
                case 12:
                case 13:
                    _this.hitProb = 0;
                    _this.DmgAdj = 0;
                    _this.setStrChecks(45, 140, 7, 4);
                    break;
                case 14:
                case 15:
                    _this.hitProb = 0;
                    _this.DmgAdj = 0;
                    _this.setStrChecks(55, 170, 8, 7);
                    break;
                case 16:
                    _this.hitProb = 0;
                    _this.DmgAdj = 1;
                    _this.setStrChecks(70, 195, 8, 10);
                    break;
                case 17:
                    _this.hitProb = 1;
                    _this.DmgAdj = 1;
                    _this.setStrChecks(85, 220, 10, 13);
                    break;
                case 18:
                    switch (true) {
                        case prcStr < 51:
                            _this.hitProb = 1;
                            _this.DmgAdj = 3;
                            _this.setStrChecks(135, 280, 12, 20);
                            break;
                        case prcStr < 76:
                            _this.hitProb = 2;
                            _this.DmgAdj = 3;
                            _this.setStrChecks(160, 305, 13, 25);
                            break;
                        case prcStr < 91:
                            _this.hitProb = 2;
                            _this.DmgAdj = 4;
                            _this.setStrChecks(185, 330, 14, 30);
                            break;
                        case prcStr < 100:
                            _this.hitProb = 2;
                            _this.DmgAdj = 5;
                            _this.setStrChecks(235, 380, 15, 35);
                            break;
                        case prcStr == 100:
                            _this.hitProb = 3;
                            _this.DmgAdj = 6;
                            _this.setStrChecks(335, 480, 16, 40);
                            _this.wghtAllow = 335;
                            _this.MxPres = 480;
                            _this.opDrs = 16;
                            _this.bndBrs = 40;
                        default:
                            _this.hitProb = 1;
                            _this.DmgAdj = 2;
                            _this.setStrChecks(110, 255, 11, 16);
                    }
                    break;
            }
        };
        // set strength adjustments
        this.setStrChecks = function (wAllow, mPres, oDrs, bBrs) {
            _this.labelWgtAllow.innerText = wAllow.toString();
            _this.labelMxPress.innerHTML = mPres.toString();
            _this.labelOpDrs.innerHTML = oDrs.toString();
            _this.labelBndBrs.innerHTML = bBrs.toString();
        };
        // calculate dexterity modifiers
        this.setDexMods = function (dex) {
            switch (dex) {
                case 3:
                    _this.setDexAdj(-3, -3, 4);
                    break;
                case 4:
                    _this.setDexAdj(-2, -2, 3);
                    break;
                case 5:
                    _this.setDexAdj(-1, -1, 2);
                    break;
                case 6:
                    _this.setDexAdj(0, 0, 1);
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                    _this.setDexAdj(0, 0, 0);
                    break;
                case 15:
                    _this.setDexAdj(0, 0, -1);
                    break;
                case 16:
                    _this.setDexAdj(1, 1, -2);
                    break;
                case 17:
                    _this.setDexAdj(2, 2, -3);
                    break;
                case 18:
                    _this.setDexAdj(2, 2, -4);
                    break;
                default:
                    break;
            }
        };
        // set dexterity adj
        this.setDexAdj = function (rAdj, msAdj, dAdj) {
            _this.labelRctAdj.innerHTML = rAdj.toString();
            _this.labelMislAdj.innerHTML = msAdj.toString();
            _this.labelDefAdj.innerHTML = dAdj.toString();
        };
        // calculate con modifiers
        this.setConMods = function (con) {
            switch (con) {
                case 3:
                    _this.setConAdj(-2, 25, 30, -2, 0);
                    break;
                case 4:
                    _this.setConAdj(-1, 40, 45, 0, 0);
                    break;
                case 5:
                    _this.setConAdj(-1, 45, 50, 0, 0);
                    break;
                case 6:
                    _this.setConAdj(-1, 50, 55, 0, 0);
                    break;
                case 7:
                    _this.setConAdj(0, 55, 60, 0, 0);
                    break;
                case 8:
                    _this.setConAdj(0, 60, 65, 0, 0);
                    break;
                case 9:
                    _this.setConAdj(0, 65, 70, 0, 0);
                    break;
                case 10:
                    _this.setConAdj(0, 70, 75, 0, 0);
                    break;
                case 11:
                    _this.setConAdj(0, 75, 80, 0, 0);
                    break;
                case 12:
                    _this.setConAdj(0, 80, 85, 0, 0);
                    break;
                case 13:
                    _this.setConAdj(0, 85, 90, 0, 0);
                    break;
                case 14:
                    _this.setConAdj(0, 88, 92, 0, 0);
                    break;
                case 15:
                    _this.setConAdj(1, 90, 94, 0, 0);
                    break;
                case 16:
                    _this.setConAdj(2, 95, 96, 0, 0);
                    break;
                case 17:
                    _this.setConAdj(2, 97, 98, 0, 0);
                    break;
                case 18:
                    _this.setConAdj(2, 99, 100, 0, 0);
                    break;
                default:
                    break;
            }
            if (_this.isFighter) {
                switch (con) {
                    case 17:
                        _this.setConAdj(3, 97, 98, 0, 0);
                        break;
                    case 18:
                        _this.setConAdj(4, 99, 100, 0, 0);
                        break;
                }
            }
        };
        // set consititution adj
        this.setConAdj = function (hpA, sys, res, pos, reg) {
            _this.hpAdj = hpA;
            _this.labelHpAdj.innerHTML = hpA.toString();
            _this.labelSysShk.innerHTML = sys.toString();
            _this.labelResSurv.innerHTML = res.toString();
            _this.labelPoisSv.innerHTML = pos.toString();
            _this.labelRegen.innerHTML = reg.toString();
        };
        // calculate intelligence modifiers
        this.setIntMods = function (int) {
            switch (int) {
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    _this.setIntAdj(1, 0, 0, 0, 0);
                    break;
                case 9:
                    _this.setIntAdj(2, 4, 35, 6, 0);
                    break;
                case 10:
                    _this.setIntAdj(2, 5, 40, 7, 0);
                    break;
                case 11:
                    _this.setIntAdj(2, 5, 45, 7, 0);
                    break;
                case 12:
                    _this.setIntAdj(3, 6, 50, 7, 0);
                    break;
                case 13:
                    _this.setIntAdj(3, 6, 55, 7, 0);
                    break;
                case 14:
                    _this.setIntAdj(4, 7, 60, 9, 0);
                    break;
                case 15:
                    _this.setIntAdj(4, 7, 65, 11, 0);
                    break;
                case 16:
                    _this.setIntAdj(5, 8, 70, 11, 0);
                    break;
                case 17:
                    _this.setIntAdj(6, 8, 75, 14, 0);
                    break;
                case 18:
                    _this.setIntAdj(7, 9, 85, 18, 0);
                    break;
                default:
                    break;
            }
        };
        // set intelligence adjustments
        this.setIntAdj = function (noLan, sLvl, chnLn, max, imun) {
            _this.labelNoLang.innerHTML = noLan.toString();
            _this.labelSplLvl.innerHTML = sLvl.toString();
            _this.labelChLrn.innerHTML = chnLn.toString();
            _this.labelMxSplPLvl.innerHTML = max.toString();
            _this.labelSplImun.innerHTML = imun.toString();
        };
        // calculate wisdom modifiers
        this.setWisMods = function (wis) {
            switch (wis) {
                case 3:
                    _this.setWisAdj(-3, 0, 50, 0);
                    break;
                case 4:
                    _this.setWisAdj(-2, 0, 45, 0);
                    break;
                case 5:
                    _this.setWisAdj(-1, 0, 40, 0);
                    break;
                case 6:
                    _this.setWisAdj(-1, 0, 35, 0);
                    break;
                case 7:
                    _this.setWisAdj(-1, 0, 30, 0);
                    break;
                case 8:
                    _this.setWisAdj(0, 0, 25, 0);
                    break;
                case 9:
                    _this.setWisAdj(0, 0, 20, 0);
                    break;
                case 10:
                    _this.setWisAdj(0, 0, 15, 0);
                    break;
                case 11:
                    _this.setWisAdj(0, 0, 10, 0);
                    break;
                case 12:
                    _this.setWisAdj(0, 0, 5, 0);
                    break;
                case 13:
                case 14:
                    _this.setWisAdj(0, 1, 0, 0);
                    break;
                case 15:
                    _this.setWisAdj(1, 2, 0, 0);
                    break;
                case 16:
                    _this.setWisAdj(2, 2, 0, 0);
                    break;
                case 17:
                    _this.setWisAdj(3, 3, 0, 0);
                    break;
                case 18:
                    _this.setWisAdj(4, 4, 0, 0);
                    break;
                default:
                    break;
            }
        };
        // set wisdom adjustments
        this.setWisAdj = function (mDef, bSp, cnFl, imun) {
            _this.labelMagDefAdj.innerHTML = mDef.toString();
            _this.labelBonusSp.innerHTML = bSp.toString();
            _this.labelChnFail.innerHTML = cnFl.toString();
            _this.labelSplImmune.innerHTML = imun.toString();
        };
        // Calculate charisma modifiers
        this.setCharMods = function (chr) {
            switch (chr) {
                case 3:
                    _this.setCharAdj(1, -6, -5);
                    break;
                case 4:
                    _this.setCharAdj(1, -5, -4);
                    break;
                case 5:
                    _this.setCharAdj(2, -4, -3);
                    break;
                case 6:
                    _this.setCharAdj(2, -3, -2);
                    break;
                case 7:
                    _this.setCharAdj(3, -2, -1);
                    break;
                case 8:
                    _this.setCharAdj(3, -1, 0);
                    break;
                case 9:
                case 10:
                case 11:
                    _this.setCharAdj(4, 0, 0);
                    break;
                case 12:
                    _this.setCharAdj(5, 0, 0);
                    break;
                case 13:
                    _this.setCharAdj(5, 0, 1);
                    break;
                case 14:
                    _this.setCharAdj(6, 1, 2);
                    break;
                case 15:
                    _this.setCharAdj(7, 3, 3);
                    break;
                case 16:
                    _this.setCharAdj(8, 4, 5);
                    break;
                case 17:
                    _this.setCharAdj(10, 6, 6);
                    break;
                case 18:
                    _this.setCharAdj(15, 8, 7);
                    break;
                default:
                    break;
            }
        };
        // Set charisma adj
        this.setCharAdj = function (hench, loyal, react) {
            _this.labelMxHench.innerHTML = hench.toString();
            _this.labelLoyaltyBs.innerHTML = loyal.toString();
            _this.labelReactAdj.innerHTML = react.toString();
        };
        // Disable statistic option after its selected
        this.removeOption = function (index) {
            var op1 = _this.stat1.getElementsByTagName("option");
            op1[index].disabled = true;
            var op2 = _this.stat2.getElementsByTagName("option");
            op2[index].disabled = true;
            var op3 = _this.stat3.getElementsByTagName("option");
            op3[index].disabled = true;
            var op4 = _this.stat4.getElementsByTagName("option");
            op4[index].disabled = true;
            var op5 = _this.stat5.getElementsByTagName("option");
            op5[index].disabled = true;
            var op6 = _this.stat6.getElementsByTagName("option");
            op6[index].disabled = true;
        };
        // throw 4d6 remove lowest roll
        this.fourD6 = function () {
            var one = _this.getRndInteger(1, 6);
            var two = _this.getRndInteger(1, 6);
            var three = _this.getRndInteger(1, 6);
            var four = _this.getRndInteger(1, 6);
            var lowest = Math.min(one, two, three, four);
            return (one + two + three + four) - lowest;
        };
        // random number generator
        this.getRndInteger = function (min, max) {
            max = max + 1;
            return Math.floor(Math.random() * (max - min)) + min;
        };
        // Set the class
        this.setClass = function (ddl) {
            switch (ddl.selectedIndex) {
                case 1: // Fighters
                case 6:
                case 7:
                    _this.isFighter = true;
                    _this.checkForStrMods(_this.strInit);
                    _this.setConMods(_this.conInit);
                    _this.hitdice = 10;
                    break;
                case 2: // Rogues
                case 5:
                    _this.hitdice = 6;
                    break;
                case 3: // Priests
                case 8:
                    _this.hitdice = 8;
                    break;
                case 4: // Wizards
                    _this.hitdice = 4;
                    break;
                default:
                    break;
            }
        };
        this.zeroMOds = function () {
            _this.strMod = 0;
            _this.dexMod = 0;
            _this.conMod = 0;
            _this.intMod = 0;
            _this.wisMod = 0;
            _this.chrMod = 0;
        };
        this.applyRacialMods = function () {
            _this.inputStr.value = (_this.strInit + _this.strMod).toString();
            _this.inputDex.value = (_this.dexInit + _this.dexMod).toString();
            _this.inputChr.value = (_this.chrInit + _this.chrMod).toString();
            _this.inputCon.value = (_this.conInit + _this.conMod).toString();
            _this.inputInt.value = (_this.intInit + _this.intMod).toString();
            _this.inputWis.value = (_this.wisInit + _this.wisMod).toString();
        };
        // Add racial mods
        this.setRace = function (ddl) {
            switch (ddl.selectedIndex) {
                case 1: //human
                    _this.zeroMOds();
                    _this.applyRacialMods();
                    break;
                case 2: //dwarf
                    // + 1 con - 1 chr
                    // remove mage class option
                    _this.zeroMOds();
                    _this.conMod = 1;
                    _this.chrMod = -1;
                    _this.applyRacialMods();
                    break;
                case 3: //elf
                    // + 1 dex - 1 con
                    _this.zeroMOds();
                    _this.dexMod = 1;
                    _this.conMod = -1;
                    _this.applyRacialMods();
                    break;
                case 4: //gnome
                    // + 1 int - 1 wisdom
                    _this.zeroMOds();
                    _this.intMod = 1;
                    _this.wisMod = -1;
                    _this.applyRacialMods();
                    break;
                case 5: //halfling
                    // + 1 dex - 1 str
                    _this.zeroMOds();
                    _this.dexMod = 1;
                    _this.strMod = -1;
                    _this.applyRacialMods();
                    break;
                case 6: //half elf
                    _this.zeroMOds();
                    _this.applyRacialMods();
                    break;
                default:
                    _this.zeroMOds();
                    _this.applyRacialMods();
                    break;
            }
        };
        // Calculate hp and thac0
        this.setLevel = function (ddl) {
            var hit = 0;
            for (var i = 0; i < ddl.selectedIndex; i++) {
                hit += _this.calcHPRoll();
            }
            _this.labelHp.innerHTML = hit.toString();
        };
        // Hit dice roll with con mod, minimum roll 1
        this.calcHPRoll = function () {
            var hp = _this.getRndInteger(1, _this.hitdice) + _this.hpAdj;
            if (hp < 1)
                return 1;
            else
                return hp;
        };
        this.rollButton = rollButton;
    }
    ;
    // throw 3d6
    Generator.prototype.threeD6 = function () {
        var one = this.getRndInteger(1, 6);
        var two = this.getRndInteger(1, 6);
        var three = this.getRndInteger(1, 6);
        return one + two + three;
    };
    return Generator;
}());
;
