import * as api from '../api/index.js';
import { GET_MESSAGES } from '../constants/actionTypes.js';

export const getMessagesByMessageId = (messageId) => async (dispatch) => {
  try {
    const { data } = await api.getMessagesByMessageId(messageId);
    console.log([messageId],data.data)
    dispatch({
      type: GET_MESSAGES,
      payload: data.data,
      meta: { messageId },
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
};