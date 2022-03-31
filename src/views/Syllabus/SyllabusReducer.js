import {
	GET_ALL_SYLLABUS_LIST_ADMIN,
	DELETE_SYLLABUS,
	STORE_SYLLABUS,
	UPDATE_SYLLABUS
} from "src/redux/actions/types"

// ** Initial State
const initialState = {
	syllabusList: [],
	syllabusEditStatus: '',
}

const syllabusReducer = (state = initialState, action) => {

	switch (action.type) {

		// List Syllabus
		case GET_ALL_SYLLABUS_LIST_ADMIN:
			return { ...state, syllabusList: action.syllabusList }

		// Store Syllabus
		case STORE_SYLLABUS:
			return { ...state }

		// Delete Syllabus
		case DELETE_SYLLABUS:
			return { ...state }

		// Update Syllabus
		case UPDATE_SYLLABUS:
			return { ...state, syllabusEditStatus: action.syllabusEditStatus }

		// Default
		default:
			return { ...state }
	}
}
export default syllabusReducer
