const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')

module.exports = defineConfig({
    devServer: {
        proxy: 'https://diablo2.io/dclone_api.php',
    },
    css: {
        extract: true
    },
    transpileDependencies: true,
    configureWebpack: {
        node: {
            global: false
        },
        plugins: [
            new webpack.DefinePlugin({
                global: "window"
            })
        ]
    }
})