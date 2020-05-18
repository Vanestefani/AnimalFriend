import React, { useState, useContext, useEffect, useRef } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  Button,
  CardBody,
  Input,
} from "reactstrap";
// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";
import CategoriasAnunciosNavbar from "../../components/Navbars/CategoriasAnunciosNavbar";
import AnunciosContext from "../../context/anuncios/anunciosContext";
import Itemanuncio from "./itemanuncio";

function Anuncios() {
  const AContext = useContext(AnunciosContext);
  const { allanuncios, anuncios } = AContext;
  useEffect(() => {
    allanuncios();
  }, []);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
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
  const items = anuncios
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
      return <Itemanuncio key={data._id} anuncio={data}></Itemanuncio>;
    });
  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper">
        <Container>
          <Row>
            <Col md="3">
              <VerticalMenu></VerticalMenu>
              <ListMascotas></ListMascotas>
            </Col>
            <Col md="6">

              <Card>
                <CardHeader>
                  <CardTitle>
                    <h3>Anuncios</h3>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <Input
                    name="search"
                    type="search"
                    id="search"
                    placeholder="Buscar anuncios"
                    value={search}
                    onChange={onChangeSearch}
                  ></Input>
                  {items.length === 0 ? (
                    <p>No hay anuncios </p>
                  ) : (
                    items
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <CategoriasAnunciosNavbar
                  search={search}
                  busqueda={busqueda}
                  setbusqueda={setbusqueda}
              ></CategoriasAnunciosNavbar>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Anuncios;
