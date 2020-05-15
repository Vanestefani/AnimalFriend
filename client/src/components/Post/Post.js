import React, { useContext, useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";

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
  Modal,
  Input,
  ModalBody,
  Form,
  Button,
  Badge,
} from "reactstrap";
import PostContext from "../../context/post/postContext";
import AuthContext from "../../context/autenticacion/authContext";
import Like from "./Likes";
import { Link } from "react-router-dom";
function Post(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const postContext = useContext(PostContext);
  const {
    publicacionActual,
    actualizarPost,
    makeComment,
    deletePost,
  } = postContext;
  const seleccionarPublicacion = (id) => {
    publicacionActual(id);
  };
  const [like, setLike] = useState({
    count: 0,
  });
  const [modalEditar, setModaPost] = useState(false);
  const [posteditor, setEditarPost] = useState({
    texto: props.publicacion.descripcion,
  });
  const [comentarios, setcomentarios] = useState({
    comentario: "",
  });
  const { comentario } = comentarios;
  const handleChange = (e) => {
    setEditarPost({
      ...posteditor,
      texto: e.target.value,
    });
  };
  const handleChangeCometario = (e) => {
    setcomentarios({
      ...comentarios,
      comentario: e.target.value,
    });
  };
  const onSubmitcomentario = (e) => {
    let postId = props.publicacion._id;
    e.preventDefault();
    makeComment({
      text: comentario,
      postId: postId,
    });
    setcomentarios({
      comentario: "",
    });
  };
  const onSubmitPost = (e) => {
    let postId = props.publicacion._id;
    e.preventDefault();

    actualizarPost({
      descripcion: posteditor.texto,
      postId: postId,
    });
    setModaPost(false);
  };

  return (
    <>
      <Modal isOpen={modalEditar} toggle={() => setModaPost(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModaPost(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Editar Post</h2>
        </div>
        <ModalBody>
          <Form noValidate autoComplete="off">
            <Input
              type="textarea"
              multiline
              margin="normal"
              rowsMax="5"
              name="texto"
              id="texto"
              value={posteditor.texto}
              onChange={handleChange}
            />
            <Button onClick={onSubmitPost} variant="contained" color="primary">
              Editar
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Card className="card-post">
        <CardHeader>
          <CardTitle>
            <div className="pull-right">
              {props.publicacion.autor._id === usuario._id ? (
                <UncontrolledDropdown>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="neutral"
                    size="sm"
                  ></DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setModaPost(true)}>
                      <i className="fas fa-edit"></i>
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      href="#AnimalFriend"
                      onClick={() => deletePost(props.publicacion._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                      Eliminar
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                ""
              )}
            </div>
          </CardTitle>
          <div className="media d-block d-md-flex mt-4">
            <Link to={"/perfil/" + props.publicacion.autor._id}>
              <img
                className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3  pull-left"
                src={props.publicacion.autor.fotoPerfil}
                width="80px"
              />
            </Link>
            <div className="media-body text-center text-md-left ml-md-3 ml-0  pull-left">
              <div className="pull-left">
                <Link to={"/perfil/" + props.publicacion.autor._id}>
                  <p className="font-weight-bold my-0">
                    {props.publicacion.autor.nombre}
                  </p>
                </Link>
                <p>{props.publicacion.fecha_creacion}</p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <Container>
            <p>{props.publicacion.descripcion}</p>
            <img width="400px" alt="..." src={props.publicacion.imagen}></img>
          </Container>
        </CardBody>
        <CardFooter>
          <Like publicacion={props.publicacion}></Like>
        </CardFooter>
        <Container>
          <br></br>
          <h3 className="text-center">Comentarios</h3>

          {props.publicacion.comments.map((record) => {
            return (
              <h6 key={record._id}>
                <Link to={"/perfil/" + props.publicacion.autor._id}>
                  <Badge color="info">
                    {" "}
                    <span style={{ fontWeight: "500" }}>
                      {record.autor.nombre}
                    </span>
                  </Badge>
                </Link>
                {record.text}
              </h6>
            );
          })}
          <div>
            <Form>
              <Input
                placeholder="¿Que quieres compartir hoy?"
                rows="3"
                cols="2"
                value={comentario}
                onChange={handleChangeCometario}
                type="textarea"
              ></Input>
              <Button onClick={onSubmitcomentario}>Comentar</Button>
            </Form>
          </div>
        </Container>
      </Card>
    </>
  );
}

export default Post;
