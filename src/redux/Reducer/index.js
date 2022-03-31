import { combineReducers } from "redux";
import textBooks from "../../views/TextBook/textbookReducer";
import myProfile from "../../views/MyProfile/myprofilereducer";
import sidbarState from "./sideBarReducer";
import alert from "../Reducer/alertMessage/index";
import dropdowns from "./dropdowns/index";
import network from "../../views/Network/NetworkReducer";
import authReducer from "./auth/index";
import postSearchJob from "../../views/PostSearchJob/PostSearchReducer";
import myCourse from "../../views/Course/MyCourseReducers";
import searchCourse from "../../views/searchcourse/SearchCourseReducer";
import findTutor from "../../views/Findtutor/FindtutorReducer";
import notebookReducer from "../../views/NoteBook/notebookReducer";
import questionAnswer from "../../views/QuestionAnswers/QuestionAnswersReducer";
import feedBack from "../../views/FeedBacks/FeedBackReducer";
import TuitionReducer from "../../views/Tutions/TuitionReducers";
import sessions from "../../views/Sessions/sessionsReducer";
import payment from "../../views/Payment/paymentReducer";
import earnings from "../../views/Earnings/earningsReducer";
import todo from "../../views/Todo/TodoReducer";
import accessRights from "../../views/AccessRights/AccessRightsReducer";
import classReducer from "../../views/Class/ClassReducer";
import message from "../../views/Messages/MessageReducer";
import chat from "../../views/Chat/ChatReducer";
import syllabus from "../../views/Syllabus/SyllabusReducer";
import library from "../../views/Library/LibraryReducer";
import level from "../../views/Levels/levelReducer";
import subject from "../../views/Subject/subjectReducer";
import user from "../../views/Users/userReducer";
import events from "../../views/Events/EventsReducer";
import TimeLine from "../../views/Timeline/TimeLineReducer";
import MyPoints from "../../views/MyPoints/MyPointsReducer";
import questionBank from "../../views/QuestionBank/QuestionBankReducer";
import Children from "../../views/MyChilds/ChildrenReducer";
import InviteFriend from "../../views/InviteAFriend/InviteFriendReducer";
import Settings from "../../views/Settings/SettingReducer";
import Assignment from "../../views/Assignment/AssignmentReducer";
import HomeReducer from "../../views/Home/HomeReducer";
import AccessRequestReducer from "../../views/pages/page403/AccessRequestReducer";
import schoolClass from "../../views/SchoolSide/ClassRoom/SchoolClassReducer";
import SchoolInvite from "../../views/SchoolSide/InviteUser/InviteSchoolTutorReducer";
import SchoolStudent from "../../views/SchoolSide/StudentManagement/SchoolStuentReducer";
import SchoolTutor from "../../views/SchoolSide/TeacherManagement/SchoolTutorReducer";
import SchoolPlatform from "../../views/SchoolPlatform/SchoolPlatformReducer";
import schoolSessions from "../../views/SchoolSide/SchoolSessions/sessionsReducer";
import joinSchool from "../../views/SchoolSide/JoinSchool/JoinSchoolReducer";
import SchoolDiary from "../../views/SchoolSide/SchoolDiary/SchoolDiaryReducer";
import SchoolCollaboration from "../../views/SchoolCollaboration/SchoolCollaborationReducer";
import MySchoolReducer from "../../views/MySchool/MySchoolReducer";

const rootReducer = combineReducers({
  alert,
  sidbarState,
  textBooks,
  dropdowns,
  myProfile,
  authReducer,
  network,
  postSearchJob,
  myCourse,
  searchCourse,
  findTutor,
  notebookReducer,
  questionAnswer,
  feedBack,
  TuitionReducer,
  sessions,
  payment,
  earnings,
  todo,
  accessRights,
  classReducer,
  message,
  chat,
  syllabus,
  library,
  level,
  subject,
  user,
  events,
  TimeLine,
  MyPoints,
  questionBank,
  Children,
  InviteFriend,
  Settings,
  Assignment,
  HomeReducer,
  AccessRequestReducer,
  schoolClass,
  SchoolInvite,
  SchoolStudent,
  SchoolTutor,
  SchoolPlatform,
  schoolSessions,
  joinSchool,
  SchoolDiary,
  SchoolCollaboration,
  MySchoolReducer,
});
export default rootReducer;
