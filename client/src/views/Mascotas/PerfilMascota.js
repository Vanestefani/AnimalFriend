import React, { useEffect, useRef, useContext, useState } from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

import ScrollNavbar from "../../components/Navbars/ScrollNavbar";
import PerfilMascotaHeader from "../../components/Headers/PerfilMascotaHeader";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import InfoPet from "./InfoPet";
import SubMenu from "../../components/Navbars/SubMenu";

import Vistaprevi from "../../components/Galeria/vistaprevi";
import ListaAnuncio from "../../components/Listas/Anuncios/ListaAnuncio";
import Galeria from "../../components/Galeria/Galeria";
import MascotasContext from "../../context/mascotas/mascotasContext";

function PerfilMascota({ match }) {
  const mContext = useContext(MascotasContext);

  const { mascota, getmascota } = mContext;
  useEffect(() => {
    getmascota(match.params.m);
  }, [mascota]);
  const [pills, setPills] = React.useState("2");
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
      <ScrollNavbar></ScrollNavbar>
      <div className="wrapper">
        <PerfilMascotaHeader dato={mascota}></PerfilMascotaHeader>
        <div className="section">
          <div className="wrapper">
            <Container>
              <Row>
                <Col md="3">
                  <InfoPet></InfoPet>
                </Col>
                <Col md="6">
                  <SubMenu></SubMenu>
                  <Galeria></Galeria>
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

export default PerfilMascota;
