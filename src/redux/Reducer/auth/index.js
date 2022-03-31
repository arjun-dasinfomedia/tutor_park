import {
  EMAIL_VERIFICATION,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD,
  FORGET_PASSWORD,
} from "../../actions/types";

// **  Initial State
const initialState = {
  userData: {},
  logoutStatus: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.data,
      };
    case EMAIL_VERIFICATION:
      return {
        ...state,
      };

    case FORGET_PASSWORD:
      return {
        ...state,
      };
    case RESET_PASSWORD:
      return { ...state };

    case LOGOUT:
      return { ...state, userData: {}, logoutStatus: action.logoutStatus };
    case REGISTER:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};

export default authReducer;
