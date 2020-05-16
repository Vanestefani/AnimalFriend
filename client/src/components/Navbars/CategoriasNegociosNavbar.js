import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card, Button } from "reactstrap";
import Crear from "../../views/Negocios/Forms/crear";

function CategoriasNegociosNavbar(props) {
  const ComidaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Comida",
    });
  };
  const RopaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Ropa",
    });
  };
  const JuguetesClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Juguetes",
    });
  };
  const VeterinariaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Veterinaria",
    });
  };
  const PeluqueriaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Peluqueria",
    });
  };

  const allClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "",
    });
  };
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <h3>Categorias</h3>
            <NavLink href="#" onClick={allClick}>
              <i class="fas fa-globe"></i>
              Todas
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={ComidaClick}>
              <i class="fas fa-bone"></i>
              Comida
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={RopaClick}>
              <i class="fas fa-hat-wizard"></i>
              Ropa
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={JuguetesClick}>
              <i class="fas fa-volleyball-ball"></i>
              Juguetes
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={VeterinariaClick}>
              <i class="fas fa-clinic-medical"></i>
              Veterinaria
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={PeluqueriaClick}>
              <i class="fas fa-cut"></i>
              Peluqueria
            </NavLink>

            <Crear></Crear>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default CategoriasNegociosNavbar;
