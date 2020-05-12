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

import RecordatoriosContex from "../../../context/recordatorios/recordatoriosContex";
import AuthContext from "../../../context/autenticacion/authContext";

import "react-image-crop/dist/ReactCrop.css";
function FormRecordatorio(props) {
  const [modalMascotas, setModal1] = React.useState(false);

  //modal

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
          <h2 className="title title-up">Datos de recordatorios</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Añade un recordatorio</h4>
            <InputGroup className>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-user-clock"></i>
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
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-align-justify"></i>
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

            <Row>
              <Col md="6">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-birthday-cake"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="date"
                    id="fecha_expiracion"
                    name="fecha_expiracion"
                    onChange={props.onChange}
                    defaultValue={props.Frecordatorio.fecha_expiracion}
                    required
                  ></Input>
                </InputGroup>
              </Col>
              <Col md="6">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i class="fas fa-feather-alt"></i>
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
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i class="fas fa-feather-alt"></i>
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
                      <option key={mascota._id}>
                        {mascota.nombre}
                      </option>
                    ))}
                     <option >todas</option>
                  </Input>
                </InputGroup>
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

export default FormRecordatorio;
