import React, { useState, useContext } from "react";

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

  //FORM AÑADIR
  const [AEnventos, agregarEventos] = useState({
    titulo: "",
    categoria: "",
    fecha_inicio: "",
    fecha_finalizacion: "",
    descripcion: "",
  });
  //errores
  const [errores, setEventos] = useState({
    Errortitulo: { valido: true, mensaje: "" },
    Errorcategoria: { valido: true, mensaje: "" },
    Errorfecha_inicio: { valido: true, mensaje: "" },
    Errorfecha_finalizacion: { valido: true, mensaje: "" },
    Errordescripcion: { valido: true, mensaje: "" },
    ErrorAarchivoImagen: { valido: true, mensaje: "" },
  });
  //focus
  const [tituloFocus, settituloFocus] = React.useState(false);
  const [categoriaFocus, setcategoriaFocus] = React.useState(false);
  const [fecha_inicioFocus, setfecha_inicioFocus] = React.useState(false);
  const [fecha_finalizacionFocus, setfecha_finalizacionFocus] = React.useState(
    false
  );

  const [descripcionFocus, setdescripcionFocus] = React.useState(false);

  const {
    titulo,
    categoria,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
  } = AEnventos;
  const [AarchivoImagen, AguardararchivoImagen] = useState(null);
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
    if (fecha_finalizacion.trim() === "") {
      if (errores) {
        errores.Errorfecha_finalizacion.valido = false;
        errores.Errorfecha_finalizacion.mensaje =
          "(El campo fecha finalizacion no puede estar vacio)";
      }
    } else {
      if (errores) errores.Errorfecha_finalizacion.valido = true;
    }
    if (fecha_inicio.trim() === "") {
      if (errores) {
        errores.Errorfecha_inicio.valido = false;
        errores.Errorfecha_inicio.mensaje =
          "(El campo fecha inicio no puede estar vacio)";
      }
    } else {
      if (errores) errores.Errorfecha_inicio.valido = true;
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
          "(El campo imagen no puede estar vacio)";
      }
    } else {
      if (errores) errores.ErrorAarchivoImagen.valido = true;
    }
    if (errores) {
      if (
        !errores.Errortitulo.valido ||
        !errores.Errorcategoria.valido ||
        !errores.Errorfecha_inicio.valido ||
        !errores.Errorfecha_finalizacion.valido ||
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

  const onChange = (e) => {
    agregarEventos({
      ...AEnventos,
      [e.target.name]: e.target.value,
    });
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
      formData.append("fecha_inicio", fecha_inicio);
      formData.append("fecha_finalizacion", fecha_finalizacion);
      formData.append("descripcion", descripcion);
      formData.append("autor", userid);
      addEventos(formData);
      console.log("click");
    } else {
      settituloFocus(true);

      validate();
    }
  };
  return (
    <>
      <Button small onClick={() => setModal1(true)}>
        <i className="fas fa-plus"></i>Añadir Evento
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
            <h4>
              <center>Información de evento</center>
            </h4>
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
                placeholder="Titulo de evento"
                type="text"
                id="titulo"
                name="titulo"
                onChange={onChange}
                defaultValue={AEnventos.titulo}
                onFocus={() => settituloFocus(true)}
                onBlur={() => settituloFocus(false)}
                required
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
            <InputGroup
              className={
                "no-border input-lg" +
                (categoriaFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-clone"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  errores != undefined
                    ? errores.Errorcategoria.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                    : ""
                }
                placeholder="Elige la Categoria del evento"
                type="select"
                id="categoria"
                name="categoria"
                onChange={onChange}
                defaultValue={AEnventos.categoria}
                required
                onFocus={() => setcategoriaFocus(true)}
                onBlur={() => setcategoriaFocus(false)}
              >
                <option selected="">Elija una categoria</option>
                <option value="Vacunas">Vacunas</option>
                <option value="Estelirizacion">Estelirizacion</option>
                <option value="Caminatas">Caminatas</option>
                <option value="Concursos">Concursos</option>
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
            <InputGroup
              className={
                errores != undefined
                  ? errores.Errorfecha_inicio.valido
                    ? ""
                    : "is-invalid form-control-danger form-control"
                  : ""
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-calendar-alt"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  errores != undefined
                    ? errores.Errorfecha_inicio.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                    : ""
                }
                type="datetime-local"
                id="fecha_inicio"
                name="fecha_inicio"
                placeholder={AEnventos.fecha_inicio}
                onChange={onChange}
                defaultValue={AEnventos.fecha_inicio}
                required
                onFocus={() => setfecha_inicioFocus(true)}
                onBlur={() => setfecha_inicioFocus(false)}
              ></Input>
            </InputGroup>
            {errores != undefined ? (
              errores.Errorfecha_inicio.valido ? (
                ""
              ) : (
                <span className="text-muted text-danger">
                  {errores.Errorfecha_inicio.mensaje}
                </span>
              )
            ) : (
              ""
            )}
            <InputGroup
              className={
                "no-border input-lg" +
                (fecha_finalizacionFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-calendar-day"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className={
                  errores != undefined
                    ? errores.Errorfecha_finalizacion.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                    : ""
                }
                type="datetime-local"
                id="fecha_finalizacion"
                name="fecha_finalizacion"
                placeholder={AEnventos.fecha_finalizacion}
                onChange={onChange}
                defaultValue={AEnventos.fecha_finalizacion}
                required
                onFocus={() => setfecha_finalizacionFocus(true)}
                onBlur={() => setfecha_finalizacionFocus(false)}
              ></Input>
            </InputGroup>
            {errores != undefined ? (
              errores.Errorfecha_finalizacion.valido ? (
                ""
              ) : (
                <span className="text-muted text-danger">
                  {errores.Errorfecha_finalizacion.mensaje}
                </span>
              )
            ) : (
              ""
            )}
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
              placeholder="Escribe la descripcion del evento"
              onChange={onChange}
              defaultValue={AEnventos.descripcion}
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
                <Input
                  className={
                    errores != undefined
                      ? errores.ErrorAarchivoImagen.valido
                        ? ""
                        : "is-invalid form-control-danger form-control"
                      : ""
                  }
                  accept={acceptedFileTypes}
                  id="fotoEvento"
                  name="fotoEvento"
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
export default CrearEventos;
