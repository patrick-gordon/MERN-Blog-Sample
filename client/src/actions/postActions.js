import { GET_POSTS, ADD_POST, DELETE_POST, ITEMS_LOADING } from './types';
import axios from 'axios';


export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(res =>
         dispatch({
        type: GET_POSTS,
        payload: res.data
        }) 
    )
};


export const deletePost = (id) => dispatch => {
   axios
   .delete(`/api/posts/${id}`)
   .then( res => 
    dispatch({
        type: DELETE_POST,
        payload: id
    })
    )
    .catch(err => console.log(err))
};

export const addPost = post  => dispatch => {
   axios
    .post('/api/posts', post)
    .then(res => 
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    )
    .catch(err => console.log(err))
};

export const setPostsLoading = () => {
    return {
       type: ITEMS_LOADING
    };
};