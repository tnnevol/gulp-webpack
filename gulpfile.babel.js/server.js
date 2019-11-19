const nodemon = require('gulp-nodemon');
const path = require('path');

const config = require('../config');

const server = cb => {
  console.log(`open browser http://127.0.0.1:${config.dev.port}`);
  nodemon({
    script: path.join(__dirname, '../server/bin/www'), // run ES5 code
    watch: path.resolve(__dirname, '../server'), // watch ES2015 code
    tasks: ['compile'], // compile synchronously onChange
    // env: { NODE_ENV: '"development"' },
    done () {
      cb();
    }
  });
};
module.exports = server;
