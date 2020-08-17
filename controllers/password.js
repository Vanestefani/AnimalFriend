const User = require("../models/User");
const { sendEmail } = require("../utils/index");
const host = process.env.HOST_FRONTEND; // FRONTEND Host
// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = async (req, res) => {
  try {
    const { email } = req.body;

   const user = await User.findOne({ email:{ $regex: email, $options:'i' } });

    if (!user)
      return res
        .status(401)
        .json({
          message:
            "La direccion de correo electronico " +
            req.body.email +
            " no está asociado con ninguna cuenta. Vuelva a verificar su dirección de correo electrónico e intente nuevamente.",
        });

    //Generate and set password reset token
    user.generatePasswordReset();

    // Save the updated user object
    await user.save();

    // send email
    let subject = "Solicitud de cambio de contraseña";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let link =
      "http://" + host + "/auth/reset/password/" + user.resetPasswordToken;
    let html = `<p>Hola ${user.nombre}</p>
                    <p>Por favor haga clic en el siguiente <a href="${link}">link</a> para restablecer tu contraseña.</p>
                    <p>Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.</p>`;

    await sendEmail({ to, from, subject, html });

    res
      .status(200)
      .json({
        message:
          "Se ha enviado un correo electrónico de reinicio a " +
          user.email +
          ".",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({
          message:
            "El token de restablecimiento de contraseña no es válido o ha expirado.",
        });

    //Redirect user to form with the email address
    res.render("reset", { user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(401)
        .json({
          message:
            "El token de restablecimiento de contraseña no es válido o ha expirado",
        });

    //Set the new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.isVerified = true;

    // Save the updated user object
    await user.save();

    let subject = "Tu contraseña ha sido cambiada";
    let to = user.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hola ${user.nombre}</p>
                    <p>Esta es una confirmación de que la contraseña de su cuenta ${user.email} acaba de ser cambiada</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({ message: "Su contraseña ha sido actualizada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
