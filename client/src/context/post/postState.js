import React, { useReducer } from "react";
import PostContext from "./postContext";
import PostReducer from "./postReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

import { ADD_POST_SUCCESS, ADD_POST_FAILURE } from "../../types";

const PostState = (props) => {
  const initialState = {

    mensaje: null
}

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const addPost = async datos => {
    try {
      const respuesta = await clienteAxios.post("/api/post/addPost/", datos);

      dispatch({
        type: ADD_POST_SUCCESS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response.data.message);

      const alerta = {
        msg: error.response.data.message,
        categoria: "danger",
      };
      dispatch({
        type: ADD_POST_FAILURE,
        payload: alerta,
      });
    }
  };

  return (
    <PostContext.Provider
      value={{

        mensaje: state.mensaje,
        addPost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
export default PostState;
