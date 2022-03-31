import {
  POST_SEARCH_JOB_LIST,
  POST_SEARCH_JOB_STORE,
  DIRECT_MESSAGE,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
};

const postSearchJob = (state = initialState, action) => {
  switch (action.type) {
    // Post and Job Add
    case POST_SEARCH_JOB_STORE:
      return { ...state };

    // Post And Job Search List
    case POST_SEARCH_JOB_LIST:
      return { ...state, data: action.data };

    // Direct Message
    case DIRECT_MESSAGE:
      return { ...state };

      // default 
    default:
      return { ...state };
  }
};
export default postSearchJob;
