const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const NotificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Notification creator
  receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Ids of the receivers of the notification
  leido: { type: Boolean, default: false },
  fecha_creacion: { type: Date, default: Date.now },
  type: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  comentario: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  reply: { type: mongoose.Schema.Types.ObjectId, ref: "Reply" }
});

module.exports = mongoose.model("Notification", NotificationSchema);
