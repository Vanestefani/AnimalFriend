import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import PrivateRoute from "./PrivateRoute";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
//auth
const CambiarContraseñaPage = lazy(() =>
  import("./views/auth/CambiarContraseñaPage")
);
const LoginPage = lazy(() => import("./views/auth/LoginPage.js"));
const CrearCuentaPage = lazy(() => import("./views/auth/CrearCuentaPage"));
const VerificaCuentaPage = lazy(() => import("./views/auth/VerificaCuentaPage"));

const OlvidadoContraseñaPage = lazy(() =>
  import("./views/auth/OlvidadoContraseñaPage")
);
//pagina para eror 404
const NotFound = lazy(() => import("./views/NotFound"));
//pages
const Home = lazy(() => import("./views/Home/home"));
const Perfil = lazy(() => import("./views/Perfil/perfil"));
const Perfiluser = lazy(() => import("./views/Perfil/perfilUser"));
const PostUploadPage = lazy(() => import("./views/Post/PostUploadPage"));
const PostPage = lazy(() => import("./views/Post/PostPage"));
const HashtagPage = lazy(() => import("./views/Hashtag/HashtagPage"));
const LocationPage = lazy(() => import("./views/Location/LocationPage"));
const MessengerPage = lazy(() => import("./views/Messenger/MessengerPage"));
const Recordatorio = lazy(() => import("./views/Recordatorios/Recordatorio"));
const Anuncios = lazy(() => import("./views/Anuncios/Anuncios"));
const ExplorarPage = lazy(() => import("./views/ExplorarPage"));
const Following = lazy(() => import("./components/Following"));
const PerfilMascota = lazy(() => import("./views/Mascotas/PerfilMascota"));
const Mascotas = lazy(() => import("./views/Mascotas/Mascotas"));
const LandingPage = lazy(() => import("./views/examples/LandingPage.js"));
// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
console.log(process.env.REACT_APP_BACKEND_URL);
const AppWithRouter = () => (
  <AlertaState>
    <AuthState>
      <Router>
        <Suspense fallback={<div>Cargando...</div>}>

            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <Route
                exact
                path="/login"
                component={LoginPage}
              />
              <Route
                exact
                path="/register"
                component={CrearCuentaPage}

              />
                 <Route
                exact
                path="/verificar"
                component={VerificaCuentaPage}

              />

              <PrivateRoute exact path="/perfil" component={Perfil} />
              <PrivateRoute
                exact
                path="/posts/upload"
                component={PostUploadPage}
              />
              <PrivateRoute
                exact
                path="/messages/chat"
                component={MessengerPage}
              />

              <Route
                exact
                path="/auth/reset/password/:jwt"
                component={CambiarContraseñaPage}

              />

              <Route
                path="/olvido-contrasena"
                component={OlvidadoContraseñaPage}

              />
              <PrivateRoute exact path="/anuncios" component={Anuncios} />
              <PrivateRoute exact path="/explorar" component={ExplorarPage} />
              <PrivateRoute
                exact
                path="/recordatorios"
                component={Recordatorio}
              />
              <PrivateRoute exact path="/mascotas" component={Mascotas} />
              <PrivateRoute
                exact
                path="/perfil-mascota"
                component={PerfilMascota}
              />

              <Route component={NotFound} />
            </Switch>
        </Suspense>
      </Router>
    </AuthState>
  </AlertaState>
);

export default AppWithRouter;
