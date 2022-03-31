import {
  CREATE_RAZORPAY_ORDER,
  SEARCH_ALL_COURSE,
  SEARCH_COURSE_VIEW,
  SUBSCRIBE_MY_COURSE,
} from "../../redux/actions/types";
import RestClientServices from "../../redux/actions/restClient/client";

// Get All Course Using Search
export const getAllCourseListSearch =
  (data = null) =>
  async (dispatch) => {
    try {
      const response = await RestClientServices.postWithData(
        SEARCH_ALL_COURSE,
        data
      );
      dispatch({
        type: SEARCH_ALL_COURSE,
        courseDataList: response.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // View Course
export const viewCourse = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      SEARCH_COURSE_VIEW,
      data
    );
    dispatch({
      type: SEARCH_COURSE_VIEW,
      selectedCourse: response.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// Suscribe the Course
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
      dispatch(getAllCourseListSearch());
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};

// create order for online payment from razor pay 
export const createRazorpayOrderID = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      CREATE_RAZORPAY_ORDER,
      data
    );
    if (response.data.error === false) {
      dispatch({
        type: CREATE_RAZORPAY_ORDER,
      });
      return response.data.data;
    } else {
      dispatch(alertActions.error(response.data.message.toString()));
      toast.error(response.data.message.toString());
    }
  } catch (err) {
    // console.log(err)
  }
};
