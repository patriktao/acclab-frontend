const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVar: { '@primary-color': '#00bdf2' },
            javascriptEnabled: true,
          },
        },
      },
    },

  ],
};