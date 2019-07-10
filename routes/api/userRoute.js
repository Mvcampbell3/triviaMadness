const router = require("express").Router();
const db = require("../../models")

router.get("/test", (req, res) => {
  res.json("working here at api/user/test");
})

router.get("/allusers", (req, res, next) => {
  db.User.find()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})

router.post("/signup", (req, res, next) => {
  const newUser = new db.User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  newUser.save()
    .then(user => {
      console.log(user);
      res.status(201).json(user)
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})

module.exports = router;