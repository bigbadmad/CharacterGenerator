import { describe, it, expect } from 'vitest';
import { calcStrMods, calcConMods } from '../src/statCalc.js';

// ---------- STR 18/xx warrior boundary cases ----------

describe('calcStrMods – STR 18 warrior bracket boundaries', () => {
  // Bracket edges: the "upper boundary" of one bracket must match differently to the next
  it('18/50 uses first warrior bracket (hitProb 1, dmgAdj 3)', () => {
    const m = calcStrMods(18, true, 50);
    expect(m.hitProb).toBe(1);
    expect(m.dmgAdj).toBe(3);
    expect(m.wghtAllow).toBe(135);
    expect(m.bndBrs).toBe(20);
  });

  it('18/51 crosses into second warrior bracket (hitProb 2, dmgAdj 3)', () => {
    const m = calcStrMods(18, true, 51);
    expect(m.hitProb).toBe(2);
    expect(m.dmgAdj).toBe(3);
    expect(m.wghtAllow).toBe(160);
    expect(m.bndBrs).toBe(25);
  });

  it('18/75 stays in second warrior bracket', () => {
    const m = calcStrMods(18, true, 75);
    expect(m.hitProb).toBe(2);
    expect(m.dmgAdj).toBe(3);
  });

  it('18/76 crosses into third warrior bracket (dmgAdj 4)', () => {
    const m = calcStrMods(18, true, 76);
    expect(m.hitProb).toBe(2);
    expect(m.dmgAdj).toBe(4);
    expect(m.wghtAllow).toBe(185);
    expect(m.bndBrs).toBe(30);
  });

  it('18/90 stays in third warrior bracket', () => {
    const m = calcStrMods(18, true, 90);
    expect(m.dmgAdj).toBe(4);
  });

  it('18/91 crosses into fourth warrior bracket (dmgAdj 5)', () => {
    const m = calcStrMods(18, true, 91);
    expect(m.hitProb).toBe(2);
    expect(m.dmgAdj).toBe(5);
    expect(m.wghtAllow).toBe(235);
    expect(m.bndBrs).toBe(35);
  });

  it('18/99 stays in fourth warrior bracket', () => {
    const m = calcStrMods(18, true, 99);
    expect(m.dmgAdj).toBe(5);
  });

  it('18/100 uses fifth warrior bracket (hitProb 3, dmgAdj 6)', () => {
    const m = calcStrMods(18, true, 100);
    expect(m.hitProb).toBe(3);
    expect(m.dmgAdj).toBe(6);
    expect(m.wghtAllow).toBe(335);
    expect(m.bndBrs).toBe(40);
  });
});

describe('calcStrMods – STR 18 non-warrior (no d100)', () => {
  it('non-warrior gets default 18 row regardless of prcStr', () => {
    const m = calcStrMods(18, false, 0);
    expect(m.hitProb).toBe(1);
    expect(m.dmgAdj).toBe(2);
    expect(m.wghtAllow).toBe(110);
  });

  it('warrior with prcStr=0 also falls back to 18 default', () => {
    const m = calcStrMods(18, true, 0);
    expect(m.hitProb).toBe(1);
    expect(m.dmgAdj).toBe(2);
  });
});

// ---------- CON warrior HP bonus ----------

describe('calcConMods – warrior HP-per-die bonus at CON 17/18', () => {
  it('CON 17 non-warrior: hpAdj is +2', () => {
    expect(calcConMods(17, false).hpAdj).toBe(2);
  });

  it('CON 17 warrior: hpAdj is +3', () => {
    expect(calcConMods(17, true).hpAdj).toBe(3);
  });

  it('CON 17 warrior: sysShk and resSurv unchanged from base', () => {
    const m = calcConMods(17, true);
    expect(m.sysShk).toBe(97);
    expect(m.resSurv).toBe(98);
  });

  it('CON 18 non-warrior: hpAdj is +2', () => {
    expect(calcConMods(18, false).hpAdj).toBe(2);
  });

  it('CON 18 warrior: hpAdj is +4', () => {
    expect(calcConMods(18, true).hpAdj).toBe(4);
  });

  it('CON 18 warrior: sysShk and resSurv unchanged from base', () => {
    const m = calcConMods(18, true);
    expect(m.sysShk).toBe(99);
    expect(m.resSurv).toBe(100);
  });

  it('CON 16 warrior is unaffected (still +2)', () => {
    expect(calcConMods(16, true).hpAdj).toBe(2);
  });
});
