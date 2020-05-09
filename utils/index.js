const Datauri = require("datauri");
const path = require("path");
const multer = require("multer");

const cloudinary = require("../config/cloudinary");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function uploader(req) {
  return new Promise((resolve, reject) => {
    const dUri = new Datauri();

    let image = dUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );

    cloudinary.uploader.upload(image.content, (err, url) => {
      if (err) return reject(err);
      return resolve(url);
    });
  });
}

function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    sgMail.send(mailOptions, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes."));
  }
}

module.exports = { checkFileType, sendEmail, uploader };
