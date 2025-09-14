# Copilot Instructions for TypeScriptWebWeb-Crawler-

## Project Overview

- This is a TypeScript-based web crawler/scraper project, started from scratch.
- All source code is in the `src/` directory. Key files:
  - `crawl.ts`: Core crawling/URL normalization logic
  - `crawl.test.ts`: Tests for crawling logic (uses Vitest)
  - `index.ts`: Entry point (currently a placeholder)

## Architecture & Patterns

- Functions are exported from modules (e.g., `normalizeURL` in `crawl.ts`).
- Use ESNext modules and strict TypeScript settings (see `tsconfig.json`).
- No framework or external HTTP libraries are present yet; crawling logic is custom.
- Project is structured for easy extension: add new crawler logic in `src/` and test in `crawl.test.ts`.

## Developer Workflows

- **Install dependencies:** `npm install`
- **Run the app:** `npm start` (runs `src/index.ts` with tsx)
- **Run tests:** `npm test` (runs all tests with Vitest)
- **Node version:** Use Node.js 22.15.0 (see `.nvmrc`)

## Conventions

- All code is TypeScript, using ES modules (`type: module` in `package.json`).
- Tests are colocated in `src/` and use Vitest (`import { test, expect } from 'vitest'`).
- Prefer functional, stateless modules for crawling logic.
- Error handling: throw descriptive errors for invalid input (see `normalizeURL`).

## Examples

- To add a new crawler function, export it from a new file in `src/` and write corresponding tests in `crawl.test.ts`.
- To normalize a URL, use `normalizeURL(url: string): string` (see `crawl.ts`).

## External Integrations

- No external APIs or databases are integrated yet.
- No custom build steps; all scripts are in `package.json`.

## References

- See `package.json` for scripts and dependencies.
- See `tsconfig.json` for TypeScript configuration.
- See `README.md` for a brief project description.

---

If you add new features or patterns, update this file to help future AI agents and developers stay productive.
