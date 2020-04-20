import React from "react";
import { ListGroupItem, Badge } from "reactstrap";
function ItemMascota() {
  return (
    <>
      <ListGroupItem>
        <center>
          {" "}
          <img
            src={require("../../assets/img/undraw_female_avatar_w3jk.png")}
            className="rounded-circle FotoUser"
            width="60px"
          ></img>
        </center>
        <p>Nombre de mascota</p>
        <Badge color="info" href="#pablo" onClick={(e) => e.preventDefault()}>
          Especie
        </Badge>
      </ListGroupItem>
    </>
  );
}

export default ItemMascota;
