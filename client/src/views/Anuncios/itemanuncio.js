import React, {useContext } from "react";
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

import AnunciosContext from "../../context/anuncios/anunciosContext";

import Editar from "./Forms/editar";

function Itemanuncio(props) {
  const EContex = useContext(AnunciosContext);
  const { anunciosUsuario, anuncios } = EContex;

  return (
    <>
      <div>
        <Col md="6">
          <Card>
            <CardImg
              top
              width="80px"
              height="100px"
              src={props.anuncio.imagen}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{props.anuncio.titulo}</CardTitle>
              <CardSubtitle>{props.anuncio.categoria}</CardSubtitle>
              <CardText>{props.anuncio.descripcion}</CardText>
              <Link to={"/anuncio/"+props.anuncio._id} className="btn btn-info">
                Ver más
              </Link>
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  );
}

export default Itemanuncio;
