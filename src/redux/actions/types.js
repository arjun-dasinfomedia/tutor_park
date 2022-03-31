// export const BASE_URL = 'http://192.168.1.132:8000/api'
export const BASE_URL = "https://api-tutorpark.ssavts.in/api"; // staging server url
// export const BASE_URL = 'https://api.tutorpark.com/api'// client server api url
// export const BASE_URL = 'http://192.168.1.4/tutorpark/public/api'
// export const BASE_URL = 'http://192.168.1.70/vishal/lumen/tutorpark/public/api'

// dashboard api route
export const ALL_TIMELINE = "/timeline/all";

export const GET_ALL_TEXTBOOKS = "/textbook/list";
export const GET_FILTERED_TEXTBOOKS = "/textbook/list/filter";
export const DELETE_TEXTBOOKS = "/textbook/delete";
export const VIEW_TEXTBOOKS = "/textbook/show";
export const EDIT_TEXTBOOKS = "/textbook/edit";
export const UPDATE_TEXTBOOK = "/textbook/update";
export const TEXTBOOK_STORE = "/textbook/store";
export const GET_ALL_SUBJECT_LIST = "/subject/list";
export const GET_ALL_SYLLABUS_LIST = "/syllabus/list";
export const GET_ALL_SYLLABUS_LIST_ADMIN = "/syllabus/list";
export const DELETE_SYLLABUS = "/syllabus/delete";
export const STORE_SYLLABUS = "/syllabus/store";
export const UPDATE_SYLLABUS = "/syllabus/update";
export const GET_ALL_LEVEL_LIST_ADMIN = "/level/list";
export const STORE_LEVEL = "/level/store";
export const DELETE_LEVEL = "/level/delete";
export const UPDATE_LEVEL = "/level/update";
export const GET_ALL_CLASS_LIST = "/class/list";
export const GET_ALL_SUBJECT_TUTOR_LIST = "/notebook/subjecttutor";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const REGISTER = "/user/register";
export const EMAIL_VERIFICATION = "/user/emailVerification";
export const USER_DATA = "/user/profile";
export const UPDATE_HIDE_AREA = "/user/updateHideArea";
export const POST_SEARCH_JOB_STORE = "/job/store";
export const POST_SEARCH_JOB_LIST = "/job/list";
export const FRIEND_LIST = "/friend/list";
export const REQUEST_LIST = "/friend/request/list";
export const ACCEPT_REQUEST = "/friend/accept";
export const REJECT_REQUEST = "/friend/reject";
export const BLOCK_REQUEST = "/friend/block";
export const SPAM_REQUEST = "/friend/request/spam";
export const VIEW_USER_DETAILS = "/user/friendprofile";
export const FIND_TUTOR_LIST_USING_FILTER = "/tutor/list/filter";
export const MY_ALL_COURSE = "/course/list";
export const COURSE_COMPLETE = "/course/subscription/markcompeleted";
export const MY_COURSE_VIEW = "/course/show";
export const SEARCH_ALL_COURSE = "/course/list";
export const SEARCH_COURSE_VIEW = "/course/show";
export const MY_COURSE_DELETE = "/course/delete";
export const MY_SUBSCRIBED_COURSE = "/course/subscribed/list";
export const GET_ALL_FINDTUTOR = "/tutor/find";
export const MY_COURSE_STORE = "/course/store";
export const MY_COURSE_UPDATE = "/course/update";
export const MY_COURSE_EDIT = "/course/edit";
export const UPDATE_PROFILE = "/user/update";
export const GEOTAG_UPDATE = "/user/storeGeoLocation";
export const NOTEBOOK_LIST = "/notebook/list";
export const NOTEBOOK_STORE = "/notebook/store";
export const NOTEBOOK_UPDATE = "/notebook/update";
export const NOTEBOOK_DELETE = "/notebook/delete";
export const GET_ALL_QA = "/questions/list";
export const ADD_ANSWER = "/answers/store";
export const ADD_QUESTION = "/questions/store";
export const DELETE_QUESTION = "/questions/delete";
export const GET_FILTERED_QUESTIONS = "/questions/list/filter";
export const BEST_ANSWER = "/answers/addBestAnswer";
export const GET_ALL_TUTIONS_TUTOR = "/tuition/tutorViewtution";
export const GET_ALL_TUTIONS_STUDENT = "/tuition/my/subscribed";
export const FIND_TUTIONS_STUDENT = "/tuition/list";
export const FEEDBACK_LIST = "/feedback/list";
export const ADD_FEEDBACK = "/feedback/store";
export const STORE_MY_TUITION = "/tuition/store";
export const UPDATE_MY_TUITION = "/tuition/update";
export const DELETE_MY_TUITION = "/tuition/delete";
export const GET_STUDENT_LIST_TO_ASSIGN_IN_TUTITION = "/student/filter/subject";
export const ADD_STUDENTS_IN_TUITION = "/tuition/add/student";
export const SUBSCRIBED_STUDENT_LIST = "/tuition/students";
export const SUBSCRIBE_TUITION = "/tuition/subscribe";
export const UNSUBSCRIBE_TUITION = "/tuition/unsubscribe";
export const UPCOMING_SESSION = "/tuition/sessions/upcoming";
export const ALL_SESSION = "/tuition/sessions/all";
export const COMPLETED_SESSION = "/tuition/sessions/completed";
export const COMPLETE_SESSION = "/tuition/sessions/complete";
export const STUDENT_ATTENDANCE = "/tuition/sessionStudents";
export const ATTENDANCE = "/tuition/takeAttendance";
export const TUTOR_EARNINGS = "/user/earnings";
export const USER_EXPENSES = "/user/expenses";
export const SUBSCRIBE_MY_COURSE = "/course/subscribe";
export const CREATE_RAZORPAY_ORDER = "/razorpay/createOrder";
export const USER_INVITE = "/user/invite";
export const TODO_LIST = "/todos/list";
export const TODO_DELETE = "/todos/delete";
export const ADD_TODO = "/todos/store";
export const MARK_AS_COMPLETE = "/todos/markAsComplete";
export const MARK_AS_INCOMPLETE = "/todos/markAsIncomplete";
export const STUDENT_LIST = "/friend/list/nonfriends";
export const MY_STUDENT_LIST = "/tutor/myStudent";
export const CHAT_STUDENT_LIST = "/user/friendsDropdown";
export const MESSAGE_STUDENT_LIST = "/friend/list/nonfriends";
export const REQUEST_SEND = "/friend/request/send";
export const GET_ALL_ACCESSRIGHTS = "/role/list";
export const ACCESSRIGHTS__STORE = "/role/store";
export const GET_MODULE_LIST = "/module/list";
export const ACCESSRIGHTS_UPDATE = "/role/update";
export const CLASS_LIST = "/class/list";
export const DELETE_CLASSES = "/class/delete";
export const VIEW_CLASSES = "/class/show";
export const CLASS_STORE = "class/store";

