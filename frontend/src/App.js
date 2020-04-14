import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import IndexNavbar from "./components/Navbars/IndexNavbar";
// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
// pages for this kit
import Index from "./views/Index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/auth/LoginPage.js";
import CrearCuentaPage from "./views/auth/CrearCuentaPage";

import LandingPage from "./views/examples/LandingPage.js";
import ProfilePage from "./views/examples/ProfilePage.js";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/index" render={(props) => <Index {...props} />} />
            <Route
              path="/nucleo-icons"
              render={(props) => <NucleoIcons {...props} />}
            />
            <Route
              path="/landing-page"
              render={(props) => <LandingPage {...props} />}
            />
            <Route
              path="/profile-page"
              render={(props) => <ProfilePage {...props} />}
            />
            <Route path="/login" render={(props) => <LoginPage {...props} />} />
            <Route path="/crear-cuenta" render={(props) => <CrearCuentaPage {...props} />} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
