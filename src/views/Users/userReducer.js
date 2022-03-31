import {
	GET_ALL_USER_LIST,
	ADD_USER,
	DELETE_USER,
	SCHOOL_STUDET_LIST,
	UPDATE_OTHER_USER,
	SCHOOL_DROPDOWN,
	UPDATE_USER,
	SCHOOL_CLASS_BY_SYLLABUS,
	SCHOOL_DIVISION_BY_CLASS,
} from "src/redux/actions/types"

const initialState = {
	userList: [],
	userEditStatus: '',
	userListDropDown: [],
	schoolListDropDown: [],
	userEditStatusSchool: [],
	schoolClassList: [],
	schoolDivisionList: [],
}

const userReducer = (state = initialState, action) => {

	switch (action.type) {

		// School Class By Syllabus
		case SCHOOL_CLASS_BY_SYLLABUS:
			return { ...state, schoolClassList: action.schoolClassList }

		// School Division By Class
		case SCHOOL_DIVISION_BY_CLASS:
			return { ...state, schoolDivisionList: action.schoolDivisionList }

		// List User
		case GET_ALL_USER_LIST:
			return { ...state, userList: action.userList }

		// user list dropdown
		case SCHOOL_STUDET_LIST:
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

		// user Tutor Park  update 
		case UPDATE_USER:
			return { ...state, userEditStatus: action.userEditStatus }

			// Update School User
		case UPDATE_OTHER_USER:
			return { ...state, userEditStatusSchool: action.userEditStatusSchool }

		// Default
		default:
			return { ...state }
	}
}
export default userReducer