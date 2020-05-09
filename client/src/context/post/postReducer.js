import { ADD_POST_SUCCESS, ADD_POST_FAILURE } from "../../types";

export default (state, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};
