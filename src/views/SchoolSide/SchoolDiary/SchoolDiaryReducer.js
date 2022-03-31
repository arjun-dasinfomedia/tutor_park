import {
    SCHOOL_DIARY_LIST,
    SUBJECT_BY_DIVISION,
    ADD_DIARY,
    VIEW_DIARY_BY_DATE,
    UPDATE_SCHOOL_DIARY,
    VIEW_SCHOOL_DIARY,
    POST_TO_TIMELINE,
    CHAT_STUDENT_LIST,
    SHARED_DIARY_TO_MESSAGE,
} from "src/redux/actions/types"

const initialState = {
    schoolDiaryList: [],
    subjectDivisionList: [],
    viewSchoolDiary: [],
    diaryEditStatus: [],
    viewDiary: [],
    sharedWithFriend: [],
}

const SchoolDiaryReducer = (state = initialState, action) => {

    switch (action.type) {

        // List User
        case SCHOOL_DIARY_LIST:
            return { ...state, schoolDiaryList: action.schoolDiaryList }

        // View School Diary
        case VIEW_SCHOOL_DIARY:
            return { ...state, viewDiary: action.viewDiary }

        // update School Diary
        case UPDATE_SCHOOL_DIARY:
            return { ...state, diaryEditStatus: action.diaryEditStatus }

        // View School Diary By Date
        case VIEW_DIARY_BY_DATE:
            return { ...state, viewSchoolDiary: action.viewSchoolDiary }

        // Scubject Dropdown by division
        case SUBJECT_BY_DIVISION:
            return { ...state, subjectDivisionList: action.subjectDivisionList };

        // Chat Student List
        case CHAT_STUDENT_LIST:
            return { ...state, sharedWithFriend: action.sharedWithFriend };

        // Add New Diary
        case ADD_DIARY:
            return { ...state };

        // Post in timeline
        case POST_TO_TIMELINE:
            return { ...state };

        // Share Diary in Message Module
        case SHARED_DIARY_TO_MESSAGE:
            return { ...state };


        default:
            return { ...state }
    }
}
export default SchoolDiaryReducer