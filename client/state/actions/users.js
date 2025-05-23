import * as api from '../api/index.js';
import { GET_USERS_BY_ROLE } from '../constants/actionTypes.js';

export const getUsersByRole = (role) => async (dispatch) => {
  try {
    const { data } = await api.fetchUsersByRole(role);
    dispatch({ type: GET_USERS_BY_ROLE , payload:data });

  } catch (error) {
    console.log(error);
  }
};