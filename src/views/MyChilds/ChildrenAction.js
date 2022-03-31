import { CHILD_LIST, IMPERSONATE } from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// Get Children List
export const getChildrenList = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CHILD_LIST,
      data
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: CHILD_LIST,
          ChildrenList: responseJson.data.data,
        });
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};

// Impersonate Children from Parent
export const userImpersonate = (data, tag) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      IMPERSONATE,
      data,
      tag
    ).then((responseJson) => {
      if (responseJson.data.error === false) {
        dispatch({
          type: IMPERSONATE,
        });
        if (tag === "impersonate") {
          localStorage.setItem("impersonateStatus", true);
        } else {
          localStorage.setItem("impersonateStatus", false);
        }

        localStorage.setItem(
          "userData",
          JSON.stringify(responseJson.data.data)
        );
        localStorage.setItem(
          "permissions",
          JSON.stringify(responseJson.data.permissions)
        );

        localStorage.setItem(
          "token",
          JSON.stringify(responseJson.data.access_token)
        );
        localStorage.setItem(
          "expires_in",
          JSON.stringify(response.data.expires_in)
        );
        window.location.reload();
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    // console.log(err)
  }
};
