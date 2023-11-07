const px2vw = require('./plugins/postcss-px2vw');

let config = {}

if (process.env.scene !== 'desktop') {
  config = {
    plugins: [
      px2vw({
        unitToConvert: 'px',
        viewportWidth: 375,
        propList: ['*'],
        selectorBlackList: ['nov', /^m401$/, /^m404$/],

        landscape: true,
        landscapeUnit: 'vw',
        landscapeWidth: 812,
        exclude: [/[\\/]cli[\\/]site[\\/]/],
      }),
    ],
  };
}

module.exports = config;
