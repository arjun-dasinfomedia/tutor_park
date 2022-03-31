import {
  CHAT_ADD_MEMBER,
  CHAT_STUDENT_LIST,
  CHAT_CLEAR_MESSAGE,
  CHAT_CREATE_GROUP,
  CHAT_DELETE_GROUP,
  CHAT_EDIT_GROUP,
  CHAT_HISTORY_LIST,
  CHAT_LEAVE_GROUP,
  CHAT_MESSAGE_LIST,
  CHAT_MESSAGE_READ,
  CHAT_MESSAGE_SEND,
  CHAT_REMOVE_MEMBERS,
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

const chat = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_LIST:
      return {
        ...state,
        groupMessageListData: action.groupMessageListData,
        personalMessageListData: action.personalMessageListData,
      };
    case CHAT_HISTORY_LIST:
      return { ...state, histroyListData: action.histroyListData };
    case CHAT_MESSAGE_SEND:
      return { ...state };
    case CHAT_CLEAR_MESSAGE:
      return { ...state };
    case CHAT_LEAVE_GROUP:
      return { ...state };
    case CHAT_DELETE_GROUP:
      return { ...state };
    case CHAT_EDIT_GROUP:
      return { ...state, editGroupStatus: action.editGroupStatus };
    case CHAT_REMOVE_MEMBERS:
      return { ...state };
    case CHAT_CREATE_GROUP:
      return { ...state };
    case CHAT_ADD_MEMBER:
      return { ...state, addMemberStatus: action.addMemberStatus };
    case CHAT_MESSAGE_READ:
      return { ...state };
    case CHAT_STUDENT_LIST:
      return {
        ...state,
        directchatfriendData: action.directchatfriendData,
        groupchatfriendData: action.groupchatfriendData,
        addgroupmemberData: action.addgroupmemberData,
      };
    default:
      return { ...state };
  }
};
export default chat;
