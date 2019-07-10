const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res, next) => {
  db.Game.find()
    .then(games => {
      console.log(games);
      res.json(games);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
})

router.post("/newgame", (req, res, next) => {
  console.log(req.userID);
  const newGame = new db.Game({
    name: req.body.name,
    questions: req.body.questions,
    answers: req.body.answers,
    correct: req.body.correct,
    creatorID: req.userID
  });
  newGame.save()
    .then(game => {
      console.log(game);
      res.json(game)
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})

module.exports = router;