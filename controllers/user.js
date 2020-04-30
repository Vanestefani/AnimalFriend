const User = require("../models/user");
const { uploader, sendEmail } = require("../utils/index");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
  try {
    const { email } = req.body;

    // Make sure this account doesn't already exist
    const user = await User.findOne({ email });

    if (user)
      return res
        .status(401)
        .json({
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
    let html = `<p>Hola ${user.nombre}<p><br><p>Se ha creado una nueva cuenta para usted en ${domain}. Por favor haga clic en el siguiente <a href="${link}">link</a>
        para configurar su contraseña e iniciar sesión.</p>
                  <br><p>
                  Si no solicitó esto, ignore este correo electrónico.</p>`;

    await sendEmail({ to, from, subject, html });

    res
      .status(200)
      .json({
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

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;
    const userId = req.user._id;

    //Make sure the passed id is that of the logged in user
    if (userId.toString() !== id.toString())
      return res
        .status(401)
        .json({
          message:
            "Lo sentimos, no tienes permiso para actualizar estos datos.",
        });

    const user = await User.findByIdAndUpdate(
      id,
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
      { $set: { profileImage: result.url } },
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
    if (user_id.toString() !== id.toString())
      return res
        .status(401)
        .json({
          message: "Lo sentimos, no tienes permiso para eliminar estos datos.",
        });

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "El usuario ha sido eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
