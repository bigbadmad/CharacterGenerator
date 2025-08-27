import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Import built JS to avoid TS extension resolution issues in tests
import { rollDie, roll3d6, roll4d6DropLowest } from '../dist/dice.js';

function setMockRandomSequence(seq: number[]) {
  let i = 0;
  const c = (globalThis as any).crypto;
  if (!c || typeof c.getRandomValues !== 'function') {
    throw new Error('crypto.getRandomValues is not available in test environment');
  }
  vi.spyOn(c as any, 'getRandomValues').mockImplementation((arr: ArrayBufferView) => {
    const v = seq[i++ % seq.length] >>> 0;
    (arr as any)[0] = v;
    return arr;
  });
}

describe('dice', () => {
  beforeEach(() => {
    // default deterministic value
    setMockRandomSequence([0]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rollDie returns values in 1..N', () => {
    setMockRandomSequence([0, 5, 1023]);
    expect(rollDie(6)).toBe(1); // 0 % 6 + 1
    expect(rollDie(6)).toBe(6); // 5 % 6 + 1
    expect(rollDie(20)).toBe((1023 % 20) + 1);
  });

  it('roll3d6 uses three rolls', () => {
    // 0,1,2 -> (1)+(2)+(3) = 6
    setMockRandomSequence([0, 1, 2]);
    expect(roll3d6()).toBe(6);
  });

  it('roll4d6DropLowest drops the lowest of four', () => {
    // 0,1,2,3 -> 1,2,3,4 -> drop 1 => 2+3+4 = 9
    setMockRandomSequence([0, 1, 2, 3]);
    expect(roll4d6DropLowest()).toBe(9);
  });
});
