import React, { useContext } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavLink,
  Nav,
  Container,
  Card,
  Badge,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import AuthContext from "../../context/autenticacion/authContext";

function VerticalMenu() {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  return (
    <>
      <Card className="card-general">
        <Container>
          <Nav className="flex-column" tag="nav">
            <NavLink className="active" onClick={(e) => e.preventDefault()}>
              <Link to={"/perfil/" + usuario._id}>
                <img
                  src={usuario.fotoPerfil}
                  className="rounded-circle FotoUser shadow"
                ></img>
                <p className="text-center">
                  {" "}
                  <Badge color="primary" pill>
                    {usuario.nombre}
                  </Badge>
                </p>
              </Link>
            </NavLink>
            <ListGroup>
              <ListGroupItem tag="a" href="#"  onClick={(e) => e.preventDefault()}>
                <Link to="/eventos">
                  <i className="fas fa-calendar-alt"></i>
                  Eventos
                </Link>
              </ListGroupItem>
              <ListGroupItem tag="a" href="#"  onClick={(e) => e.preventDefault()}>
              <Link to="/negocios">
                <i className="fas fa-store-alt"></i>
                Negocios </Link>
              </ListGroupItem>
              <ListGroupItem tag="a" href="#AnimalFriend" onClick={(e) => e.preventDefault()}>
                <Link to="/anuncios">
                  <i className="fas fa-map-marker-alt"></i>
                  Anuncios
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Nav>
        </Container>
      </Card>
    </>
  );
}

export default VerticalMenu;
