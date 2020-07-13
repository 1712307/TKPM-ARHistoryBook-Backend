let router = require("express").Router();
let Model = require("./model");
let { tokenValidator } = require("../Account/token");

router.get("/:id", tokenValidator, function(req, res, next) {
  let { user_id } = req.body;
  let sec_id = req.params.id;
  Model.select(user_id,sec_id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.delete("/:id", tokenValidator, function(req, res, next) {
  let { user_id } = req.body;
  let sec_id = req.params.id;
  Model.remove(user_id,sec_id)
    .then(function(user){
      res.status(200).send(user);
    })
    .catch(next);
}); 

router.post("/", tokenValidator, function(req, res, next) {
  console.log('in')
  let allowedFields = ["user_id", "sec_id", "status", "score", "type"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  Model.create(patch)
  .then((rows) =>{
    res.send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 

router.put("/", tokenValidator, function(req, res, next) {
  let allowedFields = ["user_id", "sec_id", "status", "score", "type"];
  let patch = {};
  try {
    allowedFields.forEach(function(key) {
      patch[key] = req.body[key];
    });
  } catch (message) {
    res.status(400).send({
      http: 400,
      code: "INVALID_INFO",
      message
    });
    return;
  }
  console.log(patch)
  Model.update(patch)
  .then((rows) =>{
    res.status(200).send(rows)
  })
  .catch((err) => {
    res.status(400).send(err);
    return;
  })
}); 
module.exports = router;
 