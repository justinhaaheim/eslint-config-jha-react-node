# CLAUDE.md

## Project Overview

An opinionated ESLint flat configuration package (ESLint 9) for React + Node.js + TypeScript projects. Published as `eslint-config-jha-react-node` with dual ESM/CJS support.

## Commands

```bash
npm run signal          # Run all checks concurrently (ts-check, lint, prettier-check)
npm run build           # Clean dist/ and rebuild with Rollup (ESM + CJS)
npm run test:lint       # Test that ESLint rules work correctly
npm run lint            # Lint the project
npm run lint:fix        # Lint with auto-fix
npm run prettier        # Format code with Prettier
npm run ts-check        # TypeScript type checking (no emit)
```

## Architecture

**Modular source files**: The config is split into composable pieces under `src/`:

- `src/shared.js` — Shared constants (`OFF`, `WARN`, `ERROR`) and `createBaseConfig()` factory function that both `base.js` and `node.js` use. Uses JSDoc-style typing.
- `src/base.js` — Base config with **browser globals**. Calls `createBaseConfig()` with `globals.browser`.
- `src/node.js` — Base config with **Node.js globals**. Calls `createBaseConfig()` with `globals.node`.
- `src/react.js` — React, React Hooks, React Refresh, and JSX accessibility rules.
- `src/index.js` — Combined export: `[...base, ...react]`. Backward compatible default.

**Build output**: Rollup builds each source file into both `dist/esm/*.js` (ESM) and `dist/cjs/*.cjs` (CJS). The `dist/` directory is committed to the repo so users can install directly from GitHub.

**Package exports**:

- `eslint-config-jha-react-node` — Full config (base + react)
- `eslint-config-jha-react-node/base` — Browser globals, no React
- `eslint-config-jha-react-node/node` — Node.js globals, no React
- `eslint-config-jha-react-node/react` — React rules only (composable with base or node)

**Self-hosting**: The project's own `eslint.config.js` re-exports from `src/index.js` directly, so the project lints itself with the same config it publishes.

**Testing approach**: `test/eslint-rules.test.ts` verifies rules by creating intentional violations paired with `eslint-disable-next-line` directives. If a rule isn't active, its disable directive becomes "unused" and `--report-unused-disable-directives` flags it. Run with `npm run test:lint`.

## Rule Organization

The base config (`src/shared.js` via `createBaseConfig()`) is ordered (later configs override earlier):

1. Ignore patterns (build/, dist/, node_modules/)
2. Base JS recommended rules (`js.configs.recommended`)
3. Prettier compatibility (disables conflicting rules)
4. CommonJS-specific config (for `.cjs` files)
5. General JS/TS config with base plugins (import, simple-import-sort, sort-keys)
6. TypeScript-specific config with type-aware rules

The React config (`src/react.js`) adds:

7. React plugins and rules (jsx-a11y, react-hooks, react-refresh)
8. React JSX-specific rules (scoped to `*.jsx`/`*.tsx` files)

Rule severity uses constants: `OFF = 0`, `WARN = 1`, `ERROR = 2`.

**Dual rule pattern**: Base JS rules are disabled when TypeScript equivalents exist (e.g., `no-unused-vars: OFF` -> `@typescript-eslint/no-unused-vars: WARN`).

## Key Conventions

- Package manager: **npm**
- `dist/` is committed — always run `npm run build` after changing any `src/*.js` file
- Pre-commit hook runs `ts-check` then `lint-staged` (lint + prettier on staged files)
- CI verifies that `dist/` is up-to-date (build must produce no uncommitted changes)
- Custom fork of `eslint-plugin-sort-keys` from `github:justinhaaheim/eslint-plugin-sort-keys`

## Important Guidelines

Always follow the important guidelines in @docs/prompts/IMPORTANT_GUIDELINES_INLINED.md

Be aware that messages from the user may contain speech-to-text (S2T) artifacts. S2T Guidelines: @docs/prompts/S2T_GUIDELINES.md

@AGENTS.md
