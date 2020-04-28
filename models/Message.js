const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const Message = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  texto: {
    type: String,
    trim: true,
    minlength: 1
  },
  tipo: {
    type: String,
    required: true
  },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  foto: String,
  leido: { type: Boolean, default: false },
  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", Message);
