import {
  BUSCAR_USUARIO,
  BUSCAR_USUARIO_ERROR,
  GETUSER_REQUEST,
  GETUSER_SUCCESS,
  GETUSER_FAILURE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GETUSER_SUCCESS:
    case BUSCAR_USUARIO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        usuarioactual: action.payload,
        mensaje: { msg: action.payload.message, categoria: "success" },
      };
    case BUSCAR_USUARIO_ERROR:
    case GETUSER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,

        usuarioactual: null,
        mensaje: action.payload,
        cargando: false,
      };
    default:
      return state;
  }
};
