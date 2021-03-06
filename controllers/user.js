const mongoose = require("mongoose");
const fs = require("fs");
const User = mongoose.model("users");
const Post = require("../models/Post");
const Notification = require("../models/Notificacion");
const {
  uploader,
  sendEmail,
  checkFileTypem,
  storage,
  upload,
} = require("../utils/index");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  const users = await User.find({})
    .where("_id")
    .ne(req.user._id)
    .sort("-fecha_creacion")
    .limit(30);
  res.status(200).json({ users });
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
  try {
    const { email } = req.body;

    // Make sure this account doesn't already exist
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });

    if (user)
      return res.status(401).json({
        message:
          "La direccion de correo electronico ingresado ya está asociado con otra cuenta. ",
      });

    const password = "_" + Math.random().toString(36).substr(2, 9); //generate a random password
    const newUser = new User({ ...req.body, password });

    const user_ = await newUser.save();

    //Generate and set password reset token
    user_.generatePasswordReset();

    // Save the updated user object
    await user_.save();

    //Get mail options
    let domain = "http://" + req.headers.host;
    let subject = "Nueva cuenta creada";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link =
      "http://" +
      req.headers.host +
      "/api/auth/reset/" +
      user.resetPasswordToken;
    let html = `<p>Hola ${user.nombre}<p><br><p>Se ha creado una nueva cuenta para usted en ${domain}. Por favor haga clic en el siguiente link  para configurar su contraseña e iniciar sesión:
    </br> <a href="${link}">${link}</a>
       </p>
                  <br><p>
                  Si no solicitó esto, ignore este correo electrónico.</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "Se ha enviado un correo electrónico a " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) return res.status(401).json({ message: "El usuario no existe" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.changefoto = async function (req, res) {
  try {
    const id = req.params.id;
    const userId = req.user._id;

    //Attempt to upload to cloudinary
    const result = await uploader(req);

    const user_ = await User.findByIdAndUpdate(
      userId,

      { $set: { fotoPerfil: result.url } },
      { new: true }
    );

    return res
      .status(200)
      .json({ user: user_, message: "El usuario ha sido actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async (req, res) => {
  try {
    const update = req.body;
    const id = req.params.id;
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true }
    );

    //if there is no image, return success message
    if (!req.file)
      return res
        .status(200)
        .json({ user, message: "El usuario ha sido actualizado" });

    //Attempt to upload to cloudinary
    const result = await uploader(req);
    const user_ = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { $set: { fotoPerfil: result.url } },
      { new: true }
    );

    if (!req.file)
      return res
        .status(200)
        .json({ user: user_, message: "El usuario ha sido actualizado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
  try {
    const id = req.params.id;
    const user_id = req.user._id;

    //Make sure the passed id is that of the logged in user

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "El usuario ha sido eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchUsersByNombre = (req, res) => {
  if (req.body.q) {
    User.find({
      nombre: new RegExp("^" + req.body.q, "i"),
    })
      .limit(10)
      .select("nombre fotoPerfil pais ciudad genero bio   ")
      .then((user) => {
        return res.status(200).json({ user });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
};

exports.addFollowing = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { following: req.body.userId },
      },
      {
        new: true,
      }
    ).catch((err) => {
      console.log(err);
    }),
      User.findByIdAndUpdate(
        req.body.userId,
        {
          $push: { followers: req.user.id },
        },
        {
          new: true,
        }
      )
        .then((user) => {
          res.json({ user: user });
        })
        .catch((err) => {
          console.log(err);
        });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.unFollow = async (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { following: req.body.userId },
      },
      {
        new: true,
      }
    ).catch((err) => {
      console.log(err);
    }),
      User.findByIdAndUpdate(
        req.body.userId,
        {
          $pull: { followers: req.user.id },
        },
        {
          new: true,
        }
      )
        .then((user) => {
          res.json({ user: user });
        })
        .catch((err) => {
          console.log(err);
        });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.deleteUser = (req, res) => {
  User.remove({ _id: req.user.id }).then((result) => {
    res
      .status(200)
      .json({
        message: "Usuario eliinar",
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};
