import { USER_INVITE } from "../../redux/actions/types";

// ** Initial State
const initialState = {};

const InvitFriend = (state = initialState, action) => {
  switch (action.type) {
    
    // Invite User Through Email
    case USER_INVITE:
      return { ...state };

      // Default Page
    default:
      return { ...state };
  }
};
export default InvitFriend;
