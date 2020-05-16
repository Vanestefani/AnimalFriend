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

import AnunciosContex from "../../../context/anuncios/anunciosContext";
import AuthContext from "../../../context/autenticacion/authContext";
function FormEditarAnuncios(props) {
  const EContex = useContext(AnunciosContex);
  const { actualizarAnuncios } = EContex;
  const [modalAnuncios, setModal1] = React.useState(false);
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  const [BAnuncios, editarAnuncios] = useState({
    titulo: props.evento.titulo,
    categoria: props.evento.categoria,
    fecha_inicio: props.evento.fecha_inicio,
    fecha_finalizacion: props.evento.fecha_finalizacion,
    descripcion: props.evento.descripcion,
  });
  const [archivoImagen, guardararchivoImagen] = useState(null);
  const onChange = (e) => {
    editarAnuncios({
      ...BAnuncios,
      [e.target.name]: e.target.value,
    });
  };
  const {
    titulo,
    categoria,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
  } = BAnuncios;
  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("imagen", archivoImagen, archivoImagen.name);
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);
    formData.append("fecha_inicio", fecha_inicio);
    formData.append("fecha_finalizacion", fecha_finalizacion);
    formData.append("descripcion", descripcion);

    actualizarAnuncios(formData);
  };
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>
      </Button>

      <Modal isOpen={modalAnuncios} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Crear Anuncios</h2>
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
                defaultValue={BAnuncios.titulo}
                required
              ></Input>
            </InputGroup>
            <Row>
              <Col md="3">
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
                    defaultValue={BAnuncios.categoria}
                    required
                  >
                    <option value="Vacunas">Vacunas</option>
                    <option value="Estelirizacion">Estelirizacion</option>
                    <option value="Caminatas">Caminatas</option>
                    <option value="Concursos">Concursos</option>
                  </Input>
                </InputGroup>
              </Col>

              <Col md="3">
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
                    placeholder={BAnuncios.fecha_inicio}
                    onChange={onChange}
                    defaultValue={BAnuncios.fecha_inicio}
                    required
                  ></Input>
                </InputGroup>
              </Col>
              <Col md="3">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i class="fas fa-kiwi-bird"></i>
                      <i class="fas fa-flag"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="datetime-local"
                    id="fecha_finalizacion"
                    name="fecha_finalizacion"
                    placeholder={BAnuncios.fecha_finalizacion}
                    onChange={onChange}
                    defaultValue={BAnuncios.fecha_finalizacion}
                    required
                  ></Input>
                </InputGroup>
              </Col>
            </Row>
            <Input
              type="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Escribe la descripcion del evento"
              onChange={onChange}
              defaultValue={BAnuncios.descripcion}
              required
            ></Input>

            <Input
              accept={acceptedFileTypes}
              id="fotoEvento"
              name="fotoEvento"
              type="file"
              onChange={(e) => guardararchivoImagen(e.target.files[0])}
              defaultValue={archivoImagen}
              ref={imageInputRef}
            ></Input>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="sucess"  onClick={onSubmit}>
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

export default FormEditarAnuncios;
