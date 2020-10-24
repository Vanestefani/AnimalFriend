import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  ListGroup,
  Container,
  Media,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import ItemSeguidores from "./itemSeguidores";
import AuthContext from "../../../context/autenticacion/authContext";

function ListaSeguidoresusuario() {
  const AContext = useContext(AuthContext);
  const { alluser, usuarios } = AContext;
  useEffect(() => {
    alluser();
  }, [usuarios]);
  return (
    <>
      <Card >
        <CardTitle>
          <center>
            {" "}
            <h3>
              <b>Nuevos usuarios</b>
            </h3>
          </center>
        </CardTitle>

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
      </Card>
    </>
  );
}

export default ListaSeguidoresusuario;
