module.exports = {
  setupTestFrameworkScriptFile: './test/setup',
  testPathIgnorePatterns: ['/node_modules/', '/examples/'],
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.(js|ts)$': 'babel-jest'
  },
  collectCoverageFrom: ['src/**/*.{js,ts}']
};
