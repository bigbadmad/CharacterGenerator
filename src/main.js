define(["require", "exports", "./generator"], function (require, exports, generator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.addEventListener('load', function () {
        var roll = document.getElementById('roll');
        if (!roll)
            return;
        var gen = new generator_1.Generator(roll);
        window.gen = gen;
        gen.setup();
        // Global pass-throughs for inline handlers in index.html
        window.setOne = function (ddl, box) { return gen.setOne(ddl, box); };
        window.setRace = function (ddl) { return gen.setRace(ddl); };
        window.setClass = function (ddl) { return gen.setClass(ddl); };
        window.setLevel = function (ddl) { return gen.setLevel(ddl); };
        window.noRollType = function () { return gen.dmMode(); };
        window.rollerType = function () { return gen.genMode(); };
    });
});
