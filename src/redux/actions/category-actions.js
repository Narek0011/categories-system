import axiosClient from "../../axios-client";

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const GET_All_CATEGORIES = 'GET_All_CATEGORIES';

export const addCategory = async (dispatch, name) => {
  axiosClient.post('/category', {name: name})
    .then((res) => {
      dispatch({
        type: ADD_CATEGORY,
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

export const getCategories = (dispatch, params) => {
  return axiosClient.get(`/category`, {
    params: params
  })
    .then(({data}) => {
      return dispatch({
        type: GET_CATEGORIES,
        payload: {
          data: data.data,
          pagination: data.pagination,
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

export const allCategories = (dispatch) => {
  axiosClient.get(`/getAllCategories`)
    .then(({data}) => {
      let newData = data.data;
      dispatch({
        type: GET_All_CATEGORIES,
        payload: {
          data: newData,
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


export const deleteCategory = async (dispatch, id) => {
  if (!window.confirm("If you sure delete this car")) {
    return
  }
  axiosClient.delete(`/category/` + id)
    .then(() => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
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
    });
};

export const updateCategory = async (dispatch, type) => {
  axiosClient.put('/category/' + type.id, {name: type.name})
    .then((res) => {
      dispatch({
        type: EDIT_CATEGORY,
        payload: res.data.data
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

