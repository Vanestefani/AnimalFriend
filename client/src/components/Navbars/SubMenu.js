import React  from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

function SubMenu() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
         <Link>Ultimas noticias</Link>
        </BreadcrumbItem>
        <BreadcrumbItem > <Link>Mi actividad</Link></BreadcrumbItem>
        <BreadcrumbItem > <Link>Tips</Link></BreadcrumbItem>
      </Breadcrumb>
    </>
  );
}

export default SubMenu;
