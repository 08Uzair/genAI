import { GENERTAE_SUMMARY, GET_SUMMARY  } from "../constants/actionTypes";

const initialState = {
    summary: [],
    // selectedConversationId: null
};

const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERTAE_SUMMARY:
            if (!state.summary.includes(action.payload)) {
                return {
                    ...state,
                    summary: [...state.summary, action.payload]
                };
            }
            return state;

        case GET_SUMMARY :
            return {
                ...state,
                summary: action.payload
            };

    

        default:
            return state;
    }
};

export default summaryReducer;
