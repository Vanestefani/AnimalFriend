const Eventos = require("../models/Eventos");
const { uploader, sendEmail } = require("../utils/index");

exports.createeventos = async (req, res) => {
  try {
    const result = await uploader(req);
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const autor = req.body.autor;
    const tags = req.body.tags;

    const descripcion = req.body.descripcion;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_finalizacion = req.body.fecha_finalizacion;
    const privado = req.body.privado;

    const neweventos = new Eventos({
      titulo: titulo,
      categoria: categoria,
      autor: autor,
      tags: tags,
      fecha_inicio: fecha_inicio,
      fecha_finalizacion: fecha_finalizacion,
      privado: privado,

      descripcion: descripcion,
      imagen: result.url,
    });

    const eventos = await neweventos.save().then((result) => {
      res.json({ newevento: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.eventoByUser = async (req, res) => {
  try {
    Eventos.find({ autor: req.user._id })
      .populate("autor", "_id nombre ")
      .sort("-fecha_creacion")
      .then((eventos) => {
        res.json({ eventos });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.alleventos = async (req, res) => {
  try {
    Eventos.find()
      .populate("autor", "_id nombre fotoPerfil")
      .sort("-fecha_creacion")
      .then((eventos) => {
        res.json({ eventos });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteeventoss = async (req, res) => {
  try {
    Eventos.findOne({ _id: req.params.eventosId })
      .populate("autor", "_id")
      .exec((err, eventos) => {
        if (err || !eventos) {
          return res.status(422).json({ error: err });
        }
        if (eventos.autor._id.toString() === req.user._id.toString()) {
          eventos
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
exports.actualizareventoso = async (req, res) => {
  try {
    let eventos = await Eventos.findById(req.params.eventoId);

    if (!eventos) {
      return res.status(404).json({ msg: "No existe " });
    }
    const titulo = req.body.titulo;
    const categoria = req.body.categoria;
    const autor = req.body.autor;
    const tags = req.body.tags;
    const imagen = req.body.imagen;
    const descripcion = req.body.descripcion;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_finalizacion = req.body.fecha_finalizacion;

    const nuevaeventos = {};
    nuevaeventos.titulo = titulo;
    nuevaeventos.categoria = categoria;
    nuevaeventos.autor = autor;
    nuevaeventos.tags = tags;
    nuevaeventos.imagen = imagen;
    nuevaeventos.descripcion = descripcion;
    nuevaeventos.fecha_inicio = fecha_inicio;
    nuevaeventos.fecha_finalizacion = fecha_finalizacion;

    // Guardar la tarea
    tarea = await eventos.findOneAndUpdate(
      { _id: req.params.id },
      nuevaeventos,
      {
        new: true,
      }
    );

    res.json({ eventos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
