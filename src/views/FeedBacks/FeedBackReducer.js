import { FEEDBACK_LIST } from "../../redux/actions/types";

// ** Initial State
const initialState = {
  List: [],
};

const feedBack = (state = initialState, action) => {
  switch (action.type) {

    // Feddback list
    case FEEDBACK_LIST:
      return { ...state, List: action.List };

      // default page
    default:
      return { ...state };
  }
};
export default feedBack;
