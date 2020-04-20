import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import IndexNavbar from "./components/Navbars/IndexNavbar";
// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
//auth
import LoginPage from "./views/auth/LoginPage.js";
import CrearCuentaPage from "./views/auth/CrearCuentaPage";
import CambiarContraseñaPage from "./views/auth/CambiarContraseñaPage";
import OlvidadoContraseñaPage from "./views/auth/OlvidadoContraseñaPage";
//pages
import Home from "./views/Home/home";
import Perfil from "./views/Perfil/perfil";
import Mascotas from "./views/Mascotas/Mascotas";
import LandingPage from "./views/examples/LandingPage.js";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/landing-page"
              render={(props) => <LandingPage {...props} />}
            />
            <Route path="/home" render={(props) => <Home {...props} />} />
            <Route path="/perfil" render={(props) => <Perfil {...props} />} />
            <Route path="/mascotas" render={(props) => <Mascotas {...props} />} />

            <Route
              path="/crear-cuenta"
              render={(props) => <CrearCuentaPage {...props} />}
            />
            <Route
              exact
              path="/"
              render={(props) => <LoginPage {...props} />}
            />
            <Route
              path="/cambiar-contrasena"
              render={(props) => <CambiarContraseñaPage {...props} />}
            />
            <Route
              path="/olvido-contrasena"
              render={(props) => <OlvidadoContraseñaPage {...props} />}
            />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
