import React, { useState } from "react";
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
  Col,
  Row,
} from "reactstrap";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";
function OlvidadoContraseñaPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [confirmarFocus, setconfirmarFocus] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  //state inputs
  const [usuario, guardarUsuario] = useState({
    password: "",
    confirmar: "",
  });
  // extraer de usuario
  const { password, confirmar } = usuario;
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
              <Form className="form" onSubmit={onSubmit}>
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
                    ></Input>
                  </InputGroup>
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
                      id="confirmar"
                      name="confirmar"
                      onFocus={() => setconfirmarFocus(true)}
                      onBlur={() => setconfirmarFocus(false)}
                      onChange={onChange}
                      defaultValue={confirmar}
                      required
                    ></Input>
                  </InputGroup>

                  <Button
                    block
                    className="btn-round  "
                    color="default"
                    type="submit"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    <b> Enviar </b>
                  </Button>
                  <div className="pull-left">
                    <h6>
                      <Link className="link" to="/crear-cuenta">
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

export default OlvidadoContraseñaPage;
