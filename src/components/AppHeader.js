import React, { useLayoutEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CAvatar,
  CHeader,
  CHeaderToggler,
  CCol,
  CCard,
  CCardBody,
  CCardText,
  CCardImage,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import textbookIcon from "../assets/images/topmenu_icons/textbook.png";
import TuitionsIcon from "../assets/images/topmenu_icons/Tuitions.png";
import SessionIcon from "../assets/images/topmenu_icons/Session.png";
import AssignmentIcon from "../assets/images/topmenu_icons/Assignment.png";
import MessagesIcon from "../assets/images/topmenu_icons/Messages.png";
import NetworkIcon from "../assets/images/topmenu_icons/Network.png";
import timelineIcon from "../assets/images/topmenu_icons/timeline.png";
import NotebookIcon from "../assets/images/topmenu_icons/Notebook.png";
import QuizIcon from "../assets/images/topmenu_icons/Quiz.png";
import MyCourseIcon from "../assets/images/topmenu_icons/Course-Market.png";
import UpCommingEventsIcon from "../assets/images/topmenu_icons/Upcoming_Events.png";
import LibraryIcon from "../assets/images/topmenu_icons/Library.png";
import ChatIcon from "../assets/images/topmenu_icons/chat.png";
import GroupIcon from "../assets/images/topmenu_icons/Groups.png";
import AxisClassIcon from "../assets/images/topmenu_icons/Session-2.png";
import GameIcon from "../assets/images/topmenu_icons/Games.png";
import plusIcon from "../assets/images/topmenu_icons/plus.png";
import MenudownIcon from "../assets/images/topmenu_icons/Menu-down.png";

import textbookIconWhite from "../assets/images/topmenu_white_icons/textbook.png";
import TuitionsIconWhite from "../assets/images/topmenu_white_icons/Tuitions.png";
import SessionIconWhite from "../assets/images/topmenu_white_icons/Session-2.png";
import AssignmentIconWhite from "../assets/images/topmenu_white_icons/Assignment.png";
import MessagesIconWhite from "../assets/images/topmenu_white_icons/Messages.png";
import NetworkIconWhite from "../assets/images/topmenu_white_icons/Network.png";
import timelineIconWhite from "../assets/images/topmenu_white_icons/timeline.png";
import NotebookIconWhite from "../assets/images/topmenu_white_icons/Notebook.png";
import QuizIconWhite from "../assets/images/topmenu_white_icons/Quiz.png";
import MyCourseIconWhite from "../assets/images/topmenu_white_icons/Course-Market.png";
import UpCommingEventsIconWhite from "../assets/images/topmenu_white_icons/Upcoming Events.png";
import LibraryIconWhite from "../assets/images/topmenu_white_icons/Library.png";
import ChatIconWhite from "../assets/images/topmenu_white_icons/chat.png";
import GroupIconWhite from "../assets/images/topmenu_white_icons/Groups.png";
import AxisClassIconWhite from "../assets/images/topmenu_white_icons/Session-2.png";
import GameIconWhite from "../assets/images/topmenu_white_icons/Games.png";
import plusIconWhite from "../assets/images/topmenu_white_icons/plus.png";
import JoinSchoolWhite from "../assets/images/topmenu_white_icons/school-icon-white.png";
import MySchoolWhite from "../assets/images/topmenu_white_icons/school-icon-white-.png";
import classroomWhiteWhite from "../assets/images/topmenu_white_icons/classroom-white.png";

import Logo from "../assets/images/logo/TutorPark_Web_logo.png";
import { checkImpersonate, checkImpersonateSchool, getUserData, getUserRole } from "../utility/utils";
import { userImpersonate } from "src/views/MyChilds/ChildrenAction";
import { userImpersonateSchoolSide } from "src/views/MySchool/MySchoolAction";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidbarState);
  const [activeLink, setActiveLink] = useState(null);
  const [dropDownMoreItemStatus, setDropDownMoreItemStatus] = useState(false);
  const [displaySmallDeviceTopBarMenu, setDisplaySmallDeviceTopBarMenu] =
    React.useState("none");
  // const topMenuItemActive = useSelector((state) => state.sidbarState.topMenuItemActive)

  const sidebarShowData = sidebarShow.sidebarShow;
  const topMenuItemActiveData = sidebarShow.topMenuItemActive;

  const handleClick1 = (event) => {
    if (displaySmallDeviceTopBarMenu === "none") {
      setDisplaySmallDeviceTopBarMenu("block");
    } else {
      setDisplaySmallDeviceTopBarMenu("none");
    }
    // setDisplaySmallDeviceTopBarMenu("block");
  };
  const handleClose = () => {
    setDisplaySmallDeviceTopBarMenu("none");
    // alert(displaySmallDeviceTopBarMenu)
    const ddStyle = {
      display: "none",
    };
  };

  var menuLength = 0;

  var menuItems = [];

  var menuAdminLength = 0;

  var menuAdminItems = [];

  if (getUserRole() == "admin") {
    menuAdminItems = [
      {
        id: 1,
        title: "Text Book",
        iconBig: textbookIcon,
        link: "/textbook",
        iconwhite: textbookIconWhite,
      },
      {
        id: 2,
        title: "Tuitions",
        iconBig: TuitionsIcon,
        link: "/tutions",
        iconwhite: TuitionsIconWhite,
      },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/sessions",
        iconwhite: SessionIconWhite,
      },
      {
        id: 4,
        title: "Assignment",
        iconBig: AssignmentIcon,
        link: "/assignment",
        iconwhite: AssignmentIconWhite,
      },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      {
        id: 6,
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
        iconwhite: NotebookIconWhite,
      },
      {
        id: 7,
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
        iconwhite: MyCourseIconWhite,
      },
      {
        id: 8,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 9,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 10,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
    ];
  } else if (getUserRole() == "tutor") {
    menuItems = [
      {
        id: 1,
        title: "Textbook",
        iconBig: textbookIcon,
        link: "/textbook",
        iconwhite: textbookIconWhite,
      },
      {
        id: 2,
        title: "Tuitions",
        iconBig: TuitionsIcon,
        link: "/tutions",
        iconwhite: TuitionsIconWhite,
      },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/sessions",
        iconwhite: SessionIconWhite,
      },
      {
        id: 4,
        title: "Assignment",
        iconBig: AssignmentIcon,
        link: "/assignment",
        iconwhite: AssignmentIconWhite,
      },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      {
        id: 6,
        title: "Network",
        iconBig: NetworkIcon,
        link: "/network",
        iconwhite: NetworkIconWhite,
      },
      {
        id: 7,
        title: "Timeline",
        iconBig: timelineIcon,
        link: "/timeline",
        iconwhite: timelineIconWhite,
      },
      {
        id: 8,
        title: "Quiz",
        iconBig: QuizIcon,
        link: "quiz",
        iconwhite: QuizIconWhite,
      },
      {
        id: 9,
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
        iconwhite: NotebookIconWhite,
      },
      {
        id: 10,
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
        iconwhite: MyCourseIconWhite,
      },
      {
        id: 11,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 12,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 13,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
      {
        id: 14,
        title: "Groups",
        iconBig: GroupIcon,
        link: "/groups",
        iconwhite: GroupIconWhite,
      },
      {
        id: 15,
        title: "Axis",
        iconBig: AxisClassIcon,
        link: "/axis",
        iconwhite: AxisClassIconWhite,
      },
      {
        id: 16,
        title: "Games",
        iconBig: GameIcon,
        link: "/games",
        iconwhite: GameIconWhite,
      },
    ];
  } else if (getUserRole() == "student") {
    menuItems = [
      {
        id: 1,
        title: "Textbook",
        iconBig: textbookIcon,
        link: "/textbook",
        iconwhite: textbookIconWhite,
      },
      {
        id: 2,
        title: "Tuitions",
        iconBig: TuitionsIcon,
        link: "/tutions",
        iconwhite: TuitionsIconWhite,
      },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/sessions",
        iconwhite: SessionIconWhite,
      },
      {
        id: 4,
        title: "Assignment",
        iconBig: AssignmentIcon,
        link: "/assignment",
        iconwhite: AssignmentIconWhite,
      },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      {
        id: 6,
        title: "Network",
        iconBig: NetworkIcon,
        link: "/network",
        iconwhite: NetworkIconWhite,
      },
      {
        id: 7,
        title: "Timeline",
        iconBig: timelineIcon,
        link: "/timeline",
        iconwhite: timelineIconWhite,
      },
      {
        id: 8,
        title: "Quiz",
        iconBig: QuizIcon,
        link: "quiz",
        iconwhite: QuizIconWhite,
      },
      {
        id: 9,
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
        iconwhite: NotebookIconWhite,
      },
      {
        id: 10,
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
        iconwhite: MyCourseIconWhite,
      },
      {
        id: 11,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 12,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 13,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
      {
        id: 14,
        title: "Groups",
        iconBig: GroupIcon,
        link: "/groups",
        iconwhite: GroupIconWhite,
      },
      {
        id: 15,
        title: "Axis",
        iconBig: AxisClassIcon,
        link: "/axis",
        iconwhite: AxisClassIconWhite,
      },
      {
        id: 16,
        title: "Games",
        iconBig: GameIcon,
        link: "/games",
        iconwhite: GameIconWhite,
      },
    ];
  } else if (getUserRole() == "parent") {
    menuItems = [
      {
        id: 1,
        title: "Textbook",
        iconBig: textbookIcon,
        link: "/textbook",
        iconwhite: textbookIconWhite,
      },
      {
        id: 2,
        title: "Tuitions",
        iconBig: TuitionsIcon,
        link: "/tutions",
        iconwhite: TuitionsIconWhite,
      },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/sessions",
        iconwhite: SessionIconWhite,
      },
      {
        id: 4,
        title: "Assignment",
        iconBig: AssignmentIcon,
        link: "/assignment",
        iconwhite: AssignmentIconWhite,
      },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      {
        id: 6,
        title: "Network",
        iconBig: NetworkIcon,
        link: "/network",
        iconwhite: NetworkIconWhite,
      },
      {
        id: 7,
        title: "Timeline",
        iconBig: timelineIcon,
        link: "/timeline",
        iconwhite: timelineIconWhite,
      },
      {
        id: 8,
        title: "Quiz",
        iconBig: QuizIcon,
        link: "quiz",
        iconwhite: QuizIconWhite,
      },
      {
        id: 9,
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
        iconwhite: NotebookIconWhite,
      },
      {
        id: 10,
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
        iconwhite: MyCourseIconWhite,
      },
      {
        id: 11,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 12,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 13,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
      {
        id: 14,
        title: "Groups",
        iconBig: GroupIcon,
        link: "/groups",
        iconwhite: GroupIconWhite,
      },
      {
        id: 15,
        title: "Axis",
        iconBig: AxisClassIcon,
        link: "/axis",
        iconwhite: AxisClassIconWhite,
      },
      {
        id: 16,
        title: "Games",
        iconBig: GameIcon,
        link: "/games",
        iconwhite: GameIconWhite,
      },
    ];
  } else if (getUserRole() == "school-admin") {
    menuItems = [
      // {
      //   id: 1,
      //   title: 'Text Book',
      //   iconBig: textbookIcon,
      //   link: '/textbook',
      //   iconwhite: textbookIconWhite
      // },
      // {
      //   id: 2,
      //   title: 'Tuitions',
      //   iconBig: TuitionsIcon,
      //   link: '/tutions',
      //   iconwhite: TuitionsIconWhite
      // },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/school-sessions",
        iconwhite: SessionIconWhite,
      },
      // {
      //   id: 4,
      //   title: 'Assignment',
      //   iconBig: AssignmentIcon,
      //   link: '/assignment',
      //   iconwhite: AssignmentIconWhite
      // },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      // {
      //   id: 6,
      //   title: 'Network',
      //   iconBig: NetworkIcon,
      //   link: '/network',
      //   iconwhite: NetworkIconWhite
      // },
      {
        id: 7,
        title: "Timeline",
        iconBig: timelineIcon,
        link: "/timeline",
        iconwhite: timelineIconWhite,
      },
      // {
      //   id: 8,
      //   title: 'Quiz',
      //   iconBig: QuizIcon,
      //   link: 'quiz',
      //   iconwhite: QuizIconWhite
      // },
      // {
      //   id: 9,
      //   title: 'Notebook',
      //   iconBig: NotebookIcon,
      //   link: '/notebook',
      //   iconwhite: NotebookIconWhite
      // },
      // {
      //   id: 10,
      //   title: 'Course',
      //   iconBig: MyCourseIcon,
      //   link: '/course',
      //   iconwhite: MyCourseIconWhite
      // },
      {
        id: 11,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 12,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 13,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
      // {
      //   id: 14,
      //   title: 'Groups',
      //   iconBig: GroupIcon,
      //   link: '/groups',
      //   iconwhite: GroupIconWhite
      // },
      // {
      //   id: 15,
      //   title: 'Axis',
      //   iconBig: AxisClassIcon,
      //   link: '/axis',
      //   iconwhite: AxisClassIconWhite
      // },
      // {
      //   id: 16,
      //   title: 'Games',
      //   iconBig: GameIcon,
      //   link: '/games',
      //   iconwhite: GameIconWhite
      // },
    ];
  } else if (getUserRole() == "school-tutor") {
    menuItems = [
      // {
      //   id: 1,
      //   title: 'Text Book',
      //   iconBig: textbookIcon,
      //   link: '/textbook',
      //   iconwhite: textbookIconWhite
      // },
      // {
      //   id: 2,
      //   title: 'Tuitions',
      //   iconBig: TuitionsIcon,
      //   link: '/tutions',
      //   iconwhite: TuitionsIconWhite
      // },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/school-sessions",
        iconwhite: SessionIconWhite,
      },
      // {
      //   id: 4,
      //   title: 'Assignment',
      //   iconBig: AssignmentIcon,
      //   link: '/assignment',
      //   iconwhite: AssignmentIconWhite
      // },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      // {
      //   id: 6,
      //   title: 'Network',
      //   iconBig: NetworkIcon,
      //   link: '/network',
      //   iconwhite: NetworkIconWhite
      // },
      {
        id: 7,
        title: "Timeline",
        iconBig: timelineIcon,
        link: "/timeline",
        iconwhite: timelineIconWhite,
      },
      // {
      //   id: 8,
      //   title: 'Quiz',
      //   iconBig: QuizIcon,
      //   link: 'quiz',
      //   iconwhite: QuizIconWhite
      // },
      // {
      //   id: 9,
      //   title: 'Notebook',
      //   iconBig: NotebookIcon,
      //   link: '/notebook',
      //   iconwhite: NotebookIconWhite
      // },
      // {
      //   id: 10,
      //   title: 'Course',
      //   iconBig: MyCourseIcon,
      //   link: '/course',
      //   iconwhite: MyCourseIconWhite
      // },
      {
        id: 11,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 12,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 13,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
      // {
      //   id: 14,
      //   title: 'Groups',
      //   iconBig: GroupIcon,
      //   link: '/groups',
      //   iconwhite: GroupIconWhite
      // },
      // {
      //   id: 15,
      //   title: 'Axis',
      //   iconBig: AxisClassIcon,
      //   link: '/axis',
      //   iconwhite: AxisClassIconWhite
      // },
      // {
      //   id: 16,
      //   title: 'Games',
      //   iconBig: GameIcon,
      //   link: '/games',
      //   iconwhite: GameIconWhite
      // },
    ];
  } else if (getUserRole() == "school-student") {
    menuItems = [
      // {
      //   id: 1,
      //   title: 'Text Book',
      //   iconBig: textbookIcon,
      //   link: '/textbook',
      //   iconwhite: textbookIconWhite
      // },
      // {
      //   id: 2,
      //   title: 'Tuitions',
      //   iconBig: TuitionsIcon,
      //   link: '/tutions',
      //   iconwhite: TuitionsIconWhite
      // },
      {
        id: 3,
        title: "Sessions",
        iconBig: SessionIcon,
        link: "/school-sessions",
        iconwhite: SessionIconWhite,
      },
      // {
      //   id: 4,
      //   title: 'Assignment',
      //   iconBig: AssignmentIcon,
      //   link: '/assignment',
      //   iconwhite: AssignmentIconWhite
      // },
      {
        id: 5,
        title: "Messages",
        iconBig: MessagesIcon,
        link: "/messages",
        iconwhite: MessagesIconWhite,
      },
      // {
      //   id: 6,
      //   title: 'Network',
      //   iconBig: NetworkIcon,
      //   link: '/network',
      //   iconwhite: NetworkIconWhite
      // },
      {
        id: 7,
        title: "Timeline",
        iconBig: timelineIcon,
        link: "/timeline",
        iconwhite: timelineIconWhite,
      },
      // {
      //   id: 8,
      //   title: 'Quiz',
      //   iconBig: QuizIcon,
      //   link: 'quiz',
      //   iconwhite: QuizIconWhite
      // },
      // {
      //   id: 9,
      //   title: 'Notebook',
      //   iconBig: NotebookIcon,
      //   link: '/notebook',
      //   iconwhite: NotebookIconWhite
      // },
      // {
      //   id: 10,
      //   title: 'Course',
      //   iconBig: MyCourseIcon,
      //   link: '/course',
      //   iconwhite: MyCourseIconWhite
      // },
      {
        id: 11,
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
        iconwhite: UpCommingEventsIconWhite,
      },
      {
        id: 12,
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
        iconwhite: LibraryIconWhite,
      },
      {
        id: 13,
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
        iconwhite: ChatIconWhite,
      },
      // {
      //   id: 14,
      //   title: 'Groups',
      //   iconBig: GroupIcon,
      //   link: '/groups',
      //   iconwhite: GroupIconWhite
      // },
      // {
      //   id: 15,
      //   title: 'Axis',
      //   iconBig: AxisClassIcon,
      //   link: '/axis',
      //   iconwhite: AxisClassIconWhite
      // },
      // {
      //   id: 16,
      //   title: 'Games',
      //   iconBig: GameIcon,
      //   link: '/games',
      //   iconwhite: GameIconWhite
      // },
    ];
  }

  var removeDropDownMenuItem = [];

  var removeDropDownMenuAdminItem = [];

  if (getUserRole() == "admin") {
    removeDropDownMenuAdminItem = [
      {
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
      },
      {
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
      },
      {
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
      },
    ];
  } else if (getUserRole() == "tutor") {
    removeDropDownMenuItem = [
      {
        title: "Quiz",
        iconBig: QuizIcon,
        link: "/quiz",
      },
      {
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
      },
      {
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
      },
      {
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
      },
      {
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
      },
      {
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
      },
      {
        title: "Groups",
        iconBig: GroupIcon,
        link: "/groups",
      },
      {
        title: "Axis",
        iconBig: AxisClassIcon,
        link: "/axis",
      },
      {
        title: "Games",
        iconBig: GameIcon,
        link: "/games",
      },
    ];
  } else if (getUserRole() == "student") {
    removeDropDownMenuItem = [
      {
        title: "Quiz",
        iconBig: QuizIcon,
        link: "/quiz",
      },
      {
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
      },
      {
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
      },
      {
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
      },
      {
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
      },
      {
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
      },
      {
        title: "Groups",
        iconBig: GroupIcon,
        link: "/groups",
      },
      {
        title: "Axis",
        iconBig: AxisClassIcon,
        link: "/axis",
      },
      {
        title: "Games",
        iconBig: GameIcon,
        link: "/games",
      },
    ];
  } else if (getUserRole() == "parent") {
    removeDropDownMenuItem = [
      {
        title: "Quiz",
        iconBig: QuizIcon,
        link: "/quiz",
      },
      {
        title: "Notebook",
        iconBig: NotebookIcon,
        link: "/notebook",
      },
      {
        title: "Course",
        iconBig: MyCourseIcon,
        link: "/course",
      },
      {
        title: "Events",
        iconBig: UpCommingEventsIcon,
        link: "/events",
      },
      {
        title: "Library",
        iconBig: LibraryIcon,
        link: "/library",
      },
      {
        title: "Chat",
        iconBig: ChatIcon,
        link: "/chat",
      },
      {
        title: "Groups",
        iconBig: GroupIcon,
        link: "/groups",
      },
      {
        title: "Axis",
        iconBig: AxisClassIcon,
        link: "/axis",
      },
      {
        title: "Games",
        iconBig: GameIcon,
        link: "/games",
      },
    ];
  }

  function handleClick(Key) {
    setActiveLink(Key);
    // activeLink = Key
  }

  function moreItemDropdownHandleClick(Key) {
    // alert(Key)
    setDropDownMoreItemStatus(Key);
    // activeLink = Key
  }

  // var removeDropDownMenuItem = menuItems;

  // get device width dynamically for top menu bar responsive
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }
  const [width, height] = useWindowSize();

  // conditions for top menu and dropdown items
  // if( width === 1366 ) {

  if (width >= 1280 && width <= 1366) {
    menuAdminLength = 6;
  } else if (width >= 1367 && width <= 1517) {
    menuAdminLength = 7;
    removeDropDownMenuAdminItem.splice(0, 1);
  } else if (width > 1518 && width <= 1600) {
    menuAdminLength = 8;
    removeDropDownMenuAdminItem.splice(0, 2);
  } else if (width >= 1601 && width <= 1750) {
    menuAdminLength = 9;
    removeDropDownMenuAdminItem.splice(0, 3);
  } else if (width >= 1751 && width <= 1900) {
    menuAdminLength = 10;
    removeDropDownMenuAdminItem.splice(0, 4);
  } else if (width >= 1901 && width <= 2000) {
    menuAdminLength = 11;
    removeDropDownMenuAdminItem.splice(0, 5);
  } else if (width >= 2001 && width <= 2100) {
    menuAdminLength = 12;
    removeDropDownMenuAdminItem.splice(0, 6);
  } else if (width >= 2101 && width <= 2200) {
    menuAdminLength = 13;
    removeDropDownMenuAdminItem.splice(0, 7);
  } else if (width >= 2201 && width <= 2300) {
    menuAdminLength = 14;
    removeDropDownMenuAdminItem.splice(0, 8);
  } else if (width >= 2301 && width <= 2400) {
    menuAdminLength = 15;
    removeDropDownMenuAdminItem.splice(0, 9);
  } else if (width >= 2401 && width <= 2500) {
    menuAdminLength = 15;
    removeDropDownMenuAdminItem.splice(0, 9);
  } else if (width >= 2500) {
    menuAdminLength = 16;
  }

  if (width >= 1280 && width <= 1366) {
    menuLength = 6;
  } else if (width >= 1367 && width <= 1517) {
    menuLength = 7;
    removeDropDownMenuItem.splice(0, 1);
  } else if (width > 1518 && width <= 1600) {
    menuLength = 8;
    removeDropDownMenuItem.splice(0, 2);
  } else if (width >= 1601 && width <= 1750) {
    menuLength = 9;
    removeDropDownMenuItem.splice(0, 3);
  } else if (width >= 1751 && width <= 1900) {
    menuLength = 10;
    removeDropDownMenuItem.splice(0, 4);
  } else if (width >= 1901 && width <= 2000) {
    menuLength = 11;
    removeDropDownMenuItem.splice(0, 5);
  } else if (width >= 2001 && width <= 2100) {
    menuLength = 12;
    removeDropDownMenuItem.splice(0, 6);
  } else if (width >= 2101 && width <= 2200) {
    menuLength = 13;
    removeDropDownMenuItem.splice(0, 7);
  } else if (width >= 2201 && width <= 2300) {
    menuLength = 14;
    removeDropDownMenuItem.splice(0, 8);
  } else if (width >= 2301 && width <= 2400) {
    menuLength = 15;
    removeDropDownMenuItem.splice(0, 9);
  } else if (width >= 2401 && width <= 2500) {
    menuLength = 15;
    removeDropDownMenuItem.splice(0, 9);
  } else if (width >= 2500) {
    menuLength = 16;
  }

  // render design for top menu device width wise
  const menuDesign = menuItems.map(function (item, key) {
    if (key <= menuLength) {
      return (
        <CCol
          className="top-menu-padding"
          key={key}
          onClick={() =>
            dispatch({ type: "top_menu_item_active", topMenuItemActive: true })
          }
        >
          <CCard
            className={
              "card-css" +
              (item.id === activeLink && topMenuItemActiveData === true
                ? "_active_item"
                : "")
            }
          >
            {/* <CNavLink href={item.link} className="header-top-menu-nav-link-css" onClick={() => handleClick(item.id)} */}
            <NavLink
              to={item.link}
              className="header-top-menu-nav-link-css"
              onClick={() => handleClick(item.id)}
            >
              <CCardBody
                className={
                  "text-center custom-headercard-body " +
                  (item.title.length > 10 ? "long-menu-card-body-top-menu" : "")
                }
              >
                <CCardImage
                  src={
                    item.id === activeLink && topMenuItemActiveData === true
                      ? item.iconwhite
                      : item.iconBig
                  }
                  className="card-Image"
                ></CCardImage>

                <CCardText
                  className={
                    "card-Name" +
                    (item.id === activeLink && topMenuItemActiveData === true
                      ? "_active_item"
                      : "") +
                    (item.title.length > 10
                      ? " long-menu-card-text-top-menu"
                      : "")
                  }
                >
                  {item.title}
                </CCardText>
              </CCardBody>
              {item.id === activeLink && topMenuItemActiveData === true ? (
                <div className="active-triangle"></div>
              ) : (
                ""
              )}
            </NavLink>
          </CCard>
        </CCol>
      );
    }
  });

  const menuAdminDesign = menuAdminItems.map(function (item, key) {
    if (key <= menuAdminLength) {
      return (
        <CCol
          className="top-menu-padding"
          key={key}
          onClick={() =>
            dispatch({ type: "top_menu_item_active", topMenuItemActive: true })
          }
        >
          <CCard
            className={
              "card-css" +
              (item.id === activeLink && topMenuItemActiveData === true
                ? "_active_item"
                : "")
            }
          >
            {/* <CNavLink href={item.link} className="header-top-menu-nav-link-css" onClick={() => handleClick(item.id)} */}
            <NavLink
              to={item.link}
              className="header-top-menu-nav-link-css"
              onClick={() => handleClick(item.id)}
            >
              <CCardBody
                className={
                  "text-center custom-headercard-body " +
                  (item.title.length > 10 ? "long-menu-card-body-top-menu" : "")
                }
              >
                <CCardImage
                  src={
                    item.id === activeLink && topMenuItemActiveData === true
                      ? item.iconwhite
                      : item.iconBig
                  }
                  className="card-Image"
                ></CCardImage>

                <CCardText
                  className={
                    "card-Name" +
                    (item.id === activeLink && topMenuItemActiveData === true
                      ? "_active_item"
                      : "") +
                    (item.title.length > 10
                      ? " long-menu-card-text-top-menu"
                      : "")
                  }
                >
                  {item.title}
                </CCardText>
              </CCardBody>
              {item.id === activeLink && topMenuItemActiveData === true ? (
                <div className="active-triangle"></div>
              ) : (
                ""
              )}
            </NavLink>
          </CCard>
        </CCol>
      );
    }
  });

  // render more item dropdown items according to device width
  const dropDownItemDynamic = removeDropDownMenuItem.map(function (item, key) {
    return (
      <NavLink
        key={key}
        to={item.link}
        className="textDecorationNone"
        onClick={() => {
          handleClose();
          dispatch({ type: "top_menu_item_active", topMenuItemActive: false });
        }}
      >
        <CDropdownItem className="dropdown-item-css" key={key}>
          <CCardImage
            src={item.iconBig}
            className="more-menu-Image"
          ></CCardImage>
          {item.title}
        </CDropdownItem>
      </NavLink>
    );
  });

  const dropDownItemAdminDynamic = removeDropDownMenuAdminItem.map(function (
    item,
    key
  ) {
    return (
      <NavLink
        key={key}
        to={item.link}
        className="textDecorationNone"
        onClick={() => {
          handleClose();
          dispatch({ type: "top_menu_item_active", topMenuItemActive: false });
        }}
      >
        <CDropdownItem className="dropdown-item-css" key={key}>
          <CCardImage
            src={item.iconBig}
            className="more-menu-Image"
          ></CCardImage>
          {item.title}
        </CDropdownItem>
      </NavLink>
    );
  });

  const handleLeaveImpersonate = async () => {
    var oldUserId = localStorage.getItem("existing_user_id");
    if (getUserData().id !== oldUserId) {
      await dispatch(userImpersonate({ id: oldUserId }, "leave_impersonate"));
      window.location.reload()
    }
  };

  const handleLeaveSchoolImpersonate = async () => {
    await dispatch(userImpersonateSchoolSide("leave_impersonate"));
    window.location.reload()
  };

  // render ui code
  return (
    <CHeader position="sticky" className="mb-3">
      {/* <CContainer fluid> */}
      <CHeaderToggler
        className="ps-1 toggle-menu-hide-from-destop-view"
        onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShowData })}
        // onClick={() => alert("Hello") }
      >
        <CIcon
          icon={cilMenu}
          style={{ width: 35, height: 35, color: "383838" }}
        />
      </CHeaderToggler>
      <Link to="/home" className="toggle-menu-hide-from-destop-view">
        <CAvatar
          src={Logo}
          style={{ height: 100, width: 180 }}
          className="ps-1 toggle-menu-hide-from-destop-view"
        />
      </Link>
      <CDropdown
        variant="nav-item"
        className="toggle-menu-hide-from-destop-view marker-remove-css "
      >
        <CDropdownToggle
          placement="bottom-end"
          className="py-0 toggle-menu-hide-from-destop-view "
          caret={false}
        >
          <CAvatar onClick={handleClick1} src={MenudownIcon} size="md" />
        </CDropdownToggle>
        {getUserRole() !== "admin" ? (
          getUserRole() === "school-admin" ||
          getUserRole() === "school-tutor" ||
          getUserRole() === "school-student" ? (
            <CDropdownMenu
              className="pt-0 menu-moblie-view dropdown-menu-phone-css"
              placement="bottom-end"
              style={{ display: displaySmallDeviceTopBarMenu }}
            >
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/sessions"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={SessionIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Sessions
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/events"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={UpCommingEventsIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Events
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/messages"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={MessagesIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Messages
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/chat"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={ChatIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Chat
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/timeline"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={timelineIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Timeline
                    </CDropdownItem>
                  </NavLink>
                </div>

                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/library"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={LibraryIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Library
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>

              <div className="row d-flex justify-content-evenly dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/school-diary"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={LibraryIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      School Diary
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/class-room"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={ChatIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Class Room
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
            </CDropdownMenu>
          ) : (
            <CDropdownMenu
              className="pt-0 menu-moblie-view dropdown-menu-phone-css"
              placement="bottom-end"
              style={{ display: displaySmallDeviceTopBarMenu }}
            >
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/textbook"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={textbookIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Textbook
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/noteBook"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={NotebookIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Notebook
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/tutions"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={TuitionsIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      My Tuitions
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/course"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={MyCourseIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Course
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/sessions"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={SessionIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Sessions
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/events"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={UpCommingEventsIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Events
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/assignment"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={AssignmentIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Assignments
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/library"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={LibraryIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Library
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/messages"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={MessagesIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Messages
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/chat"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={ChatIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Chat
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/network"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={NetworkIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Network
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/timeline"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={timelineIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Timeline
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/noteBook"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={AxisClassIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Axis Class
                    </CDropdownItem>
                  </NavLink>
                </div>
                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/quiz"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={QuizIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Quiz
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
              <div className="row dropdown-menu-row-css">
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/games"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={GameIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Games
                    </CDropdownItem>
                  </NavLink>
                </div>

                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/join-school"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={JoinSchoolWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Join School
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>

              <div className="row dropdown-menu-row-css">
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/school-diary"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={LibraryIconWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      School Diary
                    </CDropdownItem>
                  </NavLink>
                </div>

                <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/class-room"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={classroomWhiteWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      Class Room
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>

              <div className="row dropdown-menu-row-css">
                <div className=" col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <NavLink
                    to="/home"
                    className="textDecorationNone"
                    onClick={handleClose}
                  >
                    <CDropdownItem className="dropdown-menu-item-phone-css">
                      <CCardImage
                        src={MySchoolWhite}
                        className="card-Image dropdown-menu-item-phone-image-css"
                      ></CCardImage>
                      My School
                    </CDropdownItem>
                  </NavLink>
                </div>
              </div>
            </CDropdownMenu>
          )
        ) : (
          <CDropdownMenu
            className="pt-0 menu-moblie-view dropdown-menu-phone-css"
            placement="bottom-end"
            style={{ display: displaySmallDeviceTopBarMenu }}
          >
            <div className="row dropdown-menu-row-css">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/textbook"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={textbookIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Textbook
                  </CDropdownItem>
                </NavLink>
              </div>
              <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/tutions"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={NotebookIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Tuitions
                  </CDropdownItem>
                </NavLink>
              </div>
            </div>
            <div className="row dropdown-menu-row-css">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/sessions"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={TuitionsIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Sessions
                  </CDropdownItem>
                </NavLink>
              </div>
              <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/assignment"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={MyCourseIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Assignment
                  </CDropdownItem>
                </NavLink>
              </div>
            </div>
            <div className="row dropdown-menu-row-css">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/messages"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={SessionIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Messages
                  </CDropdownItem>
                </NavLink>
              </div>
              <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/notebook"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={UpCommingEventsIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Notebook
                  </CDropdownItem>
                </NavLink>
              </div>
            </div>
            <div className="row d-flex justify-content-evenly dropdown-menu-row-css">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/course"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={AssignmentIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Course
                  </CDropdownItem>
                </NavLink>
              </div>
              <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/events"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={LibraryIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Events
                  </CDropdownItem>
                </NavLink>
              </div>
            </div>
            <div className="row d-flex justify-content-evenly dropdown-menu-row-css">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/library"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={LibraryIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Library
                  </CDropdownItem>
                </NavLink>
              </div>
              <div className="toogle-menu-padding col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <NavLink
                  to="/chat"
                  className="textDecorationNone"
                  onClick={handleClose}
                >
                  <CDropdownItem className="dropdown-menu-item-phone-css">
                    <CCardImage
                      src={ChatIconWhite}
                      className="card-Image dropdown-menu-item-phone-image-css"
                    ></CCardImage>
                    Chat
                  </CDropdownItem>
                </NavLink>
              </div>
            </div>
          </CDropdownMenu>
        )}
      </CDropdown>

      {getUserRole() == "admin" ? (
        <div
          className="row top-menu-hide-from-mobile-view"
          style={{ marginLeft: "0" }}
        >
          {menuAdminDesign}
          {width < 1650 ? (
            <CCol className="top-menu-padding">
              <CDropdown>
                <CDropdownToggle
                  className="py-0 header-more-item-background-color top-menu-padding menu-active-color"
                  caret={false}
                >
                  <CCard className="card-css" onClick={handleClick1}>
                    <CCardBody>
                      <CCardImage
                        src={plusIcon}
                        className="card-Image"
                      ></CCardImage>
                      <CCardText className="card-Name">More Items</CCardText>
                    </CCardBody>
                  </CCard>
                </CDropdownToggle>
                <CDropdownMenu
                  style={{
                    display: displaySmallDeviceTopBarMenu,
                    marginTop: 90,
                    marginLeft: -25,
                  }}
                  className="pt-0"
                >
                  {dropDownItemAdminDynamic}
                </CDropdownMenu>
              </CDropdown>
            </CCol>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          className="row top-menu-hide-from-mobile-view"
          style={{ marginLeft: "0" }}
        >
          {menuDesign}
          {getUserRole() !== "school-admin" &&
          getUserRole() !== "school-tutor" &&
          getUserRole() !== "school-student" ? (
            width < 2500 ? (
              <CCol className="top-menu-padding">
                <CDropdown>
                  <CDropdownToggle
                    className="py-0 header-more-item-background-color top-menu-padding menu-active-color"
                    caret={false}
                  >
                    <CCard className="card-css" onClick={handleClick1}>
                      <CCardBody>
                        <CCardImage
                          src={plusIcon}
                          className="card-Image"
                        ></CCardImage>
                        <CCardText className="card-Name">More Items</CCardText>
                      </CCardBody>
                    </CCard>
                  </CDropdownToggle>
                  <CDropdownMenu
                    style={{
                      display: displaySmallDeviceTopBarMenu,
                      marginTop: 90,
                      marginLeft: -25,
                    }}
                    className="pt-0 pb-0"
                  >
                    {dropDownItemDynamic}
                  </CDropdownMenu>
                </CDropdown>
              </CCol>
            ) : (
              ""
            )
          ) : (
            <></>
          )}
        </div>
      )}

      {(checkImpersonate() === "true") ? (
        <button
          onClick={() => handleLeaveImpersonate()}
          type="submit"
          class="button-animate"
        >
          Leave!
        </button>
      ) : null}
      {checkImpersonateSchool() === "true" &&
      (getUserRole() === "school-student" ||
        getUserRole() === "school-tutor") ? (
        <button
          onClick={() => handleLeaveSchoolImpersonate()}
          type="submit"
          class="button-animate"
        >
          Switch Account!
        </button>
      ) : null}
    </CHeader>
  );
};

export default AppHeader;
