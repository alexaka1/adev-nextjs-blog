// @ts-check

import js from '@eslint/js';
import ts from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import oxlint from 'eslint-plugin-oxlint';
// import pluginQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
// @ts-expect-error I have no idea what the problem here is
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  js.configs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...nextVitals,
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    ignores: ['node_modules/**'],
  },
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // pluginQuery.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      // "@typescript-eslint/require-await": "off",
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      // 'drizzle/enforce-delete-with-where': [
      //   'error',
      //   {
      //     drizzleObjectName: 'db',
      //   },
      // ],
      // 'drizzle/enforce-update-with-where': [
      //   'error',
      //   {
      //     drizzleObjectName: 'db',
      //   },
      // ],
    },
  },
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'), // oxlint should be the last one
]);

export default eslintConfig;
