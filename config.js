/**
 *  @fileOverview Config File
 *  @author PeckZeg
 *  @version 2015-12-11
 */

module.exports = {

    //  development | production
    env: 'development',

    port: {
        development: 8080,
        production: 80,
    },

    public_folder: {
        static: 'static/dest',
        templates: '/templates'
    },

    folder: {
        static: '/static',
        css: '/static/css',
        js: '/static/js',
        images: '/static/images',
        assets: '/static/assets',
        plugins: '/static/assets/global/plugins'
    },

    livereload: {
        host: '127.0.0.1',
        port: 35721,
    },
};