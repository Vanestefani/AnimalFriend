const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
// Config dotev
require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

// body parser
app.use(bodyParser.json())
//Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
// configuracio solo para envirioment  develoment
//morgan da informacion de cada request
//cors evita problemas con react
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  app.use(morgan("dev"));
  //Cargar RUTAS
  const authRouter = require("./routes/auth.route");
  //USAR RUTAS
  app.use("/api", authRouter);
  //Error 404
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      msg: "Pagina no encontrada",
    });
  });
}
