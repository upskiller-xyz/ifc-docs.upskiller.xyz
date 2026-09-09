<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="static/img/lux_logo_RGB.svg" alt="Upskiller logo" width="400">

  <h3 align="center">IFC Daylight Factor — Documentation</h3>

  <p align="center">
    User documentation for the free, browser-based IFC Daylight Factor tool
    <br />
    <br />
    <a href="https://ifc.upskiller.xyz">Open the tool</a>
    ·
    <a href="https://github.com/upskiller-xyz/web-daylight-tool">Tool repository</a>
  </p>
</div>

## About

This repository contains the documentation website for **IFC Daylight Factor**, a free browser-based tool that predicts the Daylight Factor for rooms in an IFC model and checks them against the Swedish daylight regulation (BFS 2024:8).

It is a **separate Docusaurus site** from the LUX plugin docs (`docs.upskiller.xyz`), sharing the same theme and brand styling but with its own navigation, footer and legal pages.

The tool and these docs share one domain: the web tool is served at the root of **`dfifc.upskiller.xyz`**, and the docs under **`dfifc.upskiller.xyz/docs/`** (`baseUrl: '/docs/'`). Path routing between the two apps is handled by the deployment, not this repo.

- Tool frontend: [`web-daylight-tool`](https://github.com/upskiller-xyz/web-daylight-tool) — served at `dfifc.upskiller.xyz/`
- LUX plugin docs: [`docs.upskiller.xyz`](https://github.com/upskiller-xyz/docs.upskiller.xyz)

> **Repo name is a placeholder** (`ifc-docs.upskiller.xyz`) pending Stasja's confirmation. Deployment (Scaleway container, same pattern as `web-daylight-tool`) still to be wired up with Libny.

## Local development

```bash
npm install
npm start          # http://localhost:3000
npm run build      # static output in build/ ; onBrokenLinks: 'throw'
npm run serve      # serve the production build locally
```

Node.js 20 or later.

## Project structure

```
ifc-docs.upskiller.xyz/
├── docs/
│   └── ifc-daylight-factor/   # the 5 guide pages
├── src/
│   ├── css/                   # brand styling (copied from docs.upskiller.xyz)
│   └── pages/
│       ├── index.tsx          # redirects / → /docs/ifc-daylight-factor/intro
│       ├── ifc-terms.md       # Terms of Use (served at /ifc-terms)
│       └── ifc-privacy.md     # Privacy Policy (served at /ifc-privacy)
├── docusaurus.config.ts
├── sidebars.ts
└── CLAUDE.md                  # documentation style guide
```

## Documentation style

See [CLAUDE.md](./CLAUDE.md). Concise, no marketing language, active voice, explain by sketch.

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
