import React, { useContext, useState } from "react";
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
  Collapse,
  Media,
} from "reactstrap";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import PostContext from "../../context/post/postContext";
import AuthContext from "../../context/autenticacion/authContext";
import Like from "./Likes";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
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
    errors: {
      Errorcomentario: { valido: true, mensaje: "" },
    },
  });
  const { comentario, errors } = comentarios;
  const handleChange = (e) => {
    setEditarPost({
      ...posteditor,
      texto: e.target.value,
    });
  };
  //validar comentarion
  const validate = () => {
    let isError = false;
    if (comentario.trim() == "") {
      errors.Errorcomentario.valido = false;
      errors.Errorcomentario.mensaje = "(El campo  no puede estar vacio)";
    } else {
      errors.Errorcomentario.valido = true;
    }
    if (!errors.Errorcomentario.valido) {
      isError = true;
    } else {
      isError = false;
    }
    return isError;
  };
  const handleChangeCometario = (e) => {
    setcomentarios({
      ...comentarios,
      comentario: e.target.value,
    });
  };
  const onSubmitcomentario = (e) => {
    let err = validate();
    if (!err) {
      let postId = props.publicacion._id;
      e.preventDefault();
      makeComment({
        text: comentario,
        postId: postId,
      });
      setcomentarios({
        comentario: "",
        errors: {
          Errorcomentario: { valido: true, mensaje: "" },
        },
      });
    }
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
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //emojis
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  function triggerPicker(event) {
    event.preventDefault();

    SetEmojiPicker(!emojiPickerState);
  }
  const addEmoji = (e) => {
    let emoji = e.native;
    setEditarPost({
      ...posteditor,
      texto: posteditor.texto + emoji,
    });
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
          <h2 className="title title-up">Editar Publicación </h2>
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
            <Button class="d-inline " onClick={triggerPicker}>
              <span role="img" aria-label="">
                😁
              </span>
            </Button>
            {emojiPickerState ? (
              <Picker
                title="Pick your emoji…"
                emoji="point_up"
                onSelect={addEmoji}
              />
            ) : (
              ""
            )}
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
                {moment(new Date(props.publicacion.fecha_creacion)).fromNow()}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody>
          <Container>
            <p>{props.publicacion.descripcion}</p>
            <img width="800px" alt="..." src={props.publicacion.imagen}></img>
          </Container>
        </CardBody>
        <CardFooter>
          <Like publicacion={props.publicacion}></Like>
          <Button
            color="neutral"
            onClick={toggle}
            className={"ml-1 " + (isOpen ? "btn btn-info" : "btn-success")}
          >
            <i className="fas fa-comment-alt"></i>
          </Button>
        </CardFooter>
        <Collapse isOpen={isOpen}>
          <Container>
            <h3 className="">Comentarios</h3>

            {props.publicacion.comments.map((record) => {
              return (
                <Container className="mt-2 block">
                  <Media>
                    <Media left href="#" onClick={(e) => e.preventDefault()}>
                      <Link to={"/perfil/" + props.publicacion.autor._id}>
                        <Media
                          object
                          width="64px"
                          src={record.autor.fotoPerfil}
                          alt={"foto de perfil de " + record.autor.nombre}
                        />
                      </Link>
                    </Media>
                    <Media body>
                      <Media heading>
                        <Link to={"/perfil/" + props.publicacion.autor._id}>
                          {record.autor.nombre}{" "}
                        </Link>
                      </Media>
                      {record.text}
                    </Media>
                  </Media>
                </Container>
              );
            })}
            <div>
              <Form>
                <Input
                  className={
                    errors.Errorcomentario.valido
                      ? ""
                      : "is-invalid form-control-danger form-control"
                  }
                  placeholder="Comparte tu opinion"
                  onFocus
                  rows="3"
                  cols="2"
                  value={comentario}
                  onChange={handleChangeCometario}
                  type="textarea"
                ></Input>
                <br></br>
                {!errors.Errorcomentario.valido ? (
                  <span className=" container text-muted">
                    {errors.Errorcomentario.mensaje}
                  </span>
                ) : (
                  ""
                )}
                <Button onClick={onSubmitcomentario}>Comentar</Button>
              </Form>
            </div>
          </Container>
        </Collapse>
      </Card>
    </>
  );
}

export default Post;
