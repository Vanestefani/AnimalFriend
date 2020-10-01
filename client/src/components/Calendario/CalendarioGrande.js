import React, { useState, useContext, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
function CalendarioGrande(props) {
  let appointments = [];

  props.recordatorios.map((data) => {
    appointments.push({
      title: "" + data.nombre + " : " + data.tipo,
      startDate: moment(data.fecha_creacion, "YYYY-MM-DD HH"),
      endDate: moment(data.fecha_expiracion, "YYYY-MM-DD HH"),
      id: data._id,
    });
  });

  const [state, setstate] = useState({ data: appointments });

  const commitChanges = ({ added, changed, deleted }) => {
    setstate((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  };

  const { data } = state;
  let fecha_actual = new Date();
  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState defaultCurrentDate={fecha_actual} />
        <EditingState onCommitChanges={commitChanges} />
        <WeekView startDayHour={9} endDayHour={15} />
        <MonthView />
        <Appointments />

        <Toolbar />
        <ViewSwitcher />

        <EditRecurrenceMenu />

        <DragDropProvider />
      </Scheduler>
    </Paper>
  );
}

export default CalendarioGrande;
