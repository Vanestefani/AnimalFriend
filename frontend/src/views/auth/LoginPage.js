import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";

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
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../components/Footers/TransparentFooter.js";

function LoginPage(props) {
  //focus inputs
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  //state inputs
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
    errors: {},
  });
  // extraer de usuario
  const { email, password, errors } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
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
  const componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  const componentWillReceiveProps = (nextProps) => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { signInUser } = props;
    signInUser(usuario);

    e.target.className += " was-validated";
    if (email.trim() === "" || password.trim() === "") {
      alert("Todos los campos son obligatorios", "alerta-error");
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
              <Form className="form" onSubmit={handleSubmit} noValidate>
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Iniciar sesión
                  </CardTitle>
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                      small
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
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
                        <i class="fas fa-envelope"></i>
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
                    ></Input>
                  </InputGroup>

                  <InputGroup
                    className={
                      "no-border input-lg" +
                      (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i class="fas fa-key"></i>
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
                    ></Input>
                  </InputGroup>

                  <Button
                    block
                    className="btn-round  "
                    color="default"
                    type="submit"
                    size="lg"
                  >
                    <b> Iniciar Sesión </b>
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
