const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  followGiver: {
    type: Schema.Types.ObjectId,
    ref: "profile"
  },
  followReceiver: {
    type: Schema.Types.ObjectId,
    ref: "profile"
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Follow = mongoose.model("follow", FollowSchema);