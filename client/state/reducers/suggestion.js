import { GET_SUGGESTION, GENERATE_SUGGESTION } from "../constants/actionTypes";

const initialState = {
  suggestions: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUGGESTION:
      return {
        ...state,
        suggestion: action.payload,
      };

    case GENERATE_SUGGESTION:
      return {
        ...state,
        suggestion: [...state.suggestions, action.payload],
      };

    default:
      return state;
  }
};
