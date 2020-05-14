import React, { useReducer } from "react";
import UsuariosContext from "./usuarioContext";
import UsuariosReducer from "./usuariosReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  BUSCAR_USUARIO,
  BUSCAR_USUARIO_ERROR,
  GETUSER_SUCCESS,
  GETUSER_FAILURE,
} from "../../types";

const UsuariosState = (props) => {
  const initialState = {
    token: null,
    result_user: null,
    usuarioactual: "",
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(UsuariosReducer, initialState);

  // seach usario
  const seachusers = async (q) => {
    try {
      const respuesta = await clienteAxios.post(
        "/api/user/searchByUsername",
        q
      );

      dispatch({
        type: BUSCAR_USUARIO,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };

      dispatch({
        type: BUSCAR_USUARIO_ERROR,
        payload: alerta,
      });
    }
  };
  //user show
  const Showuserid = async (id) => {
    try {
      const respuesta = await clienteAxios.get(`api/user/${id}`);

      dispatch({
        type: BUSCAR_USUARIO,
        payload: respuesta.data.user,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };

      dispatch({
        type: BUSCAR_USUARIO_ERROR,
        payload: alerta,
      });
    }
  };
  const getUserData = async (queryParams) => {
    try {
      const respuesta = await clienteAxios.post(
        "/api/user/getUserData",
        queryParams
      );

      dispatch({
        type: GETUSER_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };

      dispatch({
        type: GETUSER_FAILURE,
        payload: alerta,
      });
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        seachusers,
        getUserData,
        token: state.token,
        result_user: state.result_user,
        usuarioactual: state.usuarioactual,
        Showuserid
      }}
    >
      {props.children}
    </UsuariosContext.Provider>
  );
};
export default UsuariosState;
