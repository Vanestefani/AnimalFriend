import React from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

import { Link } from "react-router-dom";

function Mascota(props) {
  return (
    <>
      <Col md="6">
        <div className="team-player">
          <img
            alt="..."
            className="rounded-circle img-fluid img-raised"
            src={props.mascota.foto}
          ></img>
          <h4 className="title">{props.mascota.nombre}</h4>
          <span className="badge badge-primary">{props.mascota.especie}</span>
          <br></br>
          <Button
            className="btn-info "
            color="info"
            to="#AnimalFriend"
            onClick={(e) => e.preventDefault()}
          >
            <i className="far fa-eye"></i>
            Ver más
          </Button>
        </div>
      </Col>
    </>
  );
}

export default Mascota;
