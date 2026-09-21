

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@chromatic-com/storybook"
  ],
  "framework": "@storybook/nextjs",
  "staticDirs": [
    "..\\public"
  ]
};
export default config;