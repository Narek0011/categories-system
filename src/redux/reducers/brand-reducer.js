import {
  ADD_BRAND,
  DELETE_BRAND,
  EDIT_BRAND,
  GET_BRANDS, GET_BRANDS_BY_CATEGORY
} from "../actions/brand-actions";

const initialState = {
  brands : [],
  allBrands : [],
  pagination : {},
  error: false,
  isLoading: false,
};

function brandReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_BRAND:
      const brandData = state.brands.map(type => {
        if(type.id === action.payload.id){
          return action.payload
        }
        return type
      });
      return {
        ...state,
        brands:brandData
      };
    case GET_BRANDS:
      const newDate = action.payload.data;
      return {
        ...state,
        brands: newDate,
        pagination:action.payload.pagination,
        isLoading: true,
      };
    case GET_BRANDS_BY_CATEGORY:
      return {
        ...state,
        allBrands: action.payload.data,
      };
    case DELETE_BRAND:
      const data = state.brands.filter(item => item.id !== action.payload);
      return {
        ...state,
        brands: data
      };
    default:
      return state
  }
}

export default brandReducer