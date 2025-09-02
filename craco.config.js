const path = require('path');

module.exports = {
  devServer: {
    // Override deprecated options
    onAfterSetupMiddleware: undefined,
    onBeforeSetupMiddleware: undefined,
    setupMiddlewares: (middlewares, devServer) => {
      return middlewares;
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Suppress webpack-dev-server deprecation warnings
      if (env === 'development' && webpackConfig.devServer) {
        // Remove deprecated middleware options completely
        delete webpackConfig.devServer.onAfterSetupMiddleware;
        delete webpackConfig.devServer.onBeforeSetupMiddleware;
        
        // Use the new setupMiddlewares option
        webpackConfig.devServer.setupMiddlewares = (middlewares, devServer) => {
          return middlewares;
        };
      }
      return webpackConfig;
    },
  },
};