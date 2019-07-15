const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const GameSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  reviewed: {
    type: Boolean,
    default: false
  },

  questions: {
    type: Array,
    required: true
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

GameSchema.post("save", function() {
  console.log("pre save middleware running")
  console.log(this.creatorID)
  User.findByIdAndUpdate(this.creatorID, { $push: { gameIDs: this._id } }, { new: true })
    .then((result) => {
      console.log(result)
    })
    .catch((err) => console.log(err))
})

GameSchema.pre("remove", function(next) {
  console.log("pre remove middleware running");
  User.findByIdAndUpdate(this.creatorID, {$pull:{gameIDs:this._id}}, {new:true})
    .then(result => {
      console.log(result);
      next()
    })
    .catch(err => {
      console.log(err);
      next(err)
    })
})

module.exports = Game = mongoose.model("Game", GameSchema);