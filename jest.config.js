module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '@react-native-firebase/auth':
      '<rootDir>/src/lib/testing/mocks/firebase/auth.js',
    '@react-native-firebase/firestore':
      '<rootDir>/src/lib/testing/mocks/firebase/firestore.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    'node_modules/?!(static-container)',
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
  ],
  cacheDirectory: '.jest/cache',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
    window: {},
  },
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.ts',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
};
