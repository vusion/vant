import { Preview } from "@storybook/vue";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// 载入组件库基础样式
import '../src/style/base.less'

/* 引入cloud-ui theme */
require('cloud-ui.vusion/src/styles/theme.css');
/* 引入cloud-ui typography */
require('cloud-ui.vusion/src/styles/typography.css');
/* 引入cloud-ui animation */
require('cloud-ui.vusion/src/styles/animation.css');

const preview: Preview = {
  decorators: [],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
  },
  globalTypes: {},
};

export default preview;
