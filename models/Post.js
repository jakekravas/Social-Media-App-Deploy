const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  text: {
    type: String,
    required: true
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
  likes: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);