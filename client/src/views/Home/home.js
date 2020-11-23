import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
// core components
import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListaUsuariosNuevos from "../../components/Listas/Seguidores/ListaUsuariosNuevos";

import CrearPublicacion from "../../components/Post/CrearPublicacion";
import PostList from "../../components/Post/PostList";
import PostContext from "../../context/post/postContext";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";
function Home() {
  const postContext = useContext(PostContext);
  const alertaContext = useContext(AlertaContext);
  const AContext = useContext(AuthContext);
  const { mostrarAlerta } = alertaContext;
  const { usuario } = AContext;
  const { allpost, mensaje, publicaciones } = postContext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    allpost(usuario._id);
  }, [mensaje, usuario]);

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
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
            </Col>
            <Col md="6">
              <CrearPublicacion></CrearPublicacion>
              <PostList publicaciones={publicaciones} next={allpost}></PostList>
            </Col>
            <Col md="3">
            <ListaUsuariosNuevos></ListaUsuariosNuevos>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Home;
