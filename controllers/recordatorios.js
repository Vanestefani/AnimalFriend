const fs = require("fs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.model("users");

const Recordatorios = require("../models/Recordatorios");

const linkify = require("linkifyjs");
require("linkifyjs/plugins/hashtag")(linkify);
require("linkifyjs/plugins/mention")(linkify);

exports.createRecordatorio = async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const mascota = req.body.mascota;
    const fecha_expiracion = req.body.fecha_expiracion;

    const notas = req.body.notas;
    const completo = req.body.completo;
    const autor = req.body.autor;

    const newRecordatorios = new Recordatorios({
      descripcion: descripcion,
      autor: autor,
      nombre: nombre,
      tipo: tipo,
      mascota: mascota,
      fecha_expiracion: fecha_expiracion,
      notas: notas,
      completo: completo,
    });

    const recordatorios_ = await newRecordatorios.save().then((result) => {
      res.json({ recordatorios_: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.RecordatoriosByUser = async (req, res) => {
  try {
    Recordatorios.find({ autor: req.user._id })
      .populate("autor", "_id nombre ")
      .populate("mascota", "_id nombre foto")
      .then((recordatorios) => {
        res.json({ recordatorios});
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleterecordatorio = async (req, res) => {
  try {
    Recordatorios.findOne({ _id: req.params.recordatorioId })
      .populate("autor", "_id")
      .exec((err, recordatorio) => {
        if (err || !recordatorio) {
          return res.status(422).json({ error: err });
        }
        if (recordatorio.autor._id.toString() === req.user._id.toString()) {
          recordatorio
            .remove()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.actualizarRecordatorio = async (req, res) => {
  try {
    let recordatorio = await Recordatorios.findById(req.params.id);

    if (!recordatorio) {
      return res.status(404).json({ msg: "No existe " });
    }
    const nuevorecordatorio = {};
    nuevorecordatorio.nombre = req.body.nombre;
    nuevorecordatorio.tipo = req.body.tipo;
    nuevorecordatorio.mascota = req.body.mascota;
    nuevorecordatorio.fecha_expiracion = req.body.fecha_expiracion;
    nuevorecordatorio.notas = req.body.notas;
    nuevorecordatorio.completo = req.body.completo;

    // Guardar
    recordatorio = await Recordatorios.findOneAndUpdate(
      { _id: req.params.id },
      nuevorecordatorio,
      {
        new: true,
      }
    );

    res.json({ recordatorio });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
