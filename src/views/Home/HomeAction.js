import {
  ALL_TIMELINE,
  LIKE_TIMELINE,
  DISLIKE_TIMELINE,
  FAVOURITE_TIMELINE,
  COMMENT_TIMELINE,
  ABUSE_TIMELINE
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

// get All timeline List
export const getAllTimeline = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(ALL_TIMELINE).then(
      (responseJson) => {
        if (responseJson.data.error === false) {
          dispatch({
            type: ALL_TIMELINE,
            allTimeline: responseJson.data.data,
          });
        } else {
          dispatch(alertActions.error(responseJson.data.message.toString()));
          toast.error(responseJson.data.message.toString());
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const abuseTimeLine = (data) => async (dispatch) => {


  try {
    const response = await RestClientServices.postWithData(ABUSE_TIMELINE, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: ABUSE_TIMELINE,
      })
      dispatch(getAllTimeline())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}

// like timeline
export const likeTimeLine = (data) => async (dispatch) => {

  try {

    const response = await RestClientServices.postWithData(LIKE_TIMELINE, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: LIKE_TIMELINE,
      })
      dispatch(getAllTimeline())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}

// dislike Timeline Function
export const disLikeTimeLine = (data) => async (dispatch) => {

  try {

    const response = await RestClientServices.postWithData(DISLIKE_TIMELINE, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: DISLIKE_TIMELINE,
      })
      dispatch(getAllTimeline())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}

// Favourite Timeline Function
export const favouriteTimeLine = (data) => async (dispatch) => {


  try {

    const response = await RestClientServices.postWithData(FAVOURITE_TIMELINE, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: FAVOURITE_TIMELINE,
      })
      dispatch(getAllTimeline())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}

// store Timeline Function
export const addCommentTimeLine = (data) => async (dispatch) => {


  try {
    const response = await RestClientServices.postWithData(COMMENT_TIMELINE, data)
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString())
      dispatch({
        type: COMMENT_TIMELINE,
      })
      dispatch(getAllTimeline())
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString())
    }

  } catch (err) {
    console.log(err)
  }
}