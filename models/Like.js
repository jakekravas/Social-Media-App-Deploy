const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  name: {
    type: String
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

module.exports = Like = mongoose.model("like", LikeSchema);