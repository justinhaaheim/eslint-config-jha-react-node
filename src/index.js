// ESLint Flat Config
import js from '@eslint/js';
import restrictedGlobals from 'confusing-browser-globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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

export default tseslint.config(
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
        ...globals.browser,
        ...globals.es2020,
      },
      sourceType: 'module',
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
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

      // JSX A11y rules
      'jsx-a11y/alt-text': ERROR, // eslint-config-react-app uses WARN
      'jsx-a11y/anchor-has-content': ERROR, // eslint-config-react-app uses WARN
      'jsx-a11y/anchor-is-valid': ERROR, // eslint-config-react-app uses WARN

      // Additional JSX A11y rules from eslint-config-react-app
      'jsx-a11y/aria-activedescendant-has-tabindex': WARN,

      // eslint-config-react-app uses WARN with aspects: ['noHref', 'invalidHref']
      'jsx-a11y/aria-props': ERROR,

      // From eslint-config-react-app
      'jsx-a11y/aria-proptypes': WARN,

      // eslint-config-react-app uses WARN
      'jsx-a11y/aria-role': ERROR,

      // From eslint-config-react-app
      'jsx-a11y/aria-unsupported-elements': WARN,

      // eslint-config-react-app uses WARN with ignoreNonDOM: true
      'jsx-a11y/click-events-have-key-events': WARN,

      // From eslint-config-react-app
      'jsx-a11y/heading-has-content': WARN,

      // From eslint-config-react-app
      'jsx-a11y/iframe-has-title': WARN,

      'jsx-a11y/img-redundant-alt': ERROR,

      // From eslint-config-react-app
      'jsx-a11y/no-access-key': WARN,

      // From eslint-config-react-app
      'jsx-a11y/no-distracting-elements': WARN,

      // eslint-config-react-app uses WARN
      'jsx-a11y/no-noninteractive-element-interactions': WARN,

      // From eslint-config-react-app
      'jsx-a11y/no-redundant-roles': WARN,

      'jsx-a11y/no-static-element-interactions': WARN,
      'jsx-a11y/role-has-required-aria-props': ERROR, // From eslint-config-react-app
      'jsx-a11y/role-supports-aria-props': WARN, // From eslint-config-react-app
      'jsx-a11y/scope': WARN,

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

      // React hooks rules
      'react-hooks/exhaustive-deps': ERROR,

      // eslint-config-react-app uses WARN
      'react-hooks/rules-of-hooks': ERROR,

      // eslint-config-react-app also uses ERROR
      // React refresh rule (not in eslint-config-react-app)
      'react-refresh/only-export-components': [
        WARN,
        {allowConstantExport: true},
      ],

      // From eslint-config-react-app/base.js
      'react/jsx-uses-react': WARN,

      // From eslint-config-react-app
      // React rules from eslint-config-react-app/base.js
      'react/jsx-uses-vars': WARN,

      // Import sorting (not in eslint-config-react-app)
      'simple-import-sort/exports': ERROR,

      'simple-import-sort/imports': [
        ERROR,
        {
          // The default grouping, but with type imports first as a separate group
          groups: [['^.*\\u0000$'], ['^\\u0000'], ['^@?\\w'], ['^'], ['^\\.']],
        },
      ],

      // Key sorting (not in eslint-config-react-app)
      'sort-keys-fix/sort-keys-fix': WARN,
    },

    // Add settings from eslint-config-react-app/base.js
    settings: {
      react: {
        version: 'detect',
      },
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
        ...globals.browser,
        ...globals.es2020,
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
        tsconfigRootDir: import.meta.dirname,

        warnOnUnsupportedTypeScriptVersion: true, // From eslint-config-react-app
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'typescript-sort-keys': typescriptSortKeys,
    },

    /* eslint-disable sort-keys-fix/sort-keys-fix */
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

      // From eslint-config-react-app
      'no-array-constructor': OFF,
      '@typescript-eslint/no-array-constructor': WARN,

      '@typescript-eslint/no-inferrable-types': WARN,

      '@typescript-eslint/no-non-null-assertion': WARN,

      // From eslint-config-react-app
      'no-redeclare': OFF,
      '@typescript-eslint/no-redeclare': WARN,

      '@typescript-eslint/no-require-imports': WARN,

      // From eslint-config-react-app
      'no-unused-expressions': OFF,
      '@typescript-eslint/no-unused-expressions': NO_UNUSED_EXPRESSIONS_CONFIG,

      'no-unused-vars': OFF,
      '@typescript-eslint/no-unused-vars': NO_UNUSED_VARS_CONFIG,

      'no-use-before-define': OFF,
      '@typescript-eslint/no-use-before-define': [
        // From eslint-config-react-app
        ERROR,
        {
          typedefs: false,
        },
      ],

      // Disable base rule as it can report incorrect errors with TypeScript
      'no-return-await': OFF,
      '@typescript-eslint/return-await': [ERROR, 'always'],

      'typescript-sort-keys/interface': WARN,

      'typescript-sort-keys/string-enum': WARN,

      'no-shadow': OFF,
      '@typescript-eslint/no-shadow': ERROR, // or whatever severity you prefer
    },
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },

  // React JSX rules
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      // Additional React rules from eslint-config-react-app
      'react/forbid-foreign-prop-types': [WARN, {allowInPropTypes: true}],

      // Your existing React rules
      'react/jsx-boolean-value': [ERROR, 'never'],

      'react/jsx-curly-brace-presence': [
        ERROR,
        {children: 'never', props: 'never'},
      ],

      'react/jsx-fragments': [ERROR, 'syntax'],

      // From eslint-config-react-app
      'react/jsx-no-comment-textnodes': WARN,

      // From eslint-config-react-app
      'react/jsx-no-duplicate-props': WARN,

      // From eslint-config-react-app
      'react/jsx-no-target-blank': WARN,

      // From eslint-config-react-app
      'react/jsx-no-undef': ERROR,

      'react/jsx-no-useless-fragment': ERROR,

      'react/jsx-pascal-case': ERROR,

      'react/jsx-sort-props': WARN,

      'react/no-array-index-key': WARN,

      'react/no-danger': WARN,

      // From eslint-config-react-app
      'react/no-danger-with-children': WARN,

      'react/no-deprecated': ERROR,

      // From eslint-config-react-app
      'react/no-direct-mutation-state': ERROR,

      // From eslint-config-react-app
      'react/no-is-mounted': WARN,

      // From eslint-config-react-app
      'react/no-typos': ERROR,

      // From eslint-config-react-app
      'react/require-render-return': ERROR,

      'react/self-closing-comp': ERROR, // From eslint-config-react-app

      'react/style-prop-object': WARN, // From eslint-config-react-app
    },
  },
);
