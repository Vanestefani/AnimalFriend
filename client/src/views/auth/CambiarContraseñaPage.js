import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
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
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
function CambiarContraseñaPage({ match }) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [confirmarFocus, setconfirmarFocus] = React.useState(false);
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, password_cambio } = authContext;
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  useEffect(() => {

    localStorage.setItem("token", match.params.token);
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);
  //state inputs
  const [usuario, guardarUsuario] = useState({
    password: "",
    password2: "",
    errors: {
      Errorpassword: { valido: true, mensaje: "" },
      Errorpassword2: { valido: true, mensaje: "" },
    },
  });
  // extraer de usuario
  const { password, password2, errors } = usuario;
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
  const validate = () => {
    let isError = false;
    if (usuario.password.length < 6) {
      usuario.errors.Errorpassword.valido = false;
      usuario.errors.Errorpassword.mensaje =
        "(La contraseña debe tener al menos 6 caracteres)";
    } else {
      usuario.errors.Errorpassword.valido = true;
    }

    if (usuario.password !== usuario.password2) {
      usuario.errors.Errorpassword2.valido = false;
      usuario.errors.Errorpassword2.mensaje = "(Las contraseñas no coinciden)";
    } else {
      usuario.errors.Errorpassword2.valido = true;
    }
    if (
      !usuario.errors.Errorpassword.valido ||
      !usuario.errors.Errorpassword2.valido
    ) {
      isError = true;
    } else {
      isError = false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (!err) {
      // Pasarlo al action
      password_cambio({ password: password, password2: password2 });
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
                    ¿Has olvidado tu contraseña?
                  </CardTitle>
                  <p>
                    Ingresa el correo electrónico asociado a tu cuenta para
                    enviarte un vínculo para restablecer tu contraseña
                  </p>
                </CardHeader>
                <CardBody>
                  {alerta ? (
                    <Alert color={alerta.categoria}>
                      <i className="fas fa-exclamation-triangle"></i>
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
                        <i className="fas fa-key"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      id="password"
                      name="password"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      onChange={onChange}
                      defaultValue={password}
                      required
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
                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (confirmarFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-key"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirmar contraseña"
                      type="password"
                      id="password2"
                      name="password2"
                      onFocus={() => setconfirmarFocus(true)}
                      onBlur={() => setconfirmarFocus(false)}
                      onChange={onChange}
                      defaultValue={password2}
                      required
                      className={
                        errors.Errorpassword2.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                      }
                    ></Input>
                  </InputGroup>
                  {!errors.Errorpassword.valido ? (
                    <span className="text-muted">
                      {errors.Errorpassword2.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                  <Button
                    block
                    className="btn-round  "
                    color="default"
                    type="submit"
                    onClick={handleSubmit}
                    size="lg"
                  >
                    <b> Enviar </b>
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
                      <Link className="link" to="/">
                        Iniciar Sesión
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

export default CambiarContraseñaPage;
