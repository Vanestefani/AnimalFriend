import React, { useState, useContext, useEffect, useRef } from "react";

// reactstrap components
import {
  Container,
  CardImg,
  CardText,
  Col,
  Card,
  CardTitle,
  CardHeader,
  Table,
  Button,
  CardBody,
  CardSubtitle,
  CardFooter,
  Media,
  Badge,
} from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";

import { Link } from "react-router-dom";
import AnunciosContext from "../../context/anuncios/anunciosContext";

import Editar from "./Forms/editar";

function Anuncios({ match }) {
  const AContex = useContext(AnunciosContext);
  const { getanuncio, anuncio } = AContex;
  useEffect(() => {
    const anuncioId = match.params.anunciosId;
    console.log(anuncioId);
    getanuncio(anuncioId);
  }, []);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper">
        <Container>
          <Card>
            {anuncio ? (
              <div>
                <CardImg
                  top
                  width="400px"
                  height="400px"
                  src={anuncio.imagen}
                  alt="Card image cap"
                ></CardImg>
                <CardBody className="m-2">
                  <CardTitle>
                    <h1 className="text-center">{anuncio.titulo}</h1>
                  </CardTitle>
                  <CardSubtitle>
                    <center>
                      <Badge color="primary"> {anuncio.categoria}</Badge>
                    </center>
                  </CardSubtitle>
                  <CardText>{anuncio.descripcion}</CardText>
                </CardBody>
                <CardFooter>
                  <Media>
                    <Link to={"/perfil/" + anuncio.autor._id}>
                      <Media left top href="#">
                        <Media
                          object
                          width="64px"
                          src={anuncio.autor.fotoPerfil}
                          alt="Generic placeholder image"
                        />
                      </Media>
                    </Link>

                    <Media body>
                      <Media heading>
                        <Link to={"/perfil/" + anuncio.autor._id}>
                          <b>Autor :</b>
                          {anuncio.autor.nombre}
                        </Link>
                      </Media>
                      <Link
                        to={"/perfil/" + anuncio.autor._id}
                        className="btn btn-info"
                      >
                        Ver perfil
                      </Link>
                    </Media>
                  </Media>
                  <Card className="card-general">
                    <Container className="m-2">
                      <p>
                        <b>Nombre de mascota:</b> {anuncio.mascota.nombre}
                      </p>
                      <p>
                        <b>Especie:</b> {anuncio.mascota.especie}
                      </p>
                      <p>
                        <b>Raza:</b> {anuncio.mascota.raza}
                      </p>

                      <Table>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>
                              <i className="fas fa-birthday-cake"></i>
                              <b>Fecha de Nacimiento :</b>
                            </td>
                            <td>{anuncio.mascota.fecha_nacimiento}</td>
                          </tr>
                          <tr>
                            <th scope="row">1</th>
                            <td>
                              <i className="fas fa-palette"></i>Color principal
                              :
                            </td>
                            <td>{anuncio.mascota.color}</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>
                              <i className="fas fa-heart"></i>Situación
                              sentimental :
                            </td>
                            <td>{anuncio.mascota.civil}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>
                              <i className="fas fa-microchip"></i>N° Chip :
                            </td>
                            <td>{anuncio.mascota.chip}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>
                              <i className="fas fa-user-md"></i> Estelerizado:
                            </td>
                            <td>{anuncio.mascota.estelerizado}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>
                              <i className="fas fa-exclamation-triangle"></i>
                              <b> Peligroso:</b>
                            </td>
                            <td>{anuncio.mascota.peligroso}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>
                              <i className="fas fa-ruler"></i>
                              <b> Tamaño:</b>
                            </td>
                            <td>{anuncio.mascota.estatura}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>
                              <i className="fas fa-notes-medical"></i>
                              <b> Alergias:</b>
                            </td>
                            <td>{anuncio.mascota.alergias}</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>
                              <i className="fas fa-dragon"></i>
                              <b> Personalidad:</b>
                            </td>
                            <td>{anuncio.mascota.personalidad}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Container>
                  </Card>
                  <br></br>
                </CardFooter>
              </div>
            ) : (
              <p>Este anuncio no existe o fue eliminado</p>
            )}
          </Card>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Anuncios;
