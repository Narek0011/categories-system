import axiosClient from "../../axios-client";

export const GET_BRANDS = 'GET_BRANDS';
export const ADD_BRAND = 'ADD_BRAND';
export const DELETE_BRAND = 'DELETE_BRAND';
export const EDIT_BRAND = 'EDIT_BRAND';
export const GET_BRANDS_BY_CATEGORY = 'GET_BRANDS_BY_CATEGORY';

export const addBrand = async (dispatch, data) => {
  axiosClient.post(`/brands`, data)
    .then(res => {
      dispatch({
        type: ADD_BRAND,
        payload: res.data
      })
    })
    .catch(e => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error)
    });
};

export const deleteBrand = async (dispatch, id) => {
  axiosClient.delete(`brands/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_BRAND,
        payload: id
      });
    })
    .catch(e => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error)
    })
};

export const editBrand = async (dispatch, data) => {
  axiosClient.put(`brands/${data.id}`, {name: data.name})
    .then(() => {
      dispatch({
        type: EDIT_BRAND,
        payload: data,
      });
    })
    .catch((e) => {
      let error = '';
      if (e.response.data.message) {
        error = e.response.data.message
      } else {
        error = 'Server Error!'
      }
      console.error(error)
    })
};

export const getBrands = async (dispatch, page) => {
  axiosClient.get(`/brands`,{params:page})
    .then(res => {
      dispatch({
        type: GET_BRANDS,
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
      console.error(error)
    })
};

export const getBrandsByCategory = async (dispatch, id) => {
  axiosClient.get(`/get-brands-by-category/${id}`)
    .then(res => {
      dispatch({
        type: GET_BRANDS_BY_CATEGORY,
        payload: {
          data: res.data.data,
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
      console.error(error)
    })
};
