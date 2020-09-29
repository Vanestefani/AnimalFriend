import React, { useState, useContext, useRef } from "react";

import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import RecordatoriosContex from "../../../context/recordatorios/recordatoriosContex";
import AuthContext from "../../../context/autenticacion/authContext";

import "react-image-crop/dist/ReactCrop.css";
function Editar(props) {
  const [modalMascotas, setModal1] = React.useState(false);
  const rContext = useContext(RecordatoriosContex);
  const { actualizarRecordatorios } = rContext;
  //modal

  const [Frecordatorio, guardarrecordatorio] = useState({
    descripcion: props.recordatorio.descripcion,
    nombre: props.recordatorio.nombre,
    tipo: props.recordatorio.tipo,
    mascota: props.recordatorio.mascota._id,
    fecha_expiracion: props.recordatorio.fecha_expiracion,
  });
  const onSubmitEditar = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";

    actualizarRecordatorios({
      descripcion: Frecordatorio.descripcion,

      nombre: Frecordatorio.nombre,
      tipo: Frecordatorio.tipo,
      mascota: Frecordatorio.mascota,
      fecha_expiracion: Frecordatorio.fecha_expiracion,

      recordatorioId: props.recordatorio._id,
    });
  };
  const onChange = (e) => {
    guardarrecordatorio({
      ...Frecordatorio,
      [e.target.name]: e.target.value,
    });
  };
  const dateref = useRef(props.recordatorio.fecha_expiracion);
  return (
    <>
      <Button sm onClick={() => setModal1(true)}>
        <i className="fas fa-edit"></i>
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
          <h2 className="title title-up">Editar un recordatorio</h2>
        </div>
        <ModalBody>
          <div>

            <p>Titulo:</p>

            <InputGroup className>
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
                onChange={onChange}
                defaultValue={Frecordatorio.nombre}
                required
              ></Input>
            </InputGroup>
            <p>Descripción:</p>

            <InputGroup>
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
                onChange={onChange}
                defaultValue={Frecordatorio.descripcion}
              ></Input>
            </InputGroup>

            <Row>
              <Col md="6">
                <p>Fecha expiración:</p>

                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-birthday-cake"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="datetime-local"
                    id="fecha_expiracion"
                    ref={dateref}
                    name="fecha_expiracion"
                    placeholder={Frecordatorio.fecha_expiracion}
                    onChange={onChange}
                    defaultValue={Frecordatorio.fecha_expiracion}
                    required
                  ></Input>
                </InputGroup>
              </Col>
              <Col md="6">
                <p>Tipo</p>

                <InputGroup>
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
                    onChange={onChange}
                    defaultValue={Frecordatorio.tipo}
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
                <p>Mascota</p>
                <InputGroup>
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
                    onChange={onChange}
                    defaultValue={Frecordatorio.mascota}
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
              </Col>
            </Row>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="sucess" type="button" onClick={onSubmitEditar}>
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

export default Editar;
