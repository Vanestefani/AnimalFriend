import {
    ADD_NEGOCIOS_SUCCESS,
    ADD_NEGOCIOS_FAILURE,
    NEGOCIOS_DELETE_SUCCESS,
    EDIT_NEGOCIOS_FAILURE,
    EDIT_NEGOCIOS_SUCCESS,
    GET_NEGOCIOS_FAILURE,
    GET_NEGOCIOS_SUCCESS,
    NEGOCIO_FAILURE,
    NEGOCIO_SUCCESS,
  } from "../../types";

  export default (state, action) => {
    switch (action.type) {
        case NEGOCIO_SUCCESS:
            return {
              ...state,
              negocio: action.payload,
            };
      case GET_NEGOCIOS_SUCCESS:
      case EDIT_NEGOCIOS_SUCCESS:
        return {
          ...state,
         negocios: action.payload,
        };
      case ADD_NEGOCIOS_SUCCESS:
      case NEGOCIOS_DELETE_SUCCESS:
        return {
          ...state,
          mensaje: null,
        };
      case ADD_NEGOCIOS_FAILURE:
      case EDIT_NEGOCIOS_FAILURE:
      case GET_NEGOCIOS_FAILURE:
        return {
          ...state,
          mensaje: action.payload,
        };

      default:
        return state;
    }
  };
