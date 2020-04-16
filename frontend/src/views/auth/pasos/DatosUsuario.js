import React, { Component} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";
class DatosUsuario extends Component {

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {

    return (
      <>
        <div>
          <InputGroup
            className={
              "no-border input-lg" + (this.props.nombreFocus ? " input-group-focus" : "")
            }
          >
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i class="fas fa-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Nombre completo"
              type="text"
              onFocus={() =>this.props. setnombreFocus(true)}
              onBlur={() => this.props.setnombreFocus(false)}
              id="nombre"
              name="nombre"
              onChange={this.props.onChange}
              defaultValue={this.props.usuario.nombre}
              required
              data-background-color="blue"
            ></Input>
          </InputGroup>

          <InputGroup
            className={
              "no-border input-lg" + (this.props.emailFocus ? " input-group-focus" : "")
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
              onFocus={() =>this.props. setemailFocus(true)}
              onBlur={() => this.props.setemailFocus(false)}
              id="email"
              name="email"
              onChange={this.props.onChange}
              defaultValue={this.props.usuario.email}
              required
            ></Input>
          </InputGroup>
          <Row>
            <Col md="6">
              <InputGroup
                className={
                  "no-border input-lg" +
                  (this.props.passwordFocus ? " input-group-focus" : "")
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
                  onFocus={() =>this.props.setpasswordFocus(true)}
                  onBlur={() => this.props.setpasswordFocus(false)}
                  id="password"
                  name="password"
                  onChange={this.props.onChange}
                  defaultValue={this.props.usuario.password}
                  required
                ></Input>
              </InputGroup>
            </Col>
            <Col md="6">
              <InputGroup
                className={
                  "no-border input-lg" +
                  (this.props.confirmarFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-key"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Confirmar Contraseña"
                  type="password"
                  onFocus={() => this.props.setconfirmarFocus(true)}
                  onBlur={() => this.props.setconfirmarFocus(false)}
                  id="confirmar"
                  name="confirmar"
                  onChange={this.props.onChange}
                  defaultValue={this.props.usuario.confirmar}
                  required
                ></Input>
              </InputGroup>
            </Col>
          </Row>
          <Button
            block
            className="btn-round  "
            color="default"
            href="#"
            onClick={this.continue}
            size="lg"
          >
            <b> Continuar </b>
          </Button>
          <div className="pull-left">
            <h6>
              <Link className="link" to="/crear-cuenta">
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
        </div>
      </>
    );
  }
}

export default DatosUsuario;