// message api
export const MESSAGE_LIST = "/message/message/list";
export const HISTORY_LIST = "/message/message/history";
export const MESSAGE_SEND = "/message/message/send";
export const CREATE_GROUP = "/message/group/create";
export const MESSAGE_READ = "/message/message/mark/read";
export const CLEAR_MESSAGE = "/message/clear/messages";
export const DELETE_CONVERSATION = "/message/message/deleteConversation";
export const LEAVE_GROUP = "/message/group/leave";
export const DELETE_GROUP = "/message/group/delete";
export const EDIT_GROUP = "/message/group/edit";
export const REMOVE_MEMBERS = "/message/group/remove/members";
export const ADD_MEMBER = "/message/group/add/members";

// chat api
export const CHAT_MESSAGE_LIST = "/chat/message/list";
export const CHAT_HISTORY_LIST = "/chat/message/history";
export const CHAT_MESSAGE_SEND = "/chat/message/send";
export const CHAT_CREATE_GROUP = "/chat/group/create";
export const CHAT_MESSAGE_READ = "/chat/message/mark/read";
export const CHAT_CLEAR_MESSAGE = "/chat/clear/messages";
export const CHAT_LEAVE_GROUP = "/chat/group/leave";
export const CHAT_DELETE_GROUP = "/chat/group/delete";
export const CHAT_EDIT_GROUP = "/chat/group/edit";
export const CHAT_REMOVE_MEMBERS = "/chat/group/remove/members";
export const CHAT_ADD_MEMBER = "/chat/group/add/members";

