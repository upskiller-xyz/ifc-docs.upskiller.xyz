import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// A docs site: the only real code is the Docusaurus config, the sidebar and a
// handful of React pages/components. Linting stays deliberately light — no
// type-aware rules, no project service — so it runs fast in the pre-commit hook.
export default tseslint.config(
  {
    ignores: ['build', '.docusaurus', 'node_modules', 'static'],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx,mjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': 'warn',
    },
  },

  {
    files: ['tests/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  // Must be last: turn off every rule that conflicts with Prettier.
  prettier,
);
