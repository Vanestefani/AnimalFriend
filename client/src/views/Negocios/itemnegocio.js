import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
  Col,
} from "reactstrap";

import NegociosContex from "../../context/negocios/negociosContex";

import Editar from "./Forms/editar";

function Itemnegocio(props) {
  const EContex = useContext(NegociosContex);
  const { negociosUsuario, negocios } = EContex;

  return (
    <>
      <div>
        <Col md="6">
          <Card>
            <CardImg
              top
              width="80px"
              height="100px"
              src={props.negocio.imagen}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{props.negocio.titulo}</CardTitle>
              <CardSubtitle>{props.negocio.categoria}</CardSubtitle>
              <CardText>{props.negocio.descripcion}</CardText>
              <Link to={"/negocio/"+props.negocio._id} className="btn btn-info">
                Ver más
              </Link>
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  );
}

export default Itemnegocio;
