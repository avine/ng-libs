module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  /*
   * To generate the `moduleNameMapper` value, execute the following code in Node:
   * const mapper = require('jest-module-name-mapper');
   * mapper.default();
   */
  moduleNameMapper: {
    '^@avine/ng-if-non-nullish': '<rootDir>//projects/if-non-nullish/src/public-api.ts',
    '^@avine/ng-form-stepper': '<rootDir>//projects/form-stepper/src/public-api.ts',
  },
};
