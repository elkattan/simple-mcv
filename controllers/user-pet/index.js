/**
 * Module dependencies.
 */

exports.name = 'pet';
exports.prefix = '/user/:user_id';

exports.create = function(req, res, next){
  var id = req.params.user_id;
  var user = req.db.users[id];
  var body = req.body;
  var pet = { name: body.pet.name };
  pet.id = req.db.pets.push(pet) - 1;
  user.pets.push(pet);
  res.message('Added pet ' + body.pet.name);
  res.status(201).send(user);
}
