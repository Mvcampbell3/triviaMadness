const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  gameIDs: {
    type: [Schema.Types.ObjectId],
    ref: "Game",
    default: []
  }
})

module.exports = User = mongoose.model("User", UserSchema)