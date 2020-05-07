import React, { useState, useContext } from "react";
import { Button, Input, CardHeader, Card, CardBody, Form } from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AuthContext from "../../context/autenticacion/authContext";
import compose from "recompose/compose";
function CrearPublicacion() {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Card className="card-post">
        <Form noValidate autoComplete="off">
          <CardHeader>
            <div className="media d-block d-md-flex mt-4">
              <img
              width="60px"
                className="rounded-circle FotoUser"
                src={"/images/profile-picture/" + usuario.fotoPerfil}
              ></img>
              <div className="media-body text-center text-md-left ml-md-3 ml-0">
                <p className="font-weight-bold my-0">{usuario.nombre}</p>

                <Input
                  placeholder="¿Que quieres compartir hoy?"
                  rows="3"
                  type="textarea"
                  id="postText"
                  name="postText"
                  onChange={handleChange}
                ></Input>
              </div>
            </div>
          </CardHeader>

          <CardBody>
            <div className="pull-left">
              <Button className="btn-small" size="sm">
                <i className="fas fa-camera"></i>
              </Button>
            </div>
            <div className="pull-right">
              <Button className="btn-small" size="sm" type="sudmit">
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
