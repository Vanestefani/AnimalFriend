import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();

  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div className="page-header-image" ref={pageHeader}></div>
        <Container>
          <div>
            <img
              className=" photo-container rounded-circle FotoUser"
              alt="..."
              src={props.dato.fotoPerfil}
            ></img>
          </div>
          <h3 className="title">{props.dato.nombre}</h3>
          <p className="category">{props.dato.pais}</p>
          <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Publicaciones</p>
            </div>
            <div className="social-description">
              <h2>{props.publicaciones.lenght}</h2>
              <p>Anuncios</p>
            </div>
            <div className="social-description">
              <h2>3</h2>
              <p>Seguidores</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
