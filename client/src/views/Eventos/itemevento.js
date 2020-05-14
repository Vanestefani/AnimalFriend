import React, { useState, useContext, useEffect, useRef } from "react";

// reactstrap components
import {
  Container,
  CardText,
  CardSubtitle,
  Card,
  CardTitle,
  CardImg,
  Button,
  CardBody,
} from "reactstrap";

import EventosContex from "../../context/eventos/eventosContex";

import Editar from "./Forms/editar";

function Itemevento(props) {
  const EContex = useContext(EventosContex);
  const { eventosUsuario, eventos } = EContex;

  return (
    <>
      <div>
        <Card>
          <CardImg
            top
            width="100%"
            src={props.evento.imagen}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{props.evento.titulo}</CardTitle>
            <CardSubtitle>{props.evento.categoria}</CardSubtitle>
            <CardText>{props.evento.descripcion}</CardText>
            <Button>Ver mas</Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Itemevento;
