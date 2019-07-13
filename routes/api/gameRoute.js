const router = require("express").Router();
const db = require("../../models");
const checkAuth = require("../../middleware/checkAuth");

router.get("/", checkAuth, (req, res, next) => {
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

router.post("/newgame", checkAuth,(req, res, next) => {
  // When we add in checkAuth middleware, req.user structure will change
  console.log(req.user.id);
  const newGame = new db.Game({
    name: req.body.name,
    questions: req.body.questions,
    topic: req.body.topic,
    category: req.body.category,
    answers: req.body.answers,
    correct: req.body.correct,
    creatorID: req.user.id
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

router.delete("/deletegame/:id", checkAuth, (req, res, next) => {
  const gameID = req.params.id;
  // check if req.user.id === game.creatorID
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

router.get("/playgame/:id", checkAuth, (req,res,next) => {
  const gameID = req.params.id;
  db.Game.findById(gameID)
    .then(result => {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err)
    })

})



module.exports = router;