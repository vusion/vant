const path = require('path');
const { genPackageEntry } = require('@vant/cli/lib/compiler/gen-package-entry');

genPackageEntry({
  outputPath: path.join(__dirname, './dist/package-entry.js')
});


module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/test/config/jest.style-mock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/config/jest.file-mock.js',

    // iconv/icon.js is a mock file
    '\\/icon(\\.js)?': '<rootDir>/test/config/jest.icon-mock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/test/config/jest.setup.js'],

  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],

  transform: {
    '\\.(vue)$': 'vue-jest',
    '\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['api.ts'],
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx,vue}',
    '!**/demo/**',
    '!src/**/api.ts',
  ],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage',
};
