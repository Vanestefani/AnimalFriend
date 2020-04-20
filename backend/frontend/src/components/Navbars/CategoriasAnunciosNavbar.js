import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card,Button } from "reactstrap";

function CategoriasAnunciosNavbar() {
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
           <h3>Categorias</h3>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-thumbtack"></i>
             Mis anuncios
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-binoculars"></i>
             Mascotas perdidas
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-hand-holding-heart"></i>
             Adopciones
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="fas fa-map-pin"></i>
              Animales encontrados
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
              <i class="fas fa-house-damage"></i>
              Adopciones
            </NavLink>
            <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
            <i class="far fa-grin-hearts"></i>
              Emparejar
            </NavLink>
            <Button className="pull-left" >Agregar anuncio</Button>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default CategoriasAnunciosNavbar;
