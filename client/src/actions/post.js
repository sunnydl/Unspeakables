import { GET_POST } from './types'
import { fetchPostDetail } from '../api'

export const getPostDetail = (post_id, setPostData) => async (dispatch) => {
    try{
        const { data } = await fetchPostDetail(post_id);
        dispatch({
            type: GET_POST,
            payload: data
        })
        setPostData(data);
    } catch(err) {
        console.log(err);
    }
}
