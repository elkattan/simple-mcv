/**
 * Module dependencies.
 */

exports.before = function(req, res, next){
  var pet = req.db.pets[req.params.pet_id];
  if (!pet) return next('route');
  req.pet = pet;
  next();
}

exports.get = function(req, res, next){
  res.send({ ...req.pet });
}

exports.update = function(req, res, next){
  var body = req.body;
  req.pet.name = body.pet.name;
  res.message('Information updated!');
  res.send(req.pet);
}
