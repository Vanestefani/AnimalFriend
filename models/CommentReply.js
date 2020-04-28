const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  autor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User"
  },
  fecha_creacion: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Comment"
  },
  Message: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Reply", replySchema);
