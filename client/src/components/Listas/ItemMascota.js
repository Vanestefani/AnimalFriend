import React from "react";
import {
  Card,
  Badge,
  CardImg,
  CardTitle,
  CardBody,
  CardSubtitle,
  Button,
} from "reactstrap";

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
          <Badge color="info">{props.mascota.especie}</Badge>
        </CardSubtitle>
        <Button className="btn-info" size="sm">
          <i class="far fa-eye"></i>
        </Button>
      </CardBody>
    </>
  );
}

export default ItemMascota;
