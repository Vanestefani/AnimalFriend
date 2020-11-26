import React, { useContext, useEffect } from "react";

// reactstrap components
import {
  Container,
  CardImg,
  CardText,
  Card,
  CardTitle,
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
import NegociosContex from "../../context/negocios/negociosContex";
import Editar from "./Forms/editar";

function Negocios({ match }) {
  const EContex = useContext(NegociosContex);
  const { getnegocio, negocio } = EContex;
  useEffect(() => {
    const negocioId = match.params.negocioId;
    getnegocio(negocioId);
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
      <div className="wrapper content_home">
        <Container>
          <Card>
            {negocio ? (
              <div>
                <CardImg
                  top
                  width="400px"
                  height="400px"
                  src={negocio.imagen}
                  alt="Card image cap"
                ></CardImg>
                <CardBody>
                  <CardTitle>
                    <h1 className="text-center">{negocio.titulo}</h1>
                  </CardTitle>
                  <CardSubtitle>
                    <center>
                      <Badge color="primary"> {negocio.categoria}</Badge>
                    </center>
                  </CardSubtitle>
                  <CardText>{negocio.descripcion}</CardText>
                </CardBody>
                <CardFooter>
                  <Media>
                    <Link to={"/perfil/" + negocio.autor._id}>
                      <Media left top href="#">
                        <Media
                          object
                          width="64px"
                          src={negocio.autor.fotoPerfil}
                          alt="Generic placeholder image"
                        />
                      </Media>
                    </Link>

                    <Media body>
                      <Media heading>
                        <Link to={"/perfil/" + negocio.autor._id}>
                          <b>Autor :</b>
                          {negocio.autor.nombre}
                        </Link>
                      </Media>
                    </Media>
                  </Media>
                </CardFooter>
              </div>
            ) : (
              <p>Este negocio no existe o fue eliminado</p>
            )}
          </Card>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Negocios;
