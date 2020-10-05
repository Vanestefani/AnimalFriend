import React from "react";
import { Media, Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
function itemSeguidores(props) {
  return (
    <>
      <Media>
        <Media left top href="#">
          <Link to={"/perfil/" + props.usuario._id}>
            <Media
              object
              width="64px"
              src={props.usuario.fotoPerfil}
              alt={"foto de perfil de " + props.usuario.nombre}
            />
          </Link>
        </Media>
        <Media body>
          <Media heading>{props.usuario.nombre}</Media>
          {moment(new Date(props.usuario.fecha_creacion)).fromNow()}
        </Media>
      </Media>
    </>
  );
}

export default itemSeguidores;
