import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Form, Alert } from "reactstrap";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import DatosUsuario from "../../views/auth/pasos/DatosUsuario";

import DetallesUsuario from "../../views/auth/pasos/detallesUsuario";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
function CrearCuentaPage(props) {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuario } = authContext;
  // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //state inputs
  const [usuario, guardarUsuario] = useState({
    step: 1,
    //paso 1
    nombre: "",
    email: "",
    password: "",
    password2: "",
    //paso2
    pais: "",
    ciudad: "",
    genero: "Masculino",

    errors: {
      Errornombre: { valido: true, mensaje: "" },
      Erroremail: { valido: true, mensaje: "" },
      Errorpassword: { valido: true, mensaje: "" },
      Errorpassword2: { valido: true, mensaje: "" },
      Errorpais: { valido: true, mensaje: "" },
      Errorciudad: { valido: true, mensaje: "" },
      Errorgenero: { valido: true, mensaje: "" },
      Errorpoliticas: { valido: true, mensaje: "" },
    },
  });
  const validate = () => {
    let isError = false;

    //El pattern contraseña 1As20092
    const pattern2 = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const pattern3 = new RegExp(
      "^[a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-z0-9]@[a-z0-9][-.]{0,1}([a-z][-.]{0,1})*[a-z0-9].[a-z0-9]{1,}([.-]{0,1}[a-z]){0,}[a-z0-9]{0,}$"
    );
const maximo=new RegExp("[a-zA-Z ]{3,19}$");
const maximopasword=new RegExp("[a-zA-Z ]{6,19}$");

    if (usuario.step === 1) {

      if (pattern3.test(usuario.email) === false) {
        usuario.errors.Erroremail.valido = false;
        usuario.errors.Erroremail.mensaje =
          "(Por favor ingrese un correo valido)";
      } else {
        usuario.errors.Erroremail.valido = true;
      }
      if (maximo.test(usuario.nombre) === false) {
        usuario.errors.Errornombre.valido = false;
        usuario.errors.Errornombre.mensaje =
          "(Por favor ingrese un nombre valido)";
      } else {
        usuario.errors.Errornombre.valido = true;
      }

      if (usuario.password !== usuario.password2) {
        usuario.errors.Errorpassword2.valido = false;
        usuario.errors.Errorpassword2.mensaje =
          "(Las contraseñas no coinciden)";
      } else {
        usuario.errors.Errorpassword2.valido = true;
      }

      if (!pattern2.test(usuario.password)) {
        usuario.errors.Errorpassword.valido = false;
        usuario.errors.Errorpassword.mensaje =
          "(Debe tener al menos una letra mayuscula ,una letra minuscula y un numero)";
      } else {
        usuario.errors.Errorpassword.valido = true;
      }

      if (
        !usuario.errors.Erroremail.valido ||
        !usuario.errors.Errornombre.valido ||
        !usuario.errors.Errorpassword.valido ||
        !usuario.errors.Errorpassword2.valido
      ) {
        isError = true;
      } else {
        isError = false;
      }
    }

    if (usuario.step === 2) {
      if (usuario.pais.length < 1) {
        usuario.errors.Errorpais.valido = false;
        usuario.errors.Errorpais.mensaje = "(Debe elegir un campo)";
      } else {
        usuario.errors.Errorpais.valido = true;
      }

      if (usuario.ciudad.length < 1) {
        usuario.errors.Errorciudad.valido = false;
        usuario.errors.Errorciudad.mensaje = "(Debe elegir un campo)";
      } else {
        usuario.errors.Errorciudad.valido = true;
      }
      if (usuario.genero.length < 1) {
        usuario.errors.Errorgenero.valido = false;
        usuario.errors.Errorgenero.mensaje = "(Debe elegir un campo)";
      } else {
        usuario.errors.Errorgenero.valido = true;
      }

      if (
        !usuario.errors.Errorpais.valido ||
        !usuario.errors.Errorciudad.valido ||
        !usuario.errors.Errorgenero.valido
      ) {
        isError = true;
      } else {
        isError = false;
      }
    }
    return isError;
  };

  // extraer de usuario
  const { nombre, email, password, password2, pais, ciudad, genero } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeCountry = (e) => {
    guardarUsuario({
      ...usuario,
      pais: e,
    });
  };

  const onChangeCity = (e) => {
    guardarUsuario({
      ...usuario,
      ciudad: e,
    });
  };

  React.useEffect(() => {
    document.body.classList.add("login-page");

    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  //pasos
  const nextStep = () => {
    const err = validate();

    if (!err) {
      guardarUsuario({
        ...usuario,
        step: usuario.step + 1,
      });
    } else {
      guardarUsuario({
        ...usuario,
      });
    }
  };

  const prevStep = () => {
    guardarUsuario({
      ...usuario,
      step: usuario.step - 1,
    });
  };
  //focus
  //    paso 1
  const [nombreFocus, setnombreFocus] = React.useState(false);
  const [emailFocus, setemailFocus] = React.useState(false);
  const [passwordFocus, setpasswordFocus] = React.useState(false);
  const [password2Focus, setpassword2Focus] = React.useState(false);
  //    paso 2
  const [paisFocus, setpaisFocus] = React.useState(false);
  const [ciudadFocus, setciudadFocus] = React.useState(false);
  const [generoFocus, setgeneroFocus] = React.useState(false);

  const showStep = () => {
    if (usuario.step === 1)
      return (
        <DatosUsuario
          nextStep={nextStep}
          onChange={onChange}
          usuario={usuario}
          guardarUsuario={guardarUsuario}
          nombreFocus={nombreFocus}
          emailFocus={emailFocus}
          passwordFocus={passwordFocus}
          password2Focus={password2Focus}
          setnombreFocus={setnombreFocus}
          setemailFocus={setemailFocus}
          setpasswordFocus={setpasswordFocus}
          setpassword2Focus={setpassword2Focus}
          authContext={authContext}
        ></DatosUsuario>
      );
    if (usuario.step === 2)
      return (
        <DetallesUsuario
          nextStep={nextStep}
          onChange={onChange}
          handleSubmit={handleSubmit}
          usuario={usuario}
          paisFocus={paisFocus}
          ciudadFocus={ciudadFocus}
          setgeneroFocus={setgeneroFocus}
          generoFocus={generoFocus}
          setpaisFocus={setpaisFocus}
          setciudadFocus={setciudadFocus}
          prevStep={prevStep}
          onChangeCountry={onChangeCountry}
          onChangeCity={onChangeCity}
        ></DetallesUsuario>
      );
  };
  const [modalMsnRegistroExitoso, setModal1] = useState(false);

  const handleSubmit = (e) => {
    const err = validate();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      password2.trim() === "" ||
      pais.trim() === "" ||
      ciudad.trim() === "" ||
      genero.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "danger");
    }
    if (!err) {
      registrarUsuario({
        nombre: nombre,
        email: email.toLowerCase(),
        password: password,
        password2: password2,
        pais: pais,
        ciudad: ciudad,
        genero: genero,
      });
    } else {
      validate();
    }
  };
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="green">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/pet-fondo.jfif") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Card
              className="card-login card-plain"
              data-background-color="blue"
            >
              <Form className="form" autocomplete="off">
                <CardHeader className="text-center">
                  <h1>Crear cuenta</h1>
                  <h3>Paso {usuario.step} de 2.</h3>
                </CardHeader>
                <CardBody>
                  {alerta ? (
                    <Alert color={alerta.categoria}>
                      <i className="fas fa-exclamation-triangle"></i>
                      {alerta.msg}
                    </Alert>
                  ) : null}
                  {showStep()}
                  <div className="pull-left">
                    <h6>
                      <Link className="link" to="/">
                        Iniciar sesión
                      </Link>
                    </h6>
                  </div>

                  <div className="pull-right">
                    <h6>
                      <Link className="link" to="/olvido-contrasena">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </h6>
                  </div>
                  <div className="pull-left pl-2">
                    <h6>
                      <Link className="link" to="/verificar">
                        Verificar cuenta
                      </Link>
                    </h6>
                  </div>
                </CardBody>
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
