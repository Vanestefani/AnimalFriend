import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Col, Button } from "reactstrap";
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
          <Link
            to={"/perfil-mascota/" + props.mascota._id}
            className="btn btn-info btn-sm"
          >
            <i className="far fa-eye"></i>
          </Link>
          {props.mascota.propietario._id == props.usuario._id ? (
            <Link className="btn btn-info btn-sm">EDITAR</Link>
          ) : (
            " "
          )}
        </div>
      </Col>
    </>
  );
}

export default Mascota;
