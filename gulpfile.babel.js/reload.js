const { src, dest } = require('gulp');
const { reload } = require('./server');

const watchReload = (cb) => {
  src('./src/*.html')
    .pipe(dest('./webpack3-build/'))
    .pipe(reload({
      stream: true
    }));
  cb();
};

module.exports = watchReload;
