const cracoAlias = require('craco-alias');

module.exports = {
  mode: 'development',
  devServer: {
    port: 3000,
  },

  plugins: [
    {
      plugin: cracoAlias,
      options: {
        baseUrl: './src',
        source: 'jsconfig',
      },
    },
  ],
};