export const GET_ALL_LEVEL_LIST = "level/list";
export const QUESTION_SECTION_LIST = "/assignment/section";
export const CLASS_DIVISION_LIST = "/school/class/division";
export const QUESTION_TYPE_LIST = "/questionBank/types";
export const LIBRARY_LIST = "/library/libraryDropdown";
export const GET_ALL_LIBRARY = "/library/list";
export const STORE_MY_LIBRARY = "/library/store";
export const DELETE_MY_LIBRARY = "/library/delete";
export const LIBRARY_POST_ON_TIMELINE = "/timeline/postToTimeline";
export const UPDATE_MY_LIBRARY = "/library/update";
export const FILTER_MY_LIBRARY = "/library/filter";
export const COMMENT_LIBRARY = "/library/comment";
export const UPDATE_CLASS = "class/update";
export const GET_ALL_SUBJECT_LIST_ADMIN = "/subject/alllist";
export const STORE_SUBJECT = "/subject/store";
export const DELETE_SUBJECT = "/subject/delete";
export const UPDATE_SUBJECT = "/subject/update";
export const GET_ALL_USER_LIST = "/user/list";
export const ADD_USER = "/user/store";
export const DELETE_USER = "/user/delete";
export const GET_ALL_EVENTS = "/event/list";
export const ATTEND_EVENT = "/event/attend";
export const SAVE_CALENDAR_EVENT = "/event/makeEventFavourite";
export const GET_UPCOMMING_EVENTS = "/event/list";
export const STORE_MY_EVENT = "/event/store";
export const DELETE_MY_EVENT = "/event/delete";
export const GET_OTHER_ALL_TIMELINE = "/timeline/list";
export const GET_MY_ALL_TIMELINE = "/timeline/myTimeline";
export const ADD_TIMELINE = "/timeline/store";
export const DELETE_TIMELINE = "/timeline/delete";
export const UPDATE_TIMELINE = "/timeline/update";
export const LIKE_TIMELINE = "/timeline/like";
export const DISLIKE_TIMELINE = "/timeline/dislike";
export const FAVOURITE_TIMELINE = "/timeline/favourite";
export const ABUSE_TIMELINE = "/timeline/abuse";
export const COMMENT_TIMELINE = "/timeline/comment";
export const POINTS_HISTORY = "/points/history";
export const POINTS_TRANSFER = "/points/transfer";
export const USER_DROPDOWN = "/user/friendsDropdown";
export const USERLIST_DROPDOWN = "/user/userDropdown";
export const QUESTION_LIST = "/questionBank/list";
export const QUESTION_DELETE = "/questionBank/delete";
export const CHILD_LIST = "/user/myChilds";
export const IMPERSONATE = "/user/impersonate";
export const ALL_SETTING_POINT = "/settings/get";
export const GET_RAZORPAY_SETTINGS = "/settings/razorpay/retrive";
export const ADD_SETTING_POINT = "/settings/store";
export const QUESTION_ADD = "/questionBank/store";
export const FILTER_QUESTION_LIST = "/questionBank/filterQuestion";
export const LIST_ASSIGNMENT = "/assignment/myAssignment";
export const REQUEST_ACCESSRIGHT = "/user/requestForAccess";
export const NOT_ATTEMPTED_STUDENT =
  "/assignment/assignmentAttemptRemainStudent";
export const ASSIGNMENT_STUDENT = "/assignment/assignmentStudents";
export const ASSIGNMENT_PUBLISH = "/assignment/publishAssignment";
export const STUDENT_SUBMITTED_ASSIGNMENT =
  "/assignment/studentSubmittedAssignment";
export const STUDENT_ASSIGNMENT_SUBMIT = "/assignment/submitAssignment";
export const ATTEMPT_VIEW_STUDENT = "/assignment/view";
export const VIEW_SUBMIT_ASSIGNMENT = "/assignment/viewSubmittedAssignment";
export const ADD_ASSIGNMENT = "/assignment/store";
export const STUDENT_SUBMIT_ASSIGNMENT = "/assignment/submitAssignment";
export const TUTOR_EVALUATE_ASSIGNMENT = "/assignment/assignmentMarking";
export const RESET_PASSWORD = "/password/email";
export const FORGET_PASSWORD = "/password/reset";
export const BUY_POINT = "/points/buy";
export const EVENT_INVITATION = "/event/sendInvitation";
export const REPOST_TIMELINE = "/timeline/repost";
export const DIRECT_MESSAGE = "/message/directMessage";
export const SHARED_ME_LIBRARY = "/library/mySharedLibrary";
export const SHARED_LIBRARY = "/library/shareLibrary";
export const UPDATE_USER = "/user/update";

