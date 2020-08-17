const User = require("../models/User");
const Token = require("../models/token");
const { sendEmail } = require("../utils/index");

// @route POST api/auth/register
// @desc Register user
// @access Public
exports.register = async (req, res) => {
  try {
    const { email } = req.body;

    // Make sure this account doesn't already exist
   const user = await User.findOne({ email:{ $regex: email, $options:'i' } });

    if (user)
      return res.status(401).json({
        message:
          "La dirección de correo electrónico que ingresó ya está asociada con otra cuenta.",
      });

    const newUser = new User({ ...req.body });

    const user_ = await newUser.save();

    await sendVerificationEmail(user_, req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route POST api/auth/login
// @desc Login user and return JWT token
// @access Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email:{ $regex: email, $options:'i' } });

    if (!user)
      return res.status(401).json({
        message:
          "La direccion de correo electronico " +
          email +
          ", no está asociado con ninguna cuenta. Vuelva a verificar su dirección de correo electrónico e intente nuevamente.",
      });

    //validate password
    if (!user.comparePassword(password))
      return res
        .status(401)
        .json({ message: "Correo electrónico o contraseña no válidos" });

    // Make sure the user has been verified
    if (!user.isVerified)
      return res.status(401).json({
        type: "not-verified",
        message: "Tu cuenta no ha sido verificada.",
      });

    // Login successful, write token, and send back user
    res.status(200).json({ token: user.generateJWT(), user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
exports.verify = async (req, res) => {
  if (!req.params.token)
    return res
      .status(400)
      .json({ message: "No pudimos encontrar un usuario para este token." });

  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });

    if (!token)
      return res.status(400).json({
        message: "No pudimos encontrar un token válido. Tu ficha ha expirado.",
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user)
        return res.status(400).json({
          message: "No pudimos encontrar un usuario para este token.",
        });

      if (user.isVerified)
        return res
          .status(400)
          .json({ message: "Este usuario ya ha sido verificado." });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });

        res
          .status(200)
          .send("La cuenta ha sido verificada. Por favor Iniciar sesión.");
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
exports.resendToken = async (req, res) => {
  try {
    const { email } = req.body;
   const user = await User.findOne({ email:{ $regex: email, $options:'i' } });
    if (!user)
      return res.status(401).json({
        message:
          "La direccion de correo electronico " +
          req.body.email +
          " , no está asociado con ninguna cuenta. Vuelva a verificar su dirección de correo electrónico e intente nuevamente.",
      });
    if (user.isVerified)
      return res.status(400).json({
        message: "Esta cuenta ya ha sido verificada. Por favor Iniciar sesión.",
      });

    await sendVerificationEmail(user, req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
async function sendVerificationEmail(user, req, res) {
  try {
    const token = user.generateVerificationToken();

    // Save the verification token
    await token.save();

    let subject = "Token de verificación de cuenta";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link = "http://" + process.env.HOST_FRONTEND + "/verify/" + token.token;
    let html = `<p>Hola ${user.nombre}<p><br><p>Por favor haga clic en el siguiente <a href="${link}">link</a> para verificar tu cuenta.</p>
                  <br><p>Si no solicitó esto, ignore este correo electrónico.</p>`;

    await sendEmail({ to, from, subject, html });
    res.status(200).json({
      message: "Un email de verificación ha sido enviado a " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.usuarioAutenticado = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(401).json({ message: "El usuario no existe" });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
