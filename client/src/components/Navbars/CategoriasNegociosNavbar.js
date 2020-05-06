import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card, Button } from "reactstrap";

function CategoriasNegociosNavbar() {
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <h3>Categorias</h3>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-bone"></i>
              Comida
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-hat-wizard"></i>
              Ropa
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-volleyball-ball"></i>
              Juguetes
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-clinic-medical"></i>
              Veterinaria
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-cut"></i>
              Peluqueria
            </NavLink>

            <Button className="pull-left">Agregar anuncio</Button>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default CategoriasNegociosNavbar;
