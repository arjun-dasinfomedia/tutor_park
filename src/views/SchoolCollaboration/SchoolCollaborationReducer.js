import {
	SCHOOL_COLLABORATION,
	SCHOOL_VERIFY
} from "src/redux/actions/types"

const initialState = {
	schoolList: [],

}

const SchoolCollaborationReducer = (state = initialState, action) => {

	switch (action.type) {

		// School List
		case SCHOOL_COLLABORATION:
			return { ...state, schoolList: action.schoolList }

		// Default
		default:
			return { ...state }
	}
}
export default SchoolCollaborationReducer