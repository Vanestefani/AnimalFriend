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

import NegociosContex from "../../../context/negocios/negociosContex";
import AuthContext from "../../../context/autenticacion/authContext";
function FormEditarNegocios(props) {
  const EContex = useContext(NegociosContex);
  const { actualizarNegocios } = EContex;
  const [modalNegocios, setModal1] = React.useState(false);
  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  const [BNegocios, editarNegocios] = useState({
    titulo: props.evento.titulo,
    categoria: props.evento.categoria,
    fecha_inicio: props.evento.fecha_inicio,
    fecha_finalizacion: props.evento.fecha_finalizacion,
    descripcion: props.evento.descripcion,
  });
  const [archivoImagen, guardararchivoImagen] = useState(null);
  const onChange = (e) => {
    editarNegocios({
      ...BNegocios,
      [e.target.name]: e.target.value,
    });
  };
  const {
    titulo,
    categoria,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
  } = BNegocios;
  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("imagen", archivoImagen, archivoImagen.name);
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);
    formData.append("fecha_inicio", fecha_inicio);
    formData.append("fecha_finalizacion", fecha_finalizacion);
    formData.append("descripcion", descripcion);

    actualizarNegocios(formData);
  };
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>
      </Button>

      <Modal isOpen={modalNegocios} toggle={() =>setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={()=>setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Crear Negocios</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Información de negocio</h4>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-play"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Titulo de negocio"
                type="text"
                id="titulo"
                name="titulo"
                onChange={onChange}
                defaultValue={BNegocios.titulo}
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
                placeholder="Elige la Categoria del negocio"
                type="select"
                id="categoria"
                name="categoria"
                onChange={onChange}
                defaultValue={BNegocios.categoria}
                required
              >
                <option value="Comida">Comida</option>
                <option value="Ropa">Ropa</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Veterinaria">Veterinaria</option>
                <option value="PeluqueriaVeterinaria">Peluqueria</option>

              </Input>
            </InputGroup>

            <Input
              type="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Escribe la descripcion del negocio"
              onChange={onChange}
              defaultValue={BNegocios.descripcion}
              required
            ></Input>
            <Row>
              <Col md="6">
                <Input
                  accept={acceptedFileTypes}
                  id="fotoNegocio"
                  name="fotoNegocio"
                  type="file"
                  onChange={(e) =>guardararchivoImagen(e.target.files[0])}
                  defaultValue={archivoImagen}
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

export default FormEditarNegocios;
