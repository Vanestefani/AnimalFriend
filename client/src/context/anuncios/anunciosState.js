import React, { useReducer } from "react";
import AnunciosContext from "./anunciosContext";
import AnunciosReducer from "./anunciosReducer";

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

const AnunciosState = (props) => {
  const initialState = {
    mensaje: null,
    anuncios: [],
    anuncio: null,
  };

  const [state, dispatch] = useReducer(AnunciosReducer, initialState);

  const addAnuncios = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios
        .anuncios("/api/anuncio/addanuncio", datos)
        .then((response) => response.data);
      anunciosUsuario();
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
  const anunciosUsuario = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(
        "/api/anuncio/anuncios"
      );

      dispatch({
        type: GET_RECORDATORIO_SUCCESS,
        payload: respuesta.data.anuncios,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_RECORDATORIO_FAILURE,
        payload: alerta,
      });
    }
  };

  const deleteAnuncios = async (anuncioId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.delete(
        `/api/anuncio/${anuncioId}`
      );
      anunciosUsuario();
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
  const actualizarAnuncios = async (anuncioId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put(
        `/api/anuncio/${anuncioId}`
      );
      anunciosUsuario();
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
    <AnunciosContext.Provider
      value={{
        addAnuncios,
        anunciosUsuario,
        deleteAnuncios,
        actualizarAnuncios,
        mensaje: state.mensaje,
        anuncios: state.anuncios,
        anuncio: state.anuncio,
      }}
    >
      {props.children}
    </AnunciosContext.Provider>
  );
};
export default AnunciosState;
