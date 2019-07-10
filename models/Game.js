const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  questions: {
    type: Array,
    required: true
  },

  answers: {
    type: Array,
    required: true,
  },

  correct: {
    type: Array,
    required: true
  },

  creatorID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = Game = mongoose.model("Game", GameSchema);