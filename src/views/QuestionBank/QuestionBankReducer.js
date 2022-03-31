import { QUESTION_ADD, QUESTION_LIST } from "../../redux/actions/types";

// ** Initial State
const initialState = {
  questionData: [],
};

const questionBank = (state = initialState, action) => {
  switch (action.type) {

    // Question List
    case QUESTION_LIST:
      return { ...state, questionData: action.questionData };

      // Question Add
    case QUESTION_ADD:
      return { ...state };

      // Default
    default:
      return { ...state };
  }
};
export default questionBank;
