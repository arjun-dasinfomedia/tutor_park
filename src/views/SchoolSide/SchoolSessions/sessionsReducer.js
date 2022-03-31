import {
  SCHOOL_ALL_SESSION,
  SCHOOL_COMPLETED_SESSION,
  // COMPLETE_SESSION,
  SCHOOL_UPCOMING_SESSION,
  // STUDENT_ATTENDANCE,
  // ATTENDANCE,
} from "../../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
  allsessiondata: [],
  completesessiondata: [],
  attendancelist: [],
};

const schoolSessions = (state = initialState, action) => {
  switch (action.type) {
    case SCHOOL_UPCOMING_SESSION:
      return { ...state, data: action.data };
    case SCHOOL_ALL_SESSION:
      return { ...state, allsessiondata: action.allsessiondata };
    case SCHOOL_COMPLETED_SESSION:
      return { ...state, completesessiondata: action.completesessiondata };
    // case COMPLETE_SESSION:
    //   return { ...state };
    // case STUDENT_ATTENDANCE:
    //   return { ...state, attendancelist: action.attendancelist };
    // case ATTENDANCE:
    //   return { ...state};
    default:
      return { ...state };
  }
};
export default schoolSessions;
