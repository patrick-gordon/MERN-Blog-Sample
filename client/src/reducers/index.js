import { combineReducers} from 'redux';
import postReducer from './postReducer';
// import errorReducer from './errReducer';
import authReducer from './authReducer';

export default combineReducers({
    post: postReducer,
    auth: authReducer,
    // error: errorReducer
})