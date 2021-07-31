import axios from 'axios';

// https://unspeakables.herokuapp.com/

const API = axios.create({ baseURL: 'http://localhost:5000/' })

API.interceptors.request.use((req) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    if(profile){
        req.headers.Authorization = `Bearer ${profile.token}`;
    }

    return req;
});

// post api

export const fetchPosts = (page, limit) => API.get('/posts', {
    params: {
        page,
        limit,
    }
});

export const fetchSortedPosts = (page, limit, tags, sortBy) => API.get('/posts/searchPosts', {
    params: {
        page,
        limit,
        tags,
        sortBy,
    }
});

export const fetchPostDetail = (post_id) => API.get('/posts/getDetail', {
    params: {
        post_id,
    }
})

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, newPost) => API.patch(`/posts/${id}`, newPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


// auth api

export const signIn = (user) => API.post('/auth/signIn', user);

export const signUp = (user) => API.post('/auth/signUp', user);