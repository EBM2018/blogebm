const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/common.js', 'public/js')
    .js('resources/js/paragraphsManager.js', 'public/js')
    .js('resources/js/articleCreator.js', 'public/js')
    .js('resources/js/articleEditor.js', 'public/js')
    .copy('resources/css/home.css', 'public/css/home.css')
    .copy('resources/css/register.css', 'public/css/register.css')
    .copy('resources/css/login.css', 'public/css/login.css')
    .copy('resources/css/article.show.css', 'public/css/article.show.css')
    .copy('resources/css/article.create.css', 'public/css/article.create.css');