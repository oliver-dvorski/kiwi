let mix = require('laravel-mix');

mix
  .js('frontend.js', 'public/')
  .setPublicPath('public');
