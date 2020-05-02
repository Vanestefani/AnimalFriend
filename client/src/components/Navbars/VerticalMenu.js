import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";

function VerticalMenu() {
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <NavLink
              className="active"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={require("../../assets/img/undraw_female_avatar_w3jk.png")}
                className="rounded-circle FotoUser "
              ></img>

              <p className="text-center">Nombre del usuario</p>
            </NavLink>

            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="far fa-calendar-alt"></i>
              Eventos
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-store-alt"></i>
              Negocios
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-map-marker-alt"></i>
              Animales perdidos
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-house-damage"></i>
              Adopciones
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-heart"></i>
              Emparejar
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i className="fas fa-book"></i>
              Normatividad
            </NavLink>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default VerticalMenu;
