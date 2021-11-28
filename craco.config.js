const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "primary-color": "#2baae1",
              // "secondary-color": "#ff6644",
              // "link-color": "#0DD078",
              // "success-color": "#0DD078",
              // "border-radius-base": "40px",
              "font-size-base": "16px",
              // "heading-1-size": "30px",
              // "heading-2-size": "26px",
              // "heading-3-size": "22px",
              // "heading-4-size": "18px",
              // "heading-5-size": "16px",
              "result-title-font-size": "35px",
              "result-subtitle-font-size": "18px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
