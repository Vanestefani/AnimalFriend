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
import Evento from "./itemeventoento.js";

function Eventos() {
  const EContex = useContext(EventosContex);
  const { eventosUsuario, evento } = EContex;

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
          <Card>
            <CardImg
              top
              width="100%"
              src={evento.imagen}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{evento.titulo}</CardTitle>
              <CardSubtitle>{evento.categoria}</CardSubtitle>
              <CardText>{evento.descripcion}</CardText>
            </CardBody>
          </Card>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Eventos;
