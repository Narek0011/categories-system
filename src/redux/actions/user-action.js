import axiosClient from "../../axios-client";
import axios from "axios";

export const SIGNIN_USER = 'SIGNIN_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const signIn = async (dispatch, data) => {
    await axiosClient.post('/register',data).then((res) => {
        localStorage.setItem('ACCESS_TOKEN', res.data.token);
        localStorage.setItem('user_id', res.data.user.id);
        dispatch({
            type: SIGNIN_USER,
            payload: res.data
        })
    })
}

export const login = async (dispatch, data) => {
    await axiosClient.post('/login', data)
        .then(res => {
            localStorage.setItem('ACCESS_TOKEN', res.data.token);
            localStorage.setItem('user_id', res.data.user.id);
            axios.defaults.headers.post['Authorization'] = `Bearer ${res.data.token}`;
            console.log('res.data.user', res.data)
            dispatch({
                type: LOGIN_USER,
                payload: res.data,
            })
        })
}

export async function logout(dispatch) {
    await axiosClient.post('/logout')
        .then(() => {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('user_id');
            dispatch({
                type: LOGOUT_USER
            })
        })
        .catch(err => {
            console.error(err.message)
        })
}