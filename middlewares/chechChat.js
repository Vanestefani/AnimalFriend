const mongoose = require("mongoose");
const Chat = require("../models/Chat");

module.exports = (req, res, next) => {
  Chat.find({
    members: { $in: mongoose.Types.ObjectId(req.userData.userId) },
    _id: mongoose.Types.ObjectId(req.body.roomId)
  })
    .then(rooms => {
      if (rooms.length) {
        req.room = rooms[0];
        next();
      } else {
        return res.status(500).json({
          message: "Invalid room"
        });
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    });
};
