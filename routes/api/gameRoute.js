const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res, next) => {
  db.Game.find()
    .then(games => {
      console.log(games);
      res.status(200).json(games);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
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
      res.status(201).json(game)
    })
    .catch(err => {
      console.log(err);
      res.status(422).json(err)
    })
})

router.delete("/deletegame/:id", (req, res, next) => {
  const gameID = req.params.id;
  db.Game.findById(gameID)
    .then(game => {
      game.remove()
        .then(deleted => {
          console.log(deleted);
          res.status(200).json(deleted)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err)
        })
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err)
    })
})



module.exports = router;