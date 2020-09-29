import React, { useState, useContext, useRef } from "react";
import moment from "moment";
import "moment/locale/es";
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
    errors: {
      Errordescripcion: { valido: true, mensaje: "" },
      Errornombre: { valido: true, mensaje: "" },
      Errortipo: { valido: true, mensaje: "" },
      Errormascota: { valido: true, mensaje: "" },
      Errorfecha_expiracion: { valido: true, mensaje: "" },
    },
  });
  const validate = () => {
    let isError = false;

    if (Frecordatorio.descripcion.trim() == "") {
      Frecordatorio.errors.Errordescripcion.valido = false;
      Frecordatorio.errors.Errordescripcion.mensaje =
        "(El campo descripción no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errordescripcion.valido = true;
    }
    if (Frecordatorio.nombre.trim() == "") {
      Frecordatorio.errors.Errornombre.valido = false;
      Frecordatorio.errors.Errornombre.mensaje =
        "(El campo nombre no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errornombre.valido = true;
    }
    if (Frecordatorio.tipo.trim() == "") {
      Frecordatorio.errors.Errortipo.valido = false;
      Frecordatorio.errors.Errortipo.mensaje =
        "(El campo tipo no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errortipo.valido = true;
    }
    if (Frecordatorio.mascota.trim() == "") {
      Frecordatorio.errors.Errormascota.valido = false;
      Frecordatorio.errors.Errormascota.mensaje =
        "(El campo mascota no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errormascota.valido = true;
    }
    if (Frecordatorio.fecha_expiracion.trim() == "") {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo fecha de expiración no puede estar vacio)";
    } else if (Frecordatorio.fecha_expiracion < moment().format("YYYY MM DD")) {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo fecha de expiración no puede ser menor que la fecha de hoy)";
    } else if (!moment(Frecordatorio.fecha_expiracion).isValid()) {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo fecha de expiración es invalida)";
    } else {
      Frecordatorio.errors.Errorfecha_expiracion.valido = true;
    }
    if (
      !Frecordatorio.errors.Errordescripcion.valido ||
      !Frecordatorio.errors.Errornombre.valido ||
      !Frecordatorio.errors.Errortipo.valido ||
      !Frecordatorio.errors.Errormascota.valido ||
      !Frecordatorio.errors.Errorfecha_expiracion.valido
    ) {
      isError = true;
      console.log("error :D");
    } else {
      isError = false;
    }
    return isError;
  };
  moment.lang("es", {
    months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
    monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
      "_"
    ),
    weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
  });
  moment.locale("es");
  const onSubmitEditar = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    const err = validate();

    if (!err) {
      actualizarRecordatorios({
        descripcion: Frecordatorio.descripcion,

        nombre: Frecordatorio.nombre,
        tipo: Frecordatorio.tipo,
        mascota: Frecordatorio.mascota,
        fecha_expiracion: Frecordatorio.fecha_expiracion,

        recordatorioId: props.recordatorio._id,
      });
      setModal1(false);
    }
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
