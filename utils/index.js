const Datauri = require("datauri");
const path = require("path");

const cloudinary = require("../config/cloudinary");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD// naturally, replace both with your real credentials or an application-specific password
  }
});

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
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
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
