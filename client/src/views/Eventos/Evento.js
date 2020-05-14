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
import EventosContex from "../../context/eventos/eventosContex";

import Editar from "./Forms/editar";

function Eventos({ match }) {
  const EContex = useContext(EventosContex);
  const { getevento, evento } = EContex;
  useEffect(() => {
    const eventoId = match.params.eventoId;
    getevento(eventoId);
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
            {evento ? (
              <div>
                <CardImg
                  top
                  width="400px"
                  height="400px"
                  src={evento.imagen}
                  alt="Card image cap"
                ></CardImg>
                <CardBody>
                  <CardTitle>
                    <h1 className="text-center">{evento.titulo}</h1>
                  </CardTitle>
                  <CardSubtitle>
                    <center>
                      <Badge color="primary"> {evento.categoria}</Badge>
                    </center>
                  </CardSubtitle>
                  <CardText>{evento.descripcion}</CardText>
                </CardBody>
                <CardFooter>
                  <Media>
                    <Link to={"/perfil/" + evento.autor._id}>
                      <Media left top href="#">
                        <Media
                          object
                          width="64px"
                          src={evento.autor.fotoPerfil}
                          alt="Generic placeholder image"
                        />
                      </Media>
                    </Link>

                    <Media body>
                      <Media heading>
                        <Link to={"/perfil/" + evento.autor._id}>
                          <b>Autor :</b>
                          {evento.autor.nombre}
                        </Link>
                      </Media>
                      <Button>Seguir</Button>
                    </Media>
                  </Media>
                </CardFooter>
              </div>
            ) : (
              <p>Este evento no existe o fue eliminado</p>
            )}
          </Card>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Eventos;
