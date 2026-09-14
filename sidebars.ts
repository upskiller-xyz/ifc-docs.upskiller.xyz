import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'Usage',
      collapsible: true,
      collapsed: false,
      link: { type: 'doc', id: 'ifc-daylight-factor/usage' },
      items: [
        'ifc-daylight-factor/intro',
        'ifc-daylight-factor/model-preparation',
        'ifc-daylight-factor/getting-started',
        'ifc-daylight-factor/analysis-settings',
        'ifc-daylight-factor/running-analysis',
        'ifc-daylight-factor/checking-inputs',
        'ifc-daylight-factor/results',
      ],
    },
    {
      type: 'category',
      label: 'Methodology',
      collapsible: true,
      collapsed: true,
      link: { type: 'doc', id: 'ifc-daylight-factor/methodology/intro' },
      items: [
        {
          type: 'category',
          label: 'How it works',
          collapsible: true,
          collapsed: true,
          link: { type: 'doc', id: 'ifc-daylight-factor/methodology/how-it-works' },
          items: [],
        },
        {
          type: 'category',
          label: 'Inputs',
          collapsible: true,
          collapsed: true,
          link: { type: 'generated-index', title: 'IFC Daylight Factor — Inputs' },
          items: [
            'ifc-daylight-factor/methodology/simulation-modes',
            'ifc-daylight-factor/methodology/parameters',
            'ifc-daylight-factor/methodology/obstruction-encoding',
          ],
        },
        {
          type: 'category',
          label: 'Performance',
          collapsible: true,
          collapsed: true,
          link: { type: 'generated-index', title: 'IFC Daylight Factor — Performance' },
          items: [
            'ifc-daylight-factor/methodology/accuracy-and-validation',
            'ifc-daylight-factor/methodology/comparison-with-other-methods',
            'ifc-daylight-factor/methodology/limitations-and-scope',
            'ifc-daylight-factor/methodology/quality-control',
          ],
        },
        'ifc-daylight-factor/methodology/research-and-publications',
      ],
    },
    {
      type: 'category',
      label: 'API',
      collapsible: true,
      collapsed: true,
      link: { type: 'doc', id: 'api/overview' },
      items: [
        'api/intro',
        'api/lux-api',
        'api/api-reference',
        'api/base-url',
        'api/authentication',
        'api/response-format',
        'api/api_version',
        'api/docker-setup',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      collapsible: true,
      collapsed: true,
      link: { type: 'doc', id: 'contributing/intro' },
      items: [
        'contributing/project-structure',
        'contributing/servers',
        'contributing/microservices',
        'contributing/parameters-reference',
        'contributing/coordinate-system',
        'contributing/encoding-system',
        'contributing/building-images',
        'contributing/templates',
      ],
    },
    'about/intro',
  ],
};

export default sidebars;
