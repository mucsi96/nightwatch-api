module.exports = {
  setupTestFrameworkScriptFile: './test/setup',
  testPathIgnorePatterns: ['/node_modules/', '/examples/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'typescript-babel-jest'
  }
};
