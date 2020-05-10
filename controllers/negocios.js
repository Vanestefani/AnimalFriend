const fs = require("fs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.model("users");

const Negocio = require("../models/Negocio");

exports.createnegocios = async (req, res) => {
  try {
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const autor = req.body.autor;
    const tags = req.body.tags;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;

    const newnegocios = new Negocio({
      titulo: titulo,
      categoria: categoria,
      autor: autor,
      tags: tags,

      descripcion: descripcion,
      imagen: imagen,
    });

    const negocio = await newnegocio.save().then((result) => {
      res.json({ newnegocio: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.negocioByUser = async (req, res) => {
  try {
    Negocio
      .find({ autor: req.user._id })
      .populate("autor", "_id nombre ")
      .then((negocio) => {
        res.json({ negocio });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletenegocioss = async (req, res) => {
  try {
    Negocio
      .findOne({ _id: req.params.negociosId })
      .populate("autor", "_id")
      .exec((err, negocios) => {
        if (err || !negocios) {
          return res.status(422).json({ error: err });
        }
        if (negocios.autor._id.toString() === req.user._id.toString()) {
          negocios
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
exports.actualizarnegocioso = async (req, res) => {
  try {
    let negocios = await Negocio.findById(req.params.id);

    if (!negocios) {
      return res.status(404).json({ msg: "No existe " });
    }
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;

    const nuevanegocios = {};
    nuevanegocios.titulo = titulo;
    nuevanegocios.categoria = categoria;
    nuevanegocios.autor = req.body.autor;
    nuevanegocios.imagen = req.body.imagen;
    nuevanegocios.tags = req.body.tags;
    nuevanegocios.descripcion = req.body.descripcion;

    // Guardar la tarea
    tarea = await Negocio.findOneAndUpdate(
      { _id: req.params.id },
      nuevanegocios,
      {
        new: true,
      }
    );

    res.json({ negocios });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
