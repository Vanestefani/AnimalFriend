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
  const { titulo, categoria, mascota, descripcion } = ANegocios;
  const [AarchivoImagen, AguardararchivoImagen] = useState(null);

  //errores
  const [errores, setEventos] = useState({
    Errortitulo: { valido: true, mensaje: "" },
    Errorcategoria: { valido: true, mensaje: "" },
    Errordescripcion: { valido: true, mensaje: "" },
    ErrorAarchivoImagen: { valido: true, mensaje: "" },
  });
  //focus
  const [tituloFocus, settituloFocus] = React.useState(false);
  const [categoriaFocus, setcategoriaFocus] = React.useState(false);
  const [descripcionFocus, setdescripcionFocus] = React.useState(false);
  const onChange = (e) => {
    agregarNegocios({
      ...ANegocios,
      [e.target.name]: e.target.value,
    });
  };
  //validacion
  const validate = () => {
    let isError = false;
    if (descripcion.trim() === "") {
      if (errores) {
        errores.Errordescripcion.valido = false;
        errores.Errordescripcion.mensaje =
          "(El campo descripción no puede estar vacio)";
      }
    } else {
      if (errores) errores.Errordescripcion.valido = true;
    }

    if (categoria.trim() === "") {
      if (errores) {
        errores.Errorcategoria.valido = false;
        errores.Errorcategoria.mensaje =
          "(El campo categoria no puede estar vacio)";
      }
    } else {
      if (errores) errores.Errorcategoria.valido = true;
    }
    if (titulo.trim() === "") {
      if (errores) {
        errores.Errortitulo.valido = false;
        errores.Errortitulo.mensaje = "(El campo titulo no puede estar vacio)";
      }
    } else {
      if (errores) errores.Errortitulo.valido = true;
    }
    if (AarchivoImagen === null) {
      if (errores) {
        errores.ErrorAarchivoImagen.valido = false;
        errores.ErrorAarchivoImagen.mensaje =
          "(El campo portada no puede estar vacio)";
      }
    } else {
      if (errores) errores.ErrorAarchivoImagen.valido = true;
    }
    if (errores) {
      if (
        !errores.Errortitulo.valido ||
        !errores.Errorcategoria.valido ||
        !errores.Errordescripcion.valido ||
        !errores.ErrorAarchivoImagen.valido
      ) {
        isError = true;
      } else {
        isError = false;
      }
    }

    return isError;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    const err = validate();
    if (!err) {
      let userid = usuario._id;

      let formData = new FormData();
      formData.append("imagen", AarchivoImagen, AarchivoImagen.name);
      formData.append("titulo", titulo);
      formData.append("categoria", categoria);

      formData.append("descripcion", descripcion);
      formData.append("autor", userid);
      addNegocios(formData);
    } else {
      settituloFocus(true);

      validate();
    }
  };
  const [modalNegocios, setModal1] = React.useState(false);
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>Añadir Negocio
      </Button>

      <Modal isOpen={modalNegocios} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Crear Negocios</h2>
        </div>
        <ModalBody>
          <div>
            <h4>
              <center>
                <b>Información de negocio</b>
              </center>
            </h4>
            <p>Titulo</p>
            <InputGroup
              className={
                "no-border input-lg" + (tituloFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                <i class="fas fa-edit"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  errores != undefined
                    ? errores.Errortitulo.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                    : ""
                }
                placeholder="Titulo de negocio"
                type="text"
                id="titulo"
                name="titulo"
                onChange={onChange}
                defaultValue={ANegocios.titulo}
                required
                onFocus={() => settituloFocus(true)}
                onBlur={() => settituloFocus(false)}
              ></Input>
            </InputGroup>
            {errores != undefined ? (
              errores.Errortitulo.valido ? (
                ""
              ) : (
                <span className="text-muted text-danger">
                  {errores.Errortitulo.mensaje}
                </span>
              )
            ) : (
              ""
            )}
            <p>Categoria</p>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                <i class="fas fa-clone"></i>
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
                className={
                  errores != undefined
                    ? errores.Errorcategoria.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                    : ""
                }
                onFocus={() => setcategoriaFocus(true)}
                onBlur={() => setcategoriaFocus(false)}
              >
                <option selected="">Elija una categoria</option>
                <option value="Comida">Comida</option>
                <option value="Ropa">Ropa</option>
                <option value="Juguetes">Juguetes</option>
                <option value="Veterinaria">Veterinaria</option>
                <option value="PeluqueriaVeterinaria">Peluqueria</option>
              </Input>
            </InputGroup>
            {errores != undefined ? (
              errores.Errorcategoria.valido ? (
                ""
              ) : (
                <span className="text-muted text-danger">
                  {errores.Errorcategoria.mensaje}
                </span>
              )
            ) : (
              ""
            )}
            <p> Descripción</p>
            <Input
              className={
                errores != undefined
                  ? errores.Errordescripcion.valido
                    ? ""
                    : "is-invalid form-control-danger form-control"
                  : ""
              }
              type="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Escribe la descripcion del negocio"
              onChange={onChange}
              defaultValue={ANegocios.descripcion}
              required
              onFocus={() => setdescripcionFocus(true)}
              onBlur={() => setdescripcionFocus(false)}
            ></Input>
            {errores != undefined ? (
              errores.Errordescripcion.valido ? (
                ""
              ) : (
                <span className="text-muted text-danger">
                  {errores.Errordescripcion.mensaje}
                </span>
              )
            ) : (
              ""
            )}
            <Row>
              <Col md="6">
                <p>Portada</p>
                <Input
                  className={
                    errores != undefined
                      ? errores.ErrorAarchivoImagen.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                      : ""
                  }
                  accept={acceptedFileTypes}
                  id="fotoNegocio"
                  name="fotoNegocio"
                  type="file"
                  onChange={(e) => AguardararchivoImagen(e.target.files[0])}
                  defaultValue={AarchivoImagen}
                  ref={imageInputRef}
                ></Input>
                {errores != undefined ? (
                  errores.ErrorAarchivoImagen.valido ? (
                    ""
                  ) : (
                    <span className="text-muted text-danger">
                      {errores.ErrorAarchivoImagen.mensaje}
                    </span>
                  )
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

export default CrearNegocios;
