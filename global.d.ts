// Global type declarations for modules without @types packages

declare module 'confusing-browser-globals' {
  const restrictedGlobals: string[];
  export default restrictedGlobals;
}

declare module 'eslint-plugin-import' {
  import type {ESLint} from 'eslint';
  const plugin: ESLint.Plugin;
  export default plugin;
}

declare module 'eslint-plugin-sort-keys-fix' {
  import type {ESLint} from 'eslint';
  const plugin: ESLint.Plugin;
  export default plugin;
}

declare module 'eslint-plugin-typescript-sort-keys' {
  import type {ESLint} from 'eslint';
  const plugin: ESLint.Plugin;
  export default plugin;
}
