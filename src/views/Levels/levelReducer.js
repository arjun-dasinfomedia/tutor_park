import {
  GET_ALL_LEVEL_LIST_ADMIN,
  STORE_LEVEL,
  DELETE_LEVEL,
  UPDATE_LEVEL,
} from "src/redux/actions/types";

// ** Initial State
const initialState = {
  levelList: [],
  LevelEditStatus: "",
};

const levelReducer = (state = initialState, action) => {
  switch (action.type) {

    // List level
    case GET_ALL_LEVEL_LIST_ADMIN:
      return { ...state, levelList: action.levelList };

    // Store a Level
    case STORE_LEVEL:
      return { ...state };

    // delete a level
    case DELETE_LEVEL:
      return { ...state };

    // Update a Levele
    case UPDATE_LEVEL:
      return { ...state, LevelEditStatus: action.LevelEditStatus };

    // Default Page
    default:
      return { ...state };
  }
};

export default levelReducer;
