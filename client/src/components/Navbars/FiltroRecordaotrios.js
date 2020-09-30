import React from "react";
// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";

function FiltroRecordaotrios(props) {
  const CumpleañosClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Cumpleaños",
    });
  };
  const VacunasClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Vacunas",
    });
  };
  const DesparasitarClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Desparasitar",
    });
  };
  const PeluqueriaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Peluqueria",
    });
  };

  const MedicinasClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Medicinas",
    });
  };
  const PaseosClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Paseos",
    });
  };
  const GuarderiaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Guarderia",
    });
  };

  const VeterinariaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Veterinaria",
    });
  };
  const ComidaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Comida",
    });
  };
  const OtroClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Otro",
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
            <NavLink to="#" onClick={CumpleañosClick}>
              <i class="fas fa-birthday-cake" width="300px"></i>
              Cumpleaños
            </NavLink>
            <NavLink to="#" onClick={VacunasClick}>
              <i class="fas fa-syringe" width="300px"></i>
              Vacunas
            </NavLink>
            <NavLink to="#" onClick={DesparasitarClick}>
              <i class="fas fa-bug" width="300px"></i>
              Desparasitar
            </NavLink>
            <NavLink to="#" onClick={PeluqueriaClick}>
              <i class="fas fa-cut" width="300px"></i>
              Peluqueria
            </NavLink>
            <NavLink to="#" onClick={PeluqueriaClick}>
              <i class="fas fa-cut" width="300px"></i>
              Peluqueria
            </NavLink>
            <NavLink to="#" onClick={PaseosClick}>
              <i class="fas fa-trees" width="300px"></i>
              Paseos
            </NavLink>
            <NavLink to="#" onClick={MedicinasClick}>
              <i class="fas fa-trees" width="300px"></i>
              Medicinas
            </NavLink>

            <NavLink to="#" onClick={GuarderiaClick}>
              <i class="fas fa-home" width="300px"></i>
              Guarderia
            </NavLink>
            <NavLink to="#" onClick={VeterinariaClick}>
              <i class="fas fa-stethoscope" width="300px"></i>
              Veterinaria
            </NavLink>
            <NavLink to="#" onClick={ComidaClick}>
              <i class="fas fa-bone" width="300px"></i>
              Comida
            </NavLink>
            <NavLink to="#" onClick={OtroClick}>
              <i class="fas fa-clock" width="300px"></i>
              Otro
            </NavLink>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default FiltroRecordaotrios;
