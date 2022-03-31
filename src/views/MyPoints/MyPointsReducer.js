import { POINTS_HISTORY, POINTS_TRANSFER, USER_DROPDOWN, BUY_POINT } from "src/redux/actions/types"

const initialState = {
	pointsList: [],
	userDropdownlist: [],
	// userEditStatus: '',
}

const userReducer = (state = initialState, action) => {

	switch (action.type) {

		// List Point History
		case POINTS_HISTORY:
			return { ...state, pointsList: action.pointsList }

		// transfer Point History
		case POINTS_TRANSFER:
			return { ...state }

		// Buy a Points
		case BUY_POINT:
			return { ...state }

		// user Drop down
		case USER_DROPDOWN:
			return { ...state, userDropdownlist: action.userDropdownlist }

		default:
			return { ...state }
	}
}
export default userReducer