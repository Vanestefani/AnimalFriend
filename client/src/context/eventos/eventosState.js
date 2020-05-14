import React, { useReducer } from "react";
import EventosContext from "./eventosContex";
import EventosReducer from "./eventosReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  ADD_EVENTOS_SUCCESS,
  ADD_EVENTOS_FAILURE,
  EVENTOS_DELETE_SUCCESS,
  EDIT_EVENTOS_FAILURE,
  EDIT_EVENTOS_SUCCESS,
  GET_EVENTOS_FAILURE,
  GET_EVENTOS_SUCCESS,
  EVENTOS_DELETE_FAILURE,
} from "../../types";

const EventosState = (props) => {
  const initialState = {
    mensaje: null,
    eventos: [],
    evento: null,
  };

  const [state, dispatch] = useReducer(EventosReducer, initialState);

  const addEventos = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.post("/api/eventos/addevento",datos);
      eventosUsuario();
      dispatch({
        type: ADD_EVENTOS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ADD_EVENTOS_FAILURE,
        payload: alerta,
      });
    }
  };
  const eventosUsuario = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/eventos/getneventos");

      dispatch({
        type: GET_EVENTOS_SUCCESS,
        payload: respuesta.data.eventos,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_EVENTOS_FAILURE,
        payload: alerta,
      });
    }
  };

  const deleteEventos = async (eventoId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.delete(`/api/eventos/${eventoId}`);
      eventosUsuario();
      dispatch({
        type: EVENTOS_DELETE_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: EVENTOS_DELETE_FAILURE,
        payload: alerta,
      });
    }
  };
  const actualizarEventos = async (eventoId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put(`/api/eventos/${eventoId}`);
      eventosUsuario();
      dispatch({
        type: EDIT_EVENTOS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: EDIT_EVENTOS_FAILURE,
        payload: alerta,
      });
    }
  };

  return (
    <EventosContext.Provider
      value={{
        addEventos,
        eventosUsuario,
        deleteEventos,
        actualizarEventos,
        mensaje: state.mensaje,
        eventos: state.eventos,
        evento: state.evento,
      }}
    >
      {props.children}
    </EventosContext.Provider>
  );
};
export default EventosState;
