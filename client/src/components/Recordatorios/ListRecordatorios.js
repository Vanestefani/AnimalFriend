import React, { useContext, useEffect, useState } from "react";

import {
  Media,
  Card,
  ListGroup,
  ListGroupItemHeading,
  Badge,
  Button,
  CardTitle,
  ListGroupItem,
} from "reactstrap";

import RContext from "../../context/recordatorios/recordatoriosContex";
import AlertaContext from "../../context/alertas/alertaContext";
import FormRecordatorio from "./form/FormRecordatorio";
import Editar from "./form/Editar";

import AuthContext from "../../context/autenticacion/authContext";
import MascotasContext from "../../context/mascotas/mascotasContext";
import moment from "moment";
import "moment/locale/es";
import Skeleton from "react-loading-skeleton";
import { Iconos } from "./Iconos";
function ListRecordatorios(props) {
  const mContext = useContext(MascotasContext);
  const { mascotas, mascotasUsuario } = mContext;
  const rContext = useContext(RContext);
  const {
    addRecordatorios,
    loading,
    recordatorios,
    recordatoriosUsuario,
    deleteRecordatorios,
  } = rContext;
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { usuario, mensaje } = authContext;

  const [Frecordatorio, guardarrecordatorio] = useState({
    descripcion: "",
    nombre: "",
    tipo: "",
    mascota: "",
    fecha_expiracion: "",
    completo: false,
    errors: {
      Errordescripcion: { valido: true, mensaje: "" },
      Errornombre: { valido: true, mensaje: "" },
      Errortipo: { valido: true, mensaje: "" },
      Errormascota: { valido: true, mensaje: "" },
      Errorfecha_expiracion: { valido: true, mensaje: "" },
    },
  });
  const [Erecordatorio, Editarrecordatorio] = useState({
    descripcion: "",
    nombre: "",
    tipo: "",
    mascota: "",
    fecha_expiracion: "",
    completo: false,
    errors: {
      Errordescripcion: { valido: true, mensaje: "" },
      Errornombre: { valido: true, mensaje: "" },
      Errortipo: { valido: true, mensaje: "" },
      Errormascota: { valido: true, mensaje: "" },
      Errorfecha_expiracion: { valido: true, mensaje: "" },
    },
  });
  const {
    descripcion,
    nombre,
    tipo,
    mascota,
    fecha_expiracion,
    completo,
  } = Frecordatorio;

  const onChange = (e) => {
    guardarrecordatorio({
      ...Frecordatorio,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let isError = false;

    if (Frecordatorio.descripcion.trim() == "") {
      Frecordatorio.errors.Errordescripcion.valido = false;
      Frecordatorio.errors.Errordescripcion.mensaje =
        "(El campo descripción no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errordescripcion.valido = true;
    }
    if (Frecordatorio.nombre.trim() == "") {
      Frecordatorio.errors.Errornombre.valido = false;
      Frecordatorio.errors.Errornombre.mensaje =
        "(El campo nombre no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errornombre.valido = true;
    }
    if (Frecordatorio.tipo.trim() == "") {
      Frecordatorio.errors.Errortipo.valido = false;
      Frecordatorio.errors.Errortipo.mensaje =
        "(El campo tipo no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errortipo.valido = true;
    }
    if (Frecordatorio.mascota.trim() == "") {
      Frecordatorio.errors.Errormascota.valido = false;
      Frecordatorio.errors.Errormascota.mensaje =
        "(El campo mascota no puede estar vacio)";
    } else {
      Frecordatorio.errors.Errormascota.valido = true;
    }
    if (Frecordatorio.fecha_expiracion.trim() == "") {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo fecha de expiración no puede estar vacio)";
    } else if (Frecordatorio.fecha_expiracion < moment().format("YYYY MM DD")) {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo fecha de expiración no puede ser menor que la fecha de hoy)";
    } else if (!moment(Frecordatorio.fecha_expiracion).isValid()) {
      Frecordatorio.errors.Errorfecha_expiracion.valido = false;
      Frecordatorio.errors.Errorfecha_expiracion.mensaje =
        "(El campo fecha de expiración es invalida)";
    } else {
      Frecordatorio.errors.Errorfecha_expiracion.valido = true;
    }
    if (
      !Frecordatorio.errors.Errordescripcion.valido ||
      !Frecordatorio.errors.Errornombre.valido ||
      !Frecordatorio.errors.Errortipo.valido ||
      !Frecordatorio.errors.Errormascota.valido ||
      !Frecordatorio.errors.Errorfecha_expiracion.valido
    ) {
      isError = true;
      console.log("error :D");
    } else {
      isError = false;
    }
    return isError;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    const err = validate();

    if (!err) {
      let userid = usuario._id;

      addRecordatorios({
        descripcion: descripcion,
        autor: userid,
        nombre: nombre,
        tipo: tipo,
        mascota: mascota,
        fecha_expiracion: fecha_expiracion,
      });
      guardarrecordatorio({
        descripcion: "",
        nombre: "",
        tipo: "",
        mascota: "",
        fecha_expiracion: "",
        completo: false,
        errors: {
          Errordescripcion: { valido: true, mensaje: "" },
          Errornombre: { valido: true, mensaje: "" },
          Errortipo: { valido: true, mensaje: "" },
          Errormascota: { valido: true, mensaje: "" },
          Errorfecha_expiracion: { valido: true, mensaje: "" },
        },
      });
      setModal1(false);
    }
  };

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    mascotasUsuario();
    recordatoriosUsuario();
  }, [mensaje]);
  moment.lang("es", {
    months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
    monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
      "_"
    ),
    weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
    weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
    weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
  });
  moment.locale("es");
  const [modalMascotas, setModal1] = React.useState(false);

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <br></br>
        <CardTitle className="title-up">
          <span className="font-weight-bold text-center" font-size="30px">
            Recordatorios
          </span>
          <FormRecordatorio
            modalMascotas={modalMascotas}
            setModal1={setModal1}
            onChange={onChange}
            Frecordatorio={Frecordatorio}
            onSubmit={onSubmit}
            mascotas={mascotas}
            guardarrecordatorio={guardarrecordatorio}
          ></FormRecordatorio>
        </CardTitle>
        <ListGroup>
          {!loading ? (
            recordatorios.length != 0 ? (
              recordatorios.map((recordatorio) => (
                <ListGroupItem>
                  <Media>
                    <Media left href="#">
                      <div className="text-center">
                        <h1>{Iconos(recordatorio.tipo)}</h1>
                        <Badge color="info"> {recordatorio.tipo}</Badge>
                      </div>
                    </Media>
                    <Media body>
                      <Media heading>
                        <h2> {recordatorio.nombre}</h2>
                        <em>
                          Vence:
                          {moment(
                            new Date(recordatorio.fecha_expiracion)
                          ).fromNow()}
                          /
                          {moment(
                            new Date(recordatorio.fecha_expiracion)
                          ).format("YYYY MM DD")}
                        </em>{" "}
                        <br></br>
                        Mascota:
                        <Badge color="success">
                          {" "}
                          {recordatorio.mascota.nombre}
                        </Badge>
                        <br></br>
                        {recordatorio.descripcion}
                      </Media>
                      <Editar recordatorio={recordatorio}
                      mascotas={mascotas}
                      ></Editar>
                      <Button
                        className="btn-danger"
                        size="sm"
                        onClick={() => {
                          deleteRecordatorios(recordatorio._id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                    </Media>
                  </Media>
                </ListGroupItem>
              ))
            ) : (
              <p>No hay recordatorios</p>
            )
          ) : (
            <center>
              <Skeleton
                circle={true}
                height={100}
                width={100}
                animation="wave"
                variant="rect"
              />

              <Skeleton
                height={30}
                width={100}
                animation="wave"
                variant="rect"
              />
              <Skeleton
                height={30}
                width={100}
                animation="wave"
                variant="rect"
              />
            </center>
          )}
        </ListGroup>
      </Card>
    </>
  );
}

export default ListRecordatorios;
