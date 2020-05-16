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
import MascotasContext from "../../../context/mascotas/mascotasContext";

function CrearAnuncios(props) {
  const mContext = useContext(MascotasContext);
  const { mascotas, mascotasUsuario } = mContext;
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
    mascota: "",
    descripcion: "",
  });
  const { titulo, categoria, mascota, descripcion } = AAnuncios;
  const [AarchivoImagen, AguardararchivoImagen] = useState(null);
  useEffect(() => {
    mascotasUsuario();
  }, []);
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
    formData.append("autor", userid);
    formData.append("mascota", mascota);

    formData.append("descripcion", descripcion);
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
                <option selected="">Elija una categoria</option>
                <option value="Mascotas Perdidas">Mascotas Perdidas</option>
                <option value="Adopciones">Adopciones</option>
                <option value="Animales encontrados">
                  Animales encontrados
                </option>
                <option value="Emparejar">Emparejar</option>
              </Input>
            </InputGroup>

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
                onChange={onChange}
                defaultValue={mascota}
                required
              >
                <option selected="">Elija una mascota</option>
                {mascotas.map((mascota) => (
                  <option key={mascota._id} value={mascota._id}>
                    {mascota.nombre}
                  </option>
                ))}
              </Input>
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
