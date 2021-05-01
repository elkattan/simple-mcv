/**
 * Module dependencies.
 */
 exports.before = function(req, res, next) {
  var id = req.params.user_id;
  if (!id) return next();
  // pretend to query a database...
  process.nextTick(function() {
    req.user = req.db.users[id];
    // cant find that user
    if (!req.user) return next('route');
    // found it, move on to the routes
    next();
  });
}

 exports.create = function(req, res, next) {
  var name = req.body.name;
  if (!name) return res.status(400).send({
    error: true,
    msg: "User name is required"
  });

  var user = {
    id: req.db.users.length,
    name: name,
    pets: []
  }
  req.db.users.push(user);
  res.status(201).send(user);
}

exports.list = function(req, res, next) {
  res.send(req.db.users);
}

exports.get = function(req, res, next) {
  res.send(req.user);
}

// TODO: Compelete the CRUD methods