import {GET_CARS, ADD_CAR, DELETE_CAR, EDIT_CAR} from "../actions/car-action";

const initialState = {
    cars: [],
    pagination: {},
    isLoading: true
};

function carsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARS:
            return {
                ...state,
                cars: action.payload.data,
                pagination: action.payload.pagination,
                isLoading: false
            };
        case DELETE_CAR:
            const newCarsList = state.cars.filter(item => item.id !== action.payload);
            return {
                ...state,
                cars: newCarsList
            };
        default:
            return state
    }
}
export default carsReducer