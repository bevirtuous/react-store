module.exports = (api) => {
  api.cache(false);

  return {
    compact: true,
    presets: [
      ['@babel/preset-env', {
        modules: false,
      }],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
    ],
  };
};
