import {
	GET_ALL_USER_LIST,
	ADD_USER,
	DELETE_USER,
	USERLIST_DROPDOWN,
	UPDATE_OTHER_USER,
	SCHOOL_DROPDOWN,
	SCHOOL_STUDET_LIST,
	SCHOOL_CLASS_BY_SYLLABUS,
	SCHOOL_DIVISION_BY_CLASS
} from "src/redux/actions/types"

const initialState = {
	userList: [],
	userEditStatus: '',
	userListDropDown: [],
	schoolListDropDown: [],
	schoolStudentData: [],
	schoolClassList: [],
	schoolDivisionList: [],
}

const SchoolStudentReducer = (state = initialState, action) => {

	switch (action.type) {

		// School Divison by class
		case SCHOOL_DIVISION_BY_CLASS:
			return { ...state, schoolDivisionList: action.schoolDivisionList }

		// School Student List
		case SCHOOL_STUDET_LIST:
			return { ...state, schoolStudentData: action.schoolStudentData }

		// School Class By Syllabus
		case SCHOOL_CLASS_BY_SYLLABUS:
			return { ...state, schoolClassList: action.schoolClassList }

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
			return { ...state, userEditStatus: action.userEditStatus }

		// Default
		default:
			return { ...state }
	}
}
export default SchoolStudentReducer
