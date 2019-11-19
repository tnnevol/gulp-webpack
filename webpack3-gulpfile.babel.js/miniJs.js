const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const composer = require('gulp-uglify/composer');
const uglify = require('uglify-js');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const { reload } = require('./server');
const babelCfg = require('../babel.config.js');
const minify = composer(uglify, console);

const miniJs = () => {
  // const option = {}
  return src('src/**/*.js')
    .pipe(babel(babelCfg))
    // .pipe(minify(option))
    // .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js/'))
    .pipe(notify('\n====> JavaScript编译完成 <====\n'));
};

module.exports = miniJs;
