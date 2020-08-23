import React from "react";
// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";
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
            <NavLink to="#" onClick={allClick}>
            <i className="fas fa-globe"></i>
              Todas
            </NavLink>
            <NavLink to="#" onClick={VacunasClick}>
              <i className="fas fa-prescription-bottle-alt"></i>
              Vacunas
            </NavLink>
            <NavLink to="#" onClick={EstelirizacionClick}>
              <i className="fas fa-user-md"></i>
              Estelirización
            </NavLink>
            <NavLink to="#" onClick={CaminatasClick}>
              <i className="fas fa-hiking"></i>
              Caminatas
            </NavLink>
            <NavLink to="#" onClick={ConcursosClick}>
              <i className="fas fa-award"></i>
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
