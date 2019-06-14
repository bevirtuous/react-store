const defaultConfig = require('@virtuous/unit-tests');

module.exports = Object.assign({}, defaultConfig, {
  rootDir: __dirname,
  collectCoverageFrom: [
    'src/*/**/*.{js,jsx}',
  ],
});
