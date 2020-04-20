import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function PerfilMascotaHeader() {
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
          <div className="photo-container">
            <img alt="..." src={require("../../assets//img/ryan.jpg")}></img>
          </div>
          <h3 className="title">Nombre de usuario</h3>
          <span class="badge badge-pill badge-primary">Especie</span>
        </Container>
      </div>
    </>
  );
}

export default PerfilMascotaHeader;
