var dotenv            = require('dotenv').config();
var bucketful         = require('bucketful');
var prompt            = require('prompt');
var metalsmithBuilder = require('./setup');

var confirmDeploy = function () {
  prompt.start();
  prompt.get({
    properties: {
      confirm: {
        pattern: /^(yes|no|y|n)$/gi,
        description: 'Are you sure you want to deploy?',
        message: 'y/n',
        required: true
      }
    }
  },  function (err, result) {
      var c = result.confirm.toLowerCase();
      if (c !== 'y' && c !== 'yes') {
        console.log('ABORT');
        return false;
      }
      deploy();
  });
}

var deploy = function () {
  var config = {
    output : process.stdout,
    bucket : process.env.S3_BUCKET,
    region : process.env.AWS_REGION,
    key    : process.env.AWS_ACCESS_KEY_ID,
    secret : process.env.AWS_SECRET_ACCESS_KEY,
    source : './build'
  };
  bucketful.deploy(config, function (err) {
    if(err) {
      console.log('Deploy failed', err);
    } else {
      console.log('Deploy successful');
    }
  });
};

metalsmithBuilder.build(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Build complete');
    confirmDeploy();
  }
});
