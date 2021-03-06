import React, { useState } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";

import SubMenu from "../../components/Navbars/SubMenu";

import Mascota from "./Mascota";

import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";
import FormMascota from "./Form/FormMascota";

function Mascotas() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const [mascota, guardarMascota] = useState({
    //paso 3
    nombreMascota: "",
    especie: "",
    raza: "",
    generoMascota: "",
    fechanacimiento: "",
    colorPrincipal: "",
  });
  const [archivoImagen, guardararchivoImagen] = useState({
    fotoMascota: null,
  });
  //extraer archivos
  const { fotoMascota } = archivoImagen;
  const {
    nombreMascota,
    especie,
    raza,
    generoMascota,
    fechanacimiento,
    colorPrincipal,
  } = mascota;
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
  };

  const onChange = (e) => {
    guardarMascota({
      ...mascota,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeImages = (e) => {
    guardararchivoImagen({
      ...archivoImagen,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };
  //focus
  const [nombreMascotaFocus, setnombreMascotaFocus] = React.useState(false);
  const [especieFocus, setespecieFocus] = React.useState(false);
  const [razaFocus, setrazaFocus] = React.useState(false);
  const [generoMascotaFocus, setgeneroMascotaFocus] = React.useState(false);
  const [fechanacimientoFocus, setfechanacimientoFocus] = React.useState(false);
  const [colorPrincipalFocus, setcolorPrincipal] = React.useState(false);
  const [leePoliticasFocus, setleePoliticas] = React.useState(false);
  const [fotoMascotaFocus, setfotoMascota] = React.useState(false);
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

              <FormMascota
                onChange={onChange}
                mascota={mascota}
                archivoImagen={archivoImagen}
                guardarMascota={guardarMascota}
                onChangeImages={onChangeImages}
                nombreMascotaFocus={nombreMascotaFocus}
                setnombreMascotaFocus={setnombreMascotaFocus}
                especieFocus={especieFocus}
                setespecieFocus={setespecieFocus}
                razaFocus={razaFocus}
                setrazaFocus={setrazaFocus}
                generoMascotaFocus={generoMascotaFocus}
                setgeneroMascotaFocus={setgeneroMascotaFocus}
                fechanacimientoFocus={fechanacimientoFocus}
                setfechanacimientoFocus={setfechanacimientoFocus}
                colorPrincipalFocus={colorPrincipalFocus}
                setcolorPrincipal={setcolorPrincipal}
                fotoMascotaFocus={fotoMascotaFocus}
                setfotoMascota={setfotoMascota}
                onSubmit={onSubmit}
              ></FormMascota>
              <h2 className="pull-left p-2">
                <b>Mascotas</b>
              </h2>

              <Mascota></Mascota>
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

export default Mascotas;
