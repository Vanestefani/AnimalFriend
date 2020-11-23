import React from "react";

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

import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import "react-image-crop/dist/ReactCrop.css";
function FormPerfil(props) {
  const [modalMascotas, setModal1] = React.useState(false);

  return (
    <>
      <Button small onClick={() => props.setModal1(true)}>
        <i className="fas fa-plus"></i>Editar
      </Button>

      <Modal isOpen={props.modalMascotas} toggle={() => props.setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => props.setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Datos personales</h2>
        </div>
        <ModalBody>
          <div>
            <span>Al modificar cualquier dato aparecera el boton editar para guardar los cambios</span>
            <h4>
              <center>
                <b>Información de usuario</b>
              </center>
            </h4>
            <FormGroup>
              <p>Nombre</p>
              <InputGroup
                className={
                  "no-border input-lg" +
                  (props.nombreFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Nombre completo"
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={props.fusuario.nombre}
                  onChange={props.onChange}
                  required
                ></Input>
              </InputGroup>
            </FormGroup>

            {!props.errores.Errornombre ? (
              <span className="text-muted">
                {props.errores.Errornombre.mensaje}
              </span>
            ) : (
              ""
            )}
            <FormGroup>
              <p>Pais</p>
              <InputGroup
                className={
                  "no-border input-lg" +
                  (props.paisFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fab fa-font-awesome-flag"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <CountryDropdown
                  className="form-control"
                  value={props.fusuario.pais}
                  id="pais"
                  name="pais"
                  required
                  defaultOptionLabel="Elija un país"
                  onFocus={() => props.setpaisFocus(true)}
                  onBlur={() => props.setpaisFocus(false)}
                  onChange={props.onChangeCountry}
                />
              </InputGroup>
            </FormGroup>
            {!props.errores.Errorpais.valido ? (
              <span className="text-muted">
                {props.errores.Errorpais.mensaje}
              </span>
            ) : (
              ""
            )}
            <p>Ciudad</p>
            <FormGroup>
              <InputGroup
                className={
                  "no-border input-lg" +
                  (props.ciudadFocus ? " input-group-focus" : "")
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
                  blankOptionLabel="Ningún país seleccionado"
                  defaultOptionLabel="Ahora selecciona una región"
                  country={props.fusuario.pais}
                  value={props.fusuario.ciudad}
                  onChange={props.onChangeCity}
                />
              </InputGroup>
              {!props.errores.Errorciudad.valido ? (
                <span className="text-muted">
                  {props.errores.Errorciudad.mensaje}
                </span>
              ) : (
                ""
              )}
            </FormGroup>
            <p>Genero</p>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  value="Femenino"
                  id="genero"
                  name="genero"
                  type="radio"
                  onChange={props.onChange}
                  checked={props.fusuario.genero === "Femenino"}
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
                  checked={props.fusuario.genero === "Masculino"}
                  onChange={props.onChange}
                ></Input>
                <span className="form-check-sign"></span>
                Masculino
              </Label>
              {!props.errores.Errorgenero.valido ? (
                <span className="text-muted">
                  {props.errores.Errorgenero.mensaje}
                </span>
              ) : (
                ""
              )}
            </FormGroup>
            <p>Descripciósn</p>
            <Input
              type="textarea"
              row="3"
              id="bio"
              name="bio"
              value={props.fusuario.bio}
              onChange={props.onChange}
              placeholder="Sobre ti"
            ></Input>
          </div>
        </ModalBody>
        <div className="modal-footer">
          {props.fusuario.isDisabled ? (
           ""
          ) : (
            <Button color="primary" type="button" onClick={props.onSubmit}>
              <i className="fas fa-paper-plane"></i> Enviar
            </Button>
          )}

        </div>
      </Modal>
    </>
  );
}

export default FormPerfil;
