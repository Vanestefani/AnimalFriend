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
  VERIFICADO_ERROR,
  VERIFICADO,
  BUSCAR_USUARIO,
  BUSCAR_USUARIO_ERROR,
  GETALLUSER_SUCCESS,
  GETALLUSER_FAILURE,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    usuarioactual: "",
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
  const Showuserid = async (id) => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get(`api/user/${id}`);

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
  // Retorna el usuario autenticado

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
  const verificado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get(`/api/auth/verify/${token}`);

      dispatch({
        type: VERIFICADO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.message);

      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };
      dispatch({
        type: VERIFICADO_ERROR,
        payload: alerta,
      });
    }
  };
  const seguir = async (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put("/api/user/follow", userId);

      dispatch({
        type: FOLLOW_SUCCESS,
        payload: respuesta.data.result,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };
      dispatch({
        type: FOLLOW_FAILURE,
        payload: alerta,
      });
    }
  };
  const noseguir = async (userId) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put(
        "/api/user/unfollow",
        userId
      );

      dispatch({
        type: UNFOLLOW_SUCCESS,
        payload: respuesta.data.result,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };
      dispatch({
        type: UNFOLLOW_FAILURE,
        payload: alerta,
      });
    }
  };
  const alluser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    alluser();
    try {
      const respuesta = await clienteAxios.get("/api/user/all");

      dispatch({
        type: GETALLUSER_SUCCESS,
        payload: respuesta.data.posts,
      });
    } catch (error) {
      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GETALLUSER_FAILURE,
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
        verificado,
        cerrarSesion,
        verificaremail,
        password_reset,
        password_cambio,
        Showuserid,
        usuarioactual: state.usuarioactual,
        alluser,
        seguir,
        noseguir,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
