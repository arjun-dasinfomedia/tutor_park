import {
  GET_ALL_SUBJECT_LIST,
  GET_ALL_SYLLABUS_LIST,
  GET_ALL_CLASS_LIST,
  GET_ALL_SUBJECT_TUTOR_LIST,
  GET_ALL_LEVEL_LIST,
  QUESTION_TYPE_LIST,
  QUESTION_SECTION_LIST,
  LIBRARY_LIST,
  CLASS_DIVISION_LIST,
  SCHOOL_USERS_SUBJECT_LIST,
} from "../../actions/types";

// ** Initial State
const initialState = {
  subjectList: [],
  syllabusList: [],
  classList: [],
  subjectTutorList: [],
  levelList: [],
  questionTypeList: [],
  questionSectionList: [],
  libraryList: [],
  classDivisionList: [],
  schoolUsesSubjectListForDD: [],
};

const dropdowns = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SUBJECT_LIST:
      return { ...state, subjectList: action.subjectList };
    case GET_ALL_SYLLABUS_LIST:
      return { ...state, syllabusList: action.syllabusList };
    case GET_ALL_CLASS_LIST:
      return { ...state, classList: action.classList };
    case GET_ALL_SUBJECT_TUTOR_LIST:
      return { ...state, subjectTutorList: action.subjectTutorList };
    case GET_ALL_LEVEL_LIST:
      return { ...state, levelList: action.levelList };
    case QUESTION_TYPE_LIST:
      return { ...state, questionTypeList: action.questionTypeList };
    case LIBRARY_LIST:
      return { ...state, libraryList: action.libraryList };
    case QUESTION_SECTION_LIST:
      return { ...state, questionSectionList: action.questionSectionList };
    case CLASS_DIVISION_LIST:
      return { ...state, classDivisionList: action.classDivisionList };
    case SCHOOL_USERS_SUBJECT_LIST:
      return {
        ...state,
        schoolUsesSubjectListForDD: action.schoolUsesSubjectListForDD,
      };
    default:
      return { ...state };
  }
};
export default dropdowns;
