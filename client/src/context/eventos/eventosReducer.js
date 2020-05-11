import {
    ADD_EVENTOS_SUCCESS,
    ADD_EVENTOS_FAILURE,
    EVENTOS_DELETE_SUCCESS,
    EDIT_EVENTOS_FAILURE,
    EDIT_EVENTOS_SUCCESS,
    GET_EVENTOS_FAILURE,
    GET_EVENTOS_SUCCESS,
  } from "../../types";

  export default (state, action) => {
    switch (action.type) {
      case GET_EVENTOS_SUCCESS:
      case  EDIT_EVENTOS_SUCCESS:
        return {
          ...state,
          eventos: action.payload,
        };
      case ADD_EVENTOS_SUCCESS:
      case EVENTOS_DELETE_SUCCESS:
        return {
          ...state,
          mensaje: null,
        };
      case ADD_EVENTOS_FAILURE:
      case EDIT_EVENTOS_FAILURE:
      case GET_EVENTOS_FAILURE:
        return {
          ...state,
          mensaje: action.payload,
        };

      default:
        return state;
    }
  };
