import React  from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function SubMenu(props) {
  return (
    <>
      <Breadcrumb>
      {props.usuarioactual._id === props.usuario._id ?
        (<BreadcrumbItem>
         <Link to="/recordatorios">Recordatorios</Link>
        </BreadcrumbItem>)
        : " "}
        <BreadcrumbItem>
         <Link to="/mis-mascotas">Mascotas</Link>
        </BreadcrumbItem>
        <BreadcrumbItem > <Link>Siguiendo</Link></BreadcrumbItem>
        <BreadcrumbItem > <Link>Seguidores</Link></BreadcrumbItem>
        <BreadcrumbItem > <Link>Anuncios</Link></BreadcrumbItem>
        <BreadcrumbItem > <Link>Negocios</Link></BreadcrumbItem>

      </Breadcrumb>
    </>
  );
}

export default SubMenu;
