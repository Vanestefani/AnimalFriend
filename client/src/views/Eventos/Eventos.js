import React, { useState, useContext, useEffect, useRef } from "react";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  Button,
  CardBody,
} from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";

import CategoriasEventosNavbar from "../../components/Navbars/CategoriasEventosNavbar";
import { Link } from "react-router-dom";
import EventosContex from "../../context/eventos/eventosContex";
import Crear from "./Forms/crear";
import Editar from "./Forms/editar";
import Itemevento from "./itemevento";

function Eventos() {
  const EContex = useContext(EventosContex);
  const { eventosUsuario, eventos } = EContex;
  useEffect(() => {
    eventosUsuario();
  }, []);
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
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h3>Eventos</h3>
                    <Crear></Crear>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {
                  eventos?

                  eventos.length === 0 ? (
                    <p>No hay eventos, añade uno </p>
                  ) : (
                    eventos.map((evento) => (
                      <Itemevento key={evento._id} evento={evento}></Itemevento>
                    ))
                  ): <p>No hay eventos, añade uno </p>}
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <CategoriasEventosNavbar></CategoriasEventosNavbar>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Eventos;
