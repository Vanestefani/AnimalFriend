const mongoose = require("mongoose");
const Chatroom =require("../models/Chatroom");

exports.createChatroom = async (req, res) => {
  const { nombre } = req.body;

  const nombreRegex = /^[A-Za-z\s]+$/;

  if (!nombreRegex.test(nombre)) throw "Chatroom nombre can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ nombre });

  if (chatroomExists) throw "Chatroom with that nombre already exists!";

  const chatroom = new Chatroom({
    nombre,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};