const nodemon = require('gulp-nodemon');
const path = require('path');

// const config = require('../config');

const server = done => {
  nodemon({
    script: path.join(__dirname, '../server/bin/www.js'), // run ES5 code
    watch: path.resolve(__dirname, '../server'), // watch ES2015 code
    tasks: ['compile'], // compile synchronously onChange
    // env: { NODE_ENV: '"development"' },
    done
  });
};
module.exports = server;
