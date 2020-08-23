import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  ListGroup,
  Container,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import ItemSeguidores from "./itemSeguidores";

function ListaSeguidores() {
  return (
    <>
      <Card className="card-general">
        <Container className="container">
          <CardHeader>
            <CardTitle className="title-up">
              <h3>Mis seguidores</h3>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <ListGroup flush>
              <ItemSeguidores></ItemSeguidores>
            </ListGroup>
          </CardBody>
          <CardFooter>
            <Link className="pull-right">Ver más</Link>
          </CardFooter>
        </Container>
      </Card>
    </>
  );
}

export default ListaSeguidores;
