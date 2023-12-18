import {LOGIN_USER, SIGNIN_USER, LOGOUT_USER} from "../actions/user-action";

const initialState = {
  token: '',
  user: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT_USER:
      return {
        token: '',
        user: {},
      };
    default:
      return state
  }
}

export default userReducer