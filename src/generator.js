define(["require", "exports", "./types", "./data", "./dice"], function (require, exports, types_1, data_1, dice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                _this.rollButton.addEventListener('click', _this.roll);
                _this.getControls();
            };
            // Get the page controls
            this.getControls = function () {
                _this.inputOne = document.getElementById('one');
                _this.inputTwo = document.getElementById('two');
                _this.inputThree = document.getElementById('three');
                _this.inputFour = document.getElementById('four');
                _this.inputFive = document.getElementById('five');
                _this.inputSix = document.getElementById('six');
                _this.labelPercent = document.getElementById('percent');
                _this.stat1 = document.getElementById('stat1');
                _this.stat2 = document.getElementById('stat2');
                _this.stat3 = document.getElementById('stat3');
                _this.stat4 = document.getElementById('stat4');
                _this.stat5 = document.getElementById('stat5');
                _this.stat6 = document.getElementById('stat6');
                _this.inputStr = document.getElementById('str');
                _this.inputDex = document.getElementById('dex');
                _this.inputCon = document.getElementById('con');
                _this.inputWis = document.getElementById('wis');
                _this.inputInt = document.getElementById('int');
                _this.inputChr = document.getElementById('chr');
                _this.labelWgtAllow = document.getElementById('wghtAllow');
                _this.labelMxPress = document.getElementById('MxPres');
                _this.labelOpDrs = document.getElementById('opDrs');
                _this.labelBndBrs = document.getElementById('bndBrs');
                _this.labelRctAdj = document.getElementById('rctAdj');
                _this.labelMislAdj = document.getElementById('mislAdj');
                _this.labelDefAdj = document.getElementById('defAdj');
                _this.labelHpAdj = document.getElementById('hpAdj');
                _this.labelSysShk = document.getElementById('sysShk');
                _this.labelResSurv = document.getElementById('resSurv');
                _this.labelPoisSv = document.getElementById('posSv');
                _this.labelRegen = document.getElementById('regen');
                _this.labelNoLang = document.getElementById('noOfLang');
                _this.labelSplLvl = document.getElementById('spellLvl');
                _this.labelChLrn = document.getElementById('chnLearn');
                _this.labelMxSplPLvl = document.getElementById('maxSplPerLvl');
                _this.labelSplImun = document.getElementById('splImun');
                _this.labelMagDefAdj = document.getElementById('magDefAdj');
                _this.labelBonusSp = document.getElementById('BonusSp');
                _this.labelChnFail = document.getElementById('chnFail');
                _this.labelSplImmune = document.getElementById('splImmune');
                _this.labelMxHench = document.getElementById('mxHench');
                _this.labelLoyaltyBs = document.getElementById('loyaltyBs');
                _this.labelReactAdj = document.getElementById('ReactAdj');
                _this.labelHp = document.getElementById('hp');
                _this.labelThac0 = document.getElementById('thaco');
                _this.labelSvBreath = document.getElementById('breath');
                _this.labelSvPara = document.getElementById('para');
                _this.labelSvPoly = document.getElementById('poly');
                _this.labelSvRod = document.getElementById('rod');
                _this.labelSvSpell = document.getElementById('spell');
                _this.selectRace = document.getElementById('race');
                _this.selectClass = document.getElementById('class');
                _this.selectLevel = document.getElementById('lvl');
                _this.rollType = document.getElementsByName('rolltype');
                _this.spinner = document.getElementById('spinner');
            };
            this.clearVals = function (stat) {
                stat.disabled = false;
                stat.selectedIndex = 0;
                var opt = stat.getElementsByTagName('option');
                Array.prototype.slice.call(opt, 0).forEach(_this.enableOpts);
            };
            // roll stats and clear old values etc
            this.roll = function () {
                _this.spinnerOn();
                _this.clearControls();
                if (_this.rollType[0].checked) {
                    _this.inputOne.value = dice_1.roll4d6DropLowest();
                    _this.inputTwo.value = dice_1.roll4d6DropLowest();
                    _this.inputThree.value = dice_1.roll4d6DropLowest();
                    _this.inputFour.value = dice_1.roll4d6DropLowest();
                    _this.inputFive.value = dice_1.roll4d6DropLowest();
                    _this.inputSix.value = dice_1.roll4d6DropLowest();
                    _this.spinnerOff();
                }
                else if (_this.rollType[1].checked) {
                    _this.inputOne.value = dice_1.roll3d6();
                    _this.inputTwo.value = dice_1.roll3d6();
                    _this.inputThree.value = dice_1.roll3d6();
                    _this.inputFour.value = dice_1.roll3d6();
                    _this.inputFive.value = dice_1.roll3d6();
                    _this.inputSix.value = dice_1.roll3d6();
                    _this.spinnerOff();
                }
            };
            this.spinnerOn = function () { _this.spinner.style.display = 'block'; };
            this.spinnerOff = function () { _this.spinner.style.display = 'none'; };
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
                _this.labelPercent.textContent = '';
                _this.labelWgtAllow.textContent = '';
                _this.labelMxPress.textContent = '';
                _this.labelOpDrs.textContent = '';
                _this.labelBndBrs.textContent = '';
                _this.labelRctAdj.textContent = '';
                _this.labelMislAdj.textContent = '';
                _this.labelDefAdj.textContent = '';
                _this.labelHpAdj.textContent = '';
                _this.labelSysShk.textContent = '';
                _this.labelResSurv.textContent = '';
                _this.labelPoisSv.textContent = '';
                _this.labelRegen.textContent = '';
                _this.labelNoLang.textContent = '';
                _this.labelSplLvl.textContent = '';
                _this.labelChLrn.textContent = '';
                _this.labelMxSplPLvl.textContent = '';
                _this.labelSplImun.textContent = '';
                _this.labelMagDefAdj.textContent = '';
                _this.labelBonusSp.textContent = '';
                _this.labelChnFail.textContent = '';
                _this.labelSplImmune.textContent = '';
                _this.labelMxHench.textContent = '';
                _this.labelLoyaltyBs.textContent = '';
                _this.labelReactAdj.textContent = '';
                _this.labelHp.textContent = '';
                _this.labelThac0.textContent = '';
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
            this.enableOpts = function (item) { item.disabled = false; };
            // disable dropdown option
            this.disableOpts = function (item) { item.disabled = true; };
            this.getInputValue = function (box) {
                switch (box) {
                    case 'one': return _this.inputOne.value;
                    case 'two': return _this.inputTwo.value;
                    case 'three': return _this.inputThree.value;
                    case 'four': return _this.inputFour.value;
                    case 'five': return _this.inputFive.value;
                    case 'six': return _this.inputSix.value;
                    default: throw Error('Unknown input');
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
                        throw new Error('Impossible stat selected');
                }
                ddl.disabled = true;
            };
            // calculate strength modifiers
            this.checkForStrMods = function (str) {
                var prcStr = 101;
                if (str === 18 && _this.isFighter) {
                    _this.spinnerOn();
                    prcStr = dice_1.rollDie(100);
                    _this.spinnerOff();
                    _this.labelPercent.textContent = prcStr.toString();
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
                _this.labelWgtAllow.textContent = wAllow.toString();
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
                    default: break;
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
                    default: break;
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
                    default: break;
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
                    default: break;
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
                    default: break;
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
                _this.disableOpts(_this.stat1.getElementsByTagName('option')[index]);
                _this.disableOpts(_this.stat2.getElementsByTagName('option')[index]);
                _this.disableOpts(_this.stat3.getElementsByTagName('option')[index]);
                _this.disableOpts(_this.stat4.getElementsByTagName('option')[index]);
                _this.disableOpts(_this.stat5.getElementsByTagName('option')[index]);
                _this.disableOpts(_this.stat6.getElementsByTagName('option')[index]);
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
                        throw new Error('Uknown class type');
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
                _this.inputStr.value = (_this.strMod == 0 ? _this.inputStr.value : parseInt(_this.inputStr.value) + _this.strMod).toString();
                _this.inputDex.value = (_this.dexMod == 0 ? _this.inputDex.value : parseInt(_this.inputDex.value) + _this.dexMod).toString();
                _this.inputChr.value = (_this.chrMod == 0 ? _this.inputChr.value : parseInt(_this.inputChr.value) + _this.chrMod).toString();
                _this.inputCon.value = (_this.conMod == 0 ? _this.inputCon.value : parseInt(_this.inputCon.value) + _this.conMod).toString();
                _this.inputInt.value = (_this.intMod == 0 ? _this.inputInt.value : parseInt(_this.inputInt.value) + _this.intMod).toString();
                _this.inputWis.value = (_this.wisMod == 0 ? _this.inputWis.value : parseInt(_this.inputWis.value) + _this.wisMod).toString();
            };
            this.enableSelectOptionByVal = function (options, type) {
                for (var i = 1; i < options.length; i++) {
                    if (options[i].value === type)
                        options[i].disabled = false;
                }
            };
            this.enableClassDdl = function (race) {
                _this.disableSelectionOpts(_this.selectClass.getElementsByTagName('option'));
                switch (race) {
                    case types_1.Races.human:
                        data_1.raceClassLimits.human.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName('option'), item); });
                        break;
                    case types_1.Races.dwarf:
                        data_1.raceClassLimits.dwarf.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName('option'), item); });
                        break;
                    case types_1.Races.elf:
                        data_1.raceClassLimits.elf.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName('option'), item); });
                        break;
                    case types_1.Races.gnome:
                        data_1.raceClassLimits.gnome.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName('option'), item); });
                        break;
                    case types_1.Races.halfElf:
                        data_1.raceClassLimits.halfElf.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName('option'), item); });
                        break;
                    case types_1.Races.halfling:
                        data_1.raceClassLimits.halfling.forEach(function (item) { return _this.enableSelectOptionByVal(_this.selectClass.getElementsByTagName('option'), item); });
                        break;
                    default: throw Error('No idea what species this is?');
                }
            };
            this.dmMode = function () {
                _this.clearControls();
                _this.enableDisableStats(true);
                _this.zeroMOds();
                _this.strInit = 0;
                _this.dexInit = 0;
                _this.conInit = 0;
                _this.intInit = 0;
                _this.wisInit = 0;
                _this.chrInit = 0;
                _this.rollButton.disabled = true;
                _this.inputStr.readOnly = false;
                _this.inputDex.readOnly = false;
                _this.inputCon.readOnly = false;
                _this.inputInt.readOnly = false;
                _this.inputWis.readOnly = false;
                _this.inputChr.readOnly = false;
            };
            this.genMode = function () {
                _this.clearControls();
                _this.enableDisableStats(false);
                _this.rollButton.disabled = false;
                _this.inputStr.readOnly = true;
                _this.inputDex.readOnly = true;
                _this.inputCon.readOnly = true;
                _this.inputInt.readOnly = true;
                _this.inputWis.readOnly = true;
                _this.inputChr.readOnly = true;
            };
            this.enableDisableStats = function (disable) {
                _this.inputOne.disabled = disable;
                _this.inputTwo.disabled = disable;
                _this.inputThree.disabled = disable;
                _this.inputFour.disabled = disable;
                _this.inputFive.disabled = disable;
                _this.inputSix.disabled = disable;
                _this.stat1.disabled = disable;
                _this.stat2.disabled = disable;
                _this.stat3.disabled = disable;
                _this.stat4.disabled = disable;
                _this.stat5.disabled = disable;
                _this.stat6.disabled = disable;
            };
            // Add racial mods
            this.setRace = function (ddl) {
                _this.zeroMOds();
                switch (ddl.selectedIndex) {
                    case 1:
                        _this.enableClassDdl(types_1.Races.human);
                        break; // human
                    case 2:
                        _this.conMod = 1;
                        _this.chrMod = -1;
                        _this.enableClassDdl(types_1.Races.dwarf);
                        break; // dwarf
                    case 3:
                        _this.dexMod = 1;
                        _this.conMod = -1;
                        _this.enableClassDdl(types_1.Races.elf);
                        break; // elf
                    case 4:
                        _this.intMod = 1;
                        _this.wisMod = -1;
                        _this.enableClassDdl(types_1.Races.gnome);
                        break; // gnome
                    case 5:
                        _this.dexMod = 1;
                        _this.strMod = -1;
                        _this.enableClassDdl(types_1.Races.halfling);
                        break; // halfling
                    case 6:
                        _this.enableClassDdl(types_1.Races.halfElf);
                        break; // half elf
                    default: throw Error('Uknown race');
                }
                _this.applyRacialMods();
            };
            // Calculate hp and thac0
            this.setLevel = function (ddl) {
                var hit = 0;
                for (var i = 0; i < ddl.selectedIndex; i++) {
                    hit += _this.calcHPRoll();
                }
                _this.labelHp.innerHTML = hit.toString();
                var classIndex = _this.selectClass.selectedIndex;
                var classType = 'fighter';
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
                    default: throw new Error('Unknown meta class');
                }
                _this.setLabelValues(classType, ddl.selectedIndex - 1);
            };
            // Hit dice roll with con mod, minimum roll 1
            this.calcHPRoll = function () {
                var hp = dice_1.rollDie(_this.hitdice) + _this.hpAdj;
                return (hp < 1) ? 1 : hp;
            };
            this.setLabelValues = function (classType, level) {
                _this.labelThac0.innerText = data_1.thac0s[classType][level];
                _this.labelSvBreath.innerText = data_1.savingThrows[classType].breath[level];
                _this.labelSvPara.innerText = data_1.savingThrows[classType].para[level];
                _this.labelSvPoly.innerText = data_1.savingThrows[classType].poly[level];
                _this.labelSvRod.innerText = data_1.savingThrows[classType].rod[level];
                _this.labelSvSpell.innerText = data_1.savingThrows[classType].spell[level];
            };
            this.rollButton = rollButton;
        }
        Generator.prototype.disableSelectionOpts = function (options) {
            for (var i = 0; i < options.length; i++) {
                options[i].disabled = true;
            }
        };
        return Generator;
    }());
    exports.Generator = Generator;
});
