import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  CardHeader,
  Card,
  CardBody,
  Container,
  DropdownMenu,
  DropdownItem,
  CardTitle,
  CardFooter,
  Button,
  Input,
} from "reactstrap";
import PostContext from "../../context/post/postContext";
import AuthContext from "../../context/autenticacion/authContext";

function Post(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const postContext = useContext(PostContext);
  const {
    publicacionActual,
    likePost,
    unlikePost,
    makeComment,
    deletePost,
  } = postContext;
  const seleccionarPublicacion = (id) => {
    publicacionActual(id);
  };
  return (
    <>
      <Card className="card-post">
        <CardHeader>
          <CardTitle></CardTitle>
          <div className="media d-block d-md-flex mt-4">
            <div className="media-body text-center text-md-left ml-md-3 ml-0">
              <div className="pull-left">
                <p className="font-weight-bold my-0"></p>

                <p>{props.publicacion.fecha_creacion}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <Container>
            <p>{props.publicacion.descripcion}</p>
            <img alt="..." src={props.publicacion.imagen}></img>
          </Container>
        </CardBody>
        <CardFooter>
          <div className="pull-left">
            {props.publicacion.likes.includes(usuario._id) ? (
              <Button
                size="sm"
                color="neutral"
                onClick={() => {
                  unlikePost(props.publicacion._id);
                }}
              >
                <i className="fas fa-bone"></i>{" "}
              </Button>
            ) : (
              <Button
                size="sm"
                color="danger"
                onClick={() => {
                  likePost(props.publicacion._id);
                }}
              >
                <i className="fas fa-bone"></i>
              </Button>
            )}

            {props.publicacion.likes.length}
          </div>
        </CardFooter>
        <Container>
          <br></br>
          <h3>Comentarios</h3>
          {props.publicacion.comments.map((record) => {
            return (
              <h6 key={record._id}>
                <span style={{ fontWeight: "500" }}>{record.autor.nombre}</span>{" "}
                {record.text}
              </h6>
            );
          })}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makeComment(e.target[0].value, props.publicacion._id);
              }}
            >
              <Input
                placeholder="¿Que quieres compartir hoy?"
                rows="3"
                cols="2"
                type="textarea"
              ></Input>
            </form>
          </div>
        </Container>
      </Card>
    </>
  );
}

export default Post;
