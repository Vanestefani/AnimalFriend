import React, { useState, useContext, useEffect, useRef } from "react";
// reactstrap components
import { Container, Row, Col, Card, Badge, CardBody, Button } from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";
import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";

function Recordatorio() {
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
      <div className="wrapper content_home">
        <Container>
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
              <ListMascotas></ListMascotas>
            </Col>
            <Col md="6" className="card">

              <ListRecordatorios></ListRecordatorios>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Recordatorio;
