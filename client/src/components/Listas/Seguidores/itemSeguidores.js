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
        <Media body top>
          <Link to={"/perfil/" + props.usuario._id}>
            <Media>
              <span>{props.usuario.nombre}</span>
            </Media>
          </Link>
          <span>
            {moment(new Date(props.usuario.fecha_creacion)).fromNow()}
          </span>
        </Media>
      </Media>
    </>
  );
}

export default itemSeguidores;
