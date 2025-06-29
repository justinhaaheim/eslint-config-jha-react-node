'use strict';

var js = require('@eslint/js');
var restrictedGlobals = require('confusing-browser-globals');
var eslintConfigPrettier = require('eslint-config-prettier');
var importPlugin = require('eslint-plugin-import');
var jsxA11y = require('eslint-plugin-jsx-a11y');
var reactPlugin = require('eslint-plugin-react');
var reactHooks = require('eslint-plugin-react-hooks');
var reactRefresh = require('eslint-plugin-react-refresh');
var simpleImportSort = require('eslint-plugin-simple-import-sort');
var typescriptSortKeys = require('eslint-plugin-typescript-sort-keys');
var globals = require('globals');
var tseslint = require('typescript-eslint');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var eslintPluginSortKeys = {};

var naturalCompare = {exports: {}};

var hasRequiredNaturalCompare;

function requireNaturalCompare () {
	if (hasRequiredNaturalCompare) return naturalCompare.exports;
	hasRequiredNaturalCompare = 1;
	/*
	 * @version    1.4.0
	 * @date       2015-10-26
	 * @stability  3 - Stable
	 * @author     Lauri Rooden (https://github.com/litejs/natural-compare-lite)
	 * @license    MIT License
	 */


	var naturalCompare$1 = function(a, b) {
		var i, codeA
		, codeB = 1
		, posA = 0
		, posB = 0
		, alphabet = String.alphabet;

		function getCode(str, pos, code) {
			if (code) {
				for (i = pos; code = getCode(str, i), code < 76 && code > 65;) ++i;
				return +str.slice(pos - 1, i)
			}
			code = alphabet && alphabet.indexOf(str.charAt(pos));
			return code > -1 ? code + 76 : ((code = str.charCodeAt(pos) || 0), code < 45 || code > 127) ? code
				: code < 46 ? 65               // -
				: code < 48 ? code - 1
				: code < 58 ? code + 18        // 0-9
				: code < 65 ? code - 11
				: code < 91 ? code + 11        // A-Z
				: code < 97 ? code - 37
				: code < 123 ? code + 5        // a-z
				: code - 63
		}


		if ((a+="") != (b+="")) for (;codeB;) {
			codeA = getCode(a, posA++);
			codeB = getCode(b, posB++);

			if (codeA < 76 && codeB < 76 && codeA > 66 && codeB > 66) {
				codeA = getCode(a, posA, posA);
				codeB = getCode(b, posB, posA = i);
				posB = i;
			}

			if (codeA != codeB) return (codeA < codeB) ? -1 : 1
		}
		return 0
	};

	try {
		naturalCompare.exports = naturalCompare$1;
	} catch (e) {
		String.naturalCompare = naturalCompare$1;
	}
	return naturalCompare.exports;
}

var sortKeysFix;
var hasRequiredSortKeysFix;

