// Crypto-safe dice helpers (sync)
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function rollDie(die) {
        var random = new Uint32Array(1);
        window.crypto.getRandomValues(random);
        return (random[0] % die) + 1;
    }
    exports.rollDie = rollDie;
    function roll3d6() {
        return rollDie(6) + rollDie(6) + rollDie(6);
    }
    exports.roll3d6 = roll3d6;
    function roll4d6DropLowest() {
        var r = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];
        var lowest = Math.min.apply(Math, r);
        return r.reduce(function (a, b) { return a + b; }, 0) - lowest;
    }
    exports.roll4d6DropLowest = roll4d6DropLowest;
});
