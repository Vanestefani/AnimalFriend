const Negocio = require("../models/Negocio");
const { uploader, sendEmail } = require("../utils/index");

exports.createnegocios = async (req, res) => {
  try {
    const result = await uploader(req);

    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const autor = req.body.autor;
    const tags = req.body.tags;

    const descripcion = req.body.descripcion;

    const newnegocios = new Negocio({
      titulo: titulo,
      categoria: categoria,
      autor: autor,
      tags: tags,

      descripcion: descripcion,
      imagen: result.url,
    });

    const negocio = await newnegocios.save().then((result) => {
      res.json({ newnegocio: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.negocioByUser = async (req, res) => {
  try {
    Negocio.find({ autor: req.user._id })
      .populate("autor", "_id nombre fotoPerfil")
      .sort("-fecha_creacion")

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
exports.negocio = async (req, res) => {
  try {
    Negocio.findOne({_id: req.params.negocioId})
      .populate("autor", "_id nombre fotoPerfil")
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
exports.allnegocios = async (req, res) => {
  try {
    Negocio.find()
      .populate("autor", "_id nombre fotoPerfil")
      .sort("-fecha_creacion")
      .then((negocios) => {
        res.json({ negocios });
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
    Negocio.findOne({ _id: req.params.negociosId })
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
    const result = await uploader(req);

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
    nuevanegocios.imagen = result.url;
    nuevanegocios.tags = req.body.tags;
    nuevanegocios.descripcion = req.body.descripcion;

    // Guardar la tarea
    tarea = await negocios.findOneAndUpdate(
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
