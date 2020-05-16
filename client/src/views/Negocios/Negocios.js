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
import CategoriasNegociosNavbar from "../../components/Navbars/CategoriasNegociosNavbar";
import NegociosContex from "../../context/negocios/negociosContex";
import Itemnegocio from "./itemnegocio";

function Negocios() {
  const NContex = useContext(NegociosContex);
  const { allnegocios, negocios } = NContex;
  useEffect(() => {
    allnegocios();
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
        return <Itemnegocio key={data._id} evento={data}></Itemnegocio>;
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
              <SubMenu></SubMenu>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h3>Negocios</h3>
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
                  {items.length === 0 ? <p>No hay anuncios </p> : items}
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <CategoriasNegociosNavbar
                search={search}
                busqueda={busqueda}
                setbusqueda={setbusqueda}
              ></CategoriasNegociosNavbar>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Negocios;
