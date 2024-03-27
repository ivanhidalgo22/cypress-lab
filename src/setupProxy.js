const createProxyMiddleware = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      target: `${process.env.VITE_BACKEND_ENDPOINT}`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
