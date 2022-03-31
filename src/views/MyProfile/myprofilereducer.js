import {
  GEOTAG_UPDATE,
  UPDATE_HIDE_AREA,
  UPDATE_PROFILE,
  USER_DATA,
  UPDATE_OTHER_USER,
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  userdetailsData: [],
  userExtraDetails: [],
  userEditStatusSchool: [],
};

const myProfile = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userdetailsData: action.userdetailsData,
        userExtraDetails: action.userExtraDetails,
      };
    case UPDATE_PROFILE:
    // return { ...state, userdetailsData: action.userdetailsData, userExtraDetails: action.userExtraDetails }
    case GEOTAG_UPDATE:
    // return { ...state, userdetailsData: action.userdetailsData, userExtraDetails: action.userExtraDetails }
    case UPDATE_HIDE_AREA:
      return { ...state };
    case UPDATE_OTHER_USER:
      return { ...state, userEditStatusSchool: action.userEditStatusSchool };

    default:
      return { ...state };
  }
};
export default myProfile;
