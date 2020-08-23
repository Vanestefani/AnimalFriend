import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
  FormGroup,
} from "reactstrap";

class DatosUsuario extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    return (
      <>
        <h4>Credenciales de usuario</h4>
        <div>
          <FormGroup>
            <InputGroup
              className={
                "input-lg no-border   " +
                (this.props.nombreFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  this.props.usuario.errors.Errornombre.valido
                    ? ""
                    : "is-invalid form-control-danger form-control"
                }
                placeholder="Nombre completo"
                type="text"
                onFocus={() => this.props.setnombreFocus(true)}
                onBlur={() => this.props.setnombreFocus(false)}
                id="nombre"
                name="nombre"
                onChange={this.props.onChange}
                defaultValue={this.props.usuario.nombre}
                required
                data-background-color="blue"
              ></Input>
            </InputGroup>
            {!this.props.usuario.errors.Errornombre.valido ? (
              <span className="text-muted">
                {this.props.usuario.errors.Errornombre.mensaje}
              </span>
            ) : (
              ""
            )}
          </FormGroup>
          <FormGroup>
            <InputGroup
              className={
                "no-border input-lg" +
                (this.props.emailFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-envelope"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  this.props.usuario.errors.Erroremail.valido
                    ? ""
                    : "is-invalid form-control-danger form-control"
                }
                placeholder="Email"
                type="email"
                onFocus={() => this.props.setemailFocus(true)}
                onBlur={() => this.props.setemailFocus(false)}
                id="email"
                name="email"
                onChange={this.props.onChange}
                defaultValue={this.props.usuario.email}
                required
              ></Input>
            </InputGroup>
            {!this.props.usuario.errors.Erroremail.valido ? (
              <span className="text-muted">
                {this.props.usuario.errors.Erroremail.mensaje}
              </span>
            ) : (
              ""
            )}
          </FormGroup>
          <Row>
            <Col md="6">
              <FormGroup>
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (this.props.passwordFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-key"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      this.props.usuario.errors.Errorpassword.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                    }
                    placeholder="Contraseña"
                    type="password"
                    onFocus={() => this.props.setpasswordFocus(true)}
                    onBlur={() => this.props.setpasswordFocus(false)}
                    id="password"
                    name="password"
                    onChange={this.props.onChange}
                    defaultValue={this.props.usuario.password}
                    required
                  ></Input>
                </InputGroup>
                <InputGroup>
                  {!this.props.usuario.errors.Errorpassword.valido ? (
                    <span className="text-muted">
                      {this.props.usuario.errors.Errorpassword.mensaje}
                    </span>
                  ) : (
                    ""
                  )}
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (this.props.password2Focus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-key"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      this.props.usuario.errors.Errorpassword2.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                    }
                    placeholder="Confirmar Contraseña"
                    type="password"
                    onFocus={() => this.props.setpassword2Focus(true)}
                    onBlur={() => this.props.setpassword2Focus(false)}
                    id="password2"
                    name="password2"
                    onChange={this.props.onChange}
                    defaultValue={this.props.usuario.password2}
                    required
                  ></Input>
                </InputGroup>
                {!this.props.usuario.errors.Errorpassword2.valido ? (
                  <span className="text-muted">
                    {this.props.usuario.errors.Errorpassword2.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Button
            block
            className="btn-round  "
            color="default"
            to="#"
            onClick={this.continue}
            size="lg"
          >
            <b> Continuar </b>
          </Button>
        </div>
      </>
    );
  }
}

export default DatosUsuario;
