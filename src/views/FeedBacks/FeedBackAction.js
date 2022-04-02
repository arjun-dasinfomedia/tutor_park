import { FEEDBACK_LIST } from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// get Feedback list
export const getAllFeedbackList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(FEEDBACK_LIST);
    if (response.data.error === false) {
      dispatch({
        type: FEEDBACK_LIST,
        List: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
