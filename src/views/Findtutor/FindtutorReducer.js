import {
  FIND_TUTOR_LIST_USING_FILTER,
  GET_ALL_FINDTUTOR,
  VIEW_USER_DETAILS,
  DIRECT_MESSAGE,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
  viewTutorData: [],
};

const findTutor = (state = initialState, action) => {
  switch (action.type) {

    // All Tutor List
    case GET_ALL_FINDTUTOR:
      return { ...state, data: action.data };

    // All Tutor List using Filter
    case FIND_TUTOR_LIST_USING_FILTER:
      return { ...state, data: action.data };

    // Vew User Details
    case VIEW_USER_DETAILS:
      return { ...state, viewTutorData: action.viewTutorData };

    // Direct Message To Tutor
    case DIRECT_MESSAGE:
      return { ...state };

    // Default Page
    default:
      return { ...state };
  }
};
export default findTutor;
