const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentReplyLikeSchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.ObjectId, required: true, ref: "Reply" },
  users_likes: [
    {
      autor: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "users"
      }
    }
  ]
});

module.exports = mongoose.model("CommentReplyLike", commentReplyLikeSchema);