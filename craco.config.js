const cracoAlias = require('craco-alias');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3030,
  },

  webpack: {
    plugins: {
      remove: ['CaseSensitivePathsPlugin'],
    },
  },

  plugins: [
    {
      plugin: cracoAlias,
      options: {
        baseUrl: './',
        source: 'jsconfig',
      },
    },
  ],
};