// school side API's
export const SCHOOL_DROPDOWN = "/school/schoolDropdown";
export const SCHOOL_DIVISION_LIST = "/school/class/division/divisionList";
export const CREATE_SCHOOL_CLASS = "/school/class/createClass";
export const SCHOOL_STUDET_LIST = "/user/userByRole";
export const SCHOOL_CLASS_BY_SYLLABUS = "/school/class/classBySyllabus";
export const SCHOOL_DIVISION_BY_CLASS =
  "/school/class/division/divisionByClass";
export const SCHOOL_LIST = "/school/list";
export const GET_ALL_CLASS_TUTOR = "/user/dropdownByRole";
export const ADD_SUBJECT_TEACHER = "/school/class/division/addSubjectTeacher";
export const UPDATE_OTHER_USER = "/user/updateOtherUser";
export const GET_ALL_STUDENT_TEACHER_LIST =
  "/school/class/division/getUsersToAdd";
export const ADD_STUDENT_IN_CLASS_SECTION =
  "/school/class/division/addDivisionStudent";
export const REMOVE_STUDENT_IN_CLASS_SECTION =
  "/school/class/division/removeUser";
export const ENABLE_DISABLE_USER = "/school/class/division/enableDisableUser";
export const TAKE_ATTENDANCE = "/school/class/division/takeSessionAttendance";
export const LIST_ATTENDANCE = "/school/class/division/getAttedanceByDate";
export const STORE_SECTION_TIMETABLE =
  "/school/class/division/addDivisionTimetable";
export const REQUEST_FOR_ACCESS_CLASS =
  "/school/class/division/requestDivisionAccess";
export const ADD_SUBJECT_LEADER = "/school/class/division/addSubjectLeader";
export const SCHOOL_DIARY_LIST = "/school/diary/myDivisionBasicDetails";
export const SUBJECT_BY_DIVISION = "/school/diary/divisionSubject";
export const ADD_DIARY = "/school/diary/addDiary";
export const VIEW_DIARY_BY_DATE = "/school/diary/myDiary";
export const UPDATE_SCHOOL_DIARY = "/school/diary/updateDiary";
export const VIEW_SCHOOL_DIARY = "/school/diary/schoolDiary";
export const POST_TO_TIMELINE = "/timeline/postToTimeline";
export const SHARED_DIARY_TO_MESSAGE = "/school/diary/shareInMessage";
export const SCHOOL_VERIFY = "/school/verifySchool";
export const SCHOOL_USERS_SUBJECT_LIST =
  "/school/class/division/userSubjectsDropdown";
export const SCHOOL_COLLABORATION = "/school/schoolCollaborationList";
export const SCHOOL_PLATFORM = "/school/schoolPlatformList";
export const ADD_SCHOOL = "/school/addSchool";
export const VERIFIED_SCHOOL = "/school/verifiedSchoolList";
export const JOIN_SCHOOL = "/school/joinSchool";
export const IMPERSONATE_SCHOOL = "/platform/switchAccount";

// school session API's
export const SCHOOL_ALL_SESSION = "/school/class/division/sessionList/all";
export const SCHOOL_COMPLETED_SESSION =
  "/school/class/division/sessionList/completed";
export const SCHOOL_UPCOMING_SESSION =
  "/school/class/division/sessionList/upcoming";
// export const SCHOOL_STUDENT_ATTENDANCE = '/tuition/sessionStudents'
// export const SCHOOL_ATTENDANCE = '/tuition/takeAttendance'
export const TIME_TABLE_LIST = "/school/class/division/editTimetable";

// Api For Invoice
export const ADD_INVOICE = "/invoice/create";
export const INVOICE_LIST = "/invoice/list";
export const INVOICE_FILTER = "/invoice/filter";

// Razor Pay Setting API
export const RESTRIVE_REZORPAY_SETTINGS = "/settings/razorpay/retrive"
export const STORE_REZORPAY_SETTINGS = "/settings/razorpay/store"
