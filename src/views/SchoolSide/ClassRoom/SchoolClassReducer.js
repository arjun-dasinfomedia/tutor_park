import {
  ADD_STUDENT_IN_CLASS_SECTION,
  LIST_ATTENDANCE,
  REQUEST_FOR_ACCESS_CLASS,
  ADD_SUBJECT_TEACHER,
  CREATE_SCHOOL_CLASS,
  ENABLE_DISABLE_USER,
  TAKE_ATTENDANCE,
  GET_ALL_CLASS_TUTOR,
  GET_ALL_STUDENT_TEACHER_LIST,
  GET_USER_TO_ADD_TEACHER,
  REMOVE_STUDENT_IN_CLASS_SECTION,
  SCHOOL_DIVISION_LIST,
  ADD_SUBJECT_LEADER,
  STORE_SECTION_TIMETABLE,
  TIME_TABLE_LIST
} from '../../../redux/actions/types'


// ** Initial State
const initialState = {
  schoolClassData: [],
  allStudentTeacherList: [],
  allTutorList: [],
  attendancelist: [],
  timeList: '',
}

const schoolClass = (state = initialState, action) => {

  switch (action.type) {

    // List Attendance
    case LIST_ATTENDANCE:
      return { ...state, attendancelist: action.attendancelist };

    // Time Table List
    case TIME_TABLE_LIST:
      return { ...state, timeList: action.timeList };

    // Add Subject Leader
    case ADD_SUBJECT_LEADER:
      return { ...state }

    // Requset For Access Class
    case REQUEST_FOR_ACCESS_CLASS:
      return { ...state }

    // Take Attendance
    case TAKE_ATTENDANCE:
      return { ...state }

    // School Division List
    case SCHOOL_DIVISION_LIST:
      return { ...state, schoolClassData: action.schoolClassData }

    // Get All Student and Teacher List
    case GET_ALL_STUDENT_TEACHER_LIST:
      return { ...state, allStudentTeacherList: action.allStudentTeacherList }

    // Get All Class Tutor List
    case GET_ALL_CLASS_TUTOR:
      return { ...state, allTutorList: action.allTutorList }

    // Store School Class
    case CREATE_SCHOOL_CLASS:
      return { ...state }

    // Add Subject Teacher
    case ADD_SUBJECT_TEACHER:
      return { ...state }

    // Add Student in Class Section
    case ADD_STUDENT_IN_CLASS_SECTION:
      return { ...state }

    // Remove Student In class Section
    case REMOVE_STUDENT_IN_CLASS_SECTION:
      return { ...state }

    // Enable Disable User From Class
    case ENABLE_DISABLE_USER:
      return { ...state }

    // Store Timetable For Section
    case STORE_SECTION_TIMETABLE:
      return { ...state }

    // Default Page
    default:
      return { ...state }
  }
}
export default schoolClass
