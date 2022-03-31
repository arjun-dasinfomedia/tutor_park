import {
  ALL_SESSION,
  COMPLETED_SESSION,
  COMPLETE_SESSION,
  UPCOMING_SESSION,
  STUDENT_ATTENDANCE,
  ATTENDANCE,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  data: [],
  allsessiondata: [],
  completesessiondata: [],
  attendancelist: [],
};

const sessions = (state = initialState, action) => {
  switch (action.type) {
    case UPCOMING_SESSION:
      return { ...state, data: action.data };
    case ALL_SESSION:
      return { ...state, allsessiondata: action.allsessiondata };
    case COMPLETED_SESSION:
      return { ...state, completesessiondata: action.completesessiondata };
    case COMPLETE_SESSION:
      return { ...state };
    case STUDENT_ATTENDANCE:
      return { ...state, attendancelist: action.attendancelist };
    case ATTENDANCE:
      return { ...state };
    default:
      return { ...state };
  }
};
export default sessions;
