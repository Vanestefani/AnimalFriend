import {
  ADD_ANUNCIOS_SUCCESS,
  ADD_ANUNCIOS_FAILURE,
  ANUNCIOS_DELETE_SUCCESS,
  EDIT_ANUNCIOS_FAILURE,
  EDIT_ANUNCIOS_SUCCESS,
  GET_ANUNCIOS_FAILURE,
  GET_ANUNCIOS_SUCCESS,
  ANUNCIO_FAILURE,
  ANUNCIO_SUCCESS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case ANUNCIO_SUCCESS:
      return {
        ...state,
        anuncio: action.payload,
      };
    case GET_ANUNCIOS_SUCCESS:
    case EDIT_ANUNCIOS_SUCCESS:
      return {
        ...state,
        anuncios: action.payload,
      };
    case ADD_ANUNCIOS_SUCCESS:
    case ANUNCIOS_DELETE_SUCCESS:
      return {
        ...state,
        mensaje: null,
      };
    case ADD_ANUNCIOS_FAILURE:
    case EDIT_ANUNCIOS_FAILURE:
    case GET_ANUNCIOS_FAILURE:
      return {
        ...state,
        mensaje: action.payload,
      };

    default:
      return state;
  }
};
