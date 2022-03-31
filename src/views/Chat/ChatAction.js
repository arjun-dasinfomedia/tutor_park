import {
  CHAT_CREATE_GROUP,
  CHAT_HISTORY_LIST,
  CHAT_MESSAGE_LIST,
  CHAT_MESSAGE_READ,
  CHAT_MESSAGE_SEND,
  CHAT_STUDENT_LIST,
  CHAT_CLEAR_MESSAGE,
  CHAT_LEAVE_GROUP,
  CHAT_EDIT_GROUP,
  CHAT_DELETE_GROUP,
  CHAT_ADD_MEMBER,
  CHAT_REMOVE_MEMBERS,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

export const messageList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_MESSAGE_LIST,
      data
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: CHAT_MESSAGE_LIST,
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
    const response = await RestClientServices.postWithData(
      CHAT_HISTORY_LIST,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: CHAT_HISTORY_LIST,
        histroyListData: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_MESSAGE_SEND,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: CHAT_MESSAGE_SEND,
      });
      dispatch(messageList({ module: "chat" }));
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
    const response = await RestClientServices.postWithData(
      CHAT_MESSAGE_READ,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: CHAT_MESSAGE_READ,
      });
      dispatch(messageList({ module: "chat" }));
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const chatfriendData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(CHAT_STUDENT_LIST);
    if (response.data.error === false) {
      dispatch({
        type: CHAT_STUDENT_LIST,
        directchatfriendData: response.data.data,
        groupchatfriendData: response.data.data,
        addgroupmemberData: response.data.data,
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
    const response = await RestClientServices.postWithData(
      CHAT_MESSAGE_SEND,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_MESSAGE_SEND,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};

export const createGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_CREATE_GROUP,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_CREATE_GROUP,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};

export const clearMessage = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_CLEAR_MESSAGE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_CLEAR_MESSAGE,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(
      messageHistroyList({
        conversation_id: data.conversation_id,
        module: "chat",
      })
    );
  } catch (err) {
    // console.log(err)
  }
};

export const leaveGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_LEAVE_GROUP,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_LEAVE_GROUP,
        LeaveGroupStatus: response.data.error,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};

export const editGroup = (data, conversationId) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_EDIT_GROUP,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_EDIT_GROUP,
        editGroupStatus: response.data.error,
      });

      dispatch({
        type: CHAT_EDIT_GROUP,
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
    dispatch(messageList({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};

export const removeMemberFromGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_REMOVE_MEMBERS,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_REMOVE_MEMBERS,
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
    dispatch(messageList({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};

export const deleteGroup = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_DELETE_GROUP,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_DELETE_GROUP,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
    dispatch(messageList({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};

export const addMember = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHAT_ADD_MEMBER,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: CHAT_ADD_MEMBER,
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
        module: "chat",
      })
    );
    dispatch(messageList({ module: "chat" }));
    dispatch(chatfriendData({ module: "chat" }));
  } catch (err) {
    // console.log(err)
  }
};
