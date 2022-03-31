
import { USER_INVITE } from '../../../redux/actions/types'

// ** Initial State
const initialState = {
 
}

const InvitFriend = (state = initialState, action) => {

 switch (action.type) {
   
   case USER_INVITE:
     return { ...state } 
   
   default:
     return { ...state }
 }
}
export default InvitFriend