function requireSortKeysFix () {
	if (hasRequiredSortKeysFix) return sortKeysFix;
	hasRequiredSortKeysFix = 1;
	const naturalCompare = requireNaturalCompare();

	sortKeysFix = {
	  meta: {
	    type: 'suggestion',
	    fixable: 'code',
	    docs: {
	      description: 'require object keys to be sorted',
	      category: 'Stylistic Issues',
	      recommended: false,
	      url: 'https://github.com/namnm/eslint-plugin-sort-keys',
	    },
	    schema: [
	      {
	        enum: ['asc', 'desc'],
	      },
	      {
	        type: 'object',
	        properties: {
	          caseSensitive: {
	            type: 'boolean',
	            default: true,
	          },
	          natural: {
	            type: 'boolean',
	            default: false,
	          },
	          minKeys: {
	            type: 'integer',
	            minimum: 2,
	            default: 2,
	          },
	        },
	        additionalProperties: false,
	      },
	    ],
	    messages: {
	      sortKeys:
	        "Expected object keys to be in {{natural}}{{insensitive}}{{order}}ending order. '{{thisName}}' should be before '{{prevName}}'.",
	    },
	  },

	  create(ctx) {
	    // Parse options
	    const order = ctx.options[0] || 'asc';
	    const options = ctx.options[1];
	    const insensitive = (options && options.caseSensitive) === false;
	    const natural = Boolean(options && options.natural);
	    const isValidOrder =
	      isValidOrders[order + (insensitive ? 'I' : '') + (natural ? 'N' : '')];
	    const minKeys = Number(options && options.minKeys) || 2;
	    // The stack to save the previous property's name for each object literals
	    let stack = null;
	    // Shared SpreadElement for ExperimentalSpreadProperty
	    const SpreadElement = node => {
	      if (node.parent.type === 'ObjectExpression') {
	        stack.prevName = null;
	      }
	    };
	    return {
	      ExperimentalSpreadProperty: SpreadElement,
	      SpreadElement,

	      ObjectExpression() {
	        stack = {
	          upper: stack,
	          prevName: null,
	          prevNode: null,
	        };
	      },
	      'ObjectExpression:exit'() {
	        stack = stack.upper;
	      },

	      Property(node) {
	        if (node.parent.type === 'ObjectPattern') {
	          return
	        }
	        if (node.parent.properties.length < minKeys) {
	          return
	        }

	        const prevName = stack.prevName;
	        const prevNode = stack.prevNode;
	        const thisName = getPropertyName(node);

	        if (thisName !== null) {
	          stack.prevName = thisName;
	          stack.prevNode = node || prevNode;
	        }

	        if (prevName === null || thisName === null) {
	          return
	        }

	        if (!isValidOrder(prevName, thisName)) {
	          ctx.report({
	            node,
	            loc: node.key.loc,
	            messageId: 'sortKeys',
	            data: {
	              thisName,
	              prevName,
	              order,
	              insensitive: insensitive ? 'insensitive ' : '',
	              natural: natural ? 'natural ' : '',
	            },
	            fix(fixer) {
	              // Check if already sorted
	              if (
	                node.parent.__alreadySorted ||
	                node.parent.properties.__alreadySorted
	              ) {
	                return []
	              }
	              node.parent.__alreadySorted = true;
	              node.parent.properties.__alreadySorted = true;
	              //
	              const src = ctx.getSourceCode();
	              const props = node.parent.properties;
	              // Split into parts on each spread operator (empty key)
	              const parts = [];
	              let part = [];
	              props.forEach(p => {
	                if (!p.key) {
	                  parts.push(part);
	                  part = [];
	                } else {
	                  part.push(p);
	                }
	              });
	              parts.push(part);
	              // Sort all parts
	              parts.forEach(part => {
	                part.sort((p1, p2) => {
	                  const n1 = getPropertyName(p1);
	                  const n2 = getPropertyName(p2);
	                  if (insensitive && n1.toLowerCase() === n2.toLowerCase()) {
	                    return 0
	                  }
	                  return isValidOrder(n1, n2) ? -1 : 1
	                });
	              });
	              // Perform fixes
	              const fixes = [];
	              let newIndex = 0;
	              parts.forEach(part => {
	                part.forEach(p => {
	                  moveProperty(p, props[newIndex], fixer, src).forEach(f =>
	                    fixes.push(f),
	                  );
	                  newIndex++;
	                });
	                newIndex++;
	              });
	              return fixes
	            },
	          });
	        }
	      },
	    }
	  },
	};

	const moveProperty = (thisNode, toNode, fixer, src) => {
	  if (thisNode === toNode) {
	    return []
	  }
	  const fixes = [];
	  // Move property
	  fixes.push(fixer.replaceText(toNode, src.getText(thisNode)));
	  // Move comments on top of this property, but do not move comments
	  //    on the same line with the previous property
	  const prev = findTokenPrevLine(thisNode, src);
	  const cond = c => !prev || prev.loc.end.line !== c.loc.start.line;
	  const commentsBefore = src.getCommentsBefore(thisNode).filter(cond);
	  if (commentsBefore.length) {
	    const prevComments = src.getCommentsBefore(thisNode).filter(c => !cond(c));
	    const b = prevComments.length
	      ? prevComments[prevComments.length - 1].range[1]
	      : prev
	      ? prev.range[1]
	      : commentsBefore[0].range[0];
	    const e = commentsBefore[commentsBefore.length - 1].range[1];
	    fixes.push(fixer.replaceTextRange([b, e], ''));
	    const toPrev = src.getTokenBefore(toNode, { includeComments: true });
	    const txt = src.text.substring(b, e);
	    fixes.push(fixer.insertTextAfter(toPrev, txt));
	  }
	  // Move comments on the same line with this property
	  const next = findCommaSameLine(thisNode, src) || thisNode;
	  const commentsAfter = src
	    .getCommentsAfter(next)
	    .filter(c => thisNode.loc.end.line === c.loc.start.line);
	  if (commentsAfter.length) {
	    const b = next.range[1];
	    const e = commentsAfter[commentsAfter.length - 1].range[1];
	    fixes.push(fixer.replaceTextRange([b, e], ''));
	    const toNext = findCommaSameLine(toNode, src) || toNode;
	    const txt = src.text.substring(b, e);
	    fixes.push(fixer.insertTextAfter(toNext, txt));
	  }
	  return fixes
	};
	const findTokenPrevLine = (node, src) => {
	  let t = src.getTokenBefore(node);
	  while (true) {
	    if (!t || t.range[0] < node.parent.range[0]) {
	      return null
	    }
	    if (t.loc.end.line < node.loc.start.line) {
	      return t
	    }
	    t = src.getTokenBefore(t);
	  }
	};
	const findCommaSameLine = (node, src) => {
	  const t = src.getTokenAfter(node);
	  return t && t.value === ',' && node.loc.end.line === t.loc.start.line
	    ? t
	    : null
	};

	const isValidOrders = {
	  asc: (a, b) => a <= b,
	  ascI: (a, b) => a.toLowerCase() <= b.toLowerCase(),
	  ascN: (a, b) => naturalCompare(a, b) <= 0,
	  ascIN: (a, b) => naturalCompare(a.toLowerCase(), b.toLowerCase()) <= 0,
	  desc: (a, b) => isValidOrders.asc(b, a),
	  descI: (a, b) => isValidOrders.ascI(b, a),
	  descN: (a, b) => isValidOrders.ascN(b, a),
	  descIN: (a, b) => isValidOrders.ascIN(b, a),
	};

	const getPropertyName = node => {
	  let prop;
	  switch (node && node.type) {
	    case 'Property':
	    case 'MethodDefinition':
	      prop = node.key;
	      break
	    case 'MemberExpression':
	      prop = node.property;
	      break
	  }
	  switch (prop && prop.type) {
	    case 'Literal':
	      return String(prop.value)
	    case 'TemplateLiteral':
	      if (prop.expressions.length === 0 && prop.quasis.length === 1) {
	        return prop.quasis[0].value.cooked
	      }
	      break
	    case 'Identifier':
	      if (!node.computed) {
	        return prop.name
	      }
	      break
	  }
	  return (node.key && node.key.name) || null
	};
	return sortKeysFix;
}

var hasRequiredEslintPluginSortKeys;

function requireEslintPluginSortKeys () {
	if (hasRequiredEslintPluginSortKeys) return eslintPluginSortKeys;
	hasRequiredEslintPluginSortKeys = 1;
	eslintPluginSortKeys.rules = {
	  'sort-keys-fix': requireSortKeysFix(),
	};
	return eslintPluginSortKeys;
}

var eslintPluginSortKeysExports = requireEslintPluginSortKeys();
var sortKeys = /*@__PURE__*/getDefaultExportFromCjs(eslintPluginSortKeysExports);

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

var index = tseslint.config(
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
      // We need to disable this here because otherwise it's impossible to prevent the linter from auto-fixing and removing the disable directives, even when we want to keep them.
      reportUnusedDisableDirectives: 0,
    },

    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
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

      // Disable the default sort-keys rule so we can use our fixable rule
      'sort-keys': OFF,

      'sort-keys/sort-keys-fix': WARN,
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

      '@typescript-eslint/no-unused-expressions': NO_UNUSED_EXPRESSIONS_CONFIG,

      '@typescript-eslint/no-unused-vars': NO_UNUSED_VARS_CONFIG,

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

module.exports = index;
