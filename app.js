'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
let mongoose = require('mongoose');
let conf  = require('./config/config');

module.exports = app;

mongoose.connect(conf.database);

var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
  console.log('Server started: http://localhost:' + port);
});
