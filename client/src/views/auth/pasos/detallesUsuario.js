import React, { Component } from "react";
import ModalPoliticas from "../../../components/Modals/Politicas";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
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
  constructor(props) {
    super(props);
    this.state = { country: "", region: "" };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

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
                  <CountryDropdown
                    className="form-control"
                    value={this.props.usuario.pais}
                    id="pais"
                    name="pais"
                    required
                    defaultOptionLabel="Elija un país"
                    onFocus={() => this.props.setpaisFocus(true)}
                    onBlur={() => this.props.setpaisFocus(false)}
                    onChange={this.props.onChangeCountry}
                  />
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
                  <RegionDropdown
                    className="form-control"
                    name="ciudad"
                    id="ciudad"
                    blankOptionLabel="
  Ningún país seleccionado"
                    defaultOptionLabel="Ahora selecciona una región"
                    country={this.props.usuario.pais}
                    value={this.props.usuario.ciudad}
                    onChange={this.props.onChangeCity}
                  />
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
                    checked={this.props.usuario.genero === "Femenino"}
                    checked
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
                    checked={this.props.usuario.genero === "Masculino"}
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
                  Al registrarte, aceptas nuestras{" "}
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
        </div>
      </>
    );
  }
}

export default detallesUsuario;
