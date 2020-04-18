import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  ListGroupItem,
  ListGroup,
  Container,
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  CardFooter,
} from "reactstrap";
import ItemMascota from './ItemMascota';
function ListMascotas() {
  return (
    <>
      <Card className="card-general">
        <Container className="container">
          <CardHeader >
            <CardTitle className="title-up">
                <h3>Mis mascotas</h3></CardTitle>
          </CardHeader>
          <CardBody>
            <ListGroup flush>
             <ItemMascota></ItemMascota>
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

export default ListMascotas;
