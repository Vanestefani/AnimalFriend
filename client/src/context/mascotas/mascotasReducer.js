import {
  ADD_MASCOTAS_SUCCESS,
  ADD_MASCOTAS_FAILURE,
  MASCOTAS_DELETE_SUCCESS,
  EDIT_MASCOTAS_FAILURE,
  EDIT_MASCOTAS_SUCCESS,
  GET_MASCOTAS_FAILURE,
  GET_MASCOTAS_SUCCESS,
  GET_MASCOTA_FAILURE,
  GET_MASCOTA_SUCCESS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MASCOTA_SUCCESS:
      return {
        ...state,
        mascota: action.payload,
      };
    case GET_MASCOTAS_SUCCESS:
      return {
        ...state,
        loading: false,
        mascotas: action.payload,
      };
    case ADD_MASCOTAS_SUCCESS:
    case EDIT_MASCOTAS_SUCCESS:
    case MASCOTAS_DELETE_SUCCESS:
      return {
        ...state,
        mensaje: null,
      };
    case ADD_MASCOTAS_FAILURE:
    case GET_MASCOTA_FAILURE:
    case EDIT_MASCOTAS_FAILURE:
    case GET_MASCOTAS_FAILURE:
      return {
        ...state,
        mensaje: action.payload,
      };

    default:
      return state;
  }
};
