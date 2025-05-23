import { GET_MESSAGES } from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        [action.meta.messageId]: action.payload,
      };
    default:
      return state;
  }
};
