# eslint-config-jha-react-node

A comprehensive ESLint configuration for React and Node.js projects with TypeScript support. This configuration includes best practices for React development, TypeScript, and modern JavaScript features.

## Features

- Full TypeScript support
- React and React Hooks rules
- Import sorting and organization
- Accessibility (jsx-a11y) rules
- Integration with Prettier
- Modern JavaScript features (ES2020)
- Strict type checking
- Sensible defaults for React development

## Installation

```bash
# Using npm
npm install --save-dev eslint-config-jha-react-node eslint typescript

# Using yarn
yarn add --dev eslint-config-jha-react-node eslint typescript

# Using pnpm
pnpm add --save-dev eslint-config-jha-react-node eslint typescript
```

## Usage

This package uses ESLint's new flat config format. Create an `eslint.config.js` file in your project root:

```javascript
import jhaConfig from 'eslint-config-jha-react-node';

export default jhaConfig;
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

## Requirements

- Node.js >= 20.x
- npm >= 9
- ESLint 9.x
- TypeScript 5.x

## What's Included

This configuration includes rules and plugins for:

- React and React Hooks
- TypeScript
- Import sorting and organization
- JSX accessibility
- Prettier integration
- Modern JavaScript features
- Key sorting
- And more!

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ESLint Configuration

This project uses ESLint's new flat config format. The configuration is in `eslint.config.js` at the root of the project.

To run the linter:

```bash
npm run lint
```

To automatically fix issues:

```bash
npm run lint:fix
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

## TypeScript Configuration

This project uses TypeScript for type checking. The configuration is in `tsconfig.json` at the root of the project
