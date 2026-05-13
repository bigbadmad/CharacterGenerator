import { Generator } from './generator.js';

declare global {
  interface Window {
    gen: Generator;
    setOne: (ddl: HTMLSelectElement, box: string) => void;
    setRace: (ddl: HTMLSelectElement) => void;
    setClass: (ddl: HTMLSelectElement) => void;
    setLevel: (ddl: HTMLSelectElement) => void;
    setGender: (ddl: HTMLSelectElement) => void;
    setAlignment: (ddl: HTMLSelectElement) => void;
    noRollType: () => void;
    rollerType: () => void;
    exportSheet: () => void;
    updateThiefSkills: () => void;
    updateBardSkills: () => void;
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
  window.setGender = (ddl) => gen.setGender(ddl);
  window.setAlignment = (ddl) => gen.setAlignment(ddl);
  window.noRollType = () => gen.dmMode();
  window.rollerType = () => gen.genMode();
  window.exportSheet = () => gen.exportSheet();
  window.updateThiefSkills = () => gen.updateThiefSkills();
  window.updateBardSkills = () => gen.updateBardSkills();
});
