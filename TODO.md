# TODO

## Setup

- Confirm the final repo name with Stasja (placeholder: `ifc-docs.upskiller.xyz`).
- Confirm the final docs domain with Libny, then set `url` in `docusaurus.config.ts`.
- Confirm the tool domain (placeholder: `ifc.upskiller.xyz`) — used by the navbar "Open the tool" CTA and by links in the doc pages.
- Wire up deployment (Scaleway container, same pattern as `web-daylight-tool`).

## Content review — 2026-09

Align the 5 pages under `docs/ifc-daylight-factor/` with the rewritten LUX Live intro
(`docs.upskiller.xyz/docs/lux-live/intro`):

- `intro.md`: revisit the "two use cases" audience framing (municipality planners / bygglov officers) — check it still matches how the tool is positioned.
- Confirm tool-URL display text everywhere reads `ifc.upskiller.xyz` (pending domain confirmation).
- `ifc-terms.md` / `ifc-privacy.md`: body URLs still point at `docs.upskiller.xyz/ifc-terms` and `/ifc-privacy` — update to the new domain once confirmed.
- All legal pages are DRAFT v0.1 (`:::warning` admonition present).

## Housekeeping

- Review `ColorScale.tsx` and `src/theme/DocBreadcrumbs/` — carried over from the LUX docs, confirm still used.
- Run `npm run build` before each deploy — `onBrokenLinks: 'throw'`.
