import path from 'path';

const config = {
  stories: [
    '../story/**/*.mdx',
    '../story/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async webpackFinal(config) {
    // 匹配tsconfig中路径别名
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = path.join(__dirname, '../src');
    // 删除tsx?规则
    const rules = config.module?.rules?.filter(
      (rule) =>
        !rule?.test?.toString().includes('.ts$') &&
        !rule?.test?.toString().includes('.tsx$'),
    );
    config.module.rules = rules;

    const jsRule = config.module?.rules?.find((rule) => {
      return rule?.test?.toString().includes('.(mjs|jsx?)$');
    });
    // tsx?文件都用js规则
    jsRule.test = /\.m?(j|t)sx?$/;

    // less规则
    config.module.rules.push(
      ...[
        {
          test: /\.less$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {},
              },
            },
          ],
        },
      ],
    );

    // yaml
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });

    return config;
  },
};

export default config;
