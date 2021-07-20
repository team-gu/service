module.exports = {
  setupFilesAfterEnv: [
    'given2/setup',
    'jest-plugin-context/setup',
    './jest.setup',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  coverageReporters: ['json-summary'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
    '^@atoms(.*)$': '<rootDir>/components/atoms$1',
    '^@molecules(.*)$': '<rootDir>/components/molecules$1',
    '^@organisms(.*)$': '<rootDir>/components/organisms$1',
    '^@templates(.*)$': '<rootDir>/pages/templates$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@assets(.*)&': '<rootDir>/assets$1',
    '^@hooks(.*)$': '<rootDir>/hooks$1',
    '^@mocks(.*)$': '<rootDir>/mocks$1',
    '^@repository(.*)$': '<rootDir>/repository$1',
    '^@routes(.*)$': '<rootDir>/routes$1',
    '^@store(.*)$': '<rootDir>/store$1',
    '^@styles(.*)$': '<rootDir>/styles$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@context(.*)$': '<rootDir>/context$1',
    '^@parse(.*)$': '<rootDir>/test$1',
  },
};
