const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "post"
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("comment", CommentSchema);