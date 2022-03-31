import {
  MY_ALL_COURSE,
  MY_COURSE_VIEW,
  MY_SUBSCRIBED_COURSE,
  MY_COURSE_STORE,
  MY_COURSE_DELETE,
  MY_COURSE_EDIT,
  SUBSCRIBE_MY_COURSE,
  COURSE_COMPLETE,
  ADD_FEEDBACK,
  MY_COURSE_UPDATE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";
import { alertActions } from "src/redux/actions/alertMessage";
import { toast } from "react-toastify";

export const getAllMyCourseList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithoutData(MY_ALL_COURSE);
    if (response.data.error === false) {
      dispatch({
        type: "MY_ALL_COURSE",
        myAllCourseList: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const storeMyCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MY_COURSE_STORE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: MY_COURSE_STORE,
      });
      dispatch(getAllMyCourseList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const updateCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MY_COURSE_UPDATE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: MY_COURSE_UPDATE,
        courseUpdateStatus: response.data.error,
      });
      dispatch(getAllMyCourseList());
      if (response.data.error === false) {
        dispatch({
          type: MY_COURSE_UPDATE,
          courseUpdateStatus: "sucess",
        });
      }
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const viewCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MY_COURSE_VIEW,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: MY_COURSE_VIEW,
        selectedCourse: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const getAllMySubscribedCourse = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(MY_SUBSCRIBED_COURSE);
    if (response.data.error === false) {
      dispatch({
        type: MY_SUBSCRIBED_COURSE,
        mySubscribedList: response.data.data,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const deleteCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      MY_COURSE_DELETE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: MY_COURSE_DELETE,
      });
      dispatch(getAllMyCourseList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const subscribeMyCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      SUBSCRIBE_MY_COURSE,
      data
    );
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: SUBSCRIBE_MY_COURSE,
      });
      dispatch(getAllMyCourseList());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const completeCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      COURSE_COMPLETE,
      data
    );

    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: COURSE_COMPLETE,
      });
      dispatch(getAllMySubscribedCourse());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

export const feedBackAdd = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(ADD_FEEDBACK, data);
    if (response.data.error === false) {
      dispatch(alertActions.success(response.data.message.toString()));
      toast.success(response.data.message.toString());
      dispatch({
        type: ADD_FEEDBACK,
      });
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
