import {
	IMPERSONATE_SCHOOL,
} from '../../redux/actions/types'

// ** Initial State
const initialState = {
}

const MySchoolReducer = (state = initialState, action) => {

	switch (action.type) {

		// Impersonete school
		case IMPERSONATE_SCHOOL:
			return { ...state }

		// Default
		default:
			return { ...state }
	}
}
export default MySchoolReducer
