import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card, Button } from "reactstrap";

function CategoriasEventosNavbar() {
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <h3>Categorias</h3>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-prescription-bottle-alt"></i>
              Vacunas
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-user-md"></i>
              Estelirización
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-hiking"></i>
              Caminatas
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-award"></i>
              Concursos
            </NavLink>

            <Button className="pull-left">Agregar anuncio</Button>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default CategoriasEventosNavbar;
