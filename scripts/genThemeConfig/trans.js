function getUnitRegexp(unit) {
  return new RegExp(
    '"[^"]+"|\'[^\']+\'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)' + unit,
    'g'
  );
}

function toFixed(number, precision) {
  // eslint-disable-next-line no-restricted-properties
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(opts, viewportUnit, viewportSize) {
  return function (m, $1) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    if (pixels <= opts.minPixelValue) return m;
    const parsedVal = toFixed(
      (pixels / viewportSize) * 100,
      opts.unitPrecision
    );
    return parsedVal === 0 ? '0' : parsedVal + viewportUnit;
  };
}

function px2vw(value, opt = {}) {
  const opts = {
    ...opt,
    unitToConvert: 'px',
    viewportWidth: 375,
    viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
    unitPrecision: 5,
    viewportUnit: 'vw',
    fontViewportUnit: 'vw', // vmin is more suitable.
    selectorBlackList: [],
    propList: ['*'],
    minPixelValue: 1,
    mediaQuery: false,
    replace: true,
    landscape: false,
    landscapeUnit: 'vw',
    landscapeWidth: 568,
  };
  const pxRegex = getUnitRegexp(opts.unitToConvert);
  const unit = opts.viewportUnit;
  const size = opts.viewportWidth;

  return value.replace(pxRegex, createPxReplace(opts, unit, size));
}

module.exports = px2vw;
