import {
  ADD_MEMBER,
  MESSAGE_STUDENT_LIST,
  CLEAR_MESSAGE,
  CREATE_GROUP,
  DELETE_GROUP,
  EDIT_GROUP,
  HISTORY_LIST,
  LEAVE_GROUP,
  MESSAGE_LIST,
  MESSAGE_READ,
  MESSAGE_SEND,
  REMOVE_MEMBERS,
  DELETE_CONVERSATION,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  personalMessageListData: [],
  groupMessageListData: [],
  histroyListData: [],
  directchatfriendData: [],
  groupchatfriendData: [],
  addgroupmemberData: [],
  addMemberStatus: "",
  editGroupStatus: "",
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LIST:
      return {
        ...state,
        groupMessageListData: action.groupMessageListData,
        personalMessageListData: action.personalMessageListData,
      };
    case HISTORY_LIST:
      return { ...state, histroyListData: action.histroyListData };
    case MESSAGE_SEND:
      return { ...state };
    case CLEAR_MESSAGE:
      return { ...state };
    case DELETE_CONVERSATION:
      return { ...state };
    case LEAVE_GROUP:
      return { ...state };
    case DELETE_GROUP:
      return { ...state };
    case EDIT_GROUP:
      return { ...state, editGroupStatus: action.editGroupStatus };
    case REMOVE_MEMBERS:
      return { ...state };
    case CREATE_GROUP:
      return { ...state };
    case ADD_MEMBER:
      return { ...state, addMemberStatus: action.addMemberStatus };
    case MESSAGE_READ:
      return { ...state };
    case MESSAGE_STUDENT_LIST:
      return {
        ...state,
        directmessagefriendData: action.directmessagefriendData,
        groupmessagefriendData: action.groupmessagefriendData,
        addmessagegroupmemberData: action.addmessagegroupmemberData,
      };
    default:
      return { ...state };
  }
};
export default message;
