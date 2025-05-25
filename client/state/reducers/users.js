import { GET_USERS_BY_ROLE, GET_USERS_BY_ID } from "../constants/actionTypes";

const initialState = {
  users: [],
  selectedUserDetails: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_BY_ROLE:
      return {
        ...state,
        users: action.payload, 
      };

    case GET_USERS_BY_ID:
      return {
        ...state,
        selectedUserDetails: action.payload, 
      };

    default:
      return state;
  }
};