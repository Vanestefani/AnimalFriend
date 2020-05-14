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
import EventosContex from "../../../context/eventos/eventosContex";
import AuthContext from "../../../context/autenticacion/authContext";

function CrearEventos(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const EContex = useContext(EventosContex);
  const { addEventos } = EContex;
  const [modalEventos, setModal1] = React.useState(false);
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  //FORM AÑADIR
  const [AEnventos, agregarEventos] = useState({
    titulo: "",
    categoria: "",
    fecha_inicio: "",
    fecha_finalizacion: "",
    descripcion: "",
  });
  const {
    titulo,
    categoria,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
  } = AEnventos;
  const [AarchivoImagen, AguardararchivoImagen] = useState(null);

  const onChange = (e) => {
    agregarEventos({
      ...AEnventos,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    let userid = usuario._id;

    if (AarchivoImagen === null || titulo === "") {
      console.log("esta vacio");
    } else {
      let formData = new FormData();
      formData.append("imagen", AarchivoImagen, AarchivoImagen.name);
      formData.append("titulo", titulo);
      formData.append("categoria", categoria);
      formData.append("fecha_inicio", fecha_inicio);
      formData.append("fecha_finalizacion", fecha_finalizacion);
      formData.append("descripcion", descripcion);
      formData.append("autor", userid);
      addEventos(formData);
    }
  };
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>
      </Button>

      <Modal isOpen={modalEventos} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Crear Eventos</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Información de evento</h4>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-play"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Titulo de evento"
                type="text"
                id="titulo"
                name="titulo"
                onChange={onChange}
                defaultValue={AEnventos.titulo}
                required
              ></Input>
            </InputGroup>

            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fab fa-microsoft"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Elige la Categoria del evento"
                type="select"
                id="categoria"
                name="categoria"
                onChange={onChange}
                defaultValue={AEnventos.categoria}
                required
              >
                <option value="Vacunas">Vacunas</option>
                <option value="Estelirizacion">Estelirizacion</option>
                <option value="Caminatas">Caminatas</option>
                <option value="Concursos">Concursos</option>
              </Input>
            </InputGroup>

            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-kiwi-bird"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="datetime-local"
                id="fecha_inicio"
                name="fecha_inicio"
                placeholder={AEnventos.fecha_inicio}
                onChange={onChange}
                defaultValue={AEnventos.fecha_inicio}
                required
              ></Input>
            </InputGroup>

            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-flag"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="datetime-local"
                id="fecha_finalizacion"
                name="fecha_finalizacion"
                placeholder={AEnventos.fecha_finalizacion}
                onChange={onChange}
                defaultValue={AEnventos.fecha_finalizacion}
                required
              ></Input>
            </InputGroup>

            <Input
              type="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Escribe la descripcion del evento"
              onChange={onChange}
              defaultValue={AEnventos.descripcion}
              required
            ></Input>
            <Row>
              <Col md="6">
                <Input
                  accept={acceptedFileTypes}
                  id="fotoEvento"
                  name="fotoEvento"
                  type="file"
                  onChange={(e) => AguardararchivoImagen(e.target.files[0])}
                  defaultValue={AarchivoImagen}
                  ref={imageInputRef}
                ></Input>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="sucess" type="button" onClick={onSubmit}>
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

export default CrearEventos;
