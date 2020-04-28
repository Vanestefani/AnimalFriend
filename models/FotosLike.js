const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const FotosLikeSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.ObjectId, required: true, ref: "Post" },
  users_likes: [
    {
      autor: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
      }
    }
  ]
});

module.exports = mongoose.model("FotosLike", FotosLikeSchema);
