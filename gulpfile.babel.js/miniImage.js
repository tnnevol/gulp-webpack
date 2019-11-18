const { src, dest } = require('gulp');
const imageMin = require('gulp-imagemin');
const notify = require('gulp-notify');

const miniImage = (cb) => {
  src('src/img/**/*')
    .pipe(imageMin({
      optimizationLevel: 5, // 0-7 default: 3
      progressive: true, // 无损压缩jpg default：false
      interlaced: true,
      multipass: true
    }))
    .pipe(dest('webpack3-build/img'))
    .pipe(notify('\n===>图片压缩完成<===\n'));
  cb();
};
module.exports = miniImage;
