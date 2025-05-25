import { localStorageProvider } from '@/utils/method.js';
import * as api from '../api/index.js';
import { CREATE_CONV, GET_CONVs, SET_SELECTED_CONV } from '../constants/actionTypes.js';

export const createConv = (formData,recipientName) => async (dispatch) => {
    try {
        await api.createConv(formData);
 
        dispatch({
            type: CREATE_CONV, payload: {
                "lastMessageTime": "",
                "lastMessage": "",
                "lastMessageBy": {
                    "id": "",
                    "username": ""
                },
                "chatWith": {
                    "id": formData.recipientId,
                    "username": recipientName
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};
export const setSelectedConversation = (conversationId) => ({
    type: SET_SELECTED_CONV,
    payload: conversationId
});

export const getConversations = (userId) => async (dispatch) => {
    try {
        const { data } = await api.getUserById(userId);
        console.log('Conversations:', data.conversations);

        const metaData = await getMetaData(data.conversations);
        console.log('Meta Data:', metaData);

        // dispatch({ type: GET_CONVs, payload: data.conversations });
        dispatch({ type: GET_CONVs, payload: metaData }); // Optional: if you want to store metaData in Redux
    } catch (error) {
        console.log(error);
    }
};

const getMetaData = async (conversations) => {
    let profile = localStorageProvider.getStorage('profile');
    if (!profile) return [];

    if (typeof profile === 'string') {
        try {
            profile = JSON.parse(profile);
        } catch (err) {
            console.error('Invalid JSON in localStorage:', err);
            return [];
        }
    }

    const senderId = profile?.result?._id;
    if (!senderId) return [];

    const metaDataPromises = conversations.map(async (item) => {
        try {
            const messageId = `${senderId}_SR_${item}`;
            const { data } = await api.getMetaData(messageId);
            return data?.data || null; 
        } catch (err) {
            console.error(`Failed to fetch metadata for ${item}:`, err);
            return null;
        }
    });

    const results = await Promise.all(metaDataPromises);
    return results.filter(Boolean); 
};
