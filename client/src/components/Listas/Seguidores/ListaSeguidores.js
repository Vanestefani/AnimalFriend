import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  ListGroup,
  Container,
  Media,
  CardTitle,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import ItemSeguidores from "./itemSeguidores";
import AuthContext from "../../../context/autenticacion/authContext";

function ListaSeguidores() {
  const AContext = useContext(AuthContext);
  const { alluser, usuarios } = AContext;
  useEffect(() => {
    alluser();
  }, [usuarios]);
  return (
    <>
      <Container className="container">
        <h3>Mis seguidores</h3>
        <Media list>
          {usuarios
            ? usuarios.map((usuario) => (
                <ListGroup flush>
                  <Media tag="li">
                    <ItemSeguidores usuario={usuario}></ItemSeguidores>
                  </Media>
                </ListGroup>
              ))
            : ""}
        </Media>
      </Container>
    </>
  );
}

export default ListaSeguidores;
