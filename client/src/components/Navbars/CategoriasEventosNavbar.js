import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { NavLink, Nav, Container, Card, Button } from "reactstrap";
import Crear from "../../views/Eventos/Forms/crear";

function CategoriasEventosNavbar(props) {
  const VacunasClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Vacunas",
    });
  };
  const EstelirizacionClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Estelirización",
    });
  };
  const CaminatasClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Caminatas",
    });
  };
  const ConcursosClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Concursos",
    });
  };

  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <h3>Categorias</h3>
            <NavLink href="#" onClick={VacunasClick}>
              <i class="fas fa-prescription-bottle-alt"></i>
              Vacunas
            </NavLink>
            <NavLink href="#" onClick={EstelirizacionClick}>
              <i class="fas fa-user-md"></i>
              Estelirización
            </NavLink>
            <NavLink href="#" onClick={CaminatasClick}>
              <i class="fas fa-hiking"></i>
              Caminatas
            </NavLink>
            <NavLink href="#" onClick={ConcursosClick}>
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
