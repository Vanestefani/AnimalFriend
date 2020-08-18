import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
// core components
import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import PostList from "../../components/Post/PostList";
import PostContext from "../../context/post/postContext";
import AlertaContext from "../../context/alertas/alertaContext";
import Calendario from "../../components/Calendario/Calendario";

import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";
function Home() {
  const postContext = useContext(PostContext);
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const { allpost, mensaje, publicaciones } = postContext;
  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    allpost();
  }, [mensaje]);
  useEffect(() => {
    allpost();
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
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
              <ListMascotas></ListMascotas>
            </Col>
            <Col md="6">
              <CrearPublicacion></CrearPublicacion>
              <PostList publicaciones={publicaciones} next={allpost}></PostList>
            </Col>
            <Col md="3">

              <ListRecordatorios></ListRecordatorios>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Home;
