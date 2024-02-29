import type { StorybookConfig } from '@storybook/react-webpack5'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(mjs|ts|tsx)'],
  addons: ['@storybook/preset-create-react-app'],
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
}
export default config
