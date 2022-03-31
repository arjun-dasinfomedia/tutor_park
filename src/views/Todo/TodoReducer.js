import {
  ADD_TODO,
  MARK_AS_COMPLETE,
  MARK_AS_INCOMPLETE,
  TODO_DELETE,
  TODO_LIST,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
};

const todo = (state = initialState, action) => {
  switch (action.type) {

    // List Todo
    case TODO_LIST:
      return { ...state, data: action.data };

    // Add Todo
    case ADD_TODO:
      return { ...state };

    // Todo Delete
    case TODO_DELETE:
      return { ...state };

    // Complete Todo
    case MARK_AS_COMPLETE:
      return { ...state };

    // Incomplete Todo
    case MARK_AS_INCOMPLETE:
      return { ...state };

    // Default
    default:
      return { ...state };
  }
};
export default todo;
