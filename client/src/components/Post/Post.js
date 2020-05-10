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
import Like from "./Likes";
function Post(props) {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const postContext = useContext(PostContext);
  const {
    publicacionActual,

    makeComment,
    deletePost,
  } = postContext;
  const seleccionarPublicacion = (id) => {
    publicacionActual(id);
  };
const [like, setLike] = useState({
  count:0
})

  return (
    <>
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
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-edit"></i>
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={()=>deletePost(props.publicacion._id)}
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
            <img
              className="avatar-small rounded z-depth-1 d-flex mx-auto mb-3  pull-left"
              src={props.publicacion.autor.fotoPerfil}
              width="80px"
            />
            <div className="media-body text-center text-md-left ml-md-3 ml-0  pull-left">
              <div className="pull-left">
                <p className="font-weight-bold my-0">
                  {props.publicacion.autor.nombre}
                </p>
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
