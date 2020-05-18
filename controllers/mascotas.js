const Mascota = require("../models/Mascotas");
const { uploader, sendEmail } = require("../utils/index");
exports.createMascota = async (req, res) => {
  try {
    const result = await uploader(req);
    const nombre = req.body.nombre;
    const especie = req.body.especie;
    const raza = req.body.raza;
    const genero = req.body.genero;
    const chip = req.body.chip;
    const estatura = req.body.estatura;
    const estelerizado = req.body.estelerizado;
    const peligroso = req.body.peligroso;
    const alergias = req.body.alergias;
    const personalidad = req.body.personalidad;
    const fecha_nacimiento = req.body.fecha_nacimiento;
    const descripcion = req.body.descripcion;
    const color = req.body.color;
    const propietario = req.body.propietario;
    const newmascotas = new Mascota({
      nombre: nombre,
      especie: especie,
      raza: raza,
      genero: genero,
      chip: chip,
      estatura: estatura,
      estelerizado: estelerizado,
      peligroso: peligroso,
      alergias: alergias,
      personalidad: personalidad,
      fecha_nacimiento: fecha_nacimiento,
      descripcion: descripcion,
      color: color,
      foto: result.url,
      propietario: propietario,
    });

    const mascotas_ = await newmascotas.save().then((result) => {
      res.json({ mascotas_: result });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.mascotasByUser = async (req, res) => {
  try {
    Mascota.find({ propietario: req.user._id })
      .populate("propietario", "_id nombre ")
      .then((mascotas) => {
        res.json({ mascotas });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.mascotasByPerfil = async (req, res) => {
  try {
    Mascota.find({ propietario: req.params.p })
      .populate("propietario", "_id nombre ")
      .then((mascotas) => {
        res.json({ mascotas });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.mascota = async (req, res) => {
  try {
    Mascota.findOne({_id: req.params.m})
      .populate("propietario", "_id nombre fotoPerfil")
      .then((mascota) => {
        res.json({ mascota });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.deletemascotas = async (req, res) => {
  try {
    Mascota.findOne({ _id: req.params.mascotasId })
      .populate("propietario", "_id")
      .exec((err, mascotas) => {
        if (err || !mascotas) {
          return res.status(422).json({ error: err });
        }
        if (mascotas.propietario._id.toString() === req.user._id.toString()) {
          mascotas
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
    let mascotas = await mascotas.findById(req.params.id);

    const nuevamascotas = {};
    nuevamascotas.nombre = req.body.nombre;
    nuevamascotas.especie = req.body.especie;
    nuevamascotas.raza = req.body.raza;
    nuevamascotas.genero = req.body.genero;
    nuevamascotas.chip = req.body.chip;
    nuevamascotas.estatura = req.body.estatura;
    nuevamascotas.estelerizado = req.body.estelerizado;
    nuevamascotas.peligroso = req.body.peligroso;
    nuevamascotas.alergias = req.body.alergias;
    nuevamascotas.personalidad = req.body.personalidad;
    nuevamascotas.fecha_nacimiento = req.body.fecha_nacimiento;
    nuevamascotas.descripcion = req.body.descripcion;
    nuevamascotas.color = req.body.color;
    nuevamascotas.foto = req.body.foto;
    nuevamascotas.propietario = req.body.propietario;

    // Guardar la tarea
    tarea = await Mascota.findOneAndUpdate(
      { _id: req.params.id },
      nuevamascotas,
      {
        new: true,
      }
    );

    res.json({ mascotas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
