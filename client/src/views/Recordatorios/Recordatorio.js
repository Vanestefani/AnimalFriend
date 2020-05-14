import React, { useState, useContext, useEffect, useRef } from "react";
// reactstrap components
import { Container, Row, Col, Card, Badge, CardBody, Button } from "reactstrap";

// core components

import HomeNarbar from "../../components/Navbars/homeNarbar";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import VerticalMenu from "../../components/Navbars/VerticalMenu";
import ListMascotas from "../../components/Listas/ListMascotas";
import SubMenu from "../../components/Navbars/SubMenu";
import RecordatoriosContex from "../../context/recordatorios/recordatoriosContex";
import AuthContext from "../../context/autenticacion/authContext";
import FormRecordatorio from "../../components/Recordatorios/form/FormRecordatorio";

import { Link } from "react-router-dom";

function Recordatorio() {
  const RContext = useContext(RecordatoriosContex);

  const {
    addRecordatorios,
    recordatorios,
    recordatorio,
    recordatoriosUsuario,
  } = RContext;

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
    recordatoriosUsuario();
  }, []);
  const [Frecordatorio, guardarrecordatorio] = useState({
    descripcion: "",
    nombre: "",
    tipo: "",
    mascota: "",
    fecha_expiracion: "",
    notas: "",
    completo: false,
  });
  const {
    descripcion,
    nombre,
    tipo,
    mascota,
    fecha_expiracion,
    notas,
    completo,
  } = Frecordatorio;
  const onChange = (e) => {
    guardarrecordatorio({
      ...Frecordatorio,
      [e.target.name]: e.target.value,
    });
  };
  //error state
  const [errores, seterrores] = useState(false);
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    let userid = usuario._id;

    if (nombre === "" || tipo === "") {
      seterrores(true);
      console.log("esta vacio");
    } else {
      let formData = new FormData();
      formData.append("descripcion", descripcion);
      formData.append("nombre", nombre);
      formData.append("tipo", tipo);
      formData.append("mascota", mascota);
      formData.append("fecha_expiracion", fecha_expiracion);
      formData.append("notas", notas);
      formData.append("autor", userid);
      formData.append("completo", completo);

      addRecordatorios(formData);
      console.log("no esta vacio");
    }
  };
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
            <Col md="9">
              <SubMenu></SubMenu>
              <Card>
                <h2>Recordatorios</h2>
                <FormRecordatorio
                  onChange={onChange}
                  Frecordatorio={Frecordatorio}
                  onSubmit={onSubmit}
                  guardarrecordatorio={guardarrecordatorio}
                ></FormRecordatorio>
                {recordatorios.map((recordatorio) => (
                  <div>
                    <h3>{recordatorio.nombre}</h3>
                    <Badge color="info">{recordatorio.tipo}</Badge>

                    <Badge color="success">{recordatorio.mascota.nombre}</Badge>
                    <p>{recordatorio.fecha_expiracion.nombre}</p>
                  </div>
                ))}
                <CardBody>
                  <Button sm>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button sm>
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <DefaultFooter></DefaultFooter>
      </div>
    </>
  );
}

export default Recordatorio;
