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
import MascotasContext from "../../context/mascotas/mascotasContext";
function Recordatorio() {
    //context
  const RContext = useContext(RecordatoriosContex);

  const mContext = useContext(MascotasContext);
  const { mascotas, mascotasUsuario } = mContext;
  const {
    addRecordatorios,
    recordatorios,

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
    mascotasUsuario();
  }, [mascotasUsuario,recordatoriosUsuario]);
  const [Frecordatorio, guardarrecordatorio] = useState({
    descripcion: "",
    nombre: "",
    tipo: "",
    mascota: "",
    fecha_expiracion: "",
    notas: "",
    completo: false,
    errors: {
      Errordescripcion: { valido: true, mensaje: "" },
      Errornombre: { valido: true, mensaje: "" },
      Errortipo: { valido: true, mensaje: "" },
      Errormascota: { valido: true, mensaje: "" },
      Errorfecha_expiracion: { valido: true, mensaje: "" },
      Errornotas: { valido: true, mensaje: "" },
      Errorcompleto: { valido: true, mensaje: "" },
    },
  });
  const {
    descripcion,
    nombre,
    tipo,
    mascota,
    fecha_expiracion,
    notas,
    completo,
    errors,
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

  //validar

  const validate = () => {
    let isError = false;
    // El pattern solo letras
    const pattern = new RegExp(
      "^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ']+[s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ'])+[s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ'])?$"
    );
    //El pattern contraseña 1As20092
    const pattern2 = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const pattern3 = new RegExp(
      "^[a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-z0-9]@[a-z0-9][-.]{0,1}([a-z][-.]{0,1})*[a-z0-9].[a-z0-9]{1,}([.-]{0,1}[a-z]){0,}[a-z0-9]{0,}$"
    );
    if (Frecordatorio.nombre.length < 3) {
      Frecordatorio.errors.Errornombre.valido = false;
      Frecordatorio.errors.Errornombre.mensaje =
        "(El campo nombre no puede estar vacio y debe tener al menos tres caracteres)";
    } else {
      Frecordatorio.errors.Errornombre.valido = true;
    }
    if (Frecordatorio.descripcion.length < 3) {
      Frecordatorio.errors.Errordescripcion.valido = false;
      Frecordatorio.errors.Errordescripcion.mensaje =
        "(El campo descripción no puede estar vacio y debe tener al menos tres caracteres)";
    } else {
      Frecordatorio.errors.Errordescripcion.valido = true;
    }
    if (Frecordatorio.tipo.length < 3) {
      Frecordatorio.errors.Errortipo.valido = false;
      Frecordatorio.errors.Errortipo.mensaje =
        "(El campo tipo no puede estar vacio y debe tener al menos tres caracteres)";
    } else {
      Frecordatorio.errors.Errortipo.valido = true;
    }
    if (Frecordatorio.mascota.length < 3) {
      Frecordatorio.errors.Errormascota.valido = false;
      Frecordatorio.errors.Errormascota.mensaje =
        "(El campo mascota no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errormascota.valido = true;
    }
    if (Frecordatorio.fecha_expiracion.length < 3) {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo  fecha expiración no puede estar vacio )";
    } else {
      Frecordatorio.errors.Errorfecha_expiracion.valido = true;
    }
    if (Frecordatorio.notas.length < 3) {
      Frecordatorio.errors.Errornotas.valido = false;
      Frecordatorio.errors.Errornotas.mensaje =
        "(El campo  notas expiración no puede estar vacio y debe tener al menos tres caracteres)";
    } else {
      Frecordatorio.errors.Errornotas.valido = true;
    }
    if (Frecordatorio.completo.length < 0) {
      Frecordatorio.errors.Errornotas.valido = false;
      Frecordatorio.errors.Errornotas.mensaje =
        "(El campo  notas expiración no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errornotas.valido = true;
    }
    if (
      !Frecordatorio.errors.Errordescripcion.valido ||
      !Frecordatorio.errors.Errornombre.valido ||
      !Frecordatorio.errors.Errortipo.valido ||
      !Frecordatorio.errors.Errormascota.valido ||
      !Frecordatorio.errors.Errorfecha_expiracion.valido ||
      !Frecordatorio.errors.Errornotas.valido ||
      !Frecordatorio.errors.Errorcompleto.valido
    ) {
      isError = true;
    } else {
      isError = false;
    }
  };

  //enviar
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    let userid = usuario._id;
    let err = validate();
    if (!err) {
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
    } else {
      validate();
    }
  };
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
            <Col md="9">
              <SubMenu></SubMenu>
              <Card>
                <h2>Recordatorios</h2>
                <FormRecordatorio
                  onChange={onChange}
                  Frecordatorio={Frecordatorio}
                  onSubmit={onSubmit}
                  guardarrecordatorio={guardarrecordatorio}
                  mascotas={mascotas}
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
