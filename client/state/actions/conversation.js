import * as api from '../api/index.js';
import { CREATE_CONV, GET_CONVs, SET_SELECTED_CONV } from '../constants/actionTypes.js';

export const createConv = (formData) => async (dispatch) => {
    try {
        await api.createConv(formData);
        dispatch({ type: CREATE_CONV, payload: formData.senderId });
    } catch (error) {
        console.log(error);
    }
};

export const getConversations = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getUserById(userId);
        console.log(data);
        dispatch({ type: GET_CONVs, payload: data.conversations })
    } catch (error) {
        console.log(error);
    }
}

export const setSelectedConversation = (conversationId) => ({
    type: SET_SELECTED_CONV,
    payload: conversationId
});