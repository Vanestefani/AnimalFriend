import React, { useState } from "react";
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

function HomeNarbar() {
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
      <Navbar className="bg-degrado" expand="lg">
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
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Form
              className="form-inline pull-left m-1"
              data-background-color=""
            >
              <InputGroup className="has-white">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Buscar" type="text"></Input>
              </InputGroup>
            </Form>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" onClick={(e) => e.preventDefault()}>
                  <Link to="/">
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
              <NavItem></NavItem>
              <NavItem>
                <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-comments"></i>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="fas fa-bell"></i>
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
                      src={require("../../assets/img/undraw_female_avatar_w3jk.png")}
                      className="rounded-circle FotoUser"
                    ></img>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-user-astronaut"></i>
                      Perfil
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
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
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
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
