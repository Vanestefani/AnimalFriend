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
function VerificaCuentaPage() {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, verificaremail } = authContext;
  const [firstFocus, setFirstFocus] = React.useState(false);

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
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);
  //state inputs
  const [usuario, guardarUsuario] = useState({
    email: "",
    Erroremail: { valido: true, mensaje: "" },
  });
  // extraer de usuario
  const { email, Erroremail } = usuario;
  //errores de input :O
  const validate = () => {
    let isError = false;
    if (email.indexOf("@") === -1 || email.length < 1) {
      usuario.Erroremail.valido = false;
      usuario.Erroremail.mensaje = "(Por favor ingrese un correo valido)";
    } else {
      usuario.Erroremail.valido = true;
    }

    if (!usuario.Erroremail.valido) {
      isError = true;
    } else {
      isError = false;
    }
    return isError;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    console.log(!err);
    if (email.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "danger");
    }

    if (!err) {
      // Pasarlo al action
      let dato = email.toLowerCase();
      verificaremail({ email: dato });
    }else{
      validate();
    }
  };

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
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
                    Verificar cuenta
                  </CardTitle>
                  <p>
                    Ingresa el correo electrónico asociado a tu cuenta para
                    enviarte un vínculo para verificar tu cuenta
                  </p>
                </CardHeader>
                <CardBody>
                  {alerta ? (
                    <Alert color={alerta.categoria}>
                      <i className="fas fa-exclamation-triangle"></i>
                      {alerta.msg}
                    </Alert>
                  ) : null}
                  <InputGroup className="no-border input-lg">
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
                      className={
                        usuario.Erroremail.valido
                          ? ""
                          : "is-invalid form-control-danger form-control"
                      }
                    ></Input>
                  </InputGroup>
                  {!usuario.Erroremail.valido ? (
                    <span className="text-muted">
                      {usuario.Erroremail.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                  <Button
                    block
                    className="btn-round  "
                    color="default"
                    onClick={onSubmit}
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

export default VerificaCuentaPage;
