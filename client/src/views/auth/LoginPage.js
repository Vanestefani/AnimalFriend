import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import compose from "recompose/compose";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Alert,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";

function LoginPage(props) {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;
  // En caso de que el password o usuario no exista
  //state inputs
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
    errors: {
      Erroremail: { valido: true, mensaje: "" },
      Errorpassword: { valido: true, mensaje: "" },
    },
  });
  useEffect(() => {
    if (autenticado) {
      props.history.push("/home");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);
  //focus inputs
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  // extraer de usuario
  const { email, password, errors } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  //errores de input :O
  const validate = () => {
    let isError = false;
    if (usuario.email.indexOf("@") === -1) {
      usuario.errors.Erroremail.valido = false;
      usuario.errors.Erroremail.mensaje =
        "(Por favor ingrese un correo valido)";
    } else {
      usuario.errors.Erroremail.valido = true;
    }

    if (usuario.password.length < 1) {
      usuario.errors.Errorpassword.valido = false;
      usuario.errors.Errorpassword.mensaje =
        "(El campo contraseña no puede estar vacio)";
    } else {
      usuario.errors.Errorpassword.valido = true;
    }
    if (
      !usuario.errors.Erroremail.valido ||
      !usuario.errors.Errorpassword.valido
    ) {
      isError = true;
    } else {
      isError = false;
    }
  };
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      // Pasarlo al action
      iniciarSesion({ email, password });
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
            <Card className="card-login" data-background-color="blue">
              <Form className="form">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Iniciar sesión
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {alerta ? (
                    <Alert color={alerta.categoria}>
                      <i class="fas fa-exclamation-triangle"></i>
                      {alerta.msg}
                    </Alert>
                  ) : null}
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-envelope"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      id="email"
                      name="email"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={onChange}
                      defaultValue={email}
                      required
                      autoComp
                      lete="email"
                      className={
                        errors.Erroremail.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                      }
                    ></Input>
                  </InputGroup>
                  {!errors.Erroremail.valido ? (
                    <span className="text-muted">
                      {errors.Erroremail.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-key"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      id="password"
                      name="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      required
                      onChange={onChange}
                      defaultValue={password}
                      autoComplete="current-password"
                      className={
                        errors.Errorpassword.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                      }
                    ></Input>
                  </InputGroup>
                  {!errors.Errorpassword.valido ? (
                    <span className="text-muted">
                      {errors.Errorpassword.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                  <Button
                    block
                    className="btn-round  "
                    color="default"
                    onClick={handleSubmit}
                    size="lg"
                  >
                    <b> Iniciar Sesión </b>
                  </Button>
                  <div className="pull-left">
                    <h6>
                      <Link className="link" to="/register">
                        Crear cuenta
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

export default LoginPage;
