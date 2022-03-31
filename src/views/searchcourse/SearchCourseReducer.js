import {
  SEARCH_ALL_COURSE,
  SEARCH_COURSE_VIEW,
  SUBSCRIBE_MY_COURSE,
  CREATE_RAZORPAY_ORDER,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  courseDataList: [],
  selectedCourse: [],
};

const searchCourses = (state = initialState, action) => {
  switch (action.type) {

    // Search all Course
    case SEARCH_ALL_COURSE:
      return { ...state, courseDataList: action.courseDataList };

    // Search Course View
    case SEARCH_COURSE_VIEW:
      return { ...state, selectedCourse: action.selectedCourse };
    
      // create razorpayorder
    case CREATE_RAZORPAY_ORDER:
      return { ...state, razorpayOrder: action.razorpayOrder };

    // Subscribe the Course
    case SUBSCRIBE_MY_COURSE:
      return { ...state };

    // Default page
    default:
      return { ...state };
  }
};
export default searchCourses;
