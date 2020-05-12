import React, { useState, useContext, useEffect, useRef } from "react";

import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import MascotasContext from "../../../context/mascotas/mascotasContext";
import AuthContext from "../../../context/autenticacion/authContext";

import "react-image-crop/dist/ReactCrop.css";
function FormMascota(props) {
  //imgen parametros
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  //context
  const mContext = useContext(MascotasContext);
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const { addMascotas } = mContext;
  //modal
  const [modalMascotas, setModal1] = React.useState(false);
  //previw imagen
  let imgPreview;
  if (props.archivoImagen) {
    let preview = URL.createObjectURL(props.archivoImagen);
    imgPreview = <img width="100px" src={preview} alt="" />;
  } else {
    if (props.Fmascota.especie === "Gato") {
      imgPreview = (
        <img
          width="100px"
          src={require("../../../assets/img/undraw_Playful_cat_rchv.png")}
          alt=""
        />
      );
    } else if (props.Fmascota.especie === "Perro") {
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
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>
      </Button>

      <Modal isOpen={modalMascotas} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Datos de mascota</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Información de mascota</h4>
            <InputGroup
              className={
                "no-border input-lg" +
                (props.nombreMascotaFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-paw"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Nombre mascota"
                type="text"
                onFocus={() => props.setnombreMascotaFocus(true)}
                onBlur={() => props.setnombreMascotaFocus(false)}
                id="nombreMascota"
                name="nombreMascota"
                onChange={props.onChange}
                defaultValue={props.Fmascota.nombreMascota}
                required
              ></Input>
            </InputGroup>
            <Row>
              <Col md="6">
                <InputGroup
                  className={
                    "no-border input-lg" +
                    (props.especieFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-crow"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Especie"
                    type="select"
                    onFocus={() => props.setespecieFocus(true)}
                    onBlur={() => props.setespecieFocus(false)}
                    id="especie"
                    name="especie"
                    onChange={props.onChange}
                    defaultValue={props.Fmascota.especie}
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
                    (props.razaFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-feather"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Raza"
                    type="select"
                    onFocus={() => props.setrazaFocus(true)}
                    onBlur={() => props.setrazaFocus(false)}
                    id="raza"
                    name="raza"
                    onChange={props.onChange}
                    defaultValue={props.Fmascota.raza}
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
                      id="generoMascota"
                      name="generoMascota"
                      type="radio"
                      onChange={props.onChange}
                      defaultValue={props.Fmascota.generoMascota}
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
                      id="generoMascota"
                      name="generoMascota"
                      type="radio"
                      onChange={props.onChange}
                      defaultValue={props.Fmascota.generoMascota}
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
                    (props.fechanacimiento ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-birthday-cake"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="date"
                    onFocus={() => props.setfechanacimientoFocus(true)}
                    onBlur={() => props.setfechanacimientoFocus(false)}
                    id="fechanacimiento"
                    name="fechanacimiento"
                    onChange={props.onChange}
                    defaultValue={props.Fmascota.fechanacimiento}
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
                    (props.colorPrincipalFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-palette"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Color principal"
                    type="select"
                    onFocus={() => props.setrazaFocus(true)}
                    onBlur={() => props.setrazaFocus(false)}
                    id="colorPrincipal"
                    name="colorPrincipal"
                    onChange={props.onChange}
                    defaultValue={props.Fmascota.colorPrincipal}
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
                  accept={acceptedFileTypes}
                  id="fotoMascota"
                  name="fotoMascota"
                  type="file"
                  onChange={(e) =>
                    props.guardararchivoImagen(e.target.files[0])
                  }
                  defaultValue={props.archivoImagen}
                  ref={imageInputRef}
                ></Input>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="sucess" type="button" onClick={props.onSubmit}>
            <i className="fas fa-paper-plane"></i> Enviar
          </Button>
          <Button color="danger" type="button" onClick={() => setModal1(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default FormMascota;
