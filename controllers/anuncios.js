const Anuncios = require("../models/Anuncios");
const { uploader, sendEmail } = require("../utils/index");

exports.createAnuncios = async (req, res) => {
  try {
    const result = await uploader(req);

    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const autor = req.body.autor;
    const mascota = req.body.mascota;
    const imagen = req.body.imagen;
    const tags = req.body.tags;
    const descripcion = req.body.descripcion;

    const newanuncios = new Anuncios({
      titulo: titulo,
      categoria: categoria,
      autor: autor,
      mascota: mascota,
      imagen: result.url,
      tags: tags,
      descripcion: descripcion,
    });

    const anuncios = await newanuncios.save().then((result) => {
      res.json({ anuncios: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.anunciosByUser = async (req, res) => {
  try {
    Anuncios.find({ autor: req.user._id })
      .populate("autor", "_id nombre  fotoPerfil")
      .sort("-fecha_creacion")

      .then((anuncios) => {
        res.json({ anuncios });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.anuncio = async (req, res) => {
  try {
    Anuncios.findOne({_id: req.params.anuncioId})
      .populate("autor", "_id nombre fotoPerfil")
      .then((anuncio) => {
        res.json({ anuncio });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.allanuncios = async (req, res) => {
  try {
    Anuncios.find()
      .populate("autor", "_id nombre fotoPerfil")
      .sort("-fecha_creacion")
      .then((anuncios) => {
        res.json({ anuncios });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteanuncioss = async (req, res) => {
  try {
    Anuncios.findOne({ _id: req.params.anuncioId })
      .populate("autor", "_id")
      .exec((err, anuncios) => {
        if (err || !anuncios) {
          return res.status(422).json({ error: err });
        }
        if (anuncios.autor._id.toString() === req.user._id.toString()) {
          anuncios
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
exports.actualizaranuncioso = async (req, res) => {
  try {
    const result = await uploader(req);

    let anuncios = await Anuncios.findById(req.params.id);

    if (!anuncios) {
      return res.status(404).json({ msg: "No existe " });
    }

    const nuevaanuncios = {};
    nuevaanuncios.titulo = titulo;
    nuevaanuncios.categoria = categoria;
    nuevaanuncios.autor = req.body.autor;
    nuevaanuncios.mascota = req.body.mascota;
    nuevaanuncios.imagen =  result.url;
    nuevaanuncios.tags = req.body.tags;
    nuevaanuncios.descripcion = req.body.descripcion;

    tarea = await anuncios.findOneAndUpdate(
      { _id: req.params.id },
      nuevaanuncios,
      {
        new: true,
      }
    );

    res.json({ anuncios });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
