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
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import RContext from "../../context/recordatorios/recordatoriosContex";
import AlertaContext from "../../context/alertas/alertaContext";
import FormRecordatorio from "./form/FormRecordatorio";
import AuthContext from "../../context/autenticacion/authContext";
import MascotasContext from "../../context/mascotas/mascotasContext";

function ListRecordatorios(props) {
  const mContext = useContext(MascotasContext);
  const { mascotas, mascotasUsuario } = mContext;
  const rContext = useContext(RContext);
  const { addRecordatorios, recordatorios, recordatoriosUsuario } = rContext;
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
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    mascotasUsuario();
    recordatoriosUsuario();
  }, [mensaje]);
  if (recordatorios) {
    if (recordatorios.length === 0)
      return (
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardTitle mt-2>
            <h3 className="text-center">Recordatorios</h3>
          </CardTitle>
          <p>No hay recordatorios, agrega uno</p>
        </Card>
      );
  }

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardTitle mt-2>
          <h2 className="text-center">Recordatorios</h2>
          <FormRecordatorio
            onChange={onChange}
            Frecordatorio={Frecordatorio}
            onSubmit={onSubmit}
            guardarrecordatorio={guardarrecordatorio}
          ></FormRecordatorio>
        </CardTitle>

        {recordatorios ? (
          recordatorios.map((recordatorio) => (
            <div>
              <h3>{recordatorio.nombre}</h3>
              <Badge color="info">{recordatorio.tipo}</Badge>

              <Badge color="success">{recordatorio.mascota.nombre}</Badge>
              <p>{recordatorio.fecha_expiracion.nombre}</p>
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
