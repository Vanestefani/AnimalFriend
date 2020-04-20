import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import Mascota from "./Mascota";
import Calendario from "../../components/Calendario/Calendario";
import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";

import { Link } from "react-router-dom";

function Mascotas() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper">
        <Container>
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
              <ListMascotas></ListMascotas>
            </Col>
            <Col md="6">
              <SubMenu></SubMenu>
              <h2 className="pull-left p-2"><b>Mascotas</b></h2>
              <Button className="pull-right">Agregar mascota</Button>
<Mascota></Mascota>
            </Col>
            <Col md="3">
              <Calendario></Calendario>
              <ListRecordatorios></ListRecordatorios>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Mascotas;
