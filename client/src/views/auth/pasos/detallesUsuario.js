import React, { Component } from "react";
import { Link } from "react-router-dom";
import ModalPoliticas from "../../../components/Modals/Politicas";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Label,
  Row,
  FormGroup,
} from "reactstrap";
class detallesUsuario extends Component {
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    let imgPreview;
    if (this.props.usuario.genero === "Femenino") {
      imgPreview = (
        <img
          width="100px"
          src={require("../../../assets/img/undraw_female_avatar_w3jk.png")}
          alt=""
        />
      );
    } else {
      imgPreview = (
        <img
          width="100px"
          src={require("../../../assets/img/undraw_male_avatar_323b.png")}
          alt=""
        />
      );
    }

    return (
      <>
        <div>
          <h4>Información de usuario</h4>
          <Row>
            <Col md="6">
              <FormGroup>
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (this.props.paisFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fab fa-font-awesome-flag"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      this.props.usuario.errors.Errorpais.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                    }
                    type="select"
                    onFocus={() => this.props.setpaisFocus(true)}
                    onBlur={() => this.props.setpaisFocus(false)}
                    id="pais"
                    name="pais"
                    onChange={this.props.onChange}
                    defaultValue={this.props.usuario.pais}
                    required
                  >
                    <option selected value="">
                      Elija un país
                    </option>
                    <option value="Colombia">Colombia</option>
                  </Input>
                </InputGroup>
              </FormGroup>
              {!this.props.usuario.errors.Errorpais.valido ? (
                <span className="text-muted">
                  {this.props.usuario.errors.Errorpais.mensaje}
                </span>
              ) : (
                ""
              )}
            </Col>
            <Col md="6">
              <FormGroup>
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (this.props.ciudadFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-city"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    className={
                      this.props.usuario.errors.Errorciudad.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                    }
                    type="select"
                    onFocus={() => this.props.setciudadFocus(true)}
                    onBlur={() => this.props.setciudadFocus(false)}
                    id="ciudad"
                    name="ciudad"
                    onChange={this.props.onChange}
                    defaultValue={this.props.usuario.ciudad}
                    required
                  >
                    <option selected value="">
                      Elija una ciudad
                    </option>
                    <option value="Bogota">Bogota</option>
                    <option value="Medellin">Medellin</option>
                    <option value="Cali">Cali</option>
                  </Input>
                </InputGroup>
                {!this.props.usuario.errors.Errorciudad.valido ? (
                  <span className="text-muted">
                    {this.props.usuario.errors.Errorciudad.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    value="Femenino"
                    id="genero"
                    name="genero"
                    type="radio"
                    onChange={this.props.onChange}
                  ></Input>
                  <span className="form-check-sign"></span>
                  Femenino
                </Label>
              </FormGroup>
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    value="Masculino"
                    id="genero"
                    name="genero"
                    type="radio"
                    onChange={this.props.onChange}
                  ></Input>
                  <span className="form-check-sign"></span>
                  Masculino
                </Label>
                {!this.props.usuario.errors.Errorgenero.valido ? (
                  <span className="text-muted">
                    {this.props.usuario.errors.Errorgenero.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
            <Col md="6">{imgPreview}</Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <Label>
                  Al registrarte, aceptas nuestras
                  <ModalPoliticas></ModalPoliticas> .
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Button
                block
                className="btn-round  "
                color="danger"
                href="#"
                onClick={this.back}
                size="lg"
              >
                <b> Regresar </b>
              </Button>
            </Col>
            <Col md="6">
              <Button
                block
                className="btn-round  "
                color="default"
                href="#"
                onClick={this.props.handleSubmit}
                size="lg"
              >
                <b> Registrarse </b>
              </Button>
            </Col>
          </Row>

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
        </div>
      </>
    );
  }
}

export default detallesUsuario;
