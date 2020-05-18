import React, { useReducer } from "react";
import MascotasContext from "./mascotasContext";
import MascotasReducer from "./mascotasReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  ADD_MASCOTAS_SUCCESS,
  ADD_MASCOTAS_FAILURE,
  MASCOTAS_DELETE_SUCCESS,
  EDIT_MASCOTAS_FAILURE,
  EDIT_MASCOTAS_SUCCESS,
  GET_MASCOTAS_FAILURE,
  GET_MASCOTAS_SUCCESS,
  MASCOTAS_DELETE_FAILURE,
} from "../../types";

const MascotasState = (props) => {
  const initialState = {
    mensaje: null,
    mascotas: [],
    mascota: null,
    loading:true
  };

  const [state, dispatch] = useReducer(MascotasReducer, initialState);

  const addMascotas = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios
        .post("/api/mascota/addmascota", datos)
        .then((response) => response.data);
      mascotasUsuario();
      dispatch({
        type: ADD_MASCOTAS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ADD_MASCOTAS_FAILURE,
        payload: alerta,
      });
    }
  };
  const mascotasUsuario = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/mascota/getmascotas");

      dispatch({
        type: GET_MASCOTAS_SUCCESS,
        payload: respuesta.data.mascotas,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_MASCOTAS_FAILURE,
        payload: alerta,
      });
    }
  };
  const mascotasbyUsuario = async (p) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(`/api/mascota/getmascotasporusuario/${p}`);

      dispatch({
        type: GET_MASCOTAS_SUCCESS,
        payload: respuesta.data.mascotas,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_MASCOTAS_FAILURE,
        payload: alerta,
      });
    }
  };

  const deleteMascotas = async (mascotaId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.delete(`/api/mascota/${mascotaId}`);
      mascotasUsuario();
      dispatch({
        type: MASCOTAS_DELETE_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: MASCOTAS_DELETE_FAILURE,
        payload: alerta,
      });
    }
  };
  const actualizarMascotas = async (mascotaId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put(`/api/mascota/${mascotaId}`);
      mascotasUsuario();
      dispatch({
        type: EDIT_MASCOTAS_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: EDIT_MASCOTAS_FAILURE,
        payload: alerta,
      });
    }
  };

  return (
    <MascotasContext.Provider
      value={{
        addMascotas,
        mascotasUsuario,
        deleteMascotas,
        actualizarMascotas,
        mensaje: state.mensaje,
        mascotas: state.mascotas,
        mascota: state.mascota,
        loading:state.loading,mascotasbyUsuario
      }}
    >
      {props.children}
    </MascotasContext.Provider>
  );
};
export default MascotasState;
