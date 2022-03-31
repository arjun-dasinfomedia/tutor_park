import {
  NOTEBOOK_DELETE,
  NOTEBOOK_LIST,
  NOTEBOOK_STORE,
  NOTEBOOK_UPDATE,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
  NotebookEditStatus: "",
  DeleteNoteBookStatus: "",
};

const notebookReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTEBOOK_STORE:
      return { ...state };
    case NOTEBOOK_LIST:
      return { ...state, data: action.data };
    case NOTEBOOK_UPDATE:
      return { ...state, NotebookEditStatus: action.NotebookEditStatus };
    case NOTEBOOK_DELETE:
      return { ...state, DeleteNoteBookStatus: action.DeleteNoteBookStatus};
    default:
      return { ...state };
  }
};
export default notebookReducer;
