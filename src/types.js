// Shared types and enums
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Classes;
    (function (Classes) {
        Classes["fighter"] = "fighter";
        Classes["thief"] = "thief";
        Classes["cleric"] = "cleric";
        Classes["mage"] = "mage";
        Classes["bard"] = "bard";
        Classes["paladin"] = "paladin";
        Classes["ranger"] = "ranger";
        Classes["druid"] = "druid";
        Classes["illusionist"] = "illusionist";
    })(Classes = exports.Classes || (exports.Classes = {}));
    var Races;
    (function (Races) {
        Races["human"] = "human";
        Races["dwarf"] = "dwarf";
        Races["elf"] = "elf";
        Races["gnome"] = "gnome";
        Races["halfling"] = "halfling";
        Races["halfElf"] = "halfElf";
    })(Races = exports.Races || (exports.Races = {}));
});
