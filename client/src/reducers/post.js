import { GET_POST } from '../actions/types';

const initialState = {
    tags: [],
    likes: [],
    likeCount: 0,
    createdAt: '',
    title: '',
    message: '',
    selectedFile: '',
    name: '',
    creator: '',
    _id: '',
    nickName: '',
}

const postReducer = (posts = initialState, action) => {
    switch(action.type){
        case GET_POST:
            return action.payload
        default:
            return posts;
    }
};

export default postReducer;
