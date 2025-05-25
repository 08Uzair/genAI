import {
  GET_AI_CHAT,
  GENERATE_AI_CHAT,
} from "../constants/actionTypes";

const initialState = {
  aiChats: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_AI_CHAT:
      return {
        ...state,
        aiChat: action.payload,
      };

    case GENERATE_AI_CHAT:
      return {
        ...state,
        aiChat: [...state.aiChats, action.payload],
      };


    default:
      return state;
  }
};
