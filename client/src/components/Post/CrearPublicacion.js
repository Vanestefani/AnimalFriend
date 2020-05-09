import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Button,
  Input,
  CardHeader,
  Card,
  CardBody,
  Form,
  Modal,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AuthContext from "../../context/autenticacion/authContext";

import "react-image-crop/dist/ReactCrop.css";

function CrearPublicacion() {
  const imageMaxSize = 10000000; // bytes
  const acceptedFileTypes =
    "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
    return item.trim();
  });
  const authContext = useContext(AuthContext);
  const { usuario, addPost } = authContext;
  const [state, setstate] = useState({
    descripcion: " ",
  });
  const [photo, guardararchivophoto] = useState(null);
  const { descripcion } = state;

  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: [e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userid = usuario._id;
    let formData = new FormData();
    formData.append("imagen", photo,photo.name);
    formData.append("descripcion", descripcion);
    formData.append("autor", userid);
    addPost(formData);
  };

  return (
    <>
      <Card className="card-post">
        <Form noValidate autoComplete="off">
          <CardHeader>
            <div className="media d-block d-md-flex mt-4">
              <img
                className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3"
                src={ usuario.fotoPerfil}
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
                  defaultValue={descripcion}
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
