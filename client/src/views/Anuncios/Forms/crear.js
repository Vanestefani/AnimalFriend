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

function CrearAnuncios(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const EContex = useContext(AnunciosContex);
  const { addAnuncios } = EContex;
  const [modalAnuncios, setModal1] = React.useState(false);
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  //FORM AÑADIR
  const [AAnuncios, agregarAnuncios] = useState({
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
  } = AAnuncios;
  const [AarchivoImagen, AguardararchivoImagen] = useState(null);

  const onChange = (e) => {
    agregarAnuncios({
      ...AAnuncios,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    let userid = usuario._id;

    let formData = new FormData();
    formData.append("imagen", AarchivoImagen, AarchivoImagen.name);
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);
    formData.append("fecha_inicio", fecha_inicio);
    formData.append("fecha_finalizacion", fecha_finalizacion);
    formData.append("descripcion", descripcion);
    formData.append("autor", userid);
    addAnuncios(formData);
    console.log("click");
  };
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>Añadir Anuncio
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
            <h4>Información de anuncio</h4>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-play"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Titulo de anuncio"
                type="text"
                id="titulo"
                name="titulo"
                onChange={onChange}
                defaultValue={AAnuncios.titulo}
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
                placeholder="Elige la Categoria del anuncio"
                type="select"
                id="categoria"
                name="categoria"
                onChange={onChange}
                defaultValue={AAnuncios.categoria}
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
                placeholder={AAnuncios.fecha_inicio}
                onChange={onChange}
                defaultValue={AAnuncios.fecha_inicio}
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
                placeholder={AAnuncios.fecha_finalizacion}
                onChange={onChange}
                defaultValue={AAnuncios.fecha_finalizacion}
                required
              ></Input>
            </InputGroup>

            <Input
              type="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Escribe la descripcion del anuncio"
              onChange={onChange}
              defaultValue={AAnuncios.descripcion}
              required
            ></Input>
            <Row>
              <Col md="6">
                <Input
                  accept={acceptedFileTypes}
                  id="fotoAnuncio"
                  name="fotoAnuncio"
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
          <Button color="sucess" onClick={onSubmit}>
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

export default CrearAnuncios;
