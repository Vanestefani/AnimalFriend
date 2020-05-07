import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";
import AuthContext from "../../context/autenticacion/authContext";

function VerticalMenu() {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
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
                src={"/images/profile-picture/" + usuario.fotoPerfil}
                className="rounded-circle FotoUser "
              ></img>

              <p className="text-center">{usuario.nombre}</p>
            </NavLink>

            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <Link to="/eventos" className="text-dark">
                <i className="fas fa-calendar-alt"></i>
                Eventos
              </Link>
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <Link to="/negocios" className="text-dark">
                <i className="fas fa-store-alt"></i>
                Negocios
              </Link>
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
