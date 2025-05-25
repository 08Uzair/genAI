import * as api from "../api";
import {
  GET_SUMMARY,
  GENERTAE_SUMMARY,
} from "../constants/actionTypes";

export const fetchSummary = (id) => async (dispatch) => {
    console.log("Fetching summary for ID:", id);
  try {
    const { data } = await api.getSummary(id);
    dispatch({ type: GET_SUMMARY, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const createSummary = (summaryData) => async (dispatch) => {
  try {
    const { data } = await api.generateSummary(summaryData);
    dispatch({ type: GENERTAE_SUMMARY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

