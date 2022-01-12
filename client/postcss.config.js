const autoprefixer = require('autoprefixer');
const minify = require('postcss-minify');

module.exports = {
    plugins: [autoprefixer, minify]
};
