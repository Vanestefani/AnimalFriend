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
  Label,
} from "reactstrap";

import ScrollNavbar from "../../components/Navbars/ScrollNavbar";
import SubMenu from "../../components/Navbars/SubMenu";

import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import ListMascotasbyuser from "../../components/Listas/ListMascotasbyuser";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import PostList from "../../components/Post/PostList";

import Editar from "./Form/editar";
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
  const validate = () => {
    let isError = false;
   //El pattern contraseña 1As20092
   const pattern2 = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  const pattern3 = new RegExp(
    "^[a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-z0-9]@[a-z0-9][-.]{0,1}([a-z][-.]{0,1})*[a-z0-9].[a-z0-9]{1,}([.-]{0,1}[a-z]){0,}[a-z0-9]{0,}$"
  );
const maximo=new RegExp("[a-zA-Z ]{3,19}$");
if (maximo.test(fusuario.nombre) === false) {
  errores.Errornombre.valido = false;
  errores.Errornombre.mensaje =
    "(Por favor ingrese un nombre valido)";
} errores.Errornombre.valido = true;
if (maximo.test(fusuario.bio) === false) {
  errores.Errorbio.valido = false;
  errores.Errorbio.mensaje =
    "(Por favor ingrese un descripción valido)";
} else {
  errores.Errornombre.valido = true;
}
if (fusuario.pais.length < 1) {
  errores.Errorpais.valido = false;
  errores.Errorpais.mensaje = "(Debe elegir un campo)";
} else {
  errores.Errorpais.valido = true;
}

if (fusuario.ciudad.length < 1) {
  errores.Errorciudad.valido = false;
  errores.Errorciudad.mensaje = "(Debe elegir un campo)";
} else {
  errores.Errorciudad.valido = true;
}
if (fusuario.genero.length < 1) {
  errores.Errorgenero.valido = false;
  errores.Errorgenero.mensaje = "(Debe elegir un campo)";
} else {
  errores.Errorgenero.valido = true;
}
if (
  !errores.Errorbio.valido ||
  !errores.Errornombre.valido ||
  !errores.Errorpais.valido ||
  !errores.Errorgenero.valido ||
  !errores.Errorciudad.valido
) {
  isError = true;
} else {
  isError = false;
}
  }

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
    if ( fusuario.ciudad!=""){
    setfusuario({
      ...fusuario,
      [e.target.name]: e.target.value,
      isDisabled :false
    });}

  };
  const onSubmit = (e) => {
    const err = validate();
    let userId = usuarioactual._id;

    if (!err) {
    actualizarperfil({
      id: userId,
      nombre: fusuario.nombre,
      bio: fusuario.bio,
      pais: fusuario.pais,
      ciudad: fusuario.ciudad,
      genero: fusuario.genero,
    });}
    else {
      setnombreFocus(true);
      setModal1(false);
      validate();
    }
  };

  //modal
  const [modalMascotas, setModal1] = React.useState(false);
  const [fusuario, setfusuario] = useState({
    nombre: usuario.nombre,
    bio: usuario.bio,
    pais: usuario.pais,
    ciudad: usuario.ciudad,
    genero: usuario.genero,
    isDisabled:true
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
      isDisabled :false
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
                <Editar
                  generoFocus={generoFocus}
                  setgeneroFocus={setgeneroFocus}
                  ciudadFocus={ciudadFocus}
                  setciudadFocus={setciudadFocus}
                  paisFocus={paisFocus}
                  setpaisFocus={setpaisFocus}
                  bioFocus={bioFocus}
                  setbioFocus={setbioFocus}
                  nombreFocus={nombreFocus}
                  setnombreFocus={setnombreFocus}
                  onChangeCountry={onChangeCountry}
                  onChangeCity={onChangeCity}
                  modalMascotas={modalMascotas}
                  setModal1={setModal1}
                  onSubmit={onSubmit}
                  onChange={onChange}
                  errores={errores}
                  setErrores={setErrores}
                  selectRegion={selectRegion}
                  selectCountry={selectCountry}
                  region={region}
                  country={country}
                  usuarioactual={usuarioactual}
                  fusuario={fusuario}
                ></Editar>
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
            <SubMenu usuarioactual={usuarioactual} usuario={usuario}></SubMenu>
              <Row>
                <Col md="3">
                  <ListMascotasbyuser></ListMascotasbyuser>

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
