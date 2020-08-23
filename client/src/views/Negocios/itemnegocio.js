import React, { useContext } from "react";
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

function Itemnegocio(props) {
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
              <Link
                to={"/negocio/" + props.negocio._id}
                className="btn btn-info"
              >
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
