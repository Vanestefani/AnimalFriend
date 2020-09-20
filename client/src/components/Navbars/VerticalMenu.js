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
                  <br></br>
                  <Badge color="primary" pill>
                    {usuario.nombre.substr(0, 16)}
                  </Badge>
                </p>
              </Link>
            </NavLink>

            <ListGroup>
              <ListGroupItem tag="a" to="#" onClick={(e) => e.preventDefault()}>
                <Link to={"/perfil/" + usuario._id}>
                  <i class="fas fa-user-edit"></i>
                  Mi perfil
                </Link>
              </ListGroupItem>
              <ListGroupItem tag="a" to="#" onClick={(e) => e.preventDefault()}>
                <Link to="/negocios">
                  <i class="fas fa-paw"></i>
                  Mis mascotas
                </Link>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                to="#AnimalFriend"
                onClick={(e) => e.preventDefault()}
              >
                <Link to="/recordatorios">
                <i class="fas fa-clock"></i>
                  Recordatorios
                </Link>
              </ListGroupItem>
            </ListGroup>

            <ListGroup>
              <ListGroupItem tag="a" to="#" onClick={(e) => e.preventDefault()}>
                <Link to="/eventos">
                  <i className="fas fa-calendar-alt"></i>
                  Eventos
                </Link>
              </ListGroupItem>
              <ListGroupItem tag="a" to="#" onClick={(e) => e.preventDefault()}>
                <Link to="/negocios">
                  <i className="fas fa-store-alt"></i>
                  Negocios{" "}
                </Link>
              </ListGroupItem>
              <ListGroupItem
                tag="a"
                to="#AnimalFriend"
                onClick={(e) => e.preventDefault()}
              >
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
