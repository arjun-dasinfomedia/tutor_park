import React from "react";

const Home = React.lazy(() => import("./views/Home"));
const MyProfile = React.lazy(() => import("./views/MyProfile"));
const Todo = React.lazy(() => import("./views/Todo/TopFilter"));
const PostSearchJob = React.lazy(() => import("./views/PostSearchJob"));
const Findtutor = React.lazy(() => import("./views/Findtutor"));
const MyPoints = React.lazy(() => import("./views/MyPoints"));
const FeedBacks = React.lazy(() => import("./views/FeedBacks"));
const QuestionAnswers = React.lazy(() => import("./views/QuestionAnswers"));
const GuardiansParents = React.lazy(() => import("./views/GuardiansParents"));
const Earnings = React.lazy(() => import("./views/Earnings/index"));
const Payment = React.lazy(() => import("./views/Payment"));
const TextBook = React.lazy(() => import("./views/TextBook"));
const Tutions = React.lazy(() => import("./views/Tutions"));
const Sessions = React.lazy(() => import("./views/Sessions/TopFilter"));
const Assignment = React.lazy(() => import("./views/Assignment"));
const AddAssignment = React.lazy(() =>
  import("./views/Assignment/AddAssignment")
);
const AttemptedAssignment = React.lazy(() =>
  import("./views/Assignment/AttemptedAssignmentList")
);
const AttemptedViewAssignmentTutor = React.lazy(() =>
  import("./views/Assignment/AttemptedViewAssignmentForTutor")
);
const AttemptedViewAssignmentForStudent = React.lazy(() =>
  import("./views/Assignment/AttemptedViewAssignmentForStudent")
);
const QuestionBank = React.lazy(() => import("./views/QuestionBank"));
const AddQuestionBank = React.lazy(() =>
  import("./views/QuestionBank/AddQuestionBank")
);
const DraftAssignementView = React.lazy(() =>
  import("./views/Assignment/draftAssignmentView")
);
const DraftAssignment = React.lazy(() =>
  import("./views/Assignment/PublishtAssignment")
);
const studentAttemptedAssignment = React.lazy(() =>
  import("./views/Assignment/StudentAttemptedAssignmentList")
);
const StudentViewAssignment = React.lazy(() =>
  import("./views/Assignment/StudentViewAssignment")
);
const Messages = React.lazy(() => import("./views/Messages"));
const Network = React.lazy(() => import("./views/Network"));
const Timeline = React.lazy(() => import("./views/Timeline"));
const Quiz = React.lazy(() => import("./views/Quiz/Quiz"));
const NoteBook = React.lazy(() => import("./views/NoteBook"));
const Course = React.lazy(() => import("./views/Course"));
const Events = React.lazy(() => import("./views/Events"));
const Library = React.lazy(() => import("./views/Library"));
const Chat = React.lazy(() => import("./views/Chat"));
const Groups = React.lazy(() => import("./views/Groups/Groups"));
const Axis = React.lazy(() => import("./views/Axis"));
const Games = React.lazy(() => import("./views/Games/Games"));
const JoinSchool = React.lazy(() => import("./views/SchoolSide/JoinSchool"));
const SchoolDiary = React.lazy(() => import("./views/SchoolSide/SchoolDiary"));
const ClassRoom = React.lazy(() => import("./views/SchoolSide/ClassRoom"));
const MySchool = React.lazy(() => import("./views/MySchool/MySchool"));
const SearhCourse = React.lazy(() => import("./views/searchcourse"));
const Settings = React.lazy(() => import("./views/Settings"));
const AccessRights = React.lazy(() => import("./views/AccessRights"));
const Syllabus = React.lazy(() => import("./views/Syllabus"));
const Subject = React.lazy(() => import("./views/Subject"));
const Class = React.lazy(() => import("./views/Class"));
const Levels = React.lazy(() => import("./views/Levels"));
const Users = React.lazy(() => import("./views/Users"));
const SchoolCollaboration = React.lazy(() =>
  import("./views/SchoolCollaboration")
);
const SchoolPlatform = React.lazy(() => import("./views/SchoolPlatform/"));
// const AccessRights = React.lazy(() => import('./views/AccessRights/AccessRights'))
const Logout = React.lazy(() => import("./views/Logout/Logout"));
const EmailInstruction = React.lazy(() =>
  import("./views/ServerEmailSupportInstruction")
);

// school side extra routes
const TeacherManagement = React.lazy(() =>
  import("./views/SchoolSide/TeacherManagement")
);
const StudentManagement = React.lazy(() =>
  import("./views/SchoolSide/StudentManagement")
);
const InviteUser = React.lazy(() => import("./views/SchoolSide/InviteUser"));
const SchoolSessions = React.lazy(() =>
  import("./views/SchoolSide/SchoolSessions/TopFilter")
);

// parent extra routes
const MyChilds = React.lazy(() => import("./views/MyChilds"));
const InviteAFriend = React.lazy(() => import("./views/InviteAFriend"));

