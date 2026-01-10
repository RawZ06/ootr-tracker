const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const templateParser = require('@angular-eslint/template-parser');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.angular/**', 'out-tsc/**']
  },
  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.spec.json'],
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        crypto: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jasmine: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@angular-eslint': angular
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs['recommended'].rules,
      ...angular.configs['recommended'].rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@angular-eslint/prefer-inject': 'off'
    }
  },
  // HTML template files
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: templateParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    rules: {
      ...angularTemplate.configs['recommended'].rules,
      ...angularTemplate.configs['accessibility'].rules
    }
  }
];
