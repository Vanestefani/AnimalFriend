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
  descripcion: {
    type: String,
    trim: true,
    default: "",
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

  completo: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Recordatorios", RecordatoriosSchema);
