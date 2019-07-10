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

module.exports = router;