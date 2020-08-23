import React, { useState, useContext, useEffect } from "react";

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

  //FORM AÑADIR
  const [AAnuncios, agregarAnuncios] = useState({
    titulo: "",
    categoria: "",
    mascota: "",
    descripcion: "",
    errors: {
      titulo: { valido: true, mensaje: "" },
      categoria: { valido: true, mensaje: "" },
      mascota: { valido: true, mensaje: "" },
      descripcion: { valido: true, mensaje: "" },
      Errorfoto: { valido: true, mensaje: "" },
    },
  });
  const { titulo, categoria, mascota, descripcion, errors } = AAnuncios;
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

  const validate = () => {
    let isError = false;

    if (descripcion.trim() == "") {
      errors.descripcion.valido = false;
      errors.descripcion.mensaje =
        "(El campo descripcion no puede estar vacio)";
    } else {
      errors.descripcion.valido = true;
    }

    if (mascota.trim() == "") {
      errors.mascota.valido = false;
      errors.mascota.mensaje = "(El campo mascota no puede estar vacio)";
    } else {
      errors.mascota.valido = true;
    }
    if (categoria.trim() == "") {
      errors.categoria.valido = false;
      errors.categoria.mensaje = "(El campo categoria no puede estar vacio)";
    } else {
      errors.categoria.valido = true;
    }
    if (titulo.trim() == "") {
      errors.titulo.valido = false;
      errors.titulo.mensaje = "(El campo titulo no puede estar vacio)";
    } else {
      errors.titulo.valido = true;
    }
    if (AarchivoImagen == null) {
      errors.Errorfoto.valido = false;
      errors.Errorfoto.mensaje = "(Debe subir una imagen)";
    } else {
      errors.Errorfoto.valido = true;
    }

    if (
      !errors.descripcion.valido ||
      !errors.mascota.valido ||
      !errors.categoria.valido ||
      !errors.titulo.valido ||
      !errors.Errorfoto.valido
    ) {
      isError = true;
      console.log("error :D");
    } else {
      isError = false;
    }
    return isError;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let err = validate();
    if (!err) {
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
    }
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
            <InputGroup
              className={
                errors.titulo.valido
                  ? ""
                  : "is-invalid form-control-danger form-control"
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-play"></i>
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
              {!errors.titulo.valido ? (
                <span className="text-muted">{errors.titulo.mensaje}</span>
              ) : (
                ""
              )}
            </InputGroup>

            <InputGroup
              className={
                errors.categoria.valido
                  ? ""
                  : "is-invalid form-control-danger form-control"
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fab fa-microsoft"></i>
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
              {!errors.categoria.valido ? (
                <span className="text-muted">{errors.categoria.mensaje}</span>
              ) : (
                ""
              )}
            </InputGroup>

            <InputGroup
              className={
                errors.mascota.valido
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
              {!errors.mascota.valido ? (
                <span className="text-muted">{errors.mascota.mensaje}</span>
              ) : (
                ""
              )}
            </InputGroup>

            <Input
              className={
                errors.descripcion.valido
                  ? ""
                  : "is-invalid form-control-danger form-control"
              }
              type="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Escribe la descripcion del anuncio"
              onChange={onChange}
              defaultValue={AAnuncios.descripcion}
              required
            ></Input>
            {!errors.descripcion.valido ? (
              <span className="text-muted">{errors.descripcion.mensaje}</span>
            ) : (
              ""
            )}
            <Row>
              <Col md="6">
                <Input
                  className={
                    errors.Errorfoto.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                  }
                  accept={acceptedFileTypes}
                  id="fotoAnuncio"
                  name="fotoAnuncio"
                  type="file"
                  onChange={(e) => AguardararchivoImagen(e.target.files[0])}
                  defaultValue={AarchivoImagen}
                  ref={imageInputRef}
                ></Input>
                {!errors.Errorfoto.valido ? (
                  <span className="text-muted">{errors.Errorfoto.mensaje}</span>
                ) : (
                  ""
                )}
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
