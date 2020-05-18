import {
  ADD_RECORDATORIO_SUCCESS,
  ADD_RECORDATORIO_FAILURE,
  RECORDATORIO_DELETE_SUCCESS,
  EDIT_RECORDATORIO_FAILURE,
  EDIT_RECORDATORIO_SUCCESS,
  GET_RECORDATORIO_FAILURE,
  GET_RECORDATORIO_SUCCESS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_RECORDATORIO_SUCCESS:
    case  EDIT_RECORDATORIO_SUCCESS:
      return {
        ...state,
        loading:false,
        recordatorios: action.payload,
      };
    case ADD_RECORDATORIO_SUCCESS:
    case RECORDATORIO_DELETE_SUCCESS:
      return {
        ...state,
        mensaje: null,
      };
    case ADD_RECORDATORIO_FAILURE:
    case EDIT_RECORDATORIO_FAILURE:
    case GET_RECORDATORIO_FAILURE:
      return {
        ...state,
        mensaje: action.payload,
      };

    default:
      return state;
  }
};
