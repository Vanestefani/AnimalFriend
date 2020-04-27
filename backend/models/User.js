const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  genero: {
    type: String,
    required: true
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);