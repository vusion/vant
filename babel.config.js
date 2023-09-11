
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: 'commonjs',
      },
    ],
    [
      '@vue/babel-preset-jsx',
      {
        functional: false,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        useESModules: false,
      },
    ],
  ],
};
