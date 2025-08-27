import { Generator } from './generator.js';

declare global {
  interface Window {
    gen: Generator;
    setOne: (ddl: HTMLSelectElement, box: string) => void;
    setRace: (ddl: HTMLSelectElement) => void;
    setClass: (ddl: HTMLSelectElement) => void;
    setLevel: (ddl: HTMLSelectElement) => void;
    noRollType: () => void;
    rollerType: () => void;
  }
}

window.addEventListener('load', () => {
  const roll = document.getElementById('roll') as HTMLInputElement | null;
  if (!roll) return;
  const gen = new Generator(roll);
  window.gen = gen;
  gen.setup();

  // Global pass-throughs for inline handlers in index.html
  window.setOne = (ddl, box) => gen.setOne(ddl, box);
  window.setRace = (ddl) => gen.setRace(ddl);
  window.setClass = (ddl) => gen.setClass(ddl);
  window.setLevel = (ddl) => gen.setLevel(ddl);
  window.noRollType = () => gen.dmMode();
  window.rollerType = () => gen.genMode();
});
