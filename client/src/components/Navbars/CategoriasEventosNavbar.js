import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card, Button } from "reactstrap";
import Crear from "../../views/Eventos/Forms/crear";

function CategoriasEventosNavbar() {
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <h3>Categorias</h3>
            <NavLink  href="#AnimalFriend"  onClick={(e) => e.preventDefault()}>
              <i class="fas fa-prescription-bottle-alt"></i>
              Vacunas
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-user-md"></i>
              Estelirización
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-hiking"></i>
              Caminatas
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-award"></i>
              Concursos
            </NavLink>
            <Crear></Crear>

          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default CategoriasEventosNavbar;
