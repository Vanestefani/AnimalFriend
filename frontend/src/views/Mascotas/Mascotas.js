import React, { useState } from "react";

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import Mascota from "./Mascota";
import Calendario from "../../components/Calendario/Calendario";
import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";
import FormMascota from "./Form/FormMascota";
import { Link } from "react-router-dom";

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
    sexoMascota: "",
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
    sexoMascota,
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
  const [sexoMascotaFocus, setsexoMascotaFocus] = React.useState(false);
  const [fechanacimientoFocus, setfechanacimientoFocus] = React.useState(false);
  const [colorPrincipalFocus, setcolorPrincipal] = React.useState(false);
  const [leePoliticasFocus, setleePoliticas] = React.useState(false);
  const [fotoMascotaFocus, setfotoMascota] = React.useState(false);
  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper">
        <Container>
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
              <ListMascotas></ListMascotas>
            </Col>
            <Col md="6">
              <SubMenu></SubMenu>
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
                sexoMascotaFocus={sexoMascotaFocus}
                setsexoMascotaFocus={setsexoMascotaFocus}
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
              <Calendario></Calendario>
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
