import {
  DELETE_TEXTBOOKS,
  EDIT_TEXTBOOKS,
  GET_ALL_SUBJECT_LIST,
  GET_ALL_TEXTBOOKS,
  GET_FILTERED_TEXTBOOKS,
  TEXTBOOK_SHOW,
  TEXTBOOK_STORE,
  UPDATE_TEXTBOOK,
  VIEW_TEXTBOOKS,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
  headers: {},
  selectedTextbook: [],
  selectedEditbook: "",
  TextbookEditStatus: "",
  subjectList: [],
};

const textBooks = (state = initialState, action) => {
  switch (action.type) {

    // Get All Text Books
    case GET_ALL_TEXTBOOKS:
      return { ...state, data: action.data };

    // get Filter TextBook
    case GET_FILTERED_TEXTBOOKS:
      return { ...state, data: action.data };

    // View TextBook
    case VIEW_TEXTBOOKS:
      return { ...state, selectedTextbook: action.selectedTextbook };

    // Edit TextBook
    case EDIT_TEXTBOOKS:
      return { ...state, selectedEditbook: action.selectedEditbook };

    // Get All Subject List
    case GET_ALL_SUBJECT_LIST:
      return { ...state, subjectList: action.subjectList };

    // textbook store
    case TEXTBOOK_STORE:
      return { ...state };

    // update TextBook
    case UPDATE_TEXTBOOK:
      return { ...state, TextbookEditStatus: action.TextbookEditStatus };

    // delete TextBook
    case DELETE_TEXTBOOKS:
      return { ...state };

    // default
    default:
      return { ...state };
  }
};
export default textBooks;
