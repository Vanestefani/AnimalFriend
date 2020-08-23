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
import moment from "moment";
import "moment/locale/es";

import "react-image-crop/dist/ReactCrop.css";
function FormRecordatorio(props) {
  //modal
  return (
    <>
      <Button
        className="pull-right "
        size="sm"
        onClick={() => props.setModal1(true)}
      >
        <i className="fas fa-plus"></i>
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
          <h2 className="title title-up">Datos de recordatorios</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Añade un recordatorio</h4>
            <InputGroup
              className={
                props.Frecordatorio.errors.Errornombre.valido
                  ? ""
                  : "is-invalid form-control-danger form-control"
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-user-clock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Titulo"
                type="text"
                id="nombre"
                name="nombre"
                onChange={props.onChange}
                defaultValue={props.Frecordatorio.nombre}
                required
              ></Input>
            </InputGroup>
            {!props.Frecordatorio.errors.Errornombre.valido ? (
              <span className="text-muted">
                {props.Frecordatorio.errors.Errornombre.mensaje}
              </span>
            ) : (
              ""
            )}
            <InputGroup
              className={
                props.Frecordatorio.errors.Errordescripcion.valido
                  ? ""
                  : "is-invalid form-control-danger form-control"
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-align-justify"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Descripción"
                rows="3"
                type="textarea"
                id="descripcion"
                name="descripcion"
                onChange={props.onChange}
                defaultValue={props.Frecordatorio.descripcion}
              ></Input>
            </InputGroup>
            {!props.Frecordatorio.errors.Errordescripcion.valido ? (
              <span className="text-muted">
                {props.Frecordatorio.errors.Errordescripcion.mensaje}
              </span>
            ) : (
              ""
            )}
            <Row>
              <Col md="12">
                <InputGroup
                  className={
                    props.Frecordatorio.errors.Errorfecha_expiracion.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-flag"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="date"
                    id="fecha_expiracion"
                    name="fecha_expiracion"
                    onChange={props.onChange}
                    min={moment().format("YYYY-MM-DD")}
                    defaultValue={props.Frecordatorio.fecha_expiracion}
                    required
                  ></Input>
                </InputGroup>
                {!props.Frecordatorio.errors.Errorfecha_expiracion.valido ? (
                  <span className="text-muted">
                    {props.Frecordatorio.errors.Errorfecha_expiracion.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
              <Col md="12">
                <InputGroup
                  className={
                    props.Frecordatorio.errors.Errortipo.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-feather-alt"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tipo"
                    type="select"
                    id="tipo"
                    name="tipo"
                    onChange={props.onChange}
                    defaultValue={props.Frecordatorio.tipo}
                    required
                  >
                    <option selected="">Elija una categoria</option>
                    <option>Cumpleaños</option>
                    <option>Vacunas</option>
                    <option>Desparasitar</option>
                    <option>Peluqueria</option>
                    <option>Paseos</option>
                    <option>Medicinas</option>
                    <option>Guarderia</option>
                    <option>Veterinaria</option>
                    <option>Comida</option>
                    <option>Otro</option>
                  </Input>
                </InputGroup>
                {!props.Frecordatorio.errors.Errortipo.valido ? (
                  <span className="text-muted">
                    {props.Frecordatorio.errors.Errortipo.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <InputGroup
                  className={
                    props.Frecordatorio.errors.Errormascota.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-feather-alt"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tipo"
                    type="select"
                    id="mascota"
                    name="mascota"
                    onChange={props.onChange}
                    defaultValue={props.Frecordatorio.mascota}
                    required
                  >
                    <option selected="">Elija una mascota</option>
                    {props.mascotas.map((mascota) => (
                      <option key={mascota._id} value={mascota._id}>
                        {mascota.nombre}
                      </option>
                    ))}
                  </Input>
                </InputGroup>
                {!props.Frecordatorio.errors.Errormascota.valido ? (
                  <span className="text-muted">
                    {props.Frecordatorio.errors.Errormascota.mensaje}
                  </span>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="sucess" type="button" onClick={props.onSubmit}>
            <i className="fas fa-paper-plane"></i> Enviar
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => props.setModal1(false)}
          >
            Cerrar
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default FormRecordatorio;
