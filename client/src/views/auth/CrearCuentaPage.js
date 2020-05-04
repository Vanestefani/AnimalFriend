import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
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
    genero: "",

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
    // El pattern solo letras
    const pattern = new RegExp("^[A-Z]+$", "i");
    //El pattern contraseña 1As20092
    const pattern2 = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    if (usuario.step == 1) {
      if (usuario.email.indexOf("@") === -1) {
        usuario.errors.Erroremail.valido = false;
        usuario.errors.Erroremail.mensaje =
          "(Por favor ingrese un correo valido)";
      } else {
        usuario.errors.Erroremail.valido = true;
      }
      if (usuario.password.length < 6) {
        usuario.errors.Errorpassword.valido = false;
        usuario.errors.Errorpassword.mensaje =
          "(La contraseña debe tener al menos 6 caracteres)";
      } else {
        usuario.errors.Errorpassword.valido = true;
      }

      if (usuario.password !== usuario.password2) {
        usuario.errors.Errorpassword2.valido = false;
        usuario.errors.Errorpassword2.mensaje =
          "(Las contraseñas no coinciden)";
      } else {
        usuario.errors.Errorpassword2.valido = true;
      }
      if (usuario.nombre.length < 1) {
        usuario.errors.Errornombre.valido = false;
        usuario.errors.Errornombre.mensaje =
          "(El campo nombre no puede estar vacio)";
      } else {
        usuario.errors.Errornombre.valido = true;
      }

      if (!pattern.test(usuario.nombre)) {
        usuario.errors.Errornombre.valido = false;
        usuario.errors.Errornombre.mensaje =
          "(El campo nombre solo debe tener letras)";
      } else {
        usuario.errors.Errornombre.valido = true;
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

    if (usuario.step == 2) {
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
  const {
    nombre,
    email,
    password,
    password2,
    pais,
    ciudad,
    genero,

    leePoliticas,
  } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
      leePoliticas: !leePoliticas,
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
        ></DetallesUsuario>
      );
  };
  const [modalMsnRegistroExitoso, setModal1] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
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
              "url(" + require("../../assets//img/pet-fondo.jfif") + ")",
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
                      <i class="fas fa-exclamation-triangle"></i>
                      {alerta.msg}
                    </Alert>
                  ) : null}
                  {showStep()}
                  <div className="pull-left">
                    <h6>
                      <Link className="link" to="/login">
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
