require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// Setting up port
mongoose.connect(process.env.MOGOURI || "mongodb://localhost/my_database", {
  useNewUrlParser: true,
});

let PORT = process.env.PORT || 5000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//socket i.o
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  socket.on('example_message', function(msg){
    console.log('message: ' + msg);
  });
});
io.listen(8000);

//form-urlencoded

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB --  database connection established successfully!")
);
connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//=== 4 - CONFIGURE ROUTES
//Configure Route
require("./routes/api/index")(app);
const postsRouter = require("./routes/api/post");
app.use("/api/post/", postsRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//=== 5 - START SERVER
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT + "/")
);
