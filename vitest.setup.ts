// Vitest setup: ensure jsdom has a crypto.getRandomValues
if (typeof globalThis.window !== 'undefined') {
  const w = window as any;
  if (!w.crypto) {
    w.crypto = {};
  }
  if (typeof w.crypto.getRandomValues !== 'function') {
    w.crypto.getRandomValues = (arr: any) => {
      // Fallback mock fills zeros (tests can override per-suite via vi.spyOn)
      if (arr && typeof arr.length === 'number') {
        for (let i = 0; i < arr.length; i++) arr[i] = 0;
      }
      return arr;
    };
  }
  if (!(globalThis as any).crypto) {
    (globalThis as any).crypto = w.crypto;
  }
}
