import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import post from './post';

export default combineReducers({
    posts: posts,
    auth: auth,
    post: post,
})
