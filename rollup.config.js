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
  'eslint-plugin-sort-keys',
  'eslint-plugin-typescript-sort-keys',
  'globals',
  'typescript-eslint',
];

const plugins = [nodeResolve(), commonjs()];

/** @param {string} name */
function buildEntry(name) {
  return [
    {
      external,
      input: `src/${name}.js`,
      output: {
        exports: 'default',
        file: `dist/esm/${name}.js`,
        format: 'esm',
      },
      plugins,
    },
    {
      external,
      input: `src/${name}.js`,
      output: {
        exports: 'default',
        file: `dist/cjs/${name}.cjs`,
        format: 'cjs',
      },
      plugins,
    },
  ];
}

export default [
  ...buildEntry('index'),
  ...buildEntry('base'),
  ...buildEntry('node'),
  ...buildEntry('react'),
];
