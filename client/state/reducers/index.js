import { combineReducers } from 'redux'
import authReducer from './auth';
import users from './users';
import conversation from './conversation';
import message from './message';
import aiChatReducer from './aiChat';
import summaryReducer from './summary';
import suggestion from './suggestion';
const rootReducer = combineReducers({
    auth: authReducer,
    users,
    conversation,
    message,
    aiChatReducer,
    summaryReducer,
    suggestion
    

});

export default rootReducer;
