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
import PostContext from "../../context/post/postContext";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  extractImageFileExtensionFromBase64,
  base64StringtoFile,
} from "../reusable/ReusableUtils";

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
  const [archivophoto, guardararchivophoto] = useState({
    photo: null,
  });
  const { descripcion } = state;
  const { photo } = archivophoto;

  const handleChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onImageChange = (e) => {
    guardararchivophoto({
      ...archivophoto,
      [e.target.name]: e.target.files[0],
    });
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userid = usuario._id;
    const data = {
      descripcion: descripcion,
      imagen: await toBase64(photo),
      autor: userid,
    };
    console.log(data);
    addPost({
      data,
    });
  };

  return (
    <>
      <Card className="card-post">
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
                onChange={onImageChange}
                id="photo"
                name="photo"
                type="file"
                defaultValue={photo}
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
