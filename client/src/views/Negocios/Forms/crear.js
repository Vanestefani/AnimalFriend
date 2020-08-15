import React, { useState, useContext, useEffect, useRef } from "react";

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
import NegociosContex from "../../../context/negocios/negociosContex";
import AuthContext from "../../../context/autenticacion/authContext";

function CrearNegocios(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const EContex = useContext(NegociosContex);
  const { addNegocios } = EContex;

  const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  //FORM AÑADIR
  const [ANegocios, agregarNegocios] = useState({
    titulo: "",
    categoria: "",

    descripcion: "",
  });
  const {
    titulo, categoria, mascota, descripcion
  } = ANegocios;
  const [AarchivoImagen, AguardararchivoImagen] = useState(null);

  const onChange = (e) => {
    agregarNegocios({
      ...ANegocios,
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

    formData.append("descripcion", descripcion);
    formData.append("autor", userid);
    addNegocios(formData);
    console.log("click");
  };
  const [modalNegocios, setModal1] = React.useState(false);
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>Añadir Negocio
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
                  <i className="fas fa-play"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Titulo de negocio"
                type="text"
                id="titulo"
                name="titulo"
                onChange={onChange}
                defaultValue={ANegocios.titulo}
                required
              ></Input>
            </InputGroup>

            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fab fa-microsoft"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Elige la Categoria del negocio"
                type="select"
                id="categoria"
                name="categoria"
                onChange={onChange}
                defaultValue={ANegocios.categoria}
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
              defaultValue={ANegocios.descripcion}
              required
            ></Input>
            <Row>
              <Col md="6">
                <Input
                  accept={acceptedFileTypes}
                  id="fotoNegocio"
                  name="fotoNegocio"
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

export default CrearNegocios;
