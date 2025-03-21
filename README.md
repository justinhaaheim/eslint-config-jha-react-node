# eslint-config-jha-react-node

My eslint flat config for React and Node.js projects with Typescript.

## Features

- Full TypeScript support
- React and React Hooks rules
- Import sorting and organization
- Accessibility (jsx-a11y) rules
- Integration with Prettier
- Modern JavaScript features (ES2020)
- Strict type checking
- Sensible defaults for React development
- Dual ESM/CJS support - works in both module systems

## Installation

```bash
# Using npm
npm install --save-dev eslint-config-jha-react-node

# Using yarn
yarn add --dev eslint-config-jha-react-node

# Using pnpm
pnpm add --save-dev eslint-config-jha-react-node
```

## Usage

This package uses ESLint's new flat config format. Create an `eslint.config.js` file in your project root:

### ESM Projects

```javascript
import jhaConfig from 'eslint-config-jha-react-node';

export default jhaConfig;
```

### CommonJS Projects

```javascript
const jhaConfig = require('eslint-config-jha-react-node');

module.exports = jhaConfig;
```

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

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

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
