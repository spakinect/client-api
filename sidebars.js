// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // This defines the sidebar for your docs section
  tutorialSidebar: [
    'intro',
    // 'webhooks',
    {
      // This is a simple link to the API docs page
      type: "link",
      label: "API Reference",
      // The href must match the 'route' you defined in docusaurus.config.js
      href: "/docs",
    },
  ],
};

export default sidebars;
