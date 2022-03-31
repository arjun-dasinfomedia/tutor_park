import {
    ALL_SETTING_POINT,
    ADD_SETTING_POINT,
    RESTRIVE_REZORPAY_SETTINGS,
    STORE_REZORPAY_SETTINGS
} from '../../redux/actions/types'

// ** Initial State
const initialState = {
    studentPoint: {},
    tutorPoint: {},
    rezorPayList: [],
}

const SettingReducer = (state = initialState, action) => {

    switch (action.type) {

        // List settingPoint
        case ALL_SETTING_POINT:
            return {
                ...state,
                studentPoint: action.studentPoint,
                tutorPoint: action.tutorPoint
            }

        // RazorPay Setting List
        case RESTRIVE_REZORPAY_SETTINGS:
            return { ...state, rezorPayList: action.rezorPayList }

        // Add Setting Points
        case ADD_SETTING_POINT:
            return { ...state }

        // Add RazorPay Settings
        case STORE_REZORPAY_SETTINGS:
            return { ...state }

        // Dfault
        default:
            return { ...state }
    }
}
export default SettingReducer
