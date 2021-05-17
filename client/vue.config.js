module.exports = {
    devServer: {
        proxy: {
            '^/auth/authenticate': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/auth/authenticate': '/auth/authenticate'},
            },
            '^/auth/login': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/auth/login': '/auth/login'},
            },
            '^/pages': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/pages': '/pages'},
            },
            '^/users': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {'^/users': '/users'},
            },
        }
    }
};