import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import UsuariosState from "./context/usuarios/userState";
import PostState from "./context/post/postState";
import RecordatoriosState from "./context/recordatorios/recordatoriosState";
import AnunciosState from "./context/anuncios/anunciosState";
import EventosState from "./context/eventos/eventosState";
import NegociosState from "./context/negocios/negociosState";

import MascotasState from "./context/mascotas/mascotasState";

import tokenAuth from "./config/token";
import PrivateRoute from "./PrivateRoute";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
import Loading from './components/Loading';
//auth
const CambiarContraseñaPage = lazy(() =>
  import("./views/auth/CambiarContraseñaPage")
);
const LoginPage = lazy(() => import("./views/auth/LoginPage.js"));
const CrearCuentaPage = lazy(() => import("./views/auth/CrearCuentaPage"));
const VerificaCuentaPage = lazy(() =>
  import("./views/auth/VerificaCuentaPage")
);

const OlvidadoContraseñaPage = lazy(() =>
  import("./views/auth/OlvidadoContraseñaPage")
);
//pagina para eror 404
const NotFound = lazy(() => import("./views/NotFound"));
//pages
const Home = lazy(() => import("./views/Home/home"));
const Perfil = lazy(() => import("./views/Perfil/perfil"));

const Verificado = lazy(() => import("./views/auth/verificado"));

const MessengerPage = lazy(() => import("./views/Messenger/MessengerPage"));
const Recordatorio = lazy(() => import("./views/Recordatorios/Recordatorio"));
const Anuncios = lazy(() => import("./views/Anuncios/Anuncios"));
const Anuncio = lazy(() => import("./views/Anuncios/Anuncio"));

const Eventos = lazy(() => import("./views/Eventos/Eventos"));
const Evento = lazy(() => import("./views/Eventos/Evento"));
const Chatbot = lazy(() => import("./views/chatbot/chatbot"));

const Negocios = lazy(() => import("./views/Negocios/Negocios"));
const Negocio = lazy(() => import("./views/Negocios/Negocio"));

const ExplorarPage = lazy(() => import("./views/ExplorarPage"));
const PerfilMascota = lazy(() => import("./views/Mascotas/PerfilMascota"));
const Mascotas = lazy(() => import("./views/Mascotas/Mascotas"));
const MisMascotas = lazy(() => import("./views/Mascotas/MisMascotas"));

// Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

const AppWithRouter = () => (
  <MascotasState>
    {" "}
    <EventosState>
      <AnunciosState>
        <NegociosState>
          <RecordatoriosState>
            <PostState>
              <AlertaState>
                <AuthState>
                  <UsuariosState>
                    <Router>
                      <Suspense fallback={<Loading></Loading>}>
                        <Switch>
                          <PrivateRoute exact path="/home" component={Home} />
                          <Route exact path="/" component={LoginPage} />
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
                          <Route
                            exact
                            path="/verify/:token"
                            component={Verificado}
                          />

                          <PrivateRoute
                            exact
                            path="/perfil/:q"
                            component={Perfil}
                          />

                          <Route
                            exact
                            path="/auth/reset/password/:token"
                            component={CambiarContraseñaPage}
                          />

                          <Route
                            path="/olvido-contrasena"
                            component={OlvidadoContraseñaPage}
                          />

                          <PrivateRoute
                            exact
                            path="/anuncios"
                            component={Anuncios}
                          />
                            <PrivateRoute
                            exact
                            path="/chatbot"
                            component={Chatbot}
                          />
                          <PrivateRoute
                            exact
                            path="/eventos"
                            component={Eventos}
                          />
                          <PrivateRoute
                            path="/evento/:eventoId"
                            component={Evento}
                          />
                          <PrivateRoute
                            path="/anuncio/:anunciosId"
                            component={Anuncio}
                          />

                          <PrivateRoute
                            path="/negocio/:negocioId"
                            component={Negocio}
                          />

                          <PrivateRoute
                            exact
                            path="/negocios"
                            component={Negocios}
                          />

                          <PrivateRoute
                            exact
                            path="/explorar"
                            component={ExplorarPage}
                          />
                          <PrivateRoute
                            exact
                            path="/recordatorios"
                            component={Recordatorio}
                          />
                          <PrivateRoute
                            exact
                            path="/mascotas"
                            component={Mascotas}
                          />
                          <PrivateRoute
                            exact
                            path="/mis-mascotas"
                            component={MisMascotas}
                          />
                          <PrivateRoute
                            exact
                            path="/perfil-mascota/:m"
                            component={PerfilMascota}
                          />

                          <Route component={NotFound} />
                        </Switch>
                      </Suspense>
                    </Router>
                  </UsuariosState>
                </AuthState>
              </AlertaState>
            </PostState>
          </RecordatoriosState>
        </NegociosState>
      </AnunciosState>
    </EventosState>
  </MascotasState>
);

export default AppWithRouter;
