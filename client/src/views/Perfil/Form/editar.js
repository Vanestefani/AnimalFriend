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
  //imgen parametros
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";

  //modal
  const [modalMascotas, setModal1] = React.useState(false);

  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>Editar
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
            <h4>Información de usuario</h4>
            <FormGroup>
              <InputGroup>
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
                  onChange={props.onChange}
                  defaultValue={props.fusuario.nombre}
                  required
                  data-background-color="blue"
                ></Input>
              </InputGroup>
              {
                 !props.errores ?
              !props.errores.Errornombre.valido ? (
                <span className="text-muted">
                  {props.errores.Errornombre.mensaje}
                </span>
              ) : (
                ""
              ):""}
            </FormGroup>
            <FormGroup>
              <InputGroup>
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
                  onChange={props.onChange}
                  defaultValue={props.fusuario.email}
                  required
                ></Input>
              </InputGroup>
              {
                 !props.errores ?
              !props.errores.Erroremail.valido ? (
                <span className="text-muted">
                  {props.errores.Erroremail.mensaje}
                </span>
              ) : (
                ""
              ):""}
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <InputGroup>
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
                      onChange={props.onChange}
                      defaultValue={props.fusuario.password}
                      required
                    ></Input>
                  </InputGroup>
                  <InputGroup>
                    {
                       !props.errores ?
                    !props.errores.Errorpassword.valido ? (
                      <span className="text-muted">
                        {props.errores.Errorpassword.mensaje}
                      </span>
                    ) : (
                      ""
                    ):""}
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fas fa-key"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirmar Contraseña"
                      type="password"
                      id="password2"
                      name="password2"
                      onChange={props.onChange}
                      defaultValue={props.fusuario.password2}
                      required
                    ></Input>
                  </InputGroup>
                  {
                       !props.errores ?
                  !props.errores.Errorpassword2.valido ? (
                    <span className="text-muted">
                      {props.errores.Errorpassword2.mensaje}
                    </span>
                  ) : (
                    ""
                  ):""}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <InputGroup>
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
                      onChange={props.onChangeCountry}
                    />
                  </InputGroup>
                </FormGroup>
                {
                   !props.errores ?
                !props.errores.Errorpais.valido ? (
                  <span className="text-muted">
                    {props.errores.Errorpais.mensaje}
                  </span>
                ) : (
                  ""
                ):""}
              </Col>
              <Col md="6">
                <FormGroup>
                  <InputGroup>
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
                      country={props.fusuario.pais}
                      value={props.fusuario.ciudad}
                      onChange={props.onChangeCity}
                    />
                  </InputGroup>
                  {
                     !props.errores ?
                  !props.errores.Errorciudad.valido ? (
                    <span className="text-muted">
                      {props.errores.Errorciudad.mensaje}
                    </span>
                  ) : (
                    ""
                  ):""}
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

                  {
                  !props.errores ?

                  !props.errores.Errorgenero.valido ? (
                    <span className="text-muted">
                      {props.errores.Errorgenero.mensaje}
                    </span>
                  ) : (
                    ""
                  )
                :""}
                </FormGroup>
              </Col>
              <Col md="6"></Col>
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

export default FormPerfil;
