// Crypto-safe dice helpers (sync)

export function rollDie(die: number): number {
  const random = new Uint32Array(1);
  window.crypto.getRandomValues(random);
  return (random[0] % die) + 1;
}

export function roll3d6(): number {
  return rollDie(6) + rollDie(6) + rollDie(6);
}

export function roll4d6DropLowest(): number {
  const r = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];
  const lowest = Math.min(...r);
  return r.reduce((a, b) => a + b, 0) - lowest;
}
