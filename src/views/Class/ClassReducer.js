import {
  CLASS_LIST,
  DELETE_CLASSES,
  VIEW_CLASSES,
  CLASS_STORE,
  UPDATE_CLASS
} from '../../redux/actions/types'

// ** Initial State
const initialState = {
  classData: [],
  classviewData: [],
  classUpdate: [],
}

const classReducer = (state = initialState, action) => {

  switch (action.type) {

    // Class List Apu
    case CLASS_LIST:
      return { ...state, classData: action.classData }

    // Delete Class Api
    case DELETE_CLASSES:
      return { ...state }

    // View Class Api
    case VIEW_CLASSES:
      return { ...state, classviewData: action.classviewData }

    // Add Class API
    case CLASS_STORE:
      return { ...state }

    // Update Class API
    case UPDATE_CLASS:
      return { ...state, classUpdate: action.classUpdate }
        
    // default 
    default:
      return { ...state }
  }
}
export default classReducer
