import React, { useEffect, useRef, useContext, useState } from "react";
import PostContext from "../../context/post/postContext";
import AlertaContext from "../../context/alertas/alertaContext";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import ScrollNavbar from "../../components/Navbars/ScrollNavbar";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import PostList from "../../components/Post/PostList";
import Vistaprevi from "../../components/Galeria/vistaprevi";
import ListaAnuncio from "../../components/Listas/Anuncios/ListaAnuncio";

import ListaSeguidores from "../../components/Listas/Seguidores/ListaSeguidores";

import AuthContext from "../../context/autenticacion/authContext";

function Perfil({ match }) {
  const AContext = useContext(AuthContext);
  const { Showuserid, usuarioactual, usuario, seguir, noseguir } = AContext;
  const detailuserid = match.params.q;
  useEffect(() => {
    Showuserid(detailuserid);
  }, [detailuserid]);
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const postContext = useContext(PostContext);
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const { allpost, mensaje, publicaciones, getpost } = postContext;
  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    const autorId = match.params.q;
    console.log(match.params.q);
    getpost(autorId);
  }, []);
  const [showfollow, setShowFollow] = useState(
    !usuario.following.includes(usuarioactual._id) ? true : false
  );

  const follow = (e) => {
    e.preventDefault();
    seguir({ userId: usuarioactual._id });
    setShowFollow(false);
  };
  const unfollow = (e) => {
    e.preventDefault();
    noseguir({ userId: usuarioactual._id });
    setShowFollow(true);
  };

  const botonSeguir = () => {
    console.log(showfollow)
    if (showfollow==false)
      return (
        <Button onClick={unfollow} className="btn-round" color="info" size="lg">
          <i className="fas fa-plus-circle"></i> No Seguir
        </Button>
      );
    if (showfollow==true)
      return (
        <Button
          onClick={follow}
          className="btn-round"
          color="success"
          size="lg"
        >
          <i className="fas fa-plus-circle"></i> Seguir
        </Button>
      );
  };
  const next = () => {
    getpost(match.params.q);
  };

  return (
    <>
      <ScrollNavbar />
      <div className="wrapper">
        <ProfilePageHeader
          dato={usuarioactual}
          publicaciones={publicaciones}
        ></ProfilePageHeader>
        <div className="section">
          <Container>
            <div className="button-container">
              {usuarioactual._id == usuario._id ? (
                <Button className="btn-round" color="info" size="lg">
                  <i className="fas fa-plus-circle"></i> Editar
                </Button>
              ) : (
                botonSeguir()
              )}
            </div>

            {usuarioactual.bio != "" ? (
              <div>
                <h3 className="title">Sobre mi</h3>
                <h5 className="description">{usuarioactual.bio}</h5>
              </div>
            ) : (
              ""
            )}
          </Container>
          <div className="wrapper">
            <Container>
              <Row>
                <Col md="3">
                  <ListMascotas></ListMascotas>
                  <ListaSeguidores></ListaSeguidores>
                </Col>
                <Col md="6">
                  <SubMenu></SubMenu>
                  {usuarioactual._id == usuario._id ? (
                    <CrearPublicacion></CrearPublicacion>
                  ) : (
                    ""
                  )}
                  {publicaciones ? (
                    <PostList
                      publicaciones={publicaciones}
                      next={next}
                    ></PostList>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md="3">
                  <Vistaprevi></Vistaprevi>
                  <ListaAnuncio></ListaAnuncio>
                </Col>
              </Row>
            </Container>
            <DefaultFooter></DefaultFooter>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
