import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  VERIFICACIOM_ENVIADA,
  VERIFICACIOM_ERROR,
  PASSWORD_RESET_EXITOSA,
  PASSWORD_RESET_ERROR,
  PASSWORD_CAMBIO_EXITO,
  PASSWORD_CAMBIO_ERROR,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),

    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth/register", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };

      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  // Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.users,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  // Cuando el usuario inicia sesión
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth/login", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };

  // Cierra la sesión del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  //Verificar cuenta c
  const verificaremail = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth/resend", datos);

      dispatch({
        type: VERIFICACIOM_ENVIADA,
        payload: respuesta.data,
      });
    } catch (error) {
      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };

      dispatch({
        type: VERIFICACIOM_ERROR,
        payload: alerta,
      });
    }
  };
  //enviar correo de cambio de contraseña token
  const password_reset = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/auth/recover", datos);

      dispatch({
        type: PASSWORD_RESET_EXITOSA,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.message);

      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };
      dispatch({
        type: PASSWORD_RESET_ERROR,
        payload: alerta,
      });
    }
  };
  //cambiar contraseña
  const password_cambio = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.post(
        `/api/auth/reset/${token}`,
        datos
      );

      dispatch({
        type: PASSWORD_CAMBIO_EXITO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.message);

      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };
      dispatch({
        type: PASSWORD_CAMBIO_ERROR,
        payload: alerta,
      });
    }
  };
  const addPost = async (datos) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios
        .post("/api/post/addPost", datos)
        .then((response) => response.data)
        .then((response) => {
          console.log(response);
        });
      console.log(respuesta);
      dispatch({
        type: ADD_POST_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: ADD_POST_FAILURE,
        payload: alerta,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        addPost,
        cerrarSesion,
        verificaremail,
        password_reset,
        password_cambio,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
