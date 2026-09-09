import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'IFC Daylight Factor',
      collapsible: true,
      collapsed: false,
      link: { type: 'doc', id: 'ifc-daylight-factor/intro' },
      items: [
        'ifc-daylight-factor/model-preparation',
        'ifc-daylight-factor/getting-started',
        'ifc-daylight-factor/analysis-settings',
        'ifc-daylight-factor/running-analysis',
        'ifc-daylight-factor/results',
      ],
    },
  ],
};

export default sidebars;
