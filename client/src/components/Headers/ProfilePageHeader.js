import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div className="page-header-image" ref={pageHeader}></div>
        <Container>
          <div >
            <img
              className=" photo-container rounded-circle FotoUser"
              alt="..."
              src={props.usuario.fotoPerfil}
            ></img>
          </div>
          <h3 className="title">{props.usuario.nombre}</h3>
          <p className="category">{props.usuario.pais}</p>
          <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Publicaciones</p>
            </div>
            <div className="social-description">
              <h2>26</h2>
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
