import { GET_POSTS, ADD_POST, UPDATE_POST, DELETE_POST, LIKE_POST, SORT_POST } from './types';
import * as api from '../api';

export const getPosts = (page, limit, setTotalCount, setLoading, setTags) => async (dispatch) => {
    try{
        setLoading(true);
        const { data } = await api.fetchPosts(page, limit);
        setTotalCount(data.totalCount);
        setTags(data.tags);
        dispatch({
            type: GET_POSTS,
            payload: data.postMessages,
        });
        setLoading(false);
    } catch(err) {
        console.log(err.message);
        setLoading(true);
    }
}

export const getSortedPosts = (page, limit, tags, setTotalCount, setLoading, sortBy) => async (dispatch) => {
    try{
        setLoading(true);
        const { data } = await api.fetchSortedPosts(page, limit, tags, sortBy);
        setTotalCount(data.totalCount);
        dispatch({
            type: SORT_POST,
            payload: data.postMessages,
        });
        setLoading(false);
    } catch(err) {
        console.log(err.message);
        setLoading(true);
    }
}

export const createPost = (newPost) => async (dispatch) => {
    try{
        const { data } = await api.createPost(newPost);
        dispatch({
            type: ADD_POST,
            payload: data
        })
    } catch(err) {
        console.log(err);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: UPDATE_POST, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id);
        dispatch({
            type: DELETE_POST,
            payload: data
        })
    } catch(err){
        console.log(err);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);
        dispatch({
            type: LIKE_POST,
            payload: data
        })
    } catch(err) {
        console.log(err);
    }
}
