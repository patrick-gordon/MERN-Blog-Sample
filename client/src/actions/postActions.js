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


export const deletePost = (id) => {
    return {
        type: DELETE_POST,
        payload: id
    };
};

export const addPost = post => {
    return {
        type: ADD_POST,
        payload: post
    };
};

export const setPostsLoading = () => {
    return {
       type: ITEMS_LOADING
    };
};