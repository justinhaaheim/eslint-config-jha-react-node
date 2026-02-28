import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

import {ERROR, WARN} from './shared.js';

export default tseslint.config(
  // React plugins and rules that apply to all files
  {
    plugins: {
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
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
    },

    // Add settings from eslint-config-react-app/base.js
    settings: {
      react: {
        version: 'detect',
      },
    },
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
