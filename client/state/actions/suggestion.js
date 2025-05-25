import * as api from "../api";
import { GET_SUGGESTION, GENERATE_SUGGESTION } from "../constants/actionTypes";

export const fetchSuggestion = (id) => async (dispatch) => {
  console.log(id, "This is Single Suggestion ID");
  try {
    const { data } = await api.getSuggestion(id);
    console.log(data, "This is Single Suggestion Data");
    dispatch({ type: GET_SUGGESTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createSuggestion = (suggestionData) => async (dispatch) => {
  try {
    const { data } = await api.generateSuggestion(suggestionData);
    dispatch({ type: GENERATE_SUGGESTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};
