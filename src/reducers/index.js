import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import fetchUser from './fetchUser';


export default combineReducers({
    posts: postsReducer,
    users: fetchUser
});