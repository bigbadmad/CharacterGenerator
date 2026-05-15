import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Generator } from '../src/generator.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal XLSX mock so exportSheet doesn't throw
globalThis.XLSX = {
  utils: {
    aoa_to_sheet: vi.fn(() => ({})),
    book_new:     vi.fn(() => ({})),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
};

function setupDom() {
  const html = readFileSync(join(__dirname, '../index.html'), 'utf8');
  document.documentElement.innerHTML = html;
}

describe('Generator – setClass mutex', () => {
  let gen: Generator;

  beforeEach(() => {
    setupDom();
    const rollBtn = document.getElementById('roll') as HTMLInputElement;
    gen = new Generator(rollBtn);
    gen.setup();
  });

  it('selecting single class deselects multiclass', () => {
    const singleSel  = document.getElementById('class')      as HTMLSelectElement;
    const multiSel   = document.getElementById('multiclass') as HTMLSelectElement;

    // Give multiclass a selectable option and select it
    multiSel.style.display = '';
    const opt = document.createElement('option');
    opt.value = 'fighter+mage';
    multiSel.appendChild(opt);
    multiSel.selectedIndex = multiSel.options.length - 1;

    // Now select a single class
    for (let i = 0; i < singleSel.options.length; i++) {
      if (!singleSel.options[i].disabled && singleSel.options[i].value) {
        singleSel.selectedIndex = i;
        break;
      }
    }
    gen.setClass(singleSel);

    expect(multiSel.selectedIndex).toBe(-1);
  });

  it('selecting multiclass deselects single class', () => {
    const singleSel  = document.getElementById('class')      as HTMLSelectElement;
    const multiSel   = document.getElementById('multiclass') as HTMLSelectElement;

    // Select a single class first
    for (let i = 0; i < singleSel.options.length; i++) {
      if (!singleSel.options[i].disabled && singleSel.options[i].value) {
        singleSel.selectedIndex = i;
        break;
      }
    }

    // Then select a multiclass option
    multiSel.style.display = '';
    const opt = document.createElement('option');
    opt.value = 'fighter+mage';
    multiSel.appendChild(opt);
    multiSel.selectedIndex = multiSel.options.length - 1;
    gen.setClass(multiSel);

    expect(singleSel.selectedIndex).toBe(0);
  });
});
