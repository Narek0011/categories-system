import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_All_CATEGORIES,
} from "../actions/category-actions";

const initialState = {
  categories : [],
  allCategories : [],
  pagination : {},
  error: false,
  isLoading: false,
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_CATEGORY:
      const categoryData = state.categories.map(type => {
        if(type.id === action.payload.id){
          return action.payload
        }
        return type
      });
      return {
        ...state,
        categories:categoryData
      };
    case GET_CATEGORIES:
      const data = action.payload.data;
      return {
        ...state,
        categories: data,
        pagination:action.payload.pagination,
        isLoading: true,
      };
    case ADD_CATEGORY:
      return {
        ...state,
      };
    case DELETE_CATEGORY:
      const newData = state.categories.filter(item => item.id !== action.payload);
      return {
        ...state,
        categories: newData
      };
    case GET_All_CATEGORIES:
      const allCategories = action.payload.data;
      return {
        ...state,
        allCategories: allCategories
      };
    default:
      return state
  }
}

export default categoriesReducer