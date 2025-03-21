import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

const external = [
  '@eslint/js',
  'confusing-browser-globals',
  'eslint-config-prettier',
  'eslint-plugin-import',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-react-refresh',
  'eslint-plugin-simple-import-sort',
  'eslint-plugin-sort-keys-fix',
  'eslint-plugin-typescript-sort-keys',
  'globals',
  'typescript-eslint',
];

export default [
  // ESM build
  {
    external,
    input: 'src/index.js',
    output: {
      exports: 'default',
      file: 'dist/esm/index.js',
      format: 'esm',
    },
    plugins: [nodeResolve(), commonjs()],
  },
  // CJS build
  {
    external,
    input: 'src/index.js',
    output: {
      exports: 'default',
      file: 'dist/cjs/index.cjs',
      format: 'cjs',
    },
    plugins: [nodeResolve(), commonjs()],
  },
];
