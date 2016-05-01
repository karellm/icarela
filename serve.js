var metalsmithBuilder = require('./setup');
var serve             = require('metalsmith-serve');
var watch             = require('metalsmith-watch');

metalsmithBuilder
  .use(watch({
    pattern : '**/*',
    livereload: false
  }))
  .use(serve())
  .build(function (err, files) {
    if (err) { throw err; }
  });
