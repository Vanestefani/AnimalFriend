import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import withAnalytics, { initAnalytics } from "react-with-analytics";
import "./App.css";
import createHistory from "history/createBrowserHistory";

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
import PerfilMascota from "./views/Mascotas/PerfilMascota";
import Mascotas from "./views/Mascotas/Mascotas";
import LandingPage from "./views/examples/LandingPage.js";
import Recordatorios from "./views/Recordatorios/Recordatorio";
import Anuncios from "./views/Anuncios/Anuncios";
import NotFound from "./views/NotFound";
import ExplorarPage from "./views/ExplorarPage";
import Following from "./components/Following";

initAnalytics("UA-126201794-1");
export const history = createHistory();
const Root = () => (
  <Switch>
    <Route
      path="/landing-page"
      render={(props) => <LandingPage {...props} />}
    />
    <Route path="/seguidores" render={(props) => <Following {...props} />} />

    <Route path="/anuncios" render={(props) => <Anuncios {...props} />} />
    <Route path="/explorar" render={(props) => <ExplorarPage {...props} />} />

    <Route  exact  path="/" render={(props) => <Home {...props} />} />
    <Route path="/perfil" render={(props) => <Perfil {...props} />} />
    <Route
      path="/recordatorios"
      render={(props) => <Recordatorios {...props} />}
    />
    <Route path="/mascotas" render={(props) => <Mascotas {...props} />} />
    <Route
      path="/perfil-mascota"
      render={(props) => <PerfilMascota {...props} />}
    />
    <Route exact
      path="/crear-cuenta"
      render={(props) => <CrearCuentaPage {...props} />}
    />
    <Route path="/login" render={(props) => <LoginPage {...props} />} />
    <Route
      path="/cambiar-contrasena"
      render={(props) => <CambiarContraseñaPage {...props} />}
    />
    <Route
      path="/olvido-contrasena"
      render={(props) => <OlvidadoContraseñaPage {...props} />}
    />
    <Route component={NotFound} />
  </Switch>
);

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
