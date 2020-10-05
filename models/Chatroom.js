const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: "El nombre es requerido",
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);