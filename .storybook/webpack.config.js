const path = require("path");
const paths = require("../config/paths");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpackConfig = require("../config/webpack.config");
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // config.plugins.push(
  //   new TsconfigPathsPlugin({
  //     configFile: path.resolve(__dirname, "../tsconfig.json")
  //   })
  // );

  config.module.rules = [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: paths.appSrc,
      loader: require.resolve("babel-loader"),
      options: {
        customize: require.resolve("babel-preset-react-app/webpack-overrides"),
        plugins: [
          [
            require.resolve("babel-plugin-named-asset-import"),
            {
              loaderMap: {
                svg: {
                  ReactComponent: "@svgr/webpack?-svgo,+ref![path]"
                }
              }
            }
          ]
        ],
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true
      }
    },
    ...config.module.rules
  ];
  // Return the altered config
  return config;
};
