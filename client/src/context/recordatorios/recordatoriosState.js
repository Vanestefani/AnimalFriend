import React, { useReducer } from "react";
import RecordatoriosContext from "./recordatoriosContex";
import RecordatoriosReducer from "./recordatoriosReducers";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  ADD_RECORDATORIO_SUCCESS,
  ADD_RECORDATORIO_FAILURE,
  RECORDATORIO_DELETE_SUCCESS,
  EDIT_RECORDATORIO_FAILURE,
  EDIT_RECORDATORIO_SUCCESS,
  GET_RECORDATORIO_FAILURE,
  GET_RECORDATORIO_SUCCESS,
  RECORDATORIO_DELETE_FAILURE,
} from "../../types";

const RecordatoriosState = (props) => {
  const initialState = {
    mensaje: null,
    recordatorios: [],
    recordatorio: null,
    loading:true
  };

  const [state, dispatch] = useReducer(RecordatoriosReducer, initialState);

  const addRecordatorios = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios
        .post("/api/recordatorio/addrecordatorio", datos)
        .then((response) => response.data);
      recordatoriosUsuario();
      dispatch({
        type: ADD_RECORDATORIO_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ADD_RECORDATORIO_FAILURE,
        payload: alerta,
      });
    }
  };

 const recordatoriosUsuario = async () => {

    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/recordatorio/recordtorios");

      dispatch({
        type:GET_RECORDATORIO_SUCCESS,
        payload: respuesta.data.recordatorios,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type:GET_RECORDATORIO_FAILURE,
        payload: alerta,
      });
    }
  };
  const deleteRecordatorios = async (recordatorioId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.delete(`/api/recordatorio/${recordatorioId}`);
      recordatoriosUsuario();
      dispatch({
        type: RECORDATORIO_DELETE_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: RECORDATORIO_DELETE_FAILURE,
        payload: alerta,
      });
    }
  };
  const actualizarRecordatorios = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put(`/api/recordatorio/${datos.recordatorioId}`,datos);
      recordatoriosUsuario();
      dispatch({
        type: EDIT_RECORDATORIO_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: EDIT_RECORDATORIO_FAILURE,
        payload: alerta,
      });
    }
  };

  return (
    <RecordatoriosContext.Provider
      value={{
        addRecordatorios,
        recordatoriosUsuario,
        deleteRecordatorios,
        actualizarRecordatorios,
        mensaje: state.mensaje,
        recordatorios: state.recordatorios,
        recordatorio: state.recordatorio,
        loading:state.loading
      }}
    >
      {props.children}
    </RecordatoriosContext.Provider>
  );
};
export default RecordatoriosState;
