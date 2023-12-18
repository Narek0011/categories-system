import {combineReducers} from 'redux';
import userReducer from "./reducers/user-reducer";
import categoriesReducer from "./reducers/category-reducer";
import brandReducer from "./reducers/brand-reducer";
import carsReducer from "./reducers/car-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  brands: brandReducer,
  cars: carsReducer,
});

export default rootReducer;