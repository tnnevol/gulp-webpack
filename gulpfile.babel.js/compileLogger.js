const chalk = require('chalk');
const gutil = require('gulp-util');

const compileLogger = (err, stats) => {
  if (err) throw new gutil.PluginError('webpack', err);
  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach(error => {
      chalk.red(error);
    });
  } else {
    gutil.log(stats.toString({
      colors: gutil.colors.supportsColor,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
      version: false,
      cached: false,
      cachedAssets: false,
      reasons: false,
      source: false,
      errorDetails: false
    }));
    console.log(chalk.cyan('  Build complete.\n'));
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ));
  }
};

module.exports = compileLogger;
