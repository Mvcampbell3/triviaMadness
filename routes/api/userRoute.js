const router = require("express").Router();
const db = require("../../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../middleware/checkAuth")

router.get("/test", (req, res) => {
  res.json("working here at api/user/test");
})

router.get("/allusers", (req, res, next) => {
  db.User.find()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json(err)
    }
    const newUser = new db.User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    newUser.save()
      .then(user => {
        console.log(user);
        res.status(201).json(user)
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      })
  })
});

router.post("/login", (req, res, next) => {
  db.User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          // change err code after testing
          return res.status(200).json(err);
        }
        if (result === true) {
          jwt.sign({
            username: user.username,
            id: user._id
          },
            process.env.JWT_KEY, { expiresIn: "10h" }, (err, token) => {
              if (err) {
                console.log(err);
                // change err code after testing
                return res.status(200).json(err)
              }

              return res.status(200).json({
                username: user.username,
                token
              })
            }
          )
        } else {
          // change err code after testing
          return res.status(200).json(result)
        }
      })
    })
    .catch(err => {
      console.log(err);
      // change err code to 401 after testing
      res.status(404).json(err);
    })
})

router.delete("/deleteuser/:id", (req, res, next) => {
  db.Game.remove({ creatorID: req.params.id })
    .then(games => {
      console.log(games);
      db.User.findByIdAndDelete(req.params.id)
        .then(deletedUser => {
          console.log(deletedUser);
          res.status(200).json(deletedUser)
        })
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})

router.get("/checkauth", checkAuth, (req, res, next) => {
  res.status(200).json({ user: true, username: req.user.username, id: req.user.id })
})

module.exports = router;