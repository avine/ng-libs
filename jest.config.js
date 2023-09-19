const mapper = require('jest-module-name-mapper');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  //globalSetup: 'jest-preset-angular/global-setup',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: mapper.default(),
};
