/**
 * ESLint Rules Test File
 *
 * This file contains intentional ESLint violations with corresponding
 * eslint-disable directives to test that our ESLint configuration is
 * correctly detecting these issues.
 *
 * If the ESLint configuration is working correctly, running ESLint with
 * --report-unused-disable-directives should not report any unused directives
 * and should not report any actual errors (since they're all disabled).
 *
 * - If ESLint reports actual errors, it means we missed disabling a rule
 * - If ESLint reports unused disable directives, it means the rule isn't working
 */

// ==================== JavaScript Rules ====================

// eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
var testVar = 'test';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
('unused expression');

// This should NOT trigger no-console (rule is OFF in config)
console.log('This should be allowed since no-console is OFF');

// eslint-disable-next-line no-debugger
debugger;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unusedVariable = 'This variable is never used';

// eslint-disable-next-line no-warning-comments
// nocommit this is a warning comment with a forbidden term

// ==================== TypeScript Rules ====================

// eslint-disable-next-line @typescript-eslint/no-inferrable-types, @typescript-eslint/no-unused-vars
const str: string = 'hello';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

// This should be allowed (has description)
// @ts-ignore This has a description so it should be allowed

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testFunction(unusedParam: string) {
  return 'test';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function noReturnAwait(): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/return-await
  return Promise.resolve('test'); // Should be: return await Promise.resolve('test');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TestInterface {
  zebra: string;
  // eslint-disable-next-line typescript-sort-keys/interface
  alpha: number;
  beta: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unused-vars
const element = document.getElementById('test')!;

// ==================== Import Rules ====================

// These imports should be sorted but are intentionally out of order
// eslint-disable-next-line simple-import-sort/imports, import/first, import/no-duplicates
import {isObject} from './utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/first
import type {Something} from './utils';
// eslint-disable-next-line import/first, import/no-duplicates
import {isArray} from './utils';

// These exports should be sorted but are intentionally out of order
// eslint-disable-next-line simple-import-sort/exports
export {testFunction, isArray};
export {isObject};

// ==================== Sort Keys Rules ====================

/* eslint-disable sort-keys/sort-keys-fix */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unsortedObject = {
  // This should be unsorted:
  // zebra: 1,
  // alpha: 2,
  // beta: 3,
  // gamma: 4,
  zebra: 1,
  alpha: 2,
  beta: 3,
  gamma: 4,
};
/* eslint-enable sort-keys/sort-keys-fix */
