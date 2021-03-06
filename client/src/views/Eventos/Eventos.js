import React, { useState, useContext, useEffect } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Input,
} from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";

import CategoriasEventosNavbar from "../../components/Navbars/CategoriasEventosNavbar";
import EventosContex from "../../context/eventos/eventosContex";
import Itemevento from "./itemevento";

function Eventos() {
  const EContex = useContext(EventosContex);
  const { alleventos, eventos } = EContex;
  useEffect(() => {
    alleventos();
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
  const items = eventos
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
      return <Itemevento key={data._id} evento={data}></Itemevento>;
    });
  return (
    <>
      <HomeNarbar></HomeNarbar>
      <div className="wrapper content_home">
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
                    <h3>Eventos</h3>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Input
                    name="search"
                    type="search"
                    id="search"
                    placeholder="Buscar eventos"
                    value={search}
                    onChange={onChangeSearch}
                  ></Input>
                  {items.length === 0 ? (
                    <p>No hay eventos, añade uno </p>
                  ) : (
                    items
                  )}
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <CategoriasEventosNavbar
                search={search}
                busqueda={busqueda}
                setbusqueda={setbusqueda}
              ></CategoriasEventosNavbar>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Eventos;
