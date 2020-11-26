import React, { useEffect, useContext, useState } from "react";
import HomeNarbar from "../components/Navbars/homeNarbar";
import DefaultFooter from "../components/Footers/DefaultFooter.js";

import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardHeader,
  CardImg,
  CardBody,
  CardSubtitle,
  Input,
} from "reactstrap";
import AuthContext from "../context/autenticacion/authContext";
import UsuariosItem from "../components/UsuariosItem";
function ExplorarPage() {
  const AContext = useContext(AuthContext);
  const { alluser, usuarios } = AContext;

  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  useEffect(() => {
    alluser();
  }, [usuarios]);
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
  const items = usuarios
    .filter((data) => {
      if (search == "") return data;
      else if (
        data.nombre.toLowerCase().includes(search.toLowerCase()) ||
        data.email.toLowerCase().includes(search.toLowerCase())
      ) {
        return data;
      }
    })
    .map((data) => {
      return <UsuariosItem key={data._id} data={data}></UsuariosItem>;
    });

  return (
    <>
      <HomeNarbar></HomeNarbar>

      <div className="wrapper content_home">
        <Container>
          <Card>
            <CardHeader>
              <CardTitle>
                <h1 className="text-center">Descubre personas</h1>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Input
                name="search"
                type="search"
                id="search"
                placeholder="Buscar personas"
                value={search}
                onChange={onChangeSearch}
              ></Input>
              <Row>{items.length === 0 ? <p>No hay usuarios </p> : items}</Row>
            </CardBody>
          </Card>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default ExplorarPage;
