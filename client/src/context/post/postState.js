import React, { useReducer } from "react";
import PostContext from "./postContext";
import PostReducer from "./postReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POST,
  GET_POST_ERROR,
  LIKE_POST,
  LIKE_POST_ERROR,
  DISLIKE_POST_ERROR,
  DISLIKE_POST,
  INIT_COMMENT,
  INIT_COMMENT_ERROR,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  PUBLICACION_ACTUAL,
} from "../../types";

const PostState = (props) => {
  const initialState = {
    mensaje: null,
    publicaciones: [],
    publicacion: null,
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

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
  const allpost = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get("/api/post/allpost");

      dispatch({
        type: GET_POST,
        payload: respuesta.data.posts,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: GET_POST_ERROR,
        payload: alerta,
      });
    }
  };
  const likePost = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put("/api/post/like", id);

      dispatch({
        type: LIKE_POST,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: LIKE_POST_ERROR,
        payload: alerta,
      });
    }
  };
  const unlikePost = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put("/api/post/like", id);

      dispatch({
        type: DISLIKE_POST,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: DISLIKE_POST_ERROR,
        payload: alerta,
      });
    }
  };
  const makeComment = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.put("/api/post/comment", id);

      dispatch({
        type: INIT_COMMENT,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: INIT_COMMENT_ERROR,
        payload: alerta,
      });
    }
  };
  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.delete(`/api/post/deletepost/${id}`);

      dispatch({
        type: POST_DELETE_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error);

      const alerta = {
        categoria: "danger",
      };
      dispatch({
        type: POST_DELETE_FAILURE,
        payload: alerta,
      });
    }
  };
  // Selecciona el publicacion que el usuario dio click
  const publicacionActual = (publicacionId) => {
    dispatch({
      type: PUBLICACION_ACTUAL,
      payload: publicacionId,
    });
  };
  return (
    <PostContext.Provider
      value={{
        addPost,
        publicaciones:state.publicaciones,
        publicacionActual,
        allpost,
        likePost,
        unlikePost,
        makeComment,
        deletePost,
        publicacion:state.publicacion,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
export default PostState;
