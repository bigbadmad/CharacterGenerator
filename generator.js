var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Global class object
var gen;
var classes;
(function (classes) {
    classes["fighter"] = "fighter";
    classes["thief"] = "thief";
    classes["cleric"] = "cleric";
    classes["mage"] = "mage";
    classes["bard"] = "bard";
    classes["paladin"] = "paladin";
    classes["ranger"] = "ranger";
    classes["druid"] = "druid";
    classes["illusionist"] = "illusionist";
})(classes || (classes = {}));
var races;
(function (races) {
    races[races["human"] = 0] = "human";
    races[races["dwarf"] = 1] = "dwarf";
    races[races["elf"] = 2] = "elf";
    races[races["gnome"] = 3] = "gnome";
    races[races["halfling"] = 4] = "halfling";
    races[races["halfElf"] = 5] = "halfElf";
})(races || (races = {}));
var raceClassLimits = {
    human: [classes.fighter, classes.thief, classes.cleric, classes.mage, classes.bard, classes.paladin, classes.ranger, classes.druid, classes.illusionist],
    dwarf: [classes.fighter, classes.cleric, classes.thief],
    elf: [classes.fighter, classes.ranger, classes.cleric, classes.thief, classes.bard, classes.mage],
    halfElf: [classes.fighter, classes.paladin, classes.ranger, classes.cleric, classes.druid, classes.thief, classes.bard, classes.mage],
    gnome: [classes.fighter, classes.cleric, classes.thief, classes.illusionist],
    halfling: [classes.fighter, classes.cleric, classes.thief]
};
var thac0s = {
    fighter: [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    cleric: [20, 20, 20, 18, 18, 18, 16, 16, 16, 14, 14, 14, 12, 12, 12, 10, 10, 10, 8, 8],
    rogue: [20, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11],
    mage: [20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 16, 15, 15, 15, 14, 14]
};
var savingThrows = {
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
            _this.labelThac0 = document.getElementById("thaco");
            _this.labelSvBreath = document.getElementById("breath");
            _this.labelSvPara = document.getElementById("para");
            _this.labelSvPoly = document.getElementById("poly");
            _this.labelSvRod = document.getElementById("rod");
            _this.labelSvSpell = document.getElementById("spell");
            _this.selectRace = document.getElementById("race");
            _this.selectClass = document.getElementById("class");
            _this.selectLevel = document.getElementById("lvl");
            _this.rollType = document.getElementsByName('rolltype');
            _this.spinner = document.getElementById("spinner");
        };
        this.clearVals = function (stat) {
            stat.disabled = false;
            stat.selectedIndex = 0;
            var opt = stat.getElementsByTagName("option");
            Array.prototype.slice.call(opt, 0).forEach(_this.enableOpts);
        };
        // roll stats and clear old values etc
        this.roll = function () {
            _this.spinnerOn();
            _this.clearControls();
            console.log(_this.rollType);
            if (_this.rollType[0].checked) {
                _this.fourD6().then(function (value) {
                    _this.inputOne.value = value;
                });
                _this.fourD6().then(function (value) {
                    _this.inputTwo.value = value;
                });
                _this.fourD6().then(function (value) {
                    _this.inputThree.value = value;
                });
                _this.fourD6().then(function (value) {
                    _this.inputFour.value = value;
                });
                _this.fourD6().then(function (value) {
                    _this.inputFive.value = value;
                });
                _this.fourD6().then(function (value) {
                    _this.inputSix.value = value;
                    _this.spinnerOff();
                });
            }
            else if (_this.rollType[1].checked) {
                _this.threeD6().then(function (value) {
                    _this.inputOne.value = value;
                });
                _this.threeD6().then(function (value) {
                    _this.inputTwo.value = value;
                });
                _this.threeD6().then(function (value) {
                    _this.inputThree.value = value;
                });
                _this.threeD6().then(function (value) {
                    _this.inputFour.value = value;
                });
                _this.threeD6().then(function (value) {
                    _this.inputFive.value = value;
                });
                _this.threeD6().then(function (value) {
                    _this.inputSix.value = value;
                    _this.spinnerOff();
                });
            }
        };
        this.spinnerOn = function () {
            _this.spinner.style.display = "block";
        };
        this.spinnerOff = function () {
            _this.spinner.style.display = "none";
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
        // disable dropdown option
        this.disableOpts = function (item) {
            item.disabled = true;
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
                    throw Error("Unknown input");
            }
        };
        // assign stat from dropdown
        this.setOne = function (ddl, box) {
            var val = parseInt(_this.getInputValue(box));
            switch (ddl.selectedIndex) {
                case 1:
                    _this.strInit = val;
                    _this.inputStr.value = _this.strInit.toString();
                    _this.removeOption(1);
                    _this.checkForStrMods(_this.strInit);
                    break;
                case 2:
                    _this.dexInit = val;
                    _this.inputDex.value = _this.dexInit.toString();
                    _this.removeOption(2);
                    _this.setDexMods(_this.dexInit);
                    break;
                case 3:
                    _this.conInit = val;
                    _this.inputCon.value = _this.conInit.toString();
                    _this.removeOption(3);
                    _this.setConMods(_this.conInit);
                    break;
                case 4:
                    _this.intInit = val;
                    _this.inputInt.value = _this.intInit.toString();
                    _this.removeOption(4);
                    _this.setIntMods(_this.intInit);
                    break;
                case 5:
                    _this.wisInit = val;
                    _this.inputWis.value = _this.wisInit.toString();
                    _this.removeOption(5);
                    _this.setWisMods(_this.wisInit);
                    break;
                case 6:
                    _this.chrInit = val;
                    _this.inputChr.value = _this.chrInit.toString();
                    _this.removeOption(6);
                    _this.setCharMods(_this.chrInit);
                    break;
                default:
                    break;
            }
            ddl.disabled = true;
        };
        // calculate strength modifiers
        this.checkForStrMods = function (str) { return __awaiter(_this, void 0, void 0, function () {
            var prcStr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prcStr = 101;
                        if (!(str == 18 && this.isFighter)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.rollTheDice(100)];
                    case 1:
                        prcStr = _a.sent();
                        this.labelPercent.innerText = prcStr.toString();
                        _a.label = 2;
                    case 2:
                        switch (str) {
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
                                switch (true) {
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
                        return [2 /*return*/];
                }
            });
        }); };
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
            _this.disableOpts(_this.stat1.getElementsByTagName("option")[index]);
            _this.disableOpts(_this.stat2.getElementsByTagName("option")[index]);
            _this.disableOpts(_this.stat3.getElementsByTagName("option")[index]);
            _this.disableOpts(_this.stat4.getElementsByTagName("option")[index]);
            _this.disableOpts(_this.stat5.getElementsByTagName("option")[index]);
            _this.disableOpts(_this.stat6.getElementsByTagName("option")[index]);
        };
        // throw 4d6 remove lowest roll
        this.fourD6 = function () { return __awaiter(_this, void 0, void 0, function () {
            var one, two, three, four, lowest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rollTheDice(6)];
                    case 1:
                        one = _a.sent();
                        return [4 /*yield*/, this.rollTheDice(6)];
                    case 2:
                        two = _a.sent();
                        return [4 /*yield*/, this.rollTheDice(6)];
                    case 3:
                        three = _a.sent();
                        return [4 /*yield*/, this.rollTheDice(6)];
                    case 4:
                        four = _a.sent();
                        lowest = Math.min(one, two, three, four);
                        return [2 /*return*/, (one + two + three + four) - lowest];
                }
            });
        }); };
        // throw 3d6
        this.threeD6 = function () { return __awaiter(_this, void 0, void 0, function () {
            var one, two, three;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rollTheDice(6)];
                    case 1:
                        one = _a.sent();
                        return [4 /*yield*/, this.rollTheDice(6)];
                    case 2:
                        two = _a.sent();
                        return [4 /*yield*/, this.rollTheDice(6)];
                    case 3:
                        three = _a.sent();
                        return [2 /*return*/, one + two + three];
                }
            });
        }); };
        // random number generator
        this.rollTheDice = function (die) { return __awaiter(_this, void 0, void 0, function () {
            var response, diceThrow, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch('http://roll.diceapi.com/json/d' + die)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        diceThrow = _a.sent();
                        return [2 /*return*/, diceThrow.dice[0].value];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, Math.floor(Math.random() * (die - 2)) + 2];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
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
        this.enableSelectOptionByVal = function (options, type) {
            for (var i = 1; i < options.length; i++) {
                if (options[i].value === type)
                    options[i].disabled = false;
            }
        };
        this.enableClassDdl = function (race) {
            _this.disableSelectionOpts(_this.selectClass.getElementsByTagName("option"));
            switch (race) {
                case races.human:
                    raceClassLimits.human.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName("option"), item); });
                    break;
                case races.dwarf:
                    raceClassLimits.dwarf.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName("option"), item); });
                    break;
                case races.elf:
                    raceClassLimits.elf.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName("option"), item); });
                    break;
                case races.gnome:
                    raceClassLimits.gnome.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName("option"), item); });
                    break;
                case races.halfElf:
                    raceClassLimits.halfElf.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName("option"), item); });
                    break;
                case races.halfling:
                    raceClassLimits.halfling.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName("option"), item); });
                    break;
                default:
                    throw Error("No idea what species this is?");
            }
        };
        // Add racial mods
        this.setRace = function (ddl) {
            switch (ddl.selectedIndex) {
                case 1: //human
                    _this.zeroMOds();
                    _this.applyRacialMods();
                    _this.enableClassDdl(races.human);
                    break;
                case 2: //dwarf
                    _this.zeroMOds();
                    _this.conMod = 1;
                    _this.chrMod = -1;
                    _this.applyRacialMods();
                    _this.enableClassDdl(races.dwarf);
                    break;
                case 3: //elf
                    _this.zeroMOds();
                    _this.dexMod = 1;
                    _this.conMod = -1;
                    _this.applyRacialMods();
                    _this.enableClassDdl(races.elf);
                    break;
                case 4: //gnome
                    _this.zeroMOds();
                    _this.intMod = 1;
                    _this.wisMod = -1;
                    _this.applyRacialMods();
                    _this.enableClassDdl(races.gnome);
                    break;
                case 5: //halfling				
                    _this.zeroMOds();
                    _this.dexMod = 1;
                    _this.strMod = -1;
                    _this.applyRacialMods();
                    _this.enableClassDdl(races.halfling);
                    break;
                case 6: //half elf
                    _this.zeroMOds();
                    _this.applyRacialMods();
                    _this.enableClassDdl(races.halfElf);
                    break;
                default:
                    throw Error("How did you get here?");
            }
        };
        // Calculate hp and thac0
        this.setLevel = function (ddl) { return __awaiter(_this, void 0, void 0, function () {
            var hit, i, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hit = 0;
                        i = 0;
                        _b.label = 1;
                    case 1:
                        if (!(i < ddl.selectedIndex)) return [3 /*break*/, 4];
                        _a = hit;
                        return [4 /*yield*/, this.calcHPRoll()];
                    case 2:
                        hit = _a + _b.sent();
                        _b.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.labelHp.innerHTML = hit.toString();
                        switch (this.selectClass.selectedIndex) {
                            case 1: // warrior
                            case 6:
                            case 7:
                                this.labelThac0.innerText = thac0s.fighter[ddl.selectedIndex];
                                this.labelSvBreath.innerText = savingThrows.fighter.breath[ddl.selectedIndex];
                                this.labelSvPara.innerText = savingThrows.fighter.para[ddl.selectedIndex];
                                this.labelSvPoly.innerText = savingThrows.fighter.poly[ddl.selectedIndex];
                                this.labelSvRod.innerText = savingThrows.fighter.rod[ddl.selectedIndex];
                                this.labelSvSpell.innerText = savingThrows.fighter.spell[ddl.selectedIndex];
                                break;
                            case 2: // rogue
                            case 5:
                                this.labelThac0.innerText = thac0s.rogue[ddl.selectedIndex];
                                this.labelSvBreath.innerText = savingThrows.rogue.breath[ddl.selectedIndex];
                                this.labelSvPara.innerText = savingThrows.rogue.para[ddl.selectedIndex];
                                this.labelSvPoly.innerText = savingThrows.rogue.poly[ddl.selectedIndex];
                                this.labelSvRod.innerText = savingThrows.rogue.rod[ddl.selectedIndex];
                                this.labelSvSpell.innerText = savingThrows.rogue.spell[ddl.selectedIndex];
                                break;
                            case 3: // priest
                            case 8:
                                this.labelThac0.innerText = thac0s.cleric[ddl.selectedIndex];
                                this.labelSvBreath.innerText = savingThrows.cleric.breath[ddl.selectedIndex];
                                this.labelSvPara.innerText = savingThrows.cleric.para[ddl.selectedIndex];
                                this.labelSvPoly.innerText = savingThrows.cleric.poly[ddl.selectedIndex];
                                this.labelSvRod.innerText = savingThrows.cleric.rod[ddl.selectedIndex];
                                this.labelSvSpell.innerText = savingThrows.cleric.spell[ddl.selectedIndex];
                                break;
                            case 4: // wizard
                            case 9:
                                this.labelThac0.innerText = thac0s.mage[ddl.selectedIndex];
                                this.labelSvBreath.innerText = savingThrows.mage.breath[ddl.selectedIndex];
                                this.labelSvPara.innerText = savingThrows.mage.para[ddl.selectedIndex];
                                this.labelSvPoly.innerText = savingThrows.mage.poly[ddl.selectedIndex];
                                this.labelSvRod.innerText = savingThrows.mage.rod[ddl.selectedIndex];
                                this.labelSvSpell.innerText = savingThrows.mage.spell[ddl.selectedIndex];
                                break;
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        // Hit dice roll with con mod, minimum roll 1
        this.calcHPRoll = function () { return __awaiter(_this, void 0, void 0, function () {
            var hp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.rollTheDice(this.hitdice)];
                    case 1:
                        hp = (_a.sent()) + this.hpAdj;
                        return [2 /*return*/, (hp < 1) ? 1 : hp];
                }
            });
        }); };
        this.rollButton = rollButton;
    }
    ;
    Generator.prototype.disableSelectionOpts = function (options) {
        for (var i = 0; i < options.length; i++) {
            options[i].disabled = true;
        }
    };
    return Generator;
}());
;
