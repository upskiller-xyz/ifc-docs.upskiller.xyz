# TODO

## Setup

- Domain confirmed: `dfifc.upskiller.xyz` — tool at `/`, docs at `/docs/`.
- Confirm the final repo name with Stasja (placeholder: `ifc-docs.upskiller.xyz`).
- Wire up deployment with Libny: Scaleway container for the docs, path routing so `/docs/*` hits this site and `/` hits `web-daylight-tool`.

## Content review — 2026-09

Align the 5 pages under `docs/ifc-daylight-factor/` with the rewritten LUX Live intro
(`docs.upskiller.xyz/docs/lux-live/intro`):

- `intro.md`: revisit the "two use cases" audience framing (municipality planners / bygglov officers) — check it still matches how the tool is positioned.
- All legal pages are DRAFT v0.1 (`:::warning` admonition present).

## Housekeeping

- Review `ColorScale.tsx` and `src/theme/DocBreadcrumbs/` — carried over from the LUX docs, confirm still used.
- Run `npm run build` before each deploy — `onBrokenLinks: 'throw'`.
