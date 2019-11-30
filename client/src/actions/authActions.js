import axios from 'axios';
import { returnErrors } from './errorActions'

import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

//check token and load user

export const loadUser = () => (dispatch, getState) => {
    //user Loading
    dispatch({ type: USER_LOADING});

    axios
        .get('/api/auth', tokenConfig(getState))
        .then( res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

//register User
export const register = ({ username, password, email }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application.json'
        }
    }

    //request body
    const body = JSON.stringify({ username, email, password });
    axios
    .post('/api/users', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch({
            type: REGISTER_FAIL
        });
    });
}

// set up config/headers and token

export const tokenConfig = getState => {

    //GET Token from loacalstoreage
    const token = getState().auth.token

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if Token then add to headers
    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config;
}