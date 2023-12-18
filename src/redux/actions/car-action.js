import axiosClient from "../../axios-client";

export const GET_CARS = 'GET_CARS';
export const DELETE_CAR = 'DELETE_CAR';
export const ADD_CAR = 'ADD_CAR';
export const EDIT_CAR = 'EDIT_CAR';


export const getCars = async (dispatch, params) => {
    axiosClient.get(`/cars`, {
        params: params
    }).then(res => {
            dispatch({
                type: GET_CARS,
                payload: {
                    data: res.data.data,
                    pagination: res.data.pagination,
                }
            });
        })
        .catch((e) => {
            let error = '';
            if (e.response.data.message) {
                error = e.response.data.message
            } else {
                error = 'Server Error!'
            }
            console.error(error.message)
        });
};

export const deleteCar = async (dispatch, id) => {
    axiosClient.delete(`cars/${id}`)
        .then(() => {
            dispatch({
                type: DELETE_CAR,
                payload: id
            })
        })
        .catch((e) => {
            let error = '';
            if (e.response.data.message) {
                error = e.response.data.message
            } else {
                error = 'Server Error!'
            }
            console.error(error.message)
        });
};

export const addCar = async (dispatch, data) => {
    axiosClient.post('/cars', data)
        .then((res) => {
            dispatch({
                type: ADD_CAR,
                payload: res.data
            });
        })
        .catch((e) => {
            let error = '';
            if (e.response.data.message) {
                error = e.response.data.message
            } else {
                error = 'Server Error!'
            }
            console.error(error.message)
        })
};