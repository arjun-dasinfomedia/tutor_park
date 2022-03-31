import {
  FRIEND_LIST,
  REQUEST_LIST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  BLOCK_REQUEST,
  SPAM_REQUEST,
  VIEW_USER_DETAILS,
  USER_INVITE,
  STUDENT_LIST,
  REQUEST_SEND,
  MY_STUDENT_LIST,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  friendListData: [],
  myStudent: [],
  friendData: [],
  requestListData: [],
  viewUserData: [],
  sentlength: "",
};

const network = (state = initialState, action) => {
  switch (action.type) {

    // Frien List
    case FRIEND_LIST:
      return { ...state, friendListData: action.friendListData };

    // My Student List
    case MY_STUDENT_LIST:
      return { ...state, myStudent: action.myStudent };

    // Request List
    case REQUEST_LIST:
      return { ...state, requestListData: action.requestListData };

    // View User Details
    case VIEW_USER_DETAILS:
      return { ...state, viewUserData: action.viewUserData };

    // Accept Request
    case ACCEPT_REQUEST:
      return { ...state };

    // Reject Request
    case REJECT_REQUEST:
      return { ...state };

    // Block Request
    case BLOCK_REQUEST:
      return { ...state };

    // Spam Request
    case SPAM_REQUEST:
      return { ...state };

    // User Invite
    case USER_INVITE:
      return { ...state };

    // Request Send
    case REQUEST_SEND:
      return { ...state };

    // Student List
    case STUDENT_LIST:
      return { ...state, friendData: action.friendData };

    // Default 
    default:
      return { ...state };
  }
};
export default network;
