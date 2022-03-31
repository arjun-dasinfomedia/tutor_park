import {
	SCHOOL_PLATFORM,
	SCHOOL_VERIFY
} from "src/redux/actions/types"

const initialState = {
	schoolList: [],

}

const SchoolPlatformReducer = (state = initialState, action) => {

	switch (action.type) {

		// Shool List
		case SCHOOL_PLATFORM:
			return { ...state, schoolList: action.schoolList }

		// Verify The School
		case SCHOOL_VERIFY:
			return { ...state }

		// Default
		default:
			return { ...state }
	}
}
export default SchoolPlatformReducer