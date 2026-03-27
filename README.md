# eslint-config-jha-react-node

My eslint flat config for React and Node.js projects with Typescript.

## Features

- Full TypeScript support with type-aware rules
- React, React Hooks, and React Refresh rules
- Import sorting and organization
- Accessibility (jsx-a11y) rules
- Integration with Prettier
- Modern JavaScript features (ES2020)
- Strict type checking (`strict-boolean-expressions`, `consistent-type-imports`, etc.)
- Dual ESM/CJS support - works in both module systems
- **Modular**: use the full config, or import just the base/node/react pieces you need

## Installation

```bash
# Using npm
npm install --save-dev eslint-config-jha-react-node

# Using yarn
yarn add --dev eslint-config-jha-react-node

# Using pnpm
pnpm add --save-dev eslint-config-jha-react-node
```

### Handling Peer Dependency Conflicts

If you encounter peer dependency warnings or errors when installing, some transitive dependencies may not yet declare support for your ESLint version. To resolve:

1. Use the `--legacy-peer-deps` flag when installing:

   ```bash
   npm install --save-dev eslint-config-jha-react-node --legacy-peer-deps
   ```

2. For Yarn users, add resolutions to your package.json:

   ```json
   "resolutions": {
     "eslint-plugin-typescript-sort-keys/eslint": "^9.0.0",
     "@typescript-eslint/utils/eslint": "^9.0.0"
   }
   ```

3. For pnpm users, use overrides:
   ```json
   "pnpm": {
     "overrides": {
       "eslint-plugin-typescript-sort-keys@3.3.0": {
         "eslint": "^9.0.0"
       }
     }
   }
   ```

Note that despite these warnings, the package works correctly with ESLint 9.

## Usage

This package uses ESLint's flat config format. Create an `eslint.config.js` file in your project root.

### Full Config (React + TypeScript + Node)

The default export includes everything: base rules, TypeScript, and React.

```javascript
// ESM
import jhaConfig from 'eslint-config-jha-react-node';

export default [...jhaConfig];
```

```javascript
// CommonJS
const jhaConfig = require('eslint-config-jha-react-node');

module.exports = [...jhaConfig];
```

### Base Only (Browser, No React)

For browser projects that don't use React. Includes all base JS/TS rules with browser globals.

```javascript
import base from 'eslint-config-jha-react-node/base';

export default [...base];
```

### Node.js Only (No React, No Browser Globals)

For backend or CLI projects. Same rules as base but with Node.js globals instead of browser globals.

```javascript
import node from 'eslint-config-jha-react-node/node';

export default [...node];
```

### React Only (Add-on)

The React config can be composed with either the base or node config:

```javascript
import node from 'eslint-config-jha-react-node/node';
import react from 'eslint-config-jha-react-node/react';

export default [...node, ...react];
```

### Available Exports

| Export                               | Description                                               |
| ------------------------------------ | --------------------------------------------------------- |
| `eslint-config-jha-react-node`       | Full config: base (browser) + React. Backward compatible. |
| `eslint-config-jha-react-node/base`  | Base rules with browser globals. No React.                |
| `eslint-config-jha-react-node/node`  | Base rules with Node.js globals. No React.                |
| `eslint-config-jha-react-node/react` | React, React Hooks, JSX accessibility rules only.         |

### Customizing the Configuration

You can extend or override the configuration by spreading the imported config and adding your own rules:

```javascript
import jhaConfig from 'eslint-config-jha-react-node';

export default [
  ...jhaConfig,
  {
    rules: {
      // Your custom rules here
      'no-console': 'error',
    },
  },
];
```

## What's Included

### Base Config (`/base` and `/node`)

- **JS recommended rules** (`@eslint/js`)
- **Prettier compatibility** (disables conflicting rules)
- **Import rules** (`eslint-plugin-import`)
- **Import sorting** (`eslint-plugin-simple-import-sort`)
- **Sort keys** (fixable, via custom fork of `eslint-plugin-sort-keys`)
- **TypeScript rules** (`typescript-eslint` with type-aware checking)
- **TypeScript sort keys** (`eslint-plugin-typescript-sort-keys`)
- **Strict boolean expressions**, consistent type imports, and more

### React Config (`/react`)

- **React rules** (`eslint-plugin-react`)
- **React Hooks rules** (`eslint-plugin-react-hooks`)
- **React Refresh** (`eslint-plugin-react-refresh`)
- **JSX Accessibility** (`eslint-plugin-jsx-a11y`)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Development

This package supports both ESM and CommonJS. The source code is written in ESM but is pre-built for both module systems.

### Build Process

The project uses Rollup to build both ESM and CommonJS versions:

```bash
# Build the project
npm run build
```

This creates:

- `dist/esm/index.js`, `dist/esm/base.js`, `dist/esm/node.js`, `dist/esm/react.js` - ESM modules
- `dist/cjs/index.cjs`, `dist/cjs/base.cjs`, `dist/cjs/node.cjs`, `dist/cjs/react.cjs` - CommonJS modules

The built files are committed to the repository so that they are immediately available when installing directly from GitHub.

### Quality Checks

```bash
npm run signal        # Run all checks (ts-check, lint, prettier) concurrently
npm run test:lint     # Verify ESLint rules are active and working
npm run build         # Rebuild dist/ (always do this after changing src/)
```

## ESLint Testing

The project includes a test file to verify that the ESLint configuration is working correctly. The test file contains intentional ESLint violations with corresponding eslint-disable directives.

The purpose of these tests is to confirm that our ESLint configuration correctly detects rule violations. When running the tests with the `--report-unused-disable-directives` flag:

- If a rule is working correctly, the directive will be used (no warning)
- If a rule is not working correctly, ESLint will report an "unused eslint-disable directive"

A successful test is one where ESLint reports no issues at all.

To run the ESLint tests:

```bash
npm run test:lint
```

For more information about the ESLint tests, see the [test/README.md](test/README.md) file.
