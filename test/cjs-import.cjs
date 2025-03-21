// Sample CJS import test file
const jhaConfig = require('../dist/cjs/index.cjs');

console.log('Successfully imported the ESLint config in CJS format');
console.log(`Configuration contains ${Object.keys(jhaConfig).length} rules`);

module.exports = jhaConfig;
