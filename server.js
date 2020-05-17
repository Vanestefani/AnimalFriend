require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
require("./socketio");
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
//=== 5 - START SERVER
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT + "/")
);
