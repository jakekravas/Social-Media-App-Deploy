const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  avatar: {
    type: String
  },
  cover: {
    type: String
  },
  followers: {
    type: Array
  },
  following: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);