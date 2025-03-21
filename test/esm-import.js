// Sample ESM import test file
import jhaConfig from '../dist/esm/index.js';

console.log('Successfully imported the ESLint config in ESM format');
console.log(`Configuration contains ${Object.keys(jhaConfig).length} rules`);

export default jhaConfig;
