import uuid from 'uuid';
import { GET_POSTS, ADD_POST, DELETE_POST, ITEMS_LOADING } from '../actions/types';

const initialState = {
    posts: [],
    isOpen: false,
    modal: false,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return{
                ...state,
                posts: action.payload,
                loading: false  
            };
        case DELETE_POST:
             return{
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload)
             };
        case ADD_POST:
            return{
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case ITEMS_LOADING:
            return{
                ...state,
                loading: true
            }
            default: 
                return state;
    }
}