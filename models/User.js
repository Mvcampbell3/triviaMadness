const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  password: {
    type: String,
    required: true
  },

  gameIDs: {
    type: [Schema.Types.ObjectId],
    ref: "Game",
    default: []
  },

  gameResults: {
    type: Array,
    default: [],
  }
})

module.exports = User = mongoose.model("User", UserSchema)