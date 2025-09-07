// @ts-check

import js from '@eslint/js';
import ts from 'typescript-eslint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import oxlint from 'eslint-plugin-oxlint';
// import pluginQuery from '@tanstack/eslint-plugin-query';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  js.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals' /*, 'next/typescript'*/ /*added by ts below*/,
  ),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
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
