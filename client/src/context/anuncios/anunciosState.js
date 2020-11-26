import React, { useReducer } from "react";
import AnunciosContext from "./anunciosContext";
import AnunciosReducer from "./anunciosReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  ADD_ANUNCIOS_SUCCESS,
  ADD_ANUNCIOS_FAILURE,
  ANUNCIOS_DELETE_SUCCESS,
  EDIT_ANUNCIOS_FAILURE,
  EDIT_ANUNCIOS_SUCCESS,
  GET_ANUNCIOS_FAILURE,
  GET_ANUNCIOS_SUCCESS,
  ANUNCIOS_DELETE_FAILURE,
  ANUNCIO_SUCCESS,
  ANUNCIO_FAILURE,
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
      const respuesta = await clienteAxios.post(
        "/api/anuncios/addanuncio",
        datos
      );
      allanuncios();
      dispatch({
        type: ADD_ANUNCIOS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ADD_ANUNCIOS_FAILURE,
        payload: alerta,
      });
    }
  };
  const anunciosUsuario = async (p) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(`/api/anuncios/getnanuncios/${p}`);

      dispatch({
        type: GET_ANUNCIOS_SUCCESS,
        payload: respuesta.data.anuncios,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_ANUNCIOS_FAILURE,
        payload: alerta,
      });
    }
  };
  const allanuncios = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/anuncios/allanuncios");

      dispatch({
        type: GET_ANUNCIOS_SUCCESS,
        payload: respuesta.data.anuncios,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_ANUNCIOS_FAILURE,
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
      const respuesta = await clienteAxios.delete(`/api/anuncios/${anuncioId}`);
      allanuncios();
      dispatch({
        type: ANUNCIOS_DELETE_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ANUNCIOS_DELETE_FAILURE,
        payload: alerta,
      });
    }
  };
  const getanuncio = async (anuncioId) => {
    const token = localStorage.getItem("token");
    console.log(anuncioId);
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(
        `/api/anuncios/anuncio/${anuncioId}`
      );

      dispatch({
        type: ANUNCIO_SUCCESS,
        payload: respuesta.data.anuncio,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ANUNCIO_FAILURE,
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
      const respuesta = await clienteAxios.put(`/api/anuncios/${anuncioId}`);
      allanuncios();
      dispatch({
        type: EDIT_ANUNCIOS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: EDIT_ANUNCIOS_FAILURE,
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
        allanuncios,
        getanuncio,
      }}
    >
      {props.children}
    </AnunciosContext.Provider>
  );
};
export default AnunciosState;
