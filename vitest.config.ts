import { defineConfig } from 'vitest/config';

// The tests here are content checks over docs/ and sidebars.ts — plain Node,
// no DOM, no Docusaurus runtime.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
