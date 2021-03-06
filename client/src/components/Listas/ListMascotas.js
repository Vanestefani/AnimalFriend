import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Container, Card, CardTitle, CardBody, CardHeader } from "reactstrap";
import ItemMascota from "./ItemMascota";
import MascotasContext from "../../context/mascotas/mascotasContext";
import Skeleton from "react-loading-skeleton";
function ListMascotas() {
  const mContext = useContext(MascotasContext);
  const { loading, mascotas, mascotasUsuario } = mContext;

  useEffect(() => {
    mascotasUsuario();
  }, [mascotasUsuario]);

  return (
    <>
 {(mascotas.length ===0) ?
   (
    <Card>
          <p>No tienes añadida ninguna mascota</p>
            <Link to="/mis-mascotas" className="pull-right">
           Mis mascotas
          </Link>
          </Card>
          )   :
              ( <Card className="card-general">
              <Container className="container">
                <Link to="/mis-mascotas" className="pull-right">
                  Ver más
                </Link>
                <CardHeader>
                  <CardTitle className="title-up">
                    <center>
                      <h3><b>Mis mascotas</b></h3>
                    </center>
                  </CardTitle>
                </CardHeader>
                <CardBody>

                  {!loading ? (

                    mascotas.map((mascota) => (
                      <ItemMascota key={mascota._id} mascota={mascota}></ItemMascota>
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
            </Card>) }
    </>
  );
}

export default ListMascotas;
