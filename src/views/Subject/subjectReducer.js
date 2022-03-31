import {
	GET_ALL_SUBJECT_LIST_ADMIN,
	STORE_SUBJECT,
	DELETE_SUBJECT,
	UPDATE_SUBJECT,
} from "src/redux/actions/types"

// ** Initial State
const initialState = {
	subjectList: [],
	subjectEditStatus: '',
}

const syllabusReducer = (state = initialState, action) => {

	switch (action.type) {

		// List Subject
		case GET_ALL_SUBJECT_LIST_ADMIN:
			return { ...state, subjectList: action.subjectList }

		// Store Syllabus
		case STORE_SUBJECT:
			return { ...state }

		// Delete Syllabus
		case DELETE_SUBJECT:
			return { ...state }

		// Update Subject
		case UPDATE_SUBJECT:
			return { ...state, subjectEditStatus: action.subjectEditStatus }

		// Default
		default:
			return { ...state }
	}
}
export default syllabusReducer
