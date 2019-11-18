const { src, dest } = require('gulp');
const cleanCss = require('gulp-clean-css');
const notify = require('gulp-notify');
const base64 = require('gulp-base64');
const miniCss = (cb) => {
  src('src/less/**/*.css')
    .pipe(base64({
      maxImageSize: 20 * 1024,
      debug: true
    }))
    .pipe(cleanCss())
    .pipe(dest('webpack3-build/less'))
    .pipe(notify('\n===>css编译完成<===\n'));
  cb();
};
module.exports = miniCss;
