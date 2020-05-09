import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  VERIFICACIOM_ENVIADA,
  VERIFICACIOM_ERROR,
  CERRAR_SESION,
  PASSWORD_RESET_EXITOSA,
  PASSWORD_RESET_ERROR,
  PASSWORD_CAMBIO_EXITO,
  PASSWORD_CAMBIO_ERROR,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PASSWORD_RESET_EXITOSA:
    case VERIFICACIOM_ENVIADA:
    case REGISTRO_EXITOSO:
    case PASSWORD_CAMBIO_EXITO:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        autenticado: true,
        mensaje: { msg: action.payload.message, categoria: "success" },
        cargando: false,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        autenticado: true,
        usuario: action.payload.user,
        mensaje: { msg: action.payload.message, categoria: "success" },
        cargando: false,
      };
      case ADD_POST_SUCCESS:
        return {
          ...state,
          mensaje:null
        };
      case ADD_POST_FAILURE:
        return {
          ...state,
          mensaje: action.payload,
        };

    case VERIFICACIOM_ERROR:
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
    case PASSWORD_RESET_ERROR:
    case PASSWORD_CAMBIO_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
        cargando: false,
      };

    default:
      return state;
  }
};
