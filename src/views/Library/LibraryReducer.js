import {
  DELETE_MY_LIBRARY,
  FILTER_MY_LIBRARY,
  GET_ALL_LIBRARY,
  STORE_MY_LIBRARY,
  UPDATE_MY_LIBRARY,
  COMMENT_LIBRARY,
  LIBRARY_POST_ON_TIMELINE,
  SHARED_ME_LIBRARY,
  CHAT_STUDENT_LIST,
  SHARED_LIBRARY,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  allLibraryList: [],
  libraryEditStatus: "",
  shareLibraryList: [],
  sharedWithFriend: [],
};

const LibraryReducer = (state = initialState, action) => {
  switch (action.type) {

    // Get All Library List
    case GET_ALL_LIBRARY:
      return { ...state, allLibraryList: action.allLibraryList };

    // Share With Me library List
    case SHARED_ME_LIBRARY:
      return { ...state, shareLibraryList: action.shareLibraryList };

    // Filter Library List
    case FILTER_MY_LIBRARY:
      return { ...state, allLibraryList: action.allLibraryList };

    // Add New Library
    case STORE_MY_LIBRARY:
      return { ...state };

    // Library Comment
    case COMMENT_LIBRARY:
      return { ...state };

    // Delete Library
    case DELETE_MY_LIBRARY:
      return { ...state };

    // Update Library
    case UPDATE_MY_LIBRARY:
      return { ...state, libraryEditStatus: action.libraryEditStatus };

    // Student List
    case CHAT_STUDENT_LIST:
      return { ...state, sharedWithFriend: action.sharedWithFriend };

    // Post In Timeline
    case LIBRARY_POST_ON_TIMELINE:
      return { ...state };

    // SHare Library
    case SHARED_LIBRARY:
      return { ...state };

    // Default Page
    default:
      return { ...state };
  }
};
export default LibraryReducer;
