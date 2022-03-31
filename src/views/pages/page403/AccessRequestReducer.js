import { REQUEST_ACCESSRIGHT } from "src/redux/actions/types";

// ** Initial State
const initialState = {};

const AccessRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ACCESSRIGHT:
      return { ...state };
    default:
      return { ...state };
  }
};
export default AccessRequestReducer;
