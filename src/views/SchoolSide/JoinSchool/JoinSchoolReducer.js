import {
	VERIFIED_SCHOOL,
	ADD_SCHOOL,
	JOIN_SCHOOL,
} from "src/redux/actions/types"

const initialState = {
	schoolList: [],

}

const JoinSchoolReducer = (state = initialState, action) => {

	switch (action.type) {

		//  Verified School List
		case VERIFIED_SCHOOL:
			return { ...state, schoolList: action.schoolList }

		// Add New School
		case ADD_SCHOOL:
			return { ...state }

		// Join School
		case JOIN_SCHOOL:
			return { ...state }

		default:
			return { ...state }
	}
}
export default JoinSchoolReducer