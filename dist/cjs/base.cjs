'use strict';

var globals = require('globals');
var js = require('@eslint/js');
var restrictedGlobals = require('confusing-browser-globals');
var eslintConfigPrettier = require('eslint-config-prettier');
var importPlugin = require('eslint-plugin-import');
var simpleImportSort = require('eslint-plugin-simple-import-sort');
var sortKeys = require('eslint-plugin-sort-keys');
var typescriptSortKeys = require('eslint-plugin-typescript-sort-keys');
var tseslint = require('typescript-eslint');

/* eslint-disable sort-keys/sort-keys-fix */

// Constants for rule severity
const OFF = 0;
const WARN = 1;
const ERROR = 2;

const NO_UNUSED_VARS_CONFIG = [
  WARN,
  {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
];

const NO_UNUSED_EXPRESSIONS_CONFIG = [
  ERROR,
  {allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true},
];

/**
 * Creates the base ESLint flat config array, parameterized by environment globals.
 * This allows base.js and node.js to share all the same rules while differing
 * only in which globals are available.
 *
 * @param {Record<string, boolean>} environmentGlobals - The globals to include (e.g., globals.browser or globals.node)
 * @returns {import('typescript-eslint').ConfigArray}
 */
function createBaseConfig(environmentGlobals) {
  return tseslint.config(
    {ignores: ['**/build/', '**/dist/', '**/node_modules/']},

    // Apply base JS recommended rules
    js.configs.recommended,

    // Apply prettier config (disables rules that conflict with prettier)
    // Note that we may want to periodically run the prettier cli tool to check
    // for any rules we are setting below that conflict with prettier.
    // See: https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#cli-helper-tool
    eslintConfigPrettier,

    // CommonJS files configuration
    {
      files: ['**/*.cjs'],
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.commonjs,
        },
        sourceType: 'commonjs',
      },
    },

    // Base configuration for all JS/TS files
    {
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...environmentGlobals,
        },
        sourceType: 'module',
      },

      linterOptions: {
        // We need to disable this here because otherwise it's impossible to prevent the linter from auto-fixing and removing the disable directives, even when we want to keep them.
        reportUnusedDisableDirectives: 0,
      },

      plugins: {
        import: importPlugin,
        'simple-import-sort': simpleImportSort,
        'sort-keys': sortKeys,
      },

      rules: {
        'import/first': ERROR,
        // Additional import rules from eslint-config-react-app
        'import/no-amd': ERROR,

        // // From eslint-config-react-app
        // 'import/no-anonymous-default-export': WARN,

        // eslint-config-react-app also uses ERROR
        'import/no-duplicates': ERROR,
        'import/no-unresolved': OFF, // From eslint-config-react-app
        'import/no-webpack-loader-syntax': ERROR, // From eslint-config-react-app

        // From eslint-config-react-app/base.js
        // Your existing general rules
        'no-console': OFF,

        'no-debugger': ERROR,

        // Add restricted globals from eslint-config-react-app
        'no-restricted-globals': [ERROR, ...restrictedGlobals],

        'no-shadow': ERROR,

        // @ts-expect-error No idea why this is complaining that this doesn't match RuleLevelAndOptions
        'no-unused-expressions': NO_UNUSED_EXPRESSIONS_CONFIG,

        // @ts-expect-error No idea why this is complaining
        'no-unused-vars': NO_UNUSED_VARS_CONFIG,

        'no-use-before-define': ERROR,

        'no-var': ERROR,

        'no-warning-comments': [
          ERROR,
          {location: 'anywhere', terms: ['nocommit']},
        ],

        // Quotes shouldn't be needed with prettier onboard
        // See: https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#quotes-deprecated
        // quotes: [
        //   ERROR,
        //   'single',
        //   {allowTemplateLiterals: true, avoidEscape: true},
        // ],

        // Import sorting (not in eslint-config-react-app)
        'simple-import-sort/exports': ERROR,

        'simple-import-sort/imports': [
          ERROR,
          {
            // The default grouping, but with type imports first as a separate group
            groups: [
              ['^.*\\u0000$'],
              ['^\\u0000'],
              ['^@?\\w'],
              ['^'],
              ['^\\.'],
            ],
          },
        ],

        // Disable the default sort-keys rule so we can use our fixable rule
        'sort-keys': OFF,

        'sort-keys/sort-keys-fix': WARN,
      },
    },

    // TypeScript specific config with type checking
    {
      extends: [
        tseslint.configs.recommendedTypeChecked,
        tseslint.configs.stylisticTypeChecked,
      ],

      files: ['**/*.ts', '**/*.tsx'],

      languageOptions: {
        globals: {
          ...environmentGlobals,
        },
        parser: tseslint.parser,
        parserOptions: {
          // Add ecmaFeatures from eslint-config-react-app
          ecmaFeatures: {
            jsx: true,
          },

          ecmaVersion: 2020,

          // See: https://typescript-eslint.io/blog/announcing-typescript-eslint-v8-beta/#project-service
          projectService: true,

          sourceType: 'module',

          // @ts-expect-error No idea why it's saying TS2339: Property 'dirname' does not exist on type 'ImportMeta'.
          tsconfigRootDir: undefined,

          warnOnUnsupportedTypeScriptVersion: true, // From eslint-config-react-app
        },
      },

      plugins: {
        '@typescript-eslint': tseslint.plugin,
        'typescript-sort-keys': typescriptSortKeys,
      },

      // Let's avoid sorting these so we can keep together rule pairs that disable
      // the js version in favor of the typescript-eslint version
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          WARN,
          {
            'ts-ignore': 'allow-with-description',
          },
        ],

        '@typescript-eslint/consistent-type-assertions': WARN,

        '@typescript-eslint/consistent-type-definitions': OFF,

        '@typescript-eslint/consistent-type-imports': [
          WARN,
          {prefer: 'type-imports'},
        ],

        '@typescript-eslint/no-array-constructor': WARN,

        '@typescript-eslint/no-inferrable-types': WARN,

        '@typescript-eslint/no-non-null-assertion': WARN,

        '@typescript-eslint/no-redeclare': WARN,

        '@typescript-eslint/no-require-imports': WARN,

        '@typescript-eslint/no-unused-expressions':
          NO_UNUSED_EXPRESSIONS_CONFIG,

        '@typescript-eslint/no-unused-vars': NO_UNUSED_VARS_CONFIG,

        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowString: false, // Disallow strings in boolean context
            allowNumber: false, // Disallow numbers in boolean context
            allowNullableObject: false, // Disallow nullable objects in boolean context
            allowNullableBoolean: false, // Disallow nullable booleans without explicit check
            allowNullableString: false, // Disallow nullable strings without explicit check
            allowNullableNumber: false, // Disallow nullable numbers without explicit check
            allowAny: false, // Disallow 'any' type in boolean context
          },
        ],

        '@typescript-eslint/no-use-before-define': [
          // From eslint-config-react-app
          ERROR,
          {
            typedefs: false,
          },
        ],

        '@typescript-eslint/prefer-nullish-coalescing': [
          WARN,
          {ignoreIfStatements: true},
        ],

        '@typescript-eslint/return-await': [ERROR, 'always'],

        // From eslint-config-react-app
        'no-array-constructor': OFF,

        '@typescript-eslint/no-shadow': ERROR,

        // From eslint-config-react-app
        'no-redeclare': OFF,

        // Disable base rule as it can report incorrect errors with TypeScript
        'no-return-await': OFF,

        'no-shadow': OFF,

        // From eslint-config-react-app
        'no-unused-expressions': OFF,

        'no-unused-vars': OFF,

        'no-use-before-define': OFF,

        'typescript-sort-keys/interface': WARN,
        'typescript-sort-keys/string-enum': WARN, // or whatever severity you prefer
      },
    },
  );
}

var base = createBaseConfig({...globals.browser, ...globals.es2020});

module.exports = base;
