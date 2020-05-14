import React, { useEffect, useRef, useContext } from "react";

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

import UsuarioContext from "../../context/usuarios/usuarioContext";

function Perfil({ match }) {
  const UContext = useContext(UsuarioContext);
  const { Showuserid, usuarioactual } = UContext;
  useEffect(() => {
    const detailuserid = match.params.q;
    Showuserid(detailuserid);
  }, []);
  let pageHeader = React.createRef();

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>
      <ScrollNavbar />
      <div className="wrapper">
        <ProfilePageHeader dato={usuarioactual}></ProfilePageHeader>
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                <i className="fas fa-plus-circle"></i> Seguir
              </Button>
            </div>
            <h3 className="title">Sobre mi</h3>
            {usuarioactual.bio != "" ? (
              <h5 className="description">{usuarioactual.bio}</h5>
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
                  <CrearPublicacion></CrearPublicacion>
                  <PostList></PostList>
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
