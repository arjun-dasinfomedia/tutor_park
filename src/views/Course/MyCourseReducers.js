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

// ** Initial State
const initialState = {
  mySubscribedList: [],
  myAllCourseList: [],
  selectedCourse: [],
  selectedEditCourse: "",
  courseUpdateStatus: "",
};

const myCourses = (state = initialState, action) => {
  switch (action.type) {
    case "MY_ALL_COURSE":
      return { ...state, myAllCourseList: action.myAllCourseList };
    case MY_COURSE_STORE:
      return { ...state };
    case MY_COURSE_UPDATE:
      return { ...state, courseUpdateStatus: action.courseUpdateStatus };
    case MY_COURSE_EDIT:
      return { ...state, selectedEditCourse: action.selectedEditCourse };
    case MY_COURSE_VIEW:
      return { ...state, selectedCourse: action.selectedCourse };
    case MY_SUBSCRIBED_COURSE:
      return { ...state, mySubscribedList: action.mySubscribedList };
    case MY_COURSE_DELETE:
      return { ...state };
    case SUBSCRIBE_MY_COURSE:
      return { ...state };
    case COURSE_COMPLETE:
      return { ...state };
    case ADD_FEEDBACK:
      return { ...state };
    default:
      return { ...state };
  }
};
export default myCourses;
