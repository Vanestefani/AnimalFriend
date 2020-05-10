import {
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POST,
  GET_POST_ERROR,
  LIKE_POST,
  LIKE_POST_ERROR,
  DISLIKE_POST_ERROR,
  DISLIKE_POST,
  INIT_COMMENT_ERROR,
  INIT_COMMENT,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  PUBLICACION_ACTUAL,
  LIKE,
  LIKE_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        publicaciones: action.payload,
      };
    case LIKE_POST:
    case ADD_POST_SUCCESS:
    case DISLIKE_POST:
    case INIT_COMMENT:
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        mensaje: null,
      };
    case GET_POST_ERROR:
    case LIKE_POST_ERROR:
    case ADD_POST_FAILURE:
    case DISLIKE_POST_ERROR:
    case INIT_COMMENT_ERROR:
    case POST_DELETE_FAILURE:
    case LIKE_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case PUBLICACION_ACTUAL:
      return {
        ...state,
        publicacion: state.publicaciones.filter(
          (publicacion) => publicacion._id === action.payload
        ),
      };

    default:
      return state;
  }
};
