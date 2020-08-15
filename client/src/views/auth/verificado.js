import React, { useContext, useEffect } from "react";

import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import { Link } from "react-router-dom";
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";

import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import {
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Card,
  Alert,
} from "reactstrap";

function Verificado({ match }) {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, verificado } = authContext;

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  useEffect(() => {
    const token = localStorage.setItem("token", match.params.token);

    verificado();
  }, []);

  return (
    <>
      <ExamplesNavbar />

      <div className="page-header clear-filter" filter-color="green">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/pet-fondo.jfif") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
           <Card className="card-login">

              <CardHeader>
                <CardTitle>
                  <h2 className="text-dark">Verificación</h2>
                </CardTitle>
              </CardHeader>
              <CardBody>
                {mensaje ? (
                  <Alert color={mensaje.categoria}>
                    <i className="fas fa-exclamation-triangle"></i>
                    {mensaje.msg}
                  </Alert>
                ) :  <Alert color="success">
                <i className="fas fa-exclamation-triangle"></i>
               Su cuenta a sido verificado ,inicie sesión
              </Alert>}
                <div className="pull-right">
                  <h6 className="text-dark">
                    <Link   to="/">
                      Iniciar Sesión
                    </Link>
                  </h6>
                </div>
                <div className="pull-left pl-2">
                  <h6 className="text-dark" color="dark">
                    <Link  to="/verificar">
                      Verificar cuenta
                    </Link>
                  </h6>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
        <TransparentFooter></TransparentFooter>
      </div>
    </>
  );
}

export default Verificado;
