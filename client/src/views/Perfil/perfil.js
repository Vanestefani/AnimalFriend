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
  InputGroup,Label
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
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
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
  //select paises y ciudades
  const [seleccion, setStateSelect] = useState({
    country: "",
    region: "",
  });
  const { country, region } = seleccion;
  const selectCountry = (val) => {
    setStateSelect({ country: val });
  };

  const selectRegion = (val) => {
    setStateSelect({ region: val });
  };

  //errores validacion
  const [errores, setErrores] = useState({
    Errornombre: { valido: true, mensaje: "" },
    Errorbio: { valido: true, mensaje: "" },
    Errorpais: { valido: true, mensaje: "" },
    Errorciudad: { valido: true, mensaje: "" },
    Errorgenero: { valido: true, mensaje: "" },
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

  const follow = (e) => {
    e.preventDefault();
    seguir({ userId: usuarioactual._id });
    setShowFollow({
      ...showfollow,
      follow: false,
    });
  };
  const unfollow = (e) => {
    e.preventDefault();
    noseguir({ userId: usuarioactual._id });
    setShowFollow({
      ...showfollow,
      follow: true,
    });
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
      pais: fusuario.pais,
      ciudad: fusuario.ciudad,
      genero: fusuario.genero,
    });
  };

  //modal
  const [modalMascotas, setModal1] = React.useState(false);
  const [fusuario, setfusuario] = useState({
    nombre: usuarioactual.nombre,
    bio: usuarioactual.bio,
    pais: usuarioactual.pais,
    ciudad: usuarioactual.ciudad,
    genero: usuarioactual.genero,
  });
  const onChangeCity = (e) => {
    setfusuario({
      ...fusuario,
      ciudad: e,
    });
  };
  const onChangeCountry = (e) => {
    setfusuario({
      ...fusuario,
      pais: e,
    });
  };

  let countpost = Object.keys(publicaciones).length;
  //focus
  const [nombreFocus, setnombreFocus] = React.useState(false);
  const [bioFocus, setbioFocus] = React.useState(false);
  const [paisFocus, setpaisFocus] = React.useState(false);
  const [ciudadFocus, setciudadFocus] = React.useState(false);
  const [generoFocus, setgeneroFocus] = React.useState(false);

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
              <InputGroup
                className={
                  "no-border input-lg" +
                  (nombreFocus ? " input-group-focus" : "")
                }
              >
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
            {!errores.Errornombre ? (
              <span className="text-muted">{errores.Errornombre.mensaje}</span>
            ) : (
              ""
            )}
            <FormGroup>
              <InputGroup
                className={
                  "no-border input-lg" + (paisFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fab fa-font-awesome-flag"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <CountryDropdown
                  className="form-control"
                  value={usuarioactual.pais}
                  id="pais"
                  name="pais"
                  required
                  defaultOptionLabel="Elija un país"
                  onFocus={() => setpaisFocus(true)}
                  onBlur={() => setpaisFocus(false)}
                  onChange={onChangeCountry}
                />
              </InputGroup>
            </FormGroup>
            {!errores.Errorpais.valido ? (
              <span className="text-muted">{errores.Errorpais.mensaje}</span>
            ) : (
              ""
            )}
            <FormGroup>
              <InputGroup
                className={
                  "no-border input-lg" +
                  (ciudadFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-city"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <RegionDropdown
                  className="form-control"
                  name="ciudad"
                  id="ciudad"
                  blankOptionLabel="Ningún país seleccionado"
                  defaultOptionLabel="Ahora selecciona una región"
                  country={usuarioactual.pais}
                  value={usuarioactual.ciudad}
                  onChange={onChangeCity}
                />
              </InputGroup>
              {!errores.Errorciudad.valido ? (
                <span className="text-muted">{errores.Errorciudad.mensaje}</span>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  value="Femenino"
                  id="genero"
                  name="genero"
                  type="radio"
                  onChange={onChange}
                  checked={usuarioactual.genero === "Femenino"}
                ></Input>
                <span className="form-check-sign"></span>
                Femenino
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  value="Masculino"
                  id="genero"
                  name="genero"
                  type="radio"
                  checked={usuarioactual.genero === "Masculino"}
                  onChange={onChange}
                ></Input>
                <span className="form-check-sign"></span>
                Masculino
              </Label>
              {!errores.Errorgenero.valido ? (
                <span className="text-muted">{errores.Errorgenero.mensaje}</span>
              ) : (
                ""
              )}
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
