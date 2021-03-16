module.exports = {
    lintOnSave: true,
    publicPath: '/myblog/',
    outputDir: 'dist',
    assetsDir: 'static',
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = '个人博客';
            return args;
        });
    },
}
