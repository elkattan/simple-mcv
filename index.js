/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var path = require('path');
var session = require('express-session');
var methodOverride = require('method-override');

var app = module.exports = express();
var db = require('./db');

// define a custom res.message() method
// which stores messages in the session
app.response.message = function(msg) {
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
}

// morgan logger setup
if (!module.parent) app.use(logger('dev'));

// session support
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'session secret' // TODO: Add real project session secret
}));

// parse request body
app.use(express.json())


// parse request bodies (req.body)
app.use(express.urlencoded({ extended: true }))

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];

  // expose "messages" local variable
  res.locals.messages = msgs;

  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;

  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});

// injecting the global database object globaly 
app.use(function(req, res, next) {
  req.db = db;
  next();
});

// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

app.use(function(err, req, res, next) {
  // log it
  if (!module.parent) console.error(err.stack);

  // return error response
  res.status(500).send({error: true, msg: "Internal server error"});
});

// assume 404 since no middleware responded
app.use(function(req, res, next) {
  res.status(404).send({error: true, msg: "Resource not found"});
});

if (!module.parent) {
  app.listen(3000);
  console.log('API started on  http://localhost:3000');
}
