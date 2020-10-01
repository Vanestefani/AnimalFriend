import React, { useContext } from "react";

import Editar from "./form/Editar";

// reactstrap components
import { ListGroupItem, Media, Badge, Button, CardTitle } from "reactstrap";
import moment from "moment";
import "moment/locale/es";
import { Iconos } from "./Iconos";
import RContext from "../../context/recordatorios/recordatoriosContex";

function ItemRecordatorios(props) {
  const rContext = useContext(RContext);
  const { deleteRecordatorios } = rContext;
  return (
    <>
      <ListGroupItem>
        <Media>
          <Media left href="#">
            <div className="text-center  p-1">
              <h1>{Iconos(props.recordatorio.tipo)}</h1>
              <Badge color="info"> {props.recordatorio.tipo}</Badge>
            </div>
          </Media>
          <Media body>
            <Media heading>
              <h2> {props.recordatorio.nombre}</h2>
              <em>
                Vence:
                {moment(
                  new Date(props.recordatorio.fecha_expiracion)
                ).fromNow()}
                /
                {moment(new Date(props.recordatorio.fecha_expiracion)).format(
                  "YYYY MM DD"
                )}
              </em>{" "}
              <br></br>
              Mascota:
              <Badge color="success">
                {" "}
                {props.recordatorio.mascota.nombre}
              </Badge>
              <br></br>
              {props.recordatorio.descripcion}
            </Media>
            <Editar
              recordatorio={props.recordatorio}
              mascotas={props.mascotas}
            ></Editar>
            <Button
              className="btn-danger"
              size="sm"
              onClick={() => {
                deleteRecordatorios(props.recordatorio._id);
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </Button>
          </Media>
        </Media>
      </ListGroupItem>
    </>
  );
}

export default ItemRecordatorios;
