import React, { useState, useContext, useEffect } from "react";
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
import MascotasContext from "../../context/mascotas/mascotasContext";
import AuthContext from "../../context/autenticacion/authContext";

function MisMascota() {
  //context
  const mContext = useContext(MascotasContext);
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const { addMascotas, mascotas, mascotasUsuario } = mContext;
  //navbar effect
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  //state mascota
  const [Fmascota, guardarMascota] = useState({
    nombreMascota: "",
    especie: "Perro",
    raza: "",
    generoMascota: "",
    fechanacimiento: "",
    colorPrincipal: "",
  });
  const [archivoImagen, guardararchivoImagen] = useState(null);

  const {
    nombreMascota,
    especie,
    raza,
    generoMascota,
    fechanacimiento,
    colorPrincipal,
  } = Fmascota;

  const onChange = (e) => {
    guardarMascota({
      ...Fmascota,
      [e.target.name]: e.target.value,
    });
    getBreeds(especie);
  };

  //error state
  const [seterrores] = useState(false);

  //focus
  const [nombreMascotaFocus, setnombreMascotaFocus] = React.useState(false);
  const [especieFocus, setespecieFocus] = React.useState(false);
  const [razaFocus, setrazaFocus] = React.useState(false);
  const [generoMascotaFocus, setgeneroMascotaFocus] = React.useState(false);
  const [fechanacimientoFocus, setfechanacimientoFocus] = React.useState(false);
  const [colorPrincipalFocus, setcolorPrincipal] = React.useState(false);

  const [fotoMascotaFocus, setfotoMascota] = React.useState(false);
  useEffect(() => {
    mascotasUsuario();
  }, [mascotasUsuario]);
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    let userid = usuario._id;

    if (archivoImagen === null || nombreMascota === "") {
      seterrores(true);
      console.log("esta vacio");
    } else {
      let formData = new FormData();
      formData.append("foto", archivoImagen, archivoImagen.name);
      formData.append("nombre", nombreMascota);
      formData.append("especie", especie);
      formData.append("raza", raza);
      formData.append("genero", generoMascota);
      formData.append("fechanacimiento", fechanacimiento);
      formData.append("color", colorPrincipal);
      formData.append("propietario", userid);
      addMascotas(formData);
    }
  };

  //cargar razaas
  const getBreeds = (especie) => {
    if (Fmascota.especie) {
    }
  };
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
                Fmascota={Fmascota}
                archivoImagen={archivoImagen}
                guardarMascota={guardarMascota}
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
                guardararchivoImagen={guardararchivoImagen}
              ></FormMascota>
              <h2 className="pull-left p-2">
                <b>Mascotas</b>
              </h2>
              <div className="section section-team text-center">
                <Container>
                  <div className="team">
                    <Row>
                      {mascotas.map((mascota) => (
                        <Mascota key={mascota._id} mascota={mascota}></Mascota>
                      ))}
                    </Row>
                  </div>
                </Container>
              </div>
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

export default MisMascota;
