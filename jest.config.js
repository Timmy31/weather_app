module.exports = {
  preset: 'react-native',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  transformIgnorePatterns: ['!node_modules/@react-native', '!node_modules/react-native'],
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
};
