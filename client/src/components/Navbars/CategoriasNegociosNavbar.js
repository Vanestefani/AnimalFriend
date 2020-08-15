import React from "react";

// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";
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
              <i className="fas fa-globe"></i>
              Todas
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={ComidaClick}>
              <i className="fas fa-bone"></i>
              Comida
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={RopaClick}>
              <i className="fas fa-hat-wizard"></i>
              Ropa
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={JuguetesClick}>
              <i className="fas fa-volleyball-ball"></i>
              Juguetes
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={VeterinariaClick}>
              <i className="fas fa-clinic-medical"></i>
              Veterinaria
            </NavLink>
            <NavLink href="#AnimalFriend" onClick={PeluqueriaClick}>
              <i className="fas fa-cut"></i>
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
