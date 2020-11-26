import React, { useEffect, useContext, useState } from "react";
import PostContext from "../../context/post/postContext";
import ListRecordatorios from "../../components/Recordatorios/ListRecordatorios";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardText,
  CardHeader,
  CardBody,
  Input,
} from "reactstrap";
import ScrollNavbar from "../../components/Navbars/ScrollNavbar";
import ProfilePageHeader from "../../components/Headers/ProfilePageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import Mascotas from "../../views/Mascotas/MisMascotas";
import Mascota from "../../views/Mascotas/Mascota";
import CrearPublicacion from "../../components/Post/CrearPublicacion";
import PostList from "../../components/Post/PostList";
import Editar from "./Form/editar";
import FotoPerfil from "./Form/foto.perfil";
import classnames from "classnames";
import AuthContext from "../../context/autenticacion/authContext";
import MascotasContext from "../../context/mascotas/mascotasContext";
import CategoriasNegociosNavbar from "../../components/Navbars/CategoriasNegociosNavbar";
import NegociosContex from "../../context/negocios/negociosContex";
import Itemnegocio from "../Negocios/itemnegocio";
import CategoriasAnunciosNavbar from "../../components/Navbars/CategoriasAnunciosNavbar";
import AnunciosContext from "../../context/anuncios/anunciosContext";
import Itemanuncio from "../Anuncios/itemanuncio";

