module.exports = {
  devServer: {
    proxy: {
      '^/auth/login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {'^/auth/login': '/auth/login'},
      },
      '^/pages': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {'^/pages': '/pages'},
      },
    }
  }
}