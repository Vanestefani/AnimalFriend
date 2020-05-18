import React, {  useContext } from "react";

import HomeNarbar from "../components/Navbars/homeNarbar";
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar";

import TransparentFooter from "../components/Footers/TransparentFooter.js";
import { Link } from "react-router-dom";

import AlertaContext from "../context/alertas/alertaContext";
import AuthContext from "../context/autenticacion/authContext";
import { CardBody, CardHeader, CardTitle, Container, Card } from "reactstrap";

function NotFound() {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado } = authContext;

  return (
    <>
      {autenticado ? (
        <HomeNarbar></HomeNarbar>
      ) : (
        <ExamplesNavbar></ExamplesNavbar>
      )}
      <div className="page-header clear-filter" filter-color="green">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../assets/img/pet-fondo.jfif") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 className="text-dark">404</h2>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <h2 className="text-dark">Página no encontrada</h2>
                <img width="400px" src={ require("../assets/img/404 Error with a cute animal-pana.svg")}></img>
                <p className="text-dark">
                  Lo sentimos, parece que falta la página que estás buscando.
                </p>
<Link to="/" className="btn btn-info">Volver</Link>
              </CardBody>
            </Card>
          </Container>
        </div>
        <TransparentFooter></TransparentFooter>
      </div>
    </>
  );
}

export default NotFound;
