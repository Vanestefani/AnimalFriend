import React from "react";
import { ListGroupItem, Button } from "reactstrap";
import { Link } from "react-router-dom";

function ItemAnuncio(props) {
  return (
    <>
      {props.data ? (
        <ListGroupItem className="shadow p-3 mb-5 bg-white rounded">
          <center>
            <img
              src={props.data.imagen}
              className="rounded-circle FotoUser"
              width="60px"
              atl=""
            ></img>
          </center>
          <p>
            {props.data.titulo}
            <Link to={"/anuncio/" + props.data._id} className="btn btn-info">
              Ver más
            </Link>
          </p>
        </ListGroupItem>
      ) : (
        ""
      )}
    </>
  );
}

export default ItemAnuncio;
