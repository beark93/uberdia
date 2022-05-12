const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    devServer: {
        proxy: 'https://diablo2.io/dclone_api.php',
    },
    transpileDependencies: true
})