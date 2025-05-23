import { combineReducers } from 'redux'
import authReducer from './auth';
import users from './users';
import conversation from './conversation';
import message from './message';
const rootReducer = combineReducers({
    auth: authReducer,
    users,
    conversation,
    message
});

export default rootReducer;
