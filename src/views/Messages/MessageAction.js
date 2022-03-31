import {
  CREATE_GROUP,
  HISTORY_LIST,
  MESSAGE_LIST,
  MESSAGE_READ,
  MESSAGE_SEND,
  MESSAGE_STUDENT_LIST,
  CLEAR_MESSAGE,
  LEAVE_GROUP,
  EDIT_GROUP,
  DELETE_GROUP,
  ADD_MEMBER,
  REMOVE_MEMBERS,
  DELETE_CONVERSATION,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

export const messageList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MESSAGE_LIST,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: MESSAGE_LIST,
          personalMessageListData: responseJson.data.data.personal_Lists,
          groupMessageListData: responseJson.data.data.group_list,
        });
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const messageHistroyList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(HISTORY_LIST, data);
    if (response.data.error === false) {
      dispatch({
        type: HISTORY_LIST,
        histroyListData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(MESSAGE_SEND, data);
    if (response.data.error === false) {
      dispatch({
        type: MESSAGE_SEND,
      });
      dispatch(messageList({ module: "message" }));
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const messageRead = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(MESSAGE_READ, data);
    if (response.data.error === false) {
      dispatch({
        type: MESSAGE_READ,
      });
      dispatch(messageList({ module: "message" }));
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const messagefriendData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(MESSAGE_STUDENT_LIST);
    if (response.data.error === false) {
      dispatch({
        type: MESSAGE_STUDENT_LIST,
        directmessagefriendData: response.data.data,
        groupmessagefriendData: response.data.data,
        addmessagegroupmemberData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const sendDirectChatRequest = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(MESSAGE_SEND, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: MESSAGE_SEND,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "message" }));
  } catch (err) {
    // console.log(err)
  }
};

export const createGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(CREATE_GROUP, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CREATE_GROUP,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "message" }));
  } catch (err) {
    // console.log(err)
  }
};

export const clearMessage = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(CLEAR_MESSAGE, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CLEAR_MESSAGE,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(
      messageHistroyList({
        conversation_id: data.conversation_id,
        module: "message",
      })
    );
  } catch (err) {
    // console.log(err)
  }
};

export const deleteConversation = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(DELETE_CONVERSATION, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: DELETE_CONVERSATION,
      });
      dispatch(messageList({ module: "message" }));
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const leaveGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(LEAVE_GROUP, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: LEAVE_GROUP,
        LeaveGroupStatus: response.data.error,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "message" }));
  } catch (err) {
    // console.log(err)
  }
};

export const editGroup = (data, conversationId) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(EDIT_GROUP, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: EDIT_GROUP,
        editGroupStatus: response.data.error,
      });
      dispatch({
        type: EDIT_GROUP,
        editGroupStatus: "",
      });
      dispatch(
        messageHistroyList({
          conversation_id: conversationId,
          module: "message",
        })
      );
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "message" }));
  } catch (err) {
    // console.log(err)
  }
};

export const removeMemberFromGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      REMOVE_MEMBERS,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: REMOVE_MEMBERS,
      });
      dispatch(
        messageHistroyList({
          conversation_id: data.conversation_id,
          module: "message",
        })
      );
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "message" }));
  } catch (err) {
    // console.log(err)
  }
};

export const deleteGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(DELETE_GROUP, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: DELETE_GROUP,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "message" }));
  } catch (err) {
    // console.log(err)
  }
};

export const addMember = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_MEMBER, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_MEMBER,
        addMemberStatus: response.data.error,
      });
      if (response.data.error === false) {
        dispatch({
          type: ADD_MEMBER,
          addMemberStatus: "",
        });
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(
      messageHistroyList({
        conversation_id: data.conversation_id,
        module: "message",
      })
    );
    dispatch(messageList({ module: "message" }));
    dispatch(chatfriendData());
  } catch (err) {
    // console.log(err)
  }
};
