import React, { useEffect, useRef, useContext, useState } from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

import ScrollNavbar from "../../components/Navbars/ScrollNavbar";
import PerfilMascotaHeader from "../../components/Headers/PerfilMascotaHeader";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import InfoPet from "./InfoPet";

import ItemAnuncio from "../../components/Listas/Anuncios/ItemAnuncio";

import MascotasContext from "../../context/mascotas/mascotasContext";
import AnunciosContext from "../../context/anuncios/anunciosContext";

function PerfilMascota({ match }) {
  const aContext = useContext(AnunciosContext);

  const { allanuncios, anuncios } = aContext;

  const mContext = useContext(MascotasContext);

  const { mascota, getmascota } = mContext;
  useEffect(() => {
    getmascota(match.params.m);
    allanuncios();
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
  const arrayA = () => {
    if (mascota && anuncios) {
      let items = anuncios
        .filter((data) => {
          if (data.mascota.includes(mascota._id)) {
            return data;
          }
        })
        .map((data) => {
          return <ItemAnuncio key={data._id} anuncio={data}></ItemAnuncio>;
        });
    }
  };

  return (
    <>
      <ScrollNavbar></ScrollNavbar>
      <div className="wrapper">
        <PerfilMascotaHeader dato={mascota}></PerfilMascotaHeader>

        {mascota ? (
          mascota.descripcion != "" ? (
            <div>
              <h3 className="title">Sobre mi</h3>
              <h5 className="description">{mascota.descripcion}</h5>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <div className="section">
          <div className="wrapper ">
            <Container>
              <Row>
                <Col md="12">
                  {mascota ? <InfoPet dato={mascota}></InfoPet> : ""}
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
