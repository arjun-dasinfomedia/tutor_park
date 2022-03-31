import {
  GET_ALL_ACCESSRIGHTS,
  GET_MODULE_LIST,
  ACCESSRIGHTS_UPDATE,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  accessrightData: [],
  moduleData: [],
  permissions: [],
};

const accessRights = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACCESSRIGHTS:
      return { ...state, accessrightData: action.accessrightData };
    case GET_MODULE_LIST:
      return { ...state, moduleData: action.moduleData };
    case ACCESSRIGHTS_UPDATE:
      return { ...state, permissions: action.permissions };
    default:
      return { ...state };
  }
};
export default accessRights;
