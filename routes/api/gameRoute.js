const router = require("express").Router();
const db = require("../../models");
const checkAuth = require("../../middleware/checkAuth");
const isMod = require("../../middleware/isMod")
const seeds = require("../../seeds");

// add checkAuth back in to routes!

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

router.post("/newgame", checkAuth, (req, res, next) => {
  // When we add in checkAuth middleware, req.user structure will change
  console.log(req.user.id);
  const newGame = new db.Game({
    title: req.body.title,
    questions: req.body.questions,
    category: req.body.category,
    creatorID: req.user.id,
    correct: req.body.correct
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

router.delete("/deletegame/:id", isMod, (req, res, next) => {
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

router.delete("/deleteallgames", isMod, (req, res, next) => {
  db.Game.deleteMany()
    .then(result => res.status(200).json({ result: result, all: "gone" }))
    .catch(err => res.status(400).json(err))
})

router.get("/playgame/:id", checkAuth, (req, res, next) => {
  const gameID = req.params.id;
  db.Game.findById(gameID)
    .then(result => {
      console.log(result);
      res.status(200).json({
        title: result.title,
        id: result._id,
        category: result.category,
        questions: result.questions
      })
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err)
    })
})

router.post("/gradegame/:id", checkAuth, (req, res, next) => {
  db.Game.findById(req.params.id)
    .then(game => {
      const correct = game.correct;
      const questions = game.questions;
      const userAnswers = req.body.userAnswers;
      let rightAnswers = 0;
      let wrongAnswers = 0;
      let graded = []
      let rightWrongArr = [];
      for (let i = 0; i < correct.length; i++) {

        graded[i] = { correct: correct[i], userAnswer: userAnswers[i] }

        if (correct[i] === userAnswers[i]) {
          rightAnswers = rightAnswers + 1;
          rightWrongArr.push(true);
        } else {
          wrongAnswers = wrongAnswers + 1;
          rightWrongArr.push(false)
        }
      }
      const score = ((rightAnswers / correct.length).toFixed(2) * 100) + "%"
      res.status(200).json({
        questions: questions,
        rightWrongArr: rightWrongArr,
        right: rightAnswers,
        wrong: wrongAnswers,
        graded: graded,
        score: score,
        gameID: req.params.id,
        userID: req.user.id,
        username: req.user.username
      })
    })
    .catch(err => {
      console.log(err);
      res.status(404).json(err)
    })
})

router.get("/seed", isMod, (req, res, next) => {
  Promise.all(seeds.forEach(seed => seed.save()))
    .then(result => {
      console.log(result);
      res.json("done");
    })
    .catch(err => {
      console.log(err);
      res.json(err)
    })
})



module.exports = router;