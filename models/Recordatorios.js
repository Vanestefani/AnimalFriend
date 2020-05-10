const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const RecordatoriosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  autor: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },
  mascota: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Mascota",
  },
  fecha_expiracion: {
    type: Date,
    default: Date.now,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  notas: {
    type: String,
    default: "",
    trim: true,
    maxlength: 250,
  },
  completo: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Recordatorios", RecordatoriosSchema);
