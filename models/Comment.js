const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  autor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User"
  },
  post: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Post"
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comment", commentSchema);
