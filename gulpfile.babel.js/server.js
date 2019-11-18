const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const server = (cb) => {
  browserSync.init({
    server: {
      baseDir: './webpack3-build/',
      index: 'index.html'
    },
    port: 8080
  });
  cb();
};

module.exports = {
  server,
  reload
};
