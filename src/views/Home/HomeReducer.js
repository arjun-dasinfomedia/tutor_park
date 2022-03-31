import {
  ALL_TIMELINE,
  LIKE_TIMELINE,
  DISLIKE_TIMELINE,
  FAVOURITE_TIMELINE,
  COMMENT_TIMELINE,
  ABUSE_TIMELINE
} from "../../redux/actions/types";

// ** Initial State
const initialState = {
  allTimeline: [],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {

    // Get AllTime ist 
    case ALL_TIMELINE:
      return { ...state, allTimeline: action.allTimeline };

    // like Timeline Post
    case LIKE_TIMELINE:
      return { ...state }

    // abuse Timeline Post
    case ABUSE_TIMELINE:
      return { ...state }

    // dislike Timeline Post
    case DISLIKE_TIMELINE:
      return { ...state }

    // favourite Timeline Post
    case FAVOURITE_TIMELINE:
      return { ...state }

    // add Comment Timeline
    case COMMENT_TIMELINE:
      return { ...state }

    // Default Page
    default:
      return { ...state };
  }
};
export default HomeReducer;
