import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  UncontrolledTooltip,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import AuthContext from "../../context/autenticacion/authContext";

function ScrollNavbar() {
  const authContext = useContext(AuthContext);
  const { mensaje, usuario, cerrarSesion } = authContext;

  const [user, setUser] = useState({
    activePath: "",
  });
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("bg-degrado");
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
              <Link to="/home">
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
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav className="ml-auto mt-2" navbar>
              <NavItem>
                <NavLink href="/home" onClick={(e) => e.preventDefault()}>
                  <Link to="/home">
                    <i className="fas fa-home"></i>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    href="#"
                    nav
                  >
                    <p>Crear</p>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link to="/eventos" className="text-dark">
                        <i className="fas fa-calendar-alt"></i>
                        Evento
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link to="/anuncios" className="text-dark">
                        <i className="fas fa-newspaper"></i>
                        Anuncio
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link to="/negocios" className="text-dark">
                        <i className="fas fa-store-alt"></i>
                        Negocio
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => e.preventDefault()}>
                  <Link to="/explorar">
                    <i className="fas fa-globe"></i>
                    <p>Explorar</p>
                  </Link>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink onClick={(e) => e.preventDefault()}>
                  <Link to="/messages/chat">
                    <i className="fas fa-comments"></i>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    href="#"
                    nav
                  >
                    <i className="fas fa-bell"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link className="text-dark">Notificacion prueba</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
              <NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    href="#"
                    nav
                  >
                    <img
                      src={usuario.fotoPerfil}
                      className="rounded-circle FotoUser"
                    ></img>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link to="/myperfil" ClassName="text-dark">
                        <i className="fas fa-user-astronaut"></i>
                        Perfil
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <i className="fas fa-paw"></i>
                      Mascotas
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-cogs"></i>
                      Configuración
                    </DropdownItem>
                    <DropdownItem onClick={() => cerrarSesion()}>
                      <i className="fas fa-sign-in-alt"></i>
                      Cerrar sesión
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ScrollNavbar;
