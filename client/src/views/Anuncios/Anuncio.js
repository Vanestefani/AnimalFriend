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
  const AContex = useContext(AnunciosContex);
  const { getanuncio, anuncio } = AContex;
  useEffect(() => {
    const anuncioId = match.params.anuncioId;
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
                <CardBody>
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
                      <Button>Seguir</Button>
                    </Media>
                  </Media>
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
