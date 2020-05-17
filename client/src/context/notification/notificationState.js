import React, { useReducer } from "react";
import NotificatiosContex from "./notificatiosContex";
import NotificationReducer from "./notificationReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  TOGGLE_NOTIFICATION_POPUP,
  CLOSE_NOTIFICATION_POPUP,
  ADD_NOTIFICATION,
  READ_NOTIFICATIOS,
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
} from "../../types";

const NotificacionesState = (props) => {
  const initialState = {
    mensaje: null,
    notifications: [],
    allNotificationsCount: "",
    isOpen :false,

  };

  const [state, dispatch] = useReducer(NotificacionesReducer, initialState);

  const readNotifications = async (notificationIds) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios
        .post("/api/notificacion/addnotificacion", notificationIds)
        .then((response) => response.data);
      notificacionesUsuario();
      dispatch({
        type: READ_NOTIFICATIOS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: READ_NOTIFICATIOS,
        payload: alerta,
      });
    }
  };

  const getNotifications = async (queryOptions) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios
        .post("/api/notificacion/getNotifications", queryOptions)
        .then((response) => response.data);
      notificacionesUsuario();
      dispatch({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: FETCH_NOTIFICATIONS_REQUEST,
        payload: alerta,
      });
    }
  };

  return (
    <NotificacionesContext.Provider
      value={{
        mensaje: state.mensaje,
        notificaciones: state.notificaciones,
        notificacion: state.notificacion,
        readNotifications,
        getNotifications
      }}
    >
      {props.children}
    </NotificacionesContext.Provider>
  );
};
export default NotificacionesState;
