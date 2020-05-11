import React, { useContext, useEffect, useState } from "react";

import {
  Label,
  Input,
  CardHeader,
  Card,
  Container,
  CardBody,
  FormGroup,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import RContext from "../../context/recordatorios/recordatoriosContex";
import AlertaContext from "../../context/alertas/alertaContext";
function ListRecordatorios() {
  const rContext = useContext(RContext);
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const { mensaje, recordatorios, recordatoriosUsuario } = rContext;
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    recordatoriosUsuario();
  }, [mensaje]);
  if (recordatorios.length === 0)
    return (
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardTitle mt-2>
          <h3 className="text-center">Recordatorios</h3>
        </CardTitle>
        <p>No hay recordatorios, agrega uno</p>
      </Card>
    );

  return (
    <>
      <Card className="shadow p-3 mb-5 bg-white rounded">
        <CardTitle mt-2>
          <h1 className="text-center">Recordatorios</h1>
        </CardTitle>
        <InfiniteScroll
          style={{
            overflow: "none ",
          }}
          dataLength={recordatorios.length}
          next={recordatoriosUsuario}
          hasMore={true}
          loader={<h4>Cargando...</h4>}
          endMessage={
            <div horizontal>
              <span>Yay! Has visto todo</span>
            </div>
          }
        >
          {recordatorios.map((recordatorio) => (
            <div></div>
          ))}
        </InfiniteScroll>
      </Card>
    </>
  );
}

export default ListRecordatorios;
