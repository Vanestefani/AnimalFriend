import React, { useState, useContext, useEffect } from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import DefaultFooter from "../../components/Footers/DefaultFooter.js";

import Mascota from "./Mascota";

import FormMascota from "./Form/FormMascota";
import MascotasContext from "../../context/mascotas/mascotasContext";
import AuthContext from "../../context/autenticacion/authContext";

function MisMascota() {
  //context
  const mContext = useContext(MascotasContext);
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const { addMascotas, mascotas } = mContext;

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
  const [errores, setErrores] = React.useState({
    ErrornombreMascota: { valido: true, mensaje: "" },
    Errorespecie: { valido: true, mensaje: "" },
    Errorraza: { valido: true, mensaje: "" },
    Errorgenero: { valido: true, mensaje: "" },
    Errorfechanacimiento: { valido: true, mensaje: "" },
    ErrorcolorPrincipal: { valido: true, mensaje: "" },
    Errorfoto: { valido: true, mensaje: "" },
  });

  const [fotoMascotaFocus, setfotoMascota] = React.useState(false);

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
        errores={errores}
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
    </>
  );
}

export default MisMascota;
