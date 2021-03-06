import React from "react";

// reactstrap components
import { NavLink, Nav, Container, Card } from "reactstrap";
import Crear from "../../views/Anuncios/Forms/crear";

function CategoriasAnunciosNavbar(props) {
  const MascotaPerdidaaClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Mascotas Perdidas",
    });
  };
  const AdopcionesClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Adopciones",
    });
  };
  const AnimalesencontradosClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Animales encontrados",
    });
  };
  const EmparejarClick = (e) => {
    e.preventDefault();
    props.setbusqueda({
      ...props.busqueda,
      search: "Emparejar",
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
            <NavLink to="#AnimalFriend" onClick={MascotaPerdidaaClick}>
              <i className="fas fa-binoculars"></i>
              Mascotas perdidas
            </NavLink>
            <NavLink to="#AnimalFriend" onClick={AdopcionesClick}>
              <i className="fas fa-hand-holding-heart"></i>
              Adopciones
            </NavLink>
            <NavLink to="#AnimalFriend" onClick={AnimalesencontradosClick}>
              <i className="fas fa-map-pin"></i>
              Animales encontrados
            </NavLink>

            <NavLink to="#AnimalFriend" onClick={EmparejarClick}>
              <i className="far fa-grin-hearts"></i>
              Emparejar
            </NavLink>
            <Crear></Crear>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default CategoriasAnunciosNavbar;
