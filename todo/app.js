/*!
 * todo - app.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

var connect = require('connect');
var path = require('path');
var urlrouter = require('urlrouter');
var render = require('connect-render');
var routes = require('./routes');

var app = connect(
  connect.bodyParser(),
  connect.cookieParser(),
  connect.session({ secret: 'todo secret', key: 'sid' }),
  connect.csrf()
);

/**
 * Static files
 */
app.use('/public', connect.static(path.join(__dirname, 'public')));

/**
 * Template Engine helper
 */
app.use(render({
  root: __dirname + '/views',
  layout: 'layout.html',
  cache: false, // must set `true` for prodution
  helpers: {
    _csrf: function (req, res) {
      return req.session ? req.session._csrf : "";
    },
    now: function (req, res) {
      return new Date();
    }
  }
}));

/**
 * URL Routing
 */
app.use(urlrouter(routes));

app.listen(1984);