import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Button,
  Input,
  CardHeader,
  Card,
  CardBody,
  Form,
  Alert,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostContext from "../../context/post/postContext";
import AuthContext from "../../context/autenticacion/authContext";

import "react-image-crop/dist/ReactCrop.css";

function CrearPublicacion() {
    const imageInputRef = React.useRef();
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);

  const { usuario} = authContext;
  const { addPost } = postContext;

  const [state, setstate] = useState({
    descripcion: " ",
  });
  const [photo, guardararchivophoto] = useState(null);
  const { descripcion } = state;
  const [errores, seterrores] = useState(false);
  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userid = usuario._id;
    if (photo === null || state.descripcion === "") {
      seterrores(true);
    } else {
      let formData = new FormData();
      formData.append("imagen", photo, photo.name);
      formData.append("descripcion", descripcion);
      formData.append("autor", userid);
      addPost(formData);
    }
    setstate({
      descripcion: " ",
    });
    guardararchivophoto(null);
    imageInputRef.current.value = ""; //Resets the file name of the file input - See #2
  };
  const mensaje_error = () => {
    return (
      <Alert color="danger">
        <i class="fas fa-exclamation-triangle"></i>
        "Todos los campos son obligatorios"
      </Alert>
    );
  };

  return (
    <>
      <Card className="card-post">
        {errores ? mensaje_error : ""}
        <Form noValidate autoComplete="off">
          <CardHeader>
            <div className="media d-block d-md-flex mt-4">
              <img
                className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3"
                src={usuario.fotoPerfil}
                width="60px"
              ></img>
              <div className="media-body text-center text-md-left ml-md-3 ml-0">
                <p className="font-weight-bold my-0">{usuario.nombre}</p>

                <Input
                  placeholder="¿Que quieres compartir hoy?"
                  rows="3"
                  type="textarea"
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <div className="pull-left">
              <Input
                accept={acceptedFileTypes}
                onChange={(e) => guardararchivophoto(e.target.files[0])}
                id="photo"
                name="photo"
                type="file"
                className="btn-small"
                size="sm"
                ref={imageInputRef}
              >
                <i className="fas fa-camera"></i>
              </Input>
            </div>
            <div className="pull-right">
              <Button
                className="btn-small"
                size="sm"
                type="sudmit"
                onClick={handleSubmit}
              >
                <i className="far fa-paper-plane"></i>Publicar
              </Button>
            </div>
          </CardBody>
        </Form>
      </Card>
    </>
  );
}

export default CrearPublicacion;
