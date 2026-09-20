<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz">
    <img src="https://github.com/upskiller-xyz/DaylightFactor/blob/main/docs/images/logo_upskiller.png" alt="Logo" height="100" >
  </a>

  <h3 align="center">IFC Daylight Factor — Documentation</h3>

  <p align="center">
    User documentation for the free, browser-based IFC Daylight Factor tool
    <br />
    <a href="https://dfifc-docs.upskiller.xyz"><strong>Read the docs »</strong></a>
    <br />
    <br />
    <a href="https://dfifc.upskiller.xyz">Open the tool</a>
    ·
    <a href="https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/issues">Report Bug</a>
    ·
    <a href="https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a>
        <li><a href="#writing-a-page">Writing a page</a></li>
        <li><a href="#deployment">Deployment</a>
          <li><a href="#locally">Local deployment</a></li>
        </li>
    </li>
    <li><a href="#design">Design</a>
      <li><a href="#architecture">Architecture</a></li>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribution">Contribution</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#trademark-notice">Trademark notice</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This repository is the documentation website for **IFC Daylight Factor**, a free browser-based tool that predicts the daylight factor for rooms in an IFC model and checks them against the Swedish daylight regulation (BFS 2024:8).

It is a **separate Docusaurus site** from the LUX plugin docs ([`docs.upskiller.xyz`](https://github.com/upskiller-xyz/docs.upskiller.xyz)), sharing the same theme and brand styling but with its own navigation, footer and legal pages.

The docs have their own hostname, **`dfifc-docs.upskiller.xyz`**, and are served from its root (`baseUrl: '/'`). The tool itself lives on **`dfifc.upskiller.xyz`** and links across.

- Tool frontend: [`web-daylight-tool`](https://github.com/upskiller-xyz/web-daylight-tool)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [Docusaurus 3](https://docusaurus.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Vitest](https://vitest.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- npm (bundled with Node.js)

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz.git
   cd ifc-docs.upskiller.xyz
   ```

2. Install dependencies (this also installs the Husky hooks):

   ```sh
   npm install
   ```

3. Run the dev server:

   ```sh
   npm start
   ```

   The site will start on `http://localhost:3000/`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Writing a page

1. Add a Markdown file under [`docs/`](docs/) — one page, one topic.
2. Give it a title, either as `title:` in the frontmatter or a single top-level heading.
3. Register it in [`sidebars.ts`](sidebars.ts), or the page is unreachable from the navigation.
4. Link to other pages with root-relative paths (`/ifc-daylight-factor/results`).

The checks below enforce points 2 and 3, so a page that is missing a title or a sidebar entry fails the build rather than shipping silently.

### Checks

```sh
npm run typecheck    # tsc
npm run lint         # eslint
npm run format       # prettier --write .   (format:check in CI)
npm test             # vitest — sidebar and doc-structure checks
npm run build        # docusaurus build; onBrokenLinks: 'throw'
```

Husky runs `prettier` on staged files at commit time, and `typecheck` + `test` before push. CI runs all of the above on every push and pull request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Deployment

#### Local Development

1. **Clone the Repository**

   ```bash
   git clone https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz.git
   cd ifc-docs.upskiller.xyz
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Dev Server**

   ```bash
   npm start
   ```

   The site will start on `http://localhost:3000/`.

#### Docker — Static Build Served by nginx

The production image builds the Docusaurus site and serves the static output with nginx:

1. **Prerequisites**
   - [Docker](https://docs.docker.com/get-docker/)

2. **Build the Image**

   ```bash
   docker build -t ifc-docs .
   ```

3. **Run the Container**

   ```bash
   docker run -p 8080:8080 ifc-docs
   ```

4. **Open the Docs**

   ```bash
   # http://localhost:8080
   ```

**Build Steps:**
The Dockerfile runs `npm run build` (which fails on any broken internal link) and copies the static `build/` output into an nginx image. There is no server-side runtime.

#### Production Deployment (Scaleway Serverless Containers)

Every push to `master` builds the image, pushes it to the Scaleway Container Registry and points the Serverless Container at the new tag — see [`.github/workflows/deploy-scaleway.yml`](.github/workflows/deploy-scaleway.yml).

The one-time Scaleway setup (registry, container, IAM key, GitHub secrets) and the steps for attaching `dfifc-docs.upskiller.xyz` are written up in [DEPLOYMENT.md](./DEPLOYMENT.md).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#### Locally (Preview Build)

Serve the production build locally to sanity-check the generated output:

1. **Build**

   ```bash
   npm run build
   ```

2. **Preview**

   ```bash
   npm run serve
   ```

   Docusaurus serves the built `build/` output for a final check before deployment.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DESIGN -->

## Design

### Architecture

A static Docusaurus site: content in `docs/`, navigation in `sidebars.ts`, brand styling in `src/css/`, and a nginx image for serving it.

| Path                       | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| `docs/`                    | The documentation pages                                  |
| `sidebars.ts`              | Navigation tree — a page must be listed here to be found |
| `docusaurus.config.ts`     | Site config: domain, navbar, footer, theme               |
| `src/pages/`               | Standalone pages — the root redirect, Terms, Privacy     |
| `src/css/`                 | Brand styling, shared with `docs.upskiller.xyz`          |
| `tests/`                   | Vitest checks over the sidebar and page structure        |
| `Dockerfile`, `nginx.conf` | Production image                                         |

Fonts and images are served from Scaleway object storage, not from this repo — `static/img/` and `static/fonts/` are git-ignored.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTION -->

## Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Documentation Guidelines:**

- Concise, no marketing language, active voice
- Explain by sketch — a diagram before a wall of text
- One topic per page, and every page listed in `sidebars.ts`
- Root-relative internal links, so they survive a page move

Before opening a PR, make sure the checks pass:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

### Top contributors:

<a href="https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=upskiller-xyz/ifc-docs.upskiller.xyz" alt="Top Contributors" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE.md](./LICENSE.md) for more details — or [read a summary](https://choosealicense.com/licenses/mit/).

In short:

Permissive. You **can** use, distribute and modify this code in both academic and commercial contexts. You **have to** keep the copyright notice and the license text with the code and give the appropriate [attribution](#trademark-notice) to the authors.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Trademark Notice

- **"Upskiller"** is an informal collaborative name used by contributors affiliated with BIMTech Innovations AB.
- BIMTech Innovations AB owns all legal rights to the **IFC Daylight Factor** project.
- The MIT license applies to code, not branding. Commercial use of the names requires permission.

Contact: [Upskiller](mailto:info@upskiller.xyz)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Stanislava Fedorova - [e-mail](mailto:stasya.fedorova@gmail.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [README template](https://github.com/othneildrew/Best-README-Template)
- [Docusaurus](https://docusaurus.io/) - documentation framework
- [Belysningsstiftelsen](https://belysningsstiftelsen.se)
- [Almi](https://almi.se)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/upskiller-xyz/ifc-docs.upskiller.xyz.svg?style=for-the-badge
[contributors-url]: https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/upskiller-xyz/ifc-docs.upskiller.xyz.svg?style=for-the-badge
[forks-url]: https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/network/members
[stars-shield]: https://img.shields.io/github/stars/upskiller-xyz/ifc-docs.upskiller.xyz.svg?style=for-the-badge
[stars-url]: https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/stargazers
[issues-shield]: https://img.shields.io/github/issues/upskiller-xyz/ifc-docs.upskiller.xyz.svg?style=for-the-badge
[issues-url]: https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/issues
[license-shield]: https://img.shields.io/github/license/upskiller-xyz/ifc-docs.upskiller.xyz.svg?style=for-the-badge
[license-url]: https://github.com/upskiller-xyz/ifc-docs.upskiller.xyz/blob/master/LICENSE.md
