# ESLint Configuration

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