function Perfil({ match }) {
  /*usuarios*/
  const AContext = useContext(AuthContext);
  const {
    Showuserid,
    changefoto,
    usuarioactual,
    usuario,
    seguir,
    noseguir,
    actualizarperfil,
  } = AContext;
  const AnContex = useContext(AnunciosContext);
  const { anunciosUsuario, anuncios } = AnContex;
  const NContex = useContext(NegociosContex);
  const { negociosUsuario, negocios } = NContex;
  useEffect(() => {
    negociosUsuario(match.params.q);
    anunciosUsuario(match.params.q);
  }, []);

  const [busqueda1, setbusqueda1] = useState({
    search1: "",
  });
  const { search1 } = busqueda1;
  const onChangeSearch1 = (e) => {
    setbusqueda1({
      ...busqueda,
      search: e.target.value,
    });
  };
  const items1 = anuncios
    .filter((data) => {
      if (search1 == "") return data;
      else if (
        data.titulo.toLowerCase().includes(search1.toLowerCase()) ||
        data.categoria.toLowerCase().includes(search1.toLowerCase())
      ) {
        return data;
      }
    })
    .map((data) => {
      return <Itemanuncio key={data._id} anuncio={data}></Itemanuncio>;
    });
  const [busqueda, setbusqueda] = useState({
    search: "",
  });
  const { search } = busqueda;
  const onChangeSearch = (e) => {
    setbusqueda({
      ...busqueda,
      search: e.target.value,
    });
  };
  let items = negocios
    .filter((data) => {
      if (search == "") return data;
      else if (
        data.titulo.toLowerCase().includes(search.toLowerCase()) ||
        data.categoria.toLowerCase().includes(search.toLowerCase())
      ) {
        return data;
      }
    })
    .map((data) => {
      return <Itemnegocio key={data._id} negocio={data}></Itemnegocio>;
    });
  /*Mascotas*/
  const mContext = useContext(MascotasContext);
  const { mascotasbyUsuario, mascotas } = mContext;

  useEffect(() => {
    Showuserid(match.params.q);
    mascotasbyUsuario(match.params.q);
  }, [mascotas]);
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
    const maximo = new RegExp("[a-zA-Z ]{3,19}$");
    if (maximo.test(fusuario.nombre) === false) {
      errores.Errornombre.valido = false;
      errores.Errornombre.mensaje = "(Por favor ingrese un nombre valido)";
    } else {
      errores.Errornombre.valido = true;
    }

    if (maximo.test(fusuario.bio) === false) {
      errores.Errorbio.valido = false;
      errores.Errorbio.mensaje = "(Por favor ingrese un descripción valido)";
    } else {
      errores.Errorbio.valido = true;
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
    return isError;
  };

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
    if (fusuario.ciudad != "") {
      setfusuario({
        ...fusuario,
        [e.target.name]: e.target.value,
        isDisabled: false,
      });
    }
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
      });
      setModal1(false);
    } else {
      setnombreFocus(true);
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
    isDisabled: true,
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
      isDisabled: false,
    });
  };
  let countpost = Object.keys(publicaciones).length;
  //focus
  const [nombreFocus, setnombreFocus] = React.useState(false);
  const [bioFocus, setbioFocus] = React.useState(false);
  const [paisFocus, setpaisFocus] = React.useState(false);
  const [ciudadFocus, setciudadFocus] = React.useState(false);
  const [generoFocus, setgeneroFocus] = React.useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div>
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
                  <div>
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
                    <FotoPerfil
                      changefoto={changefoto}
                      usuario={usuario}
                    ></FotoPerfil>
                    <Link className="btn btn-primary" to="/olvido-contrasena">
                      Cambiar contraseña
                    </Link>
                  </div>
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
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Inicio
                    </NavLink>
                  </NavItem>
                  {usuarioactual._id === usuario._id ? (
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Recordatorios
                      </NavLink>
                    </NavItem>
                  ) : (
                    ""
                  )}{" "}
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      Mascotas
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "6" })}
                      onClick={() => {
                        toggle("6");
                      }}
                    >
                      Anuncios
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "7" })}
                      onClick={() => {
                        toggle("7");
                      }}
                    >
                      Negocios
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
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
                  </TabPane>
                  {usuarioactual._id === usuario._id ? (
                    <TabPane tabId="2">
                      <ListRecordatorios></ListRecordatorios>
                    </TabPane>
                  ) : (
                    " "
                  )}
                  <TabPane tabId="3">
                    {usuarioactual._id === usuario._id ? (
                      <Mascotas></Mascotas>
                    ) : (
                      " "
                    )}
                    <h2 className="text-center">
                      <b>Mascotas</b>
                    </h2>
                    <div className="section section-team text-center">
                      <Container>
                        <div className="team">
                          <Row>
                            {mascotas.length === 0 ? (
                              <Card className="m-2">
                                <h1 className="text-center">
                                  No hay mascotas🐾
                                </h1>
                                <br></br>
                                <center>
                                  <img
                                    width="400px"
                                    src={require("../../assets/img/a.png")}
                                  ></img>
                                </center>
                              </Card>
                            ) : (
                              mascotas.map((mascota) => (
                                <Mascota
                                  key={mascota._id}
                                  mascota={mascota}
                                  usuario={usuario}
                                ></Mascota>
                              ))
                            )}
                          </Row>
                        </div>
                      </Container>
                    </div>
                  </TabPane>
                  <TabPane tabId="6">
                    <Row>
                      <Col md="9">
                        <Card>
                          <CardHeader>
                            <CardTitle>
                              <h3>Anuncios</h3>
                            </CardTitle>
                          </CardHeader>
                          <CardBody>
                            {" "}
                            <Input
                              name="search1"
                              type="search1"
                              id="search1"
                              placeholder="Buscar anuncios"
                              value={search1}
                              onChange={onChangeSearch1}
                            ></Input>
                            {items1.length === 0 ? (
                              <p>No hay anuncios </p>
                            ) : (
                              items1
                            )}{" "}
                          </CardBody>
                        </Card>
                      </Col>
                      <Col md="3">
                        <CategoriasAnunciosNavbar
                          search={search1}
                          busqueda={busqueda1}
                          setbusqueda={setbusqueda1}
                        ></CategoriasAnunciosNavbar>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="7">
                    <Row>
                      <Col md="9">
                        <Card>
                          <CardHeader>
                            <CardTitle>
                              <h3>Negocios</h3>
                            </CardTitle>
                          </CardHeader>
                          <CardBody>
                            {" "}
                            <Input
                              name="search"
                              type="search"
                              id="search"
                              placeholder="Buscar negocios"
                              value={search}
                              onChange={onChangeSearch}
                            ></Input>
                            {items.length === 0 ? (
                              <p>No hay negocios </p>
                            ) : (
                              items
                            )}
                          </CardBody>
                        </Card>
                      </Col>

                      <Col md="3">
                        <CategoriasNegociosNavbar
                          search={search}
                          busqueda={busqueda}
                          setbusqueda={setbusqueda}
                          usuario={usuario}
                          usuarioactual={usuarioactual}
                        ></CategoriasNegociosNavbar>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Container>
              <DefaultFooter></DefaultFooter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perfil;
