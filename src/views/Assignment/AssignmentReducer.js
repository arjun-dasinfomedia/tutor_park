import {
    LIST_ASSIGNMENT,
    NOT_ATTEMPTED_STUDENT,
    ASSIGNMENT_STUDENT,
    ASSIGNMENT_PUBLISH,
    STUDENT_SUBMITTED_ASSIGNMENT,
    STUDENT_ASSIGNMENT_SUBMIT,
    ATTEMPT_VIEW_STUDENT,
    FILTER_QUESTION_LIST,
    VIEW_SUBMIT_ASSIGNMENT,
    ADD_ASSIGNMENT,
    STUDENT_SUBMIT_ASSIGNMENT,
    TUTOR_EVALUATE_ASSIGNMENT
} from '../../redux/actions/types'

// ** Initial State
const initialState = {
    assignmentList: [],
    NotAttemptedStudent: [],
    publishStudentList: [],
    studentSubmittedAssignment: [],
    filterQuestionData: [],
    studentAssignmentSubmit: [],
    attemptViewStudent: [],
    viewSubmittedAssignment: [],
    assignmentStatus: "",
}

const AssignmentReducer = (state = initialState, action) => {

    switch (action.type) {

        case LIST_ASSIGNMENT:
            return { ...state, assignmentList: action.assignmentList }

        case STUDENT_SUBMITTED_ASSIGNMENT:
            return { ...state, studentSubmittedAssignment: action.studentSubmittedAssignment }

        case ATTEMPT_VIEW_STUDENT:
            return { ...state, attemptViewStudent: action.attemptViewStudent }

        case NOT_ATTEMPTED_STUDENT:
            return { ...state, NotAttemptedStudent: action.NotAttemptedStudent }

        case ASSIGNMENT_STUDENT:
            return { ...state, publishStudentList: action.publishStudentList }

        case STUDENT_ASSIGNMENT_SUBMIT:
            return { ...state, studentAssignmentSubmit: action.studentAssignmentSubmit }

        case VIEW_SUBMIT_ASSIGNMENT:
            return { ...state, viewSubmittedAssignment: action.viewSubmittedAssignment }


        case ASSIGNMENT_PUBLISH:
            return { ...state }

        case ADD_ASSIGNMENT:
            return { ...state, assignmentStatus: action.assignmentStatus }

        case FILTER_QUESTION_LIST:
            return { ...state, filterQuestionData: action.filterQuestionData }
        
        case STUDENT_SUBMIT_ASSIGNMENT:
            return { ...state }
        
        case TUTOR_EVALUATE_ASSIGNMENT:
            return { ...state }

        default:
            return { ...state }
    }
}
export default AssignmentReducer
