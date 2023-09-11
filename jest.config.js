const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/test/setup.js'],
  transform: {
    '^.+.(j|t)sx?$': 'babel-jest',
    '^.+.vue$': '@vue/vue2-jest',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
