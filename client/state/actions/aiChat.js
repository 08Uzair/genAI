import * as api from "../api";
import { GET_AI_CHAT, GENERATE_AI_CHAT } from "../constants/actionTypes";

export const fetchAIchat = () => async (dispatch) => {
  try {
    const { data } = await api.getAIChat();
    dispatch({ type: GET_AI_CHAT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAIChat = () => async (dispatch) => {
  try {
    const { data } = await api.getAIChat();
    console.log(data, "data of AI chat from action");
    dispatch({ type: GENERATE_AI_CHAT, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getUserAIchat = (id) => async (dispatch) => {

  try {
    const { data } = await api.getAIChat();
console.log(data, "data of AI chat from action");
    const filteredData = data || [] .filter((item) => item.memberId == id);
    console.log(filteredData, "filtered data of AI chat from action");
    return filteredData; // Return the filtered data
  } catch (error) {
    console.log(error);
  }
};

export const createAIchat = (AIchatData) => async (dispatch) => {
  try {
    const { data } = await api.generateAIChat(AIchatData);
    dispatch({ type: GENERATE_AI_CHAT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
