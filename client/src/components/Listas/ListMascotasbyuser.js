import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Container, Card, CardTitle, CardBody, CardHeader } from "reactstrap";
import ItemMascota from "./ItemMascota";
import MascotasContext from "../../context/mascotas/mascotasContext";
import Skeleton from "react-loading-skeleton";
function ListMascotas({ props }) {
  const mContext = useContext(MascotasContext);
  const { loading, mascotas } = mContext;

  return (
    <>
      {mascotas.length === 0 ? (
        <Card className="card-general text-center">
           <Container className="container">

          <CardHeader>
            <CardTitle className="title-up">
              <center>
                <h3>Mis mascotas</h3>
              </center>
            </CardTitle>
          </CardHeader>
          <CardBody>
          <h3>No hay ninguna mascota añadida 🐾</h3>
          </CardBody>
          </Container>
        </Card>
      ) : (
        <Card className="card-general">
          <Container className="container">
            <Link to="/mis-mascotas" className="pull-right">
              Ver más
            </Link>
            <CardHeader>
              <CardTitle className="title-up">
                <center>
                  <h3>Mis mascotas</h3>
                </center>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {!loading ? (
                mascotas.map((mascota) => (
                  <ItemMascota
                    key={mascota._id}
                    mascota={mascota}
                  ></ItemMascota>
                ))
              ) : (
                <center>
                  <Skeleton
                    circle={true}
                    height={100}
                    width={100}
                    animation="wave"
                    variant="rect"
                  />

                  <Skeleton
                    height={30}
                    width={100}
                    animation="wave"
                    variant="rect"
                  />
                  <Skeleton
                    height={30}
                    width={100}
                    animation="wave"
                    variant="rect"
                  />
                </center>
              )}
            </CardBody>
          </Container>
        </Card>
      )}
    </>
  );
}

export default ListMascotas;
