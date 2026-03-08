import { defineConfig } from 'vitest/config';

// Prefer .ts sources over legacy .js files in src/ during testing
const preferTs = {
  name: 'prefer-ts-over-js',
  enforce: 'pre' as const,
  async resolveId(this: any, source: string, importer: string | undefined) {
    if (source.endsWith('.js') && importer) {
      const tsSource = source.replace(/\.js$/, '.ts');
      const resolved = await this.resolve(tsSource, importer, { skipSelf: true });
      if (resolved) return resolved;
    }
    return null;
  },
};

export default defineConfig({
  plugins: [preferTs],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.{test,spec}.ts'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
  },
});
