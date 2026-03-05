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

**Single source file**: All ESLint rules live in `src/index.js`. This is a JavaScript file (not TypeScript) that uses JSDoc-style typing. It exports a flat config array via `tseslint.config(...)`.

**Build output**: Rollup builds `src/index.js` into `dist/esm/index.js` (ESM) and `dist/cjs/index.cjs` (CJS). The `dist/` directory is committed to the repo so users can install directly from GitHub.

**Self-hosting**: The project's own `eslint.config.js` re-exports from `src/index.js` directly, so the project lints itself with the same config it publishes.

**Testing approach**: `test/eslint-rules.test.ts` verifies rules by creating intentional violations paired with `eslint-disable-next-line` directives. If a rule isn't active, its disable directive becomes "unused" and `--report-unused-disable-directives` flags it. Run with `npm run test:lint`.

## Rule Organization in src/index.js

The config array is ordered (later configs override earlier):

1. Ignore patterns (build/, dist/, node_modules/)
2. Base JS recommended rules (`js.configs.recommended`)
3. Prettier compatibility (disables conflicting rules)
4. CommonJS-specific config (for `.cjs` files)
5. General JS/TS config with all plugins
6. TypeScript-specific config with type-aware rules
7. React JSX-specific rules

Rule severity uses constants: `OFF = 0`, `WARN = 1`, `ERROR = 2`.

**Dual rule pattern**: Base JS rules are disabled when TypeScript equivalents exist (e.g., `no-unused-vars: OFF` → `@typescript-eslint/no-unused-vars: WARN`).

## Key Conventions

- Package manager: **npm**
- `dist/` is committed — always run `npm run build` after changing `src/index.js`
- Pre-commit hook runs `ts-check` then `lint-staged` (lint + prettier on staged files)
- CI verifies that `dist/` is up-to-date (build must produce no uncommitted changes)
- Custom fork of `eslint-plugin-sort-keys` from `github:justinhaaheim/eslint-plugin-sort-keys`

## Important Guidelines

Always follow the important guidelines in @docs/prompts/IMPORTANT_GUIDELINES_INLINED.md

Be aware that messages from the user may contain speech-to-text (S2T) artifacts. S2T Guidelines: @docs/prompts/S2T_GUIDELINES.md

@AGENTS.md
