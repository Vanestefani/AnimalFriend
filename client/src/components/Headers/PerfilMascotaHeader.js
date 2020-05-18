import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import Loading from '../Loading';
// core components

function PerfilMascotaHeader(props) {
  let pageHeader = React.createRef();

  return (
    <>
    {props.dato?  <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div className="page-header-image" ref={pageHeader}></div>
        <Container>
          <div >
            <img className="photo-container rounded-circle FotoUser" alt="..." src={props.dato.foto}></img>
          </div>
          <h3 className="title">{props.dato.nombre}</h3>
          <span className="badge badge-pill badge-primary">{props.dato.especie}/{props.dato.raza}</span>
        </Container>
      </div>:<Loading></Loading>}

    </>
  );
}

export default PerfilMascotaHeader;
