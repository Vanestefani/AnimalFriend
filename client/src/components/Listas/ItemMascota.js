import React from "react";
import { ListGroupItem, Badge } from "reactstrap";
function ItemMascota(props) {
  return (
    <>
      <ListGroupItem>
        <center>
          {" "}
          <img
            src={props.mascota.foto}
            className="rounded-circle FotoUser"
            width="60px"
          ></img>
        </center>
        <p>{props.mascota.nombre}</p>
        <Badge color="info" href="#pablo" onClick={(e) => e.preventDefault()}>
          {props.mascota.especie}
        </Badge>
      </ListGroupItem>
    </>
  );
}

export default ItemMascota;
