import { GET_USERS_BY_ROLE } from "../constants/actionTypes";

export default (users = [], action) => {
  switch (action.type) {
    case GET_USERS_BY_ROLE:
      return action.payload;
      break;
    default:
      return users;
  }
};
