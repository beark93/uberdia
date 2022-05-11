const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        publicPath: process.env.NODE_ENV === 'production' ? '/' : '/api',
        proxy: {
            '/api': {
                target: 'https://diablo2.io/dclone_api.php',
                ws: true,
                changeOrigin: true
            }
        }
    },
    transpileDependencies: true
})