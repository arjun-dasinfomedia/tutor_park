import {
  ADD_ANSWER,
  ADD_FEEDBACK,
  ADD_QUESTION,
  BEST_ANSWER,
  DELETE_QUESTION,
  GET_ALL_QA,
  GET_FILTERED_QUESTIONS,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  List: [],
};

const questionAnswer = (state = initialState, action) => {
  switch (action.type) {

    // Question List
    case GET_ALL_QA:
      return { ...state, List: action.List };

    // Get Filtered Questions
    case GET_FILTERED_QUESTIONS:
      return { ...state, List: action.List };

    // Ad Answers
    case ADD_ANSWER:
      return { ...state };

    // Add Question
    case ADD_QUESTION:
      return { ...state };

    // Set As Best Answer
    case BEST_ANSWER:
      return { ...state };

    // Add Feedback
    case ADD_FEEDBACK:
      return { ...state };

    // Delete Question
    case DELETE_QUESTION:
      return { ...state };

    // Default
    default:
      return { ...state };
  }
};
export default questionAnswer;
