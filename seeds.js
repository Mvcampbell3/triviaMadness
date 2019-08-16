const userID = "5d3698f42c75c055c4dadf1a"
const Game = require("./models/Game");

const seed1 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed2 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed3 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed4 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed5 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed6 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed7 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed8 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed9 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed10 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

const seed11 = new Game({
  reviewed: false,
  questions: [
    {
      question: "Is this going to work?",
      answers: [
        "I",
        "Hope",
        "It",
        "Does"
      ]
    }
  ],
  correct: "Does",
  title: "Test26",
  category: "Other",
  creatorID: userID
});

module.exports = function() {
  const promiseArr = [seed1, seed2, seed3, seed4, seed5, seed6, seed7, seed8, seed9, seed10, seed11];
  promiseArr.forEach(game => { game.save() })
}
