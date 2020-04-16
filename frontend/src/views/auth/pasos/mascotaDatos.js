import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
  Button,
} from "reactstrap";
//Modal
import ModalMsnRegistroExitoso from '../../../components/Modals/MsnRegistroExitoso';

class mascotaDatos extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
 onSubmitRegistro = (e) => {
    e.preventDefault();

  };

  render() {
    let imgPreview;
    if (this.props.archivoImagen.fotoMascota) {
      imgPreview = (
        <img width="100px" src={this.props.archivoImagen.fotoMascota} alt="" />
      );
    } else {
      if (this.props.usuario.especie === "Gato") {
        imgPreview = (
          <img
            width="100px"
            src={require("../../../assets/img/undraw_Playful_cat_rchv.png")}
            alt=""
          />
        );
      } else if (this.props.usuario.especie === "Perro") {
        imgPreview = (
          <img
            width="100px"
            src={require("../../../assets/img/undraw_Cautious_dog_q83f.png")}
            alt=""
          />
        );
      } else {
        imgPreview = (
          <img
            width="100px"
            src={require("../../../assets/img/undraw_happy_music_g6wc.png")}
            alt=""
          />
        );
      }
    }
    return (
      <>
        <div>
          <h4>Información de mascota</h4>
          <InputGroup
            className={
              "no-border input-lg" +
              (this.props.nombreMascotaFocus ? " input-group-focus" : "")
            }
          >
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i class="fas fa-paw"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Nombre mascota"
              type="text"
              onFocus={() => this.props.setnombreMascotaFocus(true)}
              onBlur={() => this.props.setnombreMascotaFocus(false)}
              id="nombre"
              name="nombre"
              onChange={this.props.onChange}
              defaultValue={this.props.usuario.nombreMascota}
              required
              data-background-color="blue"
            ></Input>
          </InputGroup>
          <Row>
            <Col md="6">
              <InputGroup
                className={
                  "no-border input-lg" +
                  (this.props.especieFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-crow"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Especie"
                  type="select"
                  onFocus={() => this.props.setespecieFocus(true)}
                  onBlur={() => this.props.setespecieFocus(false)}
                  id="especie"
                  name="especie"
                  onChange={this.props.onChange}
                  defaultValue={this.props.usuario.especie}
                  required
                >
                  <option selected="">Elija una especie</option>
                  <option>Gato</option>
                  <option>Perro</option>
                  <option>Ave</option>
                </Input>
              </InputGroup>
            </Col>
            <Col md="6">
              <InputGroup
                className={
                  "no-border input-lg" +
                  (this.props.razaFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-feather"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Raza"
                  type="select"
                  onFocus={() => this.props.setrazaFocus(true)}
                  onBlur={() => this.props.setrazaFocus(false)}
                  id="raza"
                  name="raza"
                  onChange={this.props.onChange}
                  defaultValue={this.props.usuario.raza}
                  required
                >
                  <option selected="">Elija una raza</option>
                  <option>Criollo</option>
                </Input>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col md="6">
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    value="Hembra"
                    id="sexoMascota"
                    name="sexoMascota"
                    type="radio"
                    onChange={this.props.onChange}
                    defaultValue={this.props.usuario.sexoMascota}
                  ></Input>
                  <span className="form-check-sign"></span>
                  Hembra
                </Label>
              </FormGroup>
              <FormGroup check className="form-check-radio">
                <Label check>
                  <Input
                    defaultChecked
                    value="Macho"
                    id="sexoMascota"
                    name="sexoMascota"
                    type="radio"
                    onChange={this.props.onChange}
                    defaultValue={this.props.usuario.sexoMascota}
                  ></Input>
                  <span className="form-check-sign"></span>
                  Macho
                </Label>
              </FormGroup>
            </Col>
            <Col md="6">
              <InputGroup
                className={
                  "no-border input-lg" +
                  (this.props.fechanacimiento ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-birthday-cake"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="date"
                  onFocus={() => this.props.setfechanacimientoFocus(true)}
                  onBlur={() => this.props.setfechanacimientoFocus(false)}
                  id="fechanacimiento"
                  name="fechanacimiento"
                  onChange={this.props.onChange}
                  defaultValue={this.props.usuario.fechanacimiento}
                  required
                ></Input>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <InputGroup
                className={
                  "no-border input-lg" +
                  (this.props.colorPrincipalFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i class="fas fa-palette"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Color principal"
                  type="select"
                  onFocus={() => this.props.setrazaFocus(true)}
                  onBlur={() => this.props.setrazaFocus(false)}
                  id="colorPrincipal"
                  name="colorPrincipal"
                  onChange={this.props.onChange}
                  defaultValue={this.props.usuario.colorPrincipal}
                  required
                >
                  <option selected="">Elija un color</option>
                  <option>Cafe</option>
                  <option>Blanco</option>
                  <option>Negro</option>
                  <option>Amarillo</option>
                  <option>Naranja</option>
                </Input>
              </InputGroup>
            </Col>
            <Col md="6">
              <p>
                <b>Foto de mascota</b>
              </p>
              {imgPreview}
              <Input
                id="fotoMascota"
                name="fotoMascota"
                type="file"
                onChange={this.props.onChangeImages}
                defaultValue={this.props.archivoImagen.fotoMascota}
              ></Input>
            </Col>
          </Row>
          <Row>
              <Col md="12">
              <FormGroup check>
            <Label check>
              <Input type="checkbox"
                onFocus={() => this.props.setleePoliticas(true)}
                onBlur={() => this.props.setleePoliticas(false)}
                id="leePoliticas"
                name="leePoliticas"
                onChange={this.props.onChange}
                defaultValue={this.props.usuario.leePoliticas}
                required
              ></Input>
              <span className="form-check-sign"></span>
              Si he leído los terminos y condiciones de AnimalFriend
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
                onClick={this.onSubmitRegistro}
                size="lg"
              >
                <b> Registrarse </b>
              </Button>
            </Col>
          </Row>

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

export default mascotaDatos;