// RazorPay Route Testing Purpose 
const RazorPay = React.lazy(() => import("./views/RazorPayTesting"));

const routes = [
  { path: "/home", exact: true, name: "home" },
  { path: "/home", name: "home", component: Home },
  { path: "/my-profile", name: "MyProfile", component: MyProfile },
  { path: "/todo", name: "Todo", component: Todo },
  { path: "/post-search-job", name: "PostSearchJob", component: PostSearchJob },
  { path: "/find-tutor", name: "Findtutor", component: Findtutor },
  { path: "/my-points", name: "MyPoints", component: MyPoints },
  { path: "/feedbacks", name: "FeedBacks", component: FeedBacks },
  {
    path: "/question-answers",
    name: "QuestionAnswers",
    component: QuestionAnswers,
  },
  {
    path: "/guardians-parents",
    name: "GuardiansParents",
    component: GuardiansParents,
  },
  { path: "/earnings", name: "Earnings", component: Earnings },
  { path: "/payment", name: "Payment", component: Payment },
  { path: "/textbook", name: "TextBook", component: TextBook },
  { path: "/tutions", name: "Tutions", component: Tutions },
  { path: "/sessions", name: "Sessions", component: Sessions },
  { path: "/assignment", name: "Assignment", component: Assignment },
  { path: "/messages", name: "Messages", component: Messages },
  { path: "/network", name: "Network", component: Network },
  { path: "/timeline", name: "Timeline", component: Timeline },
  { path: "/quiz", name: "Quiz", component: Quiz },
  { path: "/noteBook", name: "NoteBook", component: NoteBook },
  { path: "/course", name: "Course", component: Course },
  { path: "/events", name: "Events", component: Events },
  { path: "/library", name: "Library", component: Library },
  { path: "/chat", name: "Chat", component: Chat },
  { path: "/groups", name: "Groups", component: Groups },
  { path: "/axis", name: "Axis", component: Axis },
  { path: "/games", name: "Games", component: Games },
  { path: "/join-school", name: "JoinSchool", component: JoinSchool },
  { path: "/school-diary", name: "SchoolDiary", component: SchoolDiary },
  { path: "/class-room", name: "ClassRoom", component: ClassRoom },
  { path: "/my-school", name: "MySchool", component: MySchool },
  { path: "/searchcourse", name: "searchcourse", component: SearhCourse },
  { path: "/settings", name: "settings", component: Settings },
  { path: "/syllabus", name: "syllabus", component: Syllabus },
  { path: "/subject", name: "subject", component: Subject },
  { path: "/class", name: "class", component: Class },
  { path: "/levels", name: "levels", component: Levels },
  { path: "/users", name: "users", component: Users },
  {
    path: "/school-collaboration",
    name: "SchoolCollaboration",
    component: SchoolCollaboration,
  },
  {
    path: "/school-platform",
    name: "SchoolPlatform",
    component: SchoolPlatform,
  },
  { path: "/access-rights", name: "AccessRights", component: AccessRights },
  { path: "/logout", name: "Logout", component: Logout },
  { path: "/question-bank", name: "QuestionBank ", component: QuestionBank },
  {
    path: "/add-questionBank",
    name: "AddQuestionBank",
    component: AddQuestionBank,
  },
  {
    path: "/draft-assignment-view",
    name: "DraftAssignementView",
    component: DraftAssignementView,
  },
  { path: "/add-assignment", name: "AddAssignment", component: AddAssignment },
  {
    path: "/attempted-assignment",
    name: "AttemptedAssignment",
    component: AttemptedAssignment,
  },
  {
    path: "/attempt-student",
    name: "studentAttemptedAssignment",
    component: studentAttemptedAssignment,
  },
  {
    path: "/View-assign-student",
    name: "StudentViewAssignment",
    component: StudentViewAssignment,
  },
  {
    path: "/attempted-view-assign-tutor",
    name: "AttemptedViewAssignmentTutor",
    component: AttemptedViewAssignmentTutor,
  },
  {
    path: "/attempted-view-assign-student",
    name: "AttemptedViewAssignmentForStudent",
    component: AttemptedViewAssignmentForStudent,
  },
  { path: "/my-childrens", name: "MyChilds", component: MyChilds },
  { path: "/invite-friend", name: "InviteAFriend", component: InviteAFriend },
  {
    path: "/publish-assignment",
    name: "DraftAssignment",
    component: DraftAssignment,
  },
  {
    path: "/server-email-instruction",
    name: "EmailInstruction",
    component: EmailInstruction,
  },
  {
    path: "/teacher-management",
    name: "TeacherManagement",
    component: TeacherManagement,
  },
  {
    path: "/student-management",
    name: "StudentManagement",
    component: StudentManagement,
  },
  { path: "/invite-user", name: "InviteUser", component: InviteUser },
  {
    path: "/school-sessions",
    name: "SchoolSessions",
    component: SchoolSessions,
  },
  {
    path: "/razor-pay",
    name: "RazorPay",
    component: RazorPay,
  },
];

export default routes;
