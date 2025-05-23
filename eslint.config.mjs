// @ts-check

import js from '@eslint/js';
import ts from 'typescript-eslint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
// import pluginQuery from '@tanstack/eslint-plugin-query';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = ts.config(
  js.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals' /*, 'next/typescript'*/ /*added by ts below*/,
  ),
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
);

export default eslintConfig;
