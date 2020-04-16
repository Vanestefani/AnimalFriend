import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import DatosUsuario from "../../views/auth/pasos/DatosUsuario";
import DetallesUsuario from "../../views/auth/pasos/detallesUsuario";
import MascotaDatos from "../../views/auth/pasos/mascotaDatos";

function CrearCuentaPage() {
  //state inputs
  const [usuario, guardarUsuario] = useState({
    step: 1,
    //paso 1
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
    //paso2
    pais: "",
    ciudad: "",
    sexo: "",

    //paso 3
    nombreMascota: "",
    especie: "",
    raza: "",
    sexoMascota: "",
    fechanacimiento: "",
    colorPrincipal: "",

    leePoliticas: "",
  });

  //state archivos
  const [archivoImagen, guardararchivoImagen] = useState({
    fotoUsuario: null,
    fotoMascota: null,
  });
  //extraer archivos
  const { fotoUsuario, fotoMascota } = archivoImagen;

  // extraer de usuario
  const {
    nombre,
    email,
    password,
    confirmar,
    pais,
    ciudad,
    sexo,
    nombreMascota,
    especie,
    raza,
    sexoMascota,
    fechanacimiento,
    colorPrincipal,

    leePoliticas,
  } = usuario;

  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
  };

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeImages = (e) => {
    guardararchivoImagen({
      ...archivoImagen,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  //pasos
  const nextStep = () => {
    guardarUsuario({
      ...usuario,
      step: usuario.step + 1,
    });
  };
  const prevStep = () => {
    guardarUsuario({
      step: usuario.step - 1,
    });
  };
  //focus
  //    paso 1
  const [nombreFocus, setnombreFocus] = React.useState(false);
  const [emailFocus, setemailFocus] = React.useState(false);
  const [passwordFocus, setpasswordFocus] = React.useState(false);
  const [confirmarFocus, setconfirmarFocus] = React.useState(false);
  //    paso 2
  const [paisFocus, setpaisFocus] = React.useState(false);
  const [ciudadFocus, setciudadFocus] = React.useState(false);
  const [sexoFocus, setsexoFocus] = React.useState(false);
  const [fotoUsuarioFocus, setfotoUsuariorFocus] = React.useState(false);
  //    paso 3
  const [nombreMascotaFocus, setnombreMascotaFocus] = React.useState(false);
  const [especieFocus, setespecieFocus] = React.useState(false);
  const [razaFocus, setrazaFocus] = React.useState(false);
  const [sexoMascotaFocus, setsexoMascotaFocus] = React.useState(false);
  const [fechanacimientoFocus, setfechanacimientoFocus] = React.useState(false);
  const [colorPrincipalFocus, setcolorPrincipal] = React.useState(false);
  const [leePoliticasFocus, setleePoliticas] = React.useState(false);
  const [fotoMascotaFocus, setfotoMascota] = React.useState(false);

  const showStep = () => {
    if (usuario.step === 1)
      return (
        <DatosUsuario
          nextStep={nextStep}
          onChange={onChange}
          onSubmit={onSubmit}
          usuario={usuario}
          guardarUsuario={guardarUsuario}
          nombreFocus={nombreFocus}
          emailFocus={emailFocus}
          passwordFocus={passwordFocus}
          confirmarFocus={confirmarFocus}
          setnombreFocus={setnombreFocus}
          setemailFocus={setemailFocus}
          setpasswordFocus={setpasswordFocus}
        ></DatosUsuario>
      );
    if (usuario.step === 2)
      return (
        <DetallesUsuario
          nextStep={nextStep}
          onChange={onChange}
          onSubmit={onSubmit}
          usuario={usuario}
          archivoImagen={archivoImagen}
          guardarUsuario={guardarUsuario}
          paisFocus={paisFocus}
          ciudadFocus={ciudadFocus}
          setsexoFocus={setsexoFocus}
          sexoFocus={sexoFocus}
          fotoUsuarioFocus={fotoUsuarioFocus}
          setfotoUsuarioFocus={setfotoUsuariorFocus}
          setpaisFocus={setpaisFocus}
          setciudadFocus={setciudadFocus}
          onChangeImages={onChangeImages}
          prevStep={prevStep}
        ></DetallesUsuario>
      );
    if (usuario.step === 3)
      return (
        <MascotaDatos
        nextStep={nextStep}
        onChange={onChange}
        onSubmit={onSubmit}
        usuario={usuario}
        archivoImagen={archivoImagen}
        guardarUsuario={guardarUsuario}
        onChangeImages={onChangeImages}
        prevStep={prevStep}
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
        leePoliticasFocus={leePoliticasFocus}
        setleePoliticas={setleePoliticas}
        fotoMascotaFocus={fotoMascotaFocus}
        setfotoMascota={setfotoMascota}
        onSubmit={onSubmit}
        ></MascotaDatos>
      );
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="green">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets//img/pet-fondo.jfif") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Card
              className="card-login card-plain"
              data-background-color="blue"
            >
              <Form action="" className="form" method="">
                <CardHeader className="text-center">
                  <h1>Crear cuenta</h1>
                  <h3>Paso {usuario.step} de 3.</h3>
                </CardHeader>
                <CardBody>{showStep()}</CardBody>
              </Form>
            </Card>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}

export default CrearCuentaPage;
