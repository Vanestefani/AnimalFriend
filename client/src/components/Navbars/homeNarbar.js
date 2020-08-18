import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  UncontrolledTooltip,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { history } from "../../_helpers/history";
import AuthContext from "../../context/autenticacion/authContext";
function HomeNarbar() {
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [user, setUser] = useState({
    activePath: "",
  });

  React.useEffect(() => {
    history.listen((location) => {
      setUser({ activePath: location.pathname });
    });

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
      <Navbar className="fixed-top bg-degrado" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand href="#" id="navbar-brand">
              <Link to="/home">
                <img
                  width="200px"
                  alt="..."
                  src={require("../../assets/img/Logotipo.png")}
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
                      <Link to={"/perfil/" + usuario._id} className="text-dark">
                        <i className="fas fa-user-astronaut"></i>
                        Perfil
                      </Link>
                    </DropdownItem>
                    <DropdownItem onClick={(e) => e.preventDefault()}>
                      <Link to="/mis-mascotas" className="text-dark">
                        <i className="fas fa-paw"></i>
                        Mis Mascotas
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      href="#AnimalFriend"
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

export default HomeNarbar;
