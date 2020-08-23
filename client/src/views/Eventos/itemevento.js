import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  CardText,
  CardSubtitle,
  Card,
  CardTitle,
  CardImg,
  CardBody,
  Col,
} from "reactstrap";

function Itemevento(props) {
  return (
    <>
      <div>
        <Col md="6">
          <Card>
            <CardImg
              top
              width="80px"
              height="100px"
              src={props.evento.imagen}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{props.evento.titulo}</CardTitle>
              <CardSubtitle>{props.evento.categoria}</CardSubtitle>
              <CardText>{props.evento.descripcion}</CardText>
              <Link to={"/evento/" + props.evento._id} className="btn btn-info">
                Ver más
              </Link>
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  );
}

export default Itemevento;
