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
    cb(new Error("Only images are allowed"));
  }
}

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: (req, file, cb) => {
    cb(null, "./public/images/profile-picture/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, uuidv4() + "." + ext);
  },
});

const upload = multer({
    //multer settings
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
    limits: {
      fileSize: 1024 * 1024,
    },
  }).single("photo");
  exports.upload = (req, res, next) => {
    upload(req, res, (err) => {
      if (err) return res.json({ message: err.message });

      if (!req.file) return res.json({ message: "Please upload a file" });

      req.body.photo = req.file.filename;

      Jimp.read(req.file.path, function (err, test) {
        if (err) throw err;
        test
          .resize(100, 100)
          .quality(50)
          .write("./public/images/profile-picture/100x100/" + req.body.photo);
        next();
      });
    });
  };

module.exports = { checkFileType, sendEmail, storage };
