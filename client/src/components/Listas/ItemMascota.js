import React from "react";
import { Badge, CardImg, CardTitle, CardBody, CardSubtitle } from "reactstrap";
import { Link } from "react-router-dom";

function ItemMascota(props) {
  return (
    <>
      <CardImg
        className="rounded-circle FotoUser "
        top
        width="100%"
        src={props.mascota.foto}
        alt={"Foto de" + props.mascota.nombre}
      />
      <CardBody className="text-center border-bottom border-info mb-1">
        <CardTitle>{props.mascota.nombre}</CardTitle>
        <CardSubtitle>
          <Badge color="info">
            {props.mascota.especie}/{props.mascota.raza}
          </Badge>
        </CardSubtitle>
        <Link
          to={"/perfil-mascota/" + props.mascota._id}
          className="btn btn-info"
        >
          <i className="far fa-eye"></i>
        </Link>
      </CardBody>
    </>
  );
}

export default ItemMascota;
