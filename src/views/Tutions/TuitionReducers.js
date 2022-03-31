import {
  ADD_FEEDBACK,
  ADD_STUDENTS_IN_TUITION,
  DELETE_MY_TUITION,
  FIND_TUTIONS_STUDENT,
  GET_ALL_TUTIONS_STUDENT,
  GET_ALL_TUTIONS_TUTOR,
  GET_STUDENT_LIST_TO_ASSIGN_IN_TUTITION,
  STORE_MY_TUITION,
  SUBSCRIBED_STUDENT_LIST,
  SUBSCRIBE_TUITION,
  UNSUBSCRIBE_TUITION,
  VIEW_USER_DETAILS,
  DIRECT_MESSAGE,
  GET_RAZORPAY_SETTINGS,
  UPDATE_MY_TUITION,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  allListTutor: [],
  allListStudent: [],
  findListStudent: [],
  viewUserData: [],
  studentListToAddInTution: [],
  subscribedStudentList: [],
  addTuitionStatus: "",
  razorpaySettings: [],
  tuitionEditStatus: ""
};

const TuitionReducer = (state = initialState, action) => {
  switch (action.type) {
    
		case UPDATE_MY_TUITION:
			return { ...state, tuitionEditStatus: action.tuitionEditStatus }
    case GET_ALL_TUTIONS_TUTOR:
      return { ...state, allListTutor: action.allListTutor };
    case GET_ALL_TUTIONS_STUDENT:
      return { ...state, allListStudent: action.allListStudent };
    case FIND_TUTIONS_STUDENT:
      return { ...state, findListStudent: action.findListStudent };
    case GET_STUDENT_LIST_TO_ASSIGN_IN_TUTITION:
      return {
        ...state,
        studentListToAddInTution: action.studentListToAddInTution,
      };
    case SUBSCRIBED_STUDENT_LIST:
      return { ...state, subscribedStudentList: action.subscribedStudentList };
    case ADD_STUDENTS_IN_TUITION:
      return { ...state };
    case STORE_MY_TUITION:
      return { ...state, addTuitionStatus: action.addTuitionStatus };
    case VIEW_USER_DETAILS:
      return { ...state, viewUserData: action.viewUserData };
    case GET_RAZORPAY_SETTINGS:
      return { ...state, razorpaySettings: action.razorpaySettings };
    case DELETE_MY_TUITION:
      return { ...state };
    case ADD_FEEDBACK:
      return { ...state };
    case SUBSCRIBE_TUITION:
      return { ...state };
    case UNSUBSCRIBE_TUITION:
      return { ...state };
    case DIRECT_MESSAGE:
      return { ...state };
    default:
      return { ...state };
  }
};
export default TuitionReducer;
