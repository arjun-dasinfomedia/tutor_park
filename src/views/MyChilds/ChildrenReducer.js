import {
  CHILD_LIST,
  IMPERSONATE,
  IMPERSONATE_SCHOOL,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  ChildrenList: [],
};

const TimeLine = (state = initialState, action) => {
  switch (action.type) {
    // List Childrens
    case CHILD_LIST:
      return { ...state, ChildrenList: action.ChildrenList };

      // Imporsonate User
    case IMPERSONATE:
      return { ...state };

      // Imporsonate School
    case IMPERSONATE_SCHOOL:
      return { ...state };

      // Deafult page
    default:
      return { ...state };
  }
};
export default TimeLine;
