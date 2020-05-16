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
            <NavLink className="active" onClick={(e) => e.preventDefault()}>
              <Link to={"/perfil/" + usuario._id}>
                <img
                  src={usuario.fotoPerfil}
                  className="rounded-circle FotoUser "
                ></img>
                <p className="text-center">{usuario.nombre}</p>
              </Link>
            </NavLink>

            <NavLink href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
              <Link to="/eventos">
                <i className="fas fa-calendar-alt"></i>
                Eventos
              </Link>
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
              <Link to="/negocios">
                <i className="fas fa-store-alt"></i>
                Negocios
              </Link>
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
              <Link to="/anuncios">
                <i className="fas fa-map-marker-alt"></i>
                Anuncios
              </Link>
            </NavLink>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default VerticalMenu;
