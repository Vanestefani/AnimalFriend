import React, { useEffect, useContext, useState } from "react";
import PostContext from "../../context/post/postContext";

// reactstrap components
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import ScrollNavbar from "../../components/Navbars/ScrollNavbar";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import ListMascotasbyuser from "../../components/Listas/ListMascotasbyuser";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import PostList from "../../components/Post/PostList";
import ListaAnuncio from "../../components/Listas/Anuncios/ListaAnuncio";
import ListaSeguidores from "../../components/Listas/Seguidores/ListaSeguidores";

import AuthContext from "../../context/autenticacion/authContext";
import MascotasContext from "../../context/mascotas/mascotasContext";

function Perfil({ match }) {
  const mContext = useContext(MascotasContext);

  const { mascotasbyUsuario } = mContext;

  const AContext = useContext(AuthContext);
  const {
    Showuserid,
    usuarioactual,
    usuario,
    seguir,
    noseguir,
    actualizarperfil,
  } = AContext;

  useEffect(() => {
    Showuserid(match.params.q);
    mascotasbyUsuario(match.params.q);
  }, []);
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const postContext = useContext(PostContext);

  const { publicaciones, getpost } = postContext;
  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    const autorId = match.params.q;

    getpost(match.params.q);
  }, [usuarioactual]);
  const [showfollow, setShowFollow] = useState({
    follow: usuario.following.includes(usuarioactual._id),
  });
  console.log(showfollow.follow);
  const follow = (e) => {
    e.preventDefault();
    seguir({ userId: usuarioactual._id });
    setShowFollow({
      ...showfollow,
      follow: false,
    });
    console.log(showfollow.follow);
  };
  const unfollow = (e) => {
    e.preventDefault();
    noseguir({ userId: usuarioactual._id });
    setShowFollow({
      ...showfollow,
      follow: true,
    });
    console.log(showfollow.follow);
  };

  const botonSeguir = () => {
    if (showfollow.follow === false)
      return (
        <Button onClick={unfollow} className="btn-round" color="info" size="lg">
          <i className="fas fa-plus-circle"></i> No Seguir
        </Button>
      );
    if (showfollow.follow === true)
      return (
        <Button
          onClick={follow}
          className="btn-round"
          color="success"
          size="lg"
        >
          <i className="fas fa-plus-circle"></i> Seguir
        </Button>
      );
  };
  const next = () => {
    getpost(match.params.q);
  };

  const onChange = (e) => {
    setfusuario({
      ...fusuario,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    let userId = usuarioactual._id;
    actualizarperfil({
      id: userId,
      nombre: fusuario.nombre,
      bio: fusuario.bio,
    });
  };

  //modal
  const [modalMascotas, setModal1] = React.useState(false);
  const [fusuario, setfusuario] = useState({
    nombre: usuarioactual.nombre,
    bio: usuarioactual.bio,
  });
  let countpost = Object.keys(publicaciones).length;

  return (
    <>
      <Modal isOpen={modalMascotas} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h2 className="title title-up">Datos personales</h2>
        </div>
        <ModalBody>
          <div>
            <h4>Información de usuario</h4>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-user"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Nombre completo"
                  type="text"
                  id="nombre"
                  name="nombre"
                  defaultValue={usuarioactual.nombre}
                  onChange={onChange}
                  required
                ></Input>
              </InputGroup>
            </FormGroup>
            <Input
              type="textarea"
              row="3"
              id="bio"
              name="bio"
              defaultValue={usuarioactual.bio}
              onChange={onChange}
              placeholder="Sobre ti"
            ></Input>
          </div>
        </ModalBody>
        <div className="modal-footer">
          <Button color="sucess" type="button" onClick={onSubmit}>
            <i className="fas fa-paper-plane"></i> Enviar
          </Button>
          <Button color="danger" type="button" onClick={() => setModal1(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>

      <ScrollNavbar />
      <div className="wrapper ">
        <ProfilePageHeader
          dato={usuarioactual}
          countpost={countpost}
        ></ProfilePageHeader>
        <div className="section">
          <Container>
            <div className="button-container">
              {usuarioactual._id === usuario._id ? (
                <Button small onClick={() => setModal1(true)}>
                  <i className="fas fa-plus"></i>Editar
                </Button>
              ) : (
                botonSeguir()
              )}
            </div>

            {usuarioactual.bio !== "" ? (
              <div>
                <h3 className="title">Sobre mi</h3>
                <h5 className="description">{usuarioactual.bio}</h5>
              </div>
            ) : (
              ""
            )}
          </Container>
          <div className="wrapper content_home">
            <Container>
              <Row>
                <Col md="3">
                  <ListMascotasbyuser></ListMascotasbyuser>
                  <ListaSeguidores></ListaSeguidores>
                  <ListaAnuncio></ListaAnuncio>
                </Col>
                <Col md="9">
                  {usuarioactual._id === usuario._id ? (
                    <CrearPublicacion></CrearPublicacion>
                  ) : (
                    ""
                  )}
                  {publicaciones ? (
                    <PostList
                      publicaciones={publicaciones}
                      next={next}
                    ></PostList>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </Container>
            <DefaultFooter></DefaultFooter>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
