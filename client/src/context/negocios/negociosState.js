import React, { useReducer } from "react";
import NegociosContext from "./negociosContex";
import NegociosReducer from "./negociosReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  ADD_NEGOCIOS_SUCCESS,
  ADD_NEGOCIOS_FAILURE,
  NEGOCIOS_DELETE_SUCCESS,
  EDIT_NEGOCIOS_FAILURE,
  EDIT_NEGOCIOS_SUCCESS,
  GET_NEGOCIOS_FAILURE,
  GET_NEGOCIOS_SUCCESS,
  NEGOCIOS_DELETE_FAILURE,
  NEGOCIO_SUCCESS,
  NEGOCIO_FAILURE,
} from "../../types";

const NegociosState = (props) => {
  const initialState = {
    mensaje: null,
    negocios: [],
    negocio: null,
  };

  const [state, dispatch] = useReducer(NegociosReducer, initialState);

  const addNegocios = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.post(
        "/api/negocios/addnegocio",
        datos
      );
      allnegocios();
      dispatch({
        type: ADD_NEGOCIOS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ADD_NEGOCIOS_FAILURE,
        payload: alerta,
      });
    }
  };
  const negociosUsuario = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/negocios/getnnegocios");

      dispatch({
        type: GET_NEGOCIOS_SUCCESS,
        payload: respuesta.data.negocios,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_NEGOCIOS_FAILURE,
        payload: alerta,
      });
    }
  };
  const allnegocios = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/negocios/allnegocios");

      dispatch({
        type: GET_NEGOCIOS_SUCCESS,
        payload: respuesta.data.negocios,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_NEGOCIOS_FAILURE,
        payload: alerta,
      });
    }
  };

  const deleteNegocios = async (negocioId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.delete(`/api/negocios/${negocioId}`);
      allnegocios();
      dispatch({
        type: NEGOCIOS_DELETE_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: NEGOCIOS_DELETE_FAILURE,
        payload: alerta,
      });
    }
  };
  const getnegocio = async (negocioId) => {
    const token = localStorage.getItem("token");
    console.log(negocioId);
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(
        `/api/negocios/negocio/${negocioId}`
      );

      dispatch({
        type: NEGOCIO_SUCCESS,
        payload: respuesta.data.negocio,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: NEGOCIO_FAILURE,
        payload: alerta,
      });
    }
  };
  const actualizarNegocios = async (negocioId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put(`/api/negocios/${negocioId}`);
      allnegocios();
      dispatch({
        type: EDIT_NEGOCIOS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: EDIT_NEGOCIOS_FAILURE,
        payload: alerta,
      });
    }
  };
  return (
    <NegociosContext.Provider
      value={{
        addNegocios,
        negociosUsuario,
        deleteNegocios,
        actualizarNegocios,
        mensaje: state.mensaje,
        negocios: state.negocios,
        negocio: state.negocio,
        allnegocios,
        getnegocio,
      }}
    >
      {props.children}
    </NegociosContext.Provider>
  );
};
export default NegociosState;
