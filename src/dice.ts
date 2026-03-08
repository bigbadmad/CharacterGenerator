// Crypto-safe dice helpers (sync)

export function rollDie(die: number): number {
  // Rejection sampling eliminates modulo bias.
  // Values in the biased tail are discarded and redrawn.
  const limit = Math.floor(0x100000000 / die) * die; // largest multiple of die ≤ 2^32
  const random = new Uint32Array(1);
  do {
    window.crypto.getRandomValues(random);
  } while (random[0] >= limit);
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
