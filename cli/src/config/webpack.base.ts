import path from 'path';
import { VueLoaderPlugin } from 'vue-loader';
import { WebpackConfig } from '../common/types';
import {
  CACHE_DIR,
  STYLE_EXTS,
  SCRIPT_EXTS,
  POSTCSS_CONFIG_FILE,
} from '../common/constant';

const CACHE_LOADER = {
  loader: require.resolve('cache-loader'),
  options: {
    cacheDirectory: CACHE_DIR,
  },
};

const CSS_LOADERS = [
  require.resolve('style-loader'),
  require.resolve('css-loader'),
  {
    loader: require.resolve('postcss-loader'),
    options: {
      config: {
        path: POSTCSS_CONFIG_FILE,
      },
    },
  },
];

const plugins = [
  new VueLoaderPlugin(),
];

const VUE_LOADER = {
  loader: require.resolve('vue-loader'),
  options: {
    compilerOptions: {
      preserveWhitespace: false,
    },
  },
};

export const baseConfig: WebpackConfig = {
  mode: 'development',
  resolve: {
    extensions: [
      ...SCRIPT_EXTS,
      ...STYLE_EXTS,
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [CACHE_LOADER, VUE_LOADER],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [CACHE_LOADER, require.resolve('babel-loader')],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, require.resolve('less-loader')],
      },
      {
        test: /\.md$/,
        use: [
          CACHE_LOADER,
          VUE_LOADER,
          path.resolve(__dirname, '../loader/markdown')
        ],
      },
    ],
  },
  plugins,
};
