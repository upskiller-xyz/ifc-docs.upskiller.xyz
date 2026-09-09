import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'IFC Daylight Factor Docs',
  tagline: 'Free browser-based daylight factor analysis for IFC models',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // TODO: confirm final domain with Stasja / Libny (placeholder for now)
  url: 'https://ifc-docs.upskiller.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  organizationName: 'upskiller-xyz',
  projectName: 'ifc-docs.upskiller.xyz',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Upskiller Logo',
        src: 'img/lux_logo_RGB.svg',
      },
      items: [
        {
          href: 'https://ifc.upskiller.xyz',
          label: 'Open the tool',
          position: 'right',
          className: 'navbar-cta-button',
        },
        {
          href: 'mailto:alejandro.pacheco@upskiller.xyz?subject=IFC%20Daylight%20Factor%20Docs%20bug%20report',
          label: 'Report a bug',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `<a href="/ifc-terms">Terms of Use</a> · <a href="/ifc-privacy">Privacy Policy</a> · Copyright © ${new Date().getFullYear()} <a href="https://upskiller.xyz" target="_blank">BIMTech Innovations AB</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
