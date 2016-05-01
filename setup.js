var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var sass        = require('metalsmith-sass');
var imagemin    = require('metalsmith-imagemin');
var Handlebars  = require('handlebars');
var fs          = require('fs');


Handlebars.registerPartial(
  'header',
  fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString()
);
Handlebars.registerPartial(
  'footer',
  fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString()
);
Handlebars.registerHelper(
  'activeClass',
  function (currentPermalink, expectedPermalink, depth) {
    var match = true;
    currentPermalinkParts = currentPermalink.split('/');
    expectedPermalinkParts = expectedPermalink.split('/');
    for(var i = 0; i <= depth; i++) {
      if (expectedPermalinkParts[i] !== currentPermalinkParts[i]) {
        match = false;
      }
    }

    if (match) {
      return 'active';
    }
  }
);

module.exports = Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }]
  }))
  .use(sass({
    outputStyle: 'compressed'
  }))
  .destination('./build');
