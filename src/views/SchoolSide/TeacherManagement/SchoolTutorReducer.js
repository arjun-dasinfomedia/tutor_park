
import {
    GET_ALL_USER_LIST,
    ADD_USER,
    DELETE_USER,
    USERLIST_DROPDOWN,
    UPDATE_OTHER_USER,
    SCHOOL_DROPDOWN,
    SCHOOL_STUDET_LIST,
    SCHOOL_DIVISION_BY_CLASS,
    SCHOOL_CLASS_BY_SYLLABUS
} from "src/redux/actions/types"

const initialState = {
    userList: [],
    userEditStatusSchool: '',
    userListDropDown: [],
    schoolListDropDown: [],
    schoolTutorData: [],
    schoolDivisionList: [],
    schoolClassList: [],
}

const SchoolTutorReducer = (state = initialState, action) => {

    switch (action.type) {

        // School Class By syllabus
        case SCHOOL_CLASS_BY_SYLLABUS:
            return { ...state, schoolClassList: action.schoolClassList }

        // School division by class
        case SCHOOL_DIVISION_BY_CLASS:
            return { ...state, schoolDivisionList: action.schoolDivisionList }

        // School Student List
        case SCHOOL_STUDET_LIST:
            return { ...state, schoolTutorData: action.schoolTutorData }

        // List User
        case GET_ALL_USER_LIST:
            return { ...state, userList: action.userList }

        // user list dropdown
        case USERLIST_DROPDOWN:
            return { ...state, userListDropDown: action.userListDropDown }

        // School list dropdown
        case SCHOOL_DROPDOWN:
            return { ...state, schoolListDropDown: action.schoolListDropDown }

        // Store User
        case ADD_USER:
            return { ...state }

        // delete User
        case DELETE_USER:
            return { ...state }

        // user update 
        case UPDATE_OTHER_USER:
            return { ...state, userEditStatusSchool: action.userEditStatusSchool }

        // Default Page
        default:
            return { ...state }
    }
}
export default SchoolTutorReducer
