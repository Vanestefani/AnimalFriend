import React, { useState, setState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import compose from "recompose/compose";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Form } from "reactstrap";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
import DatosUsuario from "../../views/auth/pasos/DatosUsuario";
import DetallesUsuario from "../../views/auth/pasos/detallesUsuario";

function CrearCuentaPage(props) {
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

    leePoliticas: false,
    errors: {
      Errornombre: { valido: true, mensaje: "" },
      Erroremail: { valido: true, mensaje: "" },
      Errorpassword: { valido: true, mensaje: "" },
      Errorpassword2: { valido: true, mensaje: "" },
      Errorpais: { valido: true, mensaje: "" },
      Errorciudad: { valido: true, mensaje: "" },
      Errorgenero: { valido: true, mensaje: "" },
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
          "Por favor ingrese un correo valido";
      } else {
        usuario.errors.Erroremail.valido = true;
      }
      if (usuario.password.length < 6) {
        usuario.errors.Errorpassword.valido = false;
        usuario.errors.Errorpassword.mensaje =
          "La contraseña debe tener al menos 6 caracteres";
      } else {
        usuario.errors.Errorpassword.valido = true;
      }

      if (usuario.password !== usuario.password2) {
        usuario.errors.Errorpassword2.valido = false;
        usuario.errors.Errorpassword2.mensaje = "Las contraseñas no coinciden";
      } else {
        usuario.errors.Errorpassword2.valido = true;
      }
      if (usuario.nombre.length < 1) {
        usuario.errors.Errornombre.valido = false;
        usuario.errors.Errornombre.mensaje =
          "El campo nombre no puede estar vacio";
      } else {
        usuario.errors.Errornombre.valido = true;
      }

      if (!pattern.test(usuario.nombre)) {
        usuario.errors.Errornombre.valido = false;
        usuario.errors.Errornombre.mensaje =
          "El campo nombre solo debe tener letras";
      } else {
        usuario.errors.Errornombre.valido = true;
      }
      if (!pattern2.test(usuario.password)) {
        usuario.errors.Errorpassword.valido = false;
        usuario.errors.Errorpassword.mensaje =
          "Debe tener al menos una letra mayuscula ,una letra minuscula,un numero y un caracter especial";
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
        usuario.errors.Errorpais.mensaje = "Debe elegir un campo";
      } else {
        usuario.errors.Errorpais.valido = true;
      }
      if (usuario.ciudad.length < 1) {
        usuario.errors.Errorciudad.valido = false;
        usuario.errors.Errorciudad.mensaje = "Debe elegir un campo";
      } else {
        usuario.errors.Errorciudad.valido = true;
      }
      if (usuario.genero.length < 1) {
        usuario.errors.Errorgenero.valido = false;
        usuario.errors.Errorgenero.mensaje = "Debe elegir un campo";
      } else {
        usuario.errors.Errorgenero.valido = true;
      }
      if (
        !usuario.errors.Errorpais.valido ||
        !usuario.errors.Errorciudad.valido ||
        !usuario.errors.Errorgenero.valido ||
        !usuario.errors.Errorfoto.valido
      ) {
        isError = true;
      } else {
        isError = false;
      }
    }

    return isError;
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  /* eslint-disable react/destructuring-assignment, react/prop-types */
  const componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  };

  /* eslint-enable react/destructuring-assignment, react/prop-types */
  const handleSubmit = (e) => {
    e.preventDefault();

    this.props.registerUser(usuario, this.props.history);
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
    nombreMascota,
    especie,
    raza,
    generoMascota,
    fechanacimiento,
    colorPrincipal,
    errors,
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
          onSubmit={onSubmit}
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
        ></DatosUsuario>
      );
    if (usuario.step === 2)
      return (
        <DetallesUsuario
          nextStep={nextStep}
          onChange={onChange}
          onSubmit={onSubmit}
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
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
CrearCuentaPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
export default CrearCuentaPage;
