import React, { useContext, useEffect, useState } from "react";

import {
  Label,
  Input,
  CardHeader,
  Card,
  Container,
  CardBody,
  FormGroup,
  Badge,
  Button,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import RContext from "../../context/recordatorios/recordatoriosContex";
import AlertaContext from "../../context/alertas/alertaContext";
import FormRecordatorio from "./form/FormRecordatorio";
import Editar from "./form/Editar";

import AuthContext from "../../context/autenticacion/authContext";
import MascotasContext from "../../context/mascotas/mascotasContext";
import moment from "moment";
import "moment/locale/es";

function ListRecordatorios(props) {
  const mContext = useContext(MascotasContext);
  const { mascotas, mascotasUsuario } = mContext;
  const rContext = useContext(RContext);
  const {
    addRecordatorios,
    actualizarRecordatorios,
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
  //error state
  const [errores, seterrores] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    e.target.className += " was-validated";
    let userid = usuario._id;

    if (nombre === "" || tipo === "") {
      seterrores(true);
      console.log("esta vacio");
    } else {
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

      });
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

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardTitle mt-2>
          <h2 className="text-center">Recordatorios</h2>
          <FormRecordatorio
            onChange={onChange}
            Frecordatorio={Frecordatorio}
            onSubmit={onSubmit}
            mascotas={mascotas}
            guardarrecordatorio={guardarrecordatorio}
          ></FormRecordatorio>
        </CardTitle>

        {recordatorios ? (
          recordatorios.map((recordatorio) => (

              <div className="shadow p-3 mb-5 bg-white rounded">
                <h3>
                  <b>Titulo:</b>
                  {recordatorio.nombre}
                </h3>
                <b>Categoria:</b>{" "}
                <Badge color="info">{recordatorio.tipo}</Badge>
                <br></br>
                <b>Mascota:</b>
                <Badge color="success">{recordatorio.mascota.nombre}</Badge>
                <div>
                  <b>Fecha:</b>
                  <em>
                    {moment(new Date(recordatorio.fecha_expiracion)).fromNow()}
                  </em>
                </div>
                
                <Button
                  sm
                  onClick={() => {
                    deleteRecordatorios(recordatorio._id);
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                </Button>
              </div>

          ))
        ) : (
          <p>No hay recordatorios, agrega uno</p>
        )}
      </Card>
    </>
  );
}

export default ListRecordatorios;
