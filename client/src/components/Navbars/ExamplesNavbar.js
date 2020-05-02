import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// reactstrap components
import {
  UncontrolledTooltip,
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="#" id="navbar-brand">
              <Link to="/">
                <img
                  width="200px"
                  alt="..."
                  src={require("../../assets//img/Logotipo.png")}
                ></img>
              </Link>
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              <span className="badge badge-success">AnimalFriend</span> es todo
              un universo al universo entorno al mundo de las mascotas.Descubre
              lo ya!
            </UncontrolledTooltip>
            <button
              className="navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default ExamplesNavbar;
