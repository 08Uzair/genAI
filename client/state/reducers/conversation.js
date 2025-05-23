import { CREATE_CONV, GET_CONVs, SET_SELECTED_CONV } from "../constants/actionTypes";

const initialState = {
    conversations: [],
    selectedConversationId: null
};

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONV:
            if (!state.conversations.includes(action.payload)) {
                return {
                    ...state,
                    conversations: [...state.conversations, action.payload]
                };
            }
            return state;

        case GET_CONVs:
            return {
                ...state,
                conversations: action.payload
            };

        case SET_SELECTED_CONV:
            return {
                ...state,
                selectedConversationId: action.payload
            };

        default:
            return state;
    }
};

export default conversationReducer;
