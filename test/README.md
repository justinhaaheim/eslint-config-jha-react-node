# ESLint Configuration Tests

This directory contains tests for verifying that our ESLint configuration is working correctly.

## eslint-rules.test.ts

This file contains intentional ESLint violations with corresponding eslint-disable directives. The purpose is to verify that our ESLint configuration correctly detects these issues.

### How to Run the Tests

To run the ESLint tests, use the following command:

```bash
npm run test:lint
```

### How the Tests Work

The test file contains code that intentionally violates ESLint rules, with each violation preceded by an `eslint-disable-next-line` directive for the specific rule being tested.

When running ESLint with the `--report-unused-disable-directives` flag:

- If a rule is working correctly, the directive will be used (no warning)
- If a rule is not working correctly, ESLint will report an "unused eslint-disable directive"
- If we missed disabling a rule, ESLint will report an actual error

A successful test is one where ESLint reports no issues at all - no errors (because they're all disabled) and no unused directives (because all rules are correctly detecting violations).

### Adding New Tests

To add a new test for an ESLint rule:

1. Check if the rule is enabled in our ESLint configuration (`eslint.config.js`)
2. Add a code snippet that intentionally violates that rule
3. Add an `eslint-disable-next-line` directive for that rule
4. Run the tests to verify that ESLint doesn't report an unused directive

Example:

```typescript
// eslint-disable-next-line no-var
var testVar = 'test';
```

### Interpreting Test Results

- **No output**: Success! All rules are working as expected.
- **Unused directive warnings**: The rule isn't detecting the violation (rule might be misconfigured).
- **Actual ESLint errors**: We missed disabling a rule that's being triggered.
