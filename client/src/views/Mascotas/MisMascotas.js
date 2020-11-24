import React, { useState, useContext, useEffect } from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import moment from "moment";
import "moment/locale/es";
import Mascota from "./Mascota";

import FormMascota from "./Form/FormMascota";
import MascotasContext from "../../context/mascotas/mascotasContext";
import AuthContext from "../../context/autenticacion/authContext";

function MisMascota(props) {
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
    const err = validate();
    e.target.className += " was-validated";
    let userid = usuario._id;

    if (!err) {
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
    } else {
      setnombreMascotaFocus(true);
      validate();
    }
  };

  //cargar razaas
  const getBreeds = (especie) => {
    if (Fmascota.especie) {
    }
  };
  const validate = () => {
    let isError = false;
    const maximo = new RegExp("[a-zA-Z ]{3,19}$");
    if (
      archivoImagen === undefined ||
      archivoImagen === null ||
      archivoImagen === ""
    ) {
      if (errores) {
        errores.Errorfoto.valido = false;
        errores.Errorfoto.mensaje = "(Debe subir una imagen)";
      }
    } else {
      if (errores) errores.Errorfoto.valido = true;
    }
    if (maximo.test(Fmascota.nombreMascota) === false) {
      errores.ErrornombreMascota.valido = false;
      errores.ErrornombreMascota.mensaje =
        "(Por favor ingrese un nombre valido)";
    } else {
      errores.ErrornombreMascota.valido = true;
    }
    if (Fmascota.especie.length < 1) {
      errores.Errorespecie.valido = false;
      errores.Errorespecie.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorespecie.valido = true;
    }
    if (Fmascota.raza.length < 1) {
      errores.Errorraza.valido = false;
      errores.Errorraza.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorraza.valido = true;
    }
    if (Fmascota.generoMascota.length < 1) {
      errores.Errorgenero.valido = false;
      errores.Errorgenero.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorgenero.valido = true;
    }
    if (Fmascota.fechanacimiento.length < 1) {
      errores.Errorfechanacimiento.valido = false;
      errores.Errorfechanacimiento.mensaje = "(Debe elegir un campo)";
    } else {
      errores.Errorfechanacimiento.valido = true;
    }
    if (Fmascota.colorPrincipal.length < 1) {
      errores.ErrorcolorPrincipal.valido = false;
      errores.ErrorcolorPrincipal.mensaje = "(Debe elegir un campo)";
    } else {
      errores.ErrorcolorPrincipal.valido = true;
    }
    if (
      !errores.Errorfoto.valido ||
      !errores.ErrornombreMascota.valido ||
      !errores.Errorespecie.valido ||
      !errores.Errorraza.valido ||
      !errores.Errorgenero.valido ||
      !errores.Errorfechanacimiento.valido ||
      !errores.ErrorcolorPrincipal.valido
    ) {
      isError = true;
    } else {
      isError = false;
    }
    return isError;
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
