const { series, watch } = require('gulp');
const watchReload = require('./reload');
const build = require('./build');

const watcher = (cb) => {
  watch('./*.html', series(build, watchReload));
  watch('./src/**/*', series(build, watchReload));
  cb();
};

module.exports = watcher;
