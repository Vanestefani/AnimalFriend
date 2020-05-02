import React from "react";
import { ListGroupItem, Button } from "reactstrap";
function ItemAnuncio() {
  return (
    <>
      <ListGroupItem className="shadow p-3 mb-5 bg-white rounded">
        <center>
          <img
            src={require("../../../assets/img/undraw_female_avatar_w3jk.png")}
            className="rounded-circle FotoUser"
            width="60px"
            atl=""
          ></img>

        </center>
        <p>
          Nombre de anuncio
          <Button className="btn-round " color="neutral" size="sm">
            <i className="fas fa-plus-circle"></i>Ver más
          </Button>
        </p>
      </ListGroupItem>
    </>
  );
}

export default ItemAnuncio;
