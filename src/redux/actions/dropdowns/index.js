import {
  GET_ALL_CLASS_LIST,
  GET_ALL_SUBJECT_LIST,
  GET_ALL_SUBJECT_TUTOR_LIST,
  GET_ALL_SYLLABUS_LIST,
  GET_ALL_LEVEL_LIST,
  QUESTION_TYPE_LIST,
  QUESTION_SECTION_LIST,
  LIBRARY_LIST,
  CLASS_DIVISION_LIST,
  SCHOOL_USERS_SUBJECT_LIST,
} from "../types";
import RestClientServices from "../restClient/client";

export const subjectListData = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GET_ALL_SUBJECT_LIST,
      data
    );
    dispatch({
      type: GET_ALL_SUBJECT_LIST,
      subjectList: response.data.data,
    });
    // ** store subject Data in localstorage for feture use.
  } catch (err) {
    // console.log(err)
  }
};

export const syllabusListData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_SYLLABUS_LIST);
    dispatch({
      type: GET_ALL_SYLLABUS_LIST,
      syllabusList: response.data.data,
    });
    // ** store subject Data in localstorage for feture use.
  } catch (err) {
    // console.log(err)
  }
};

export const classListData = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GET_ALL_CLASS_LIST,
      data
    );
    dispatch({
      type: GET_ALL_CLASS_LIST,
      classList: response.data.data,
    });
    // ** store subject Data in localstorage for feture use.
  } catch (err) {
    // console.log(err)
  }
};

export const subjectTutorListData = (data) => async (dispatch) => {
  try {
    const response = await RestClientServices.postWithData(
      GET_ALL_SUBJECT_TUTOR_LIST,
      data
    );
    dispatch({
      type: GET_ALL_SUBJECT_TUTOR_LIST,
      subjectTutorList: response.data.data,
    });
  } catch (err) {
    // console.log(err)
  }
};

export const levelListData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(GET_ALL_LEVEL_LIST);
    dispatch({
      type: GET_ALL_LEVEL_LIST,
      levelList: response.data.data,
    });
  } catch (err) {
    // console.log(err)
  }
};

export const questionTypeData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(QUESTION_TYPE_LIST);
    dispatch({
      type: QUESTION_TYPE_LIST,
      questionTypeList: response.data.data,
    });
  } catch (err) {
    // console.log(err)
  }
};

export const libraryListData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(LIBRARY_LIST);
    dispatch({
      type: LIBRARY_LIST,
      libraryList: response.data.data,
    });
  } catch (err) {
    // console.log(err)
  }
};

export const questionSectionData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(QUESTION_SECTION_LIST);
    dispatch({
      type: QUESTION_SECTION_LIST,
      questionSectionList: response.data.data,
    });
  } catch (err) {
    // console.log(err)
  }
};

export const classDivisionData = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(CLASS_DIVISION_LIST);
    dispatch({
      type: CLASS_DIVISION_LIST,
      classDivisionList: response.data.data,
    });
  } catch (err) {
    // console.log(err)
  }
};

export const getSchoolUsersSubjectList = () => async (dispatch) => {
  try {
    const response = await RestClientServices.getAll(
      SCHOOL_USERS_SUBJECT_LIST
    ).then((responseJson) => {
      if (responseJson.data.error == false) {
        dispatch({
          type: SCHOOL_USERS_SUBJECT_LIST,
          schoolUsesSubjectListForDD: responseJson.data.data,
        });
      } else {
        dispatch(alertActions.error(responseJson.data.message.toString()));
        toast.error(responseJson.data.message.toString());
      }
    });
  } catch (err) {
    console.log(err);
  }
};
