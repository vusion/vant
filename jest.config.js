process.env.TZ = 'Asia/Shanghai';

module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    // i-ico.vue/icon.js 要求文档必须有一个 script 标签
    html: '<!DOCTYPE html><html><head><meta charset="UTF-8" /><script></script></head><body></body></html>'
  },
  testMatch: ["<rootDir>/src/**/test/**/*.spec.[jt]s?(x)"],
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx', 'json'],
  transform: {
    ".*\\.(vue)$": "@vue/vue2-jest",
    "\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@vusion|swiper|ssr-window|dom7|@vant|vue-month-picker)/)',
  ],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/scripts/test/__mocks__/styleMock.js",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/test/__mocks__/fileMock.js',
    "themeCSS": "<rootDir>/scripts/test/__mocks__/styleMock.js",
    "swiper/swiper-bundle.esm.js": "<rootDir>/node_modules/swiper/swiper-bundle.esm.js",
  },
  snapshotSerializers: ["jest-serializer-vue-tjw"],
  setupFiles: ['<rootDir>/scripts/test/jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,vue}', '!**/demo/**'],
  coverageReporters: ["html", "text-summary"],
  coverageDirectory: './test/coverage',
};
