import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import AuthContext from "../../context/autenticacion/authContext";
function usuariosItem(props) {
  return (
    <>
      <Col md="4">
        <Card>
          <CardImg
            top
            width="100%"
            src={props.data.fotoPerfil}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{props.data.nombre}</CardTitle>
            <CardSubtitle>{props.data.pais}</CardSubtitle>

            <Link to={"/perfil/" + props.data._id} className="btn btn-info">
              Ver más
            </Link>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default usuariosItem;
