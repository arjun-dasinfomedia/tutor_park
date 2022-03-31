import React from 'react'
import {
  getUserRole,
} from "./utility/utils";
import { CNavItem } from '@coreui/react'

var _nav = []

if (getUserRole() == "school-admin") {
    _nav = [
        {
            component: CNavItem,
            name: 'Home',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'Teacher Management',
            to: '/teacher-management',
        },
        {
            component: CNavItem,
            name: 'Student Management',
            to: '/student-management',
        },
        // {
        //     component: CNavItem,
        //     name: 'Invite User',
        //     to: '/invite-user',
        // },
        {
            component: CNavItem,
            name: 'Payment Transactions',
            to: '/payment',
        },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
} else if(getUserRole() == "school-tutor") {
    _nav = [
        {
            component: CNavItem,
            name: 'Home',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'Question & Answers',
            to: '/question-answers',
        },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
} else if(getUserRole() == "school-student") {
    _nav = [
        {
            component: CNavItem,
            name: 'Home',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'Question & Answers',
            to: '/question-answers',
        },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
}
else if 
(getUserRole() == "admin") {
    _nav = [
        {
            component: CNavItem,
            name: 'Home',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'Syllabus',
            to: '/syllabus',
        },
        {
            component: CNavItem,
            name: 'Levels',
            to: '/levels',
        },
        {
            component: CNavItem,
            name: 'Classes',
            to: '/class',
        },
        {
            component: CNavItem,
            name: 'Subjects',
            to: '/subject',
        },
        {
            component: CNavItem,
            name: 'Users',
            to: '/users',
        },
        {
            component: CNavItem,
            name: 'School Collaboration',
            to: '/school-collaboration',
        },
        {
            component: CNavItem,
            name: 'School Platform',
            to: '/school-platform',
        },
        {
            component: CNavItem,
            name: 'Earnings',
            to: '/Earnings',
        },
        {
            component: CNavItem,
            name: 'Access Rights',
            to: '/access-rights',
        },
        {
            component: CNavItem,
            name: 'Settings',
            to: '/settings',
        },
        {
            component: CNavItem,
            name: 'Email Instruction',
            to: '/server-email-instruction',
        },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
}
else if (getUserRole() == "tutor") {
    _nav = [
        {
            component: CNavItem,
            name: 'Home',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'To do',
            to: '/todo',
        },
        {
            component: CNavItem,
            name: 'Post & Search Job',
            to: '/post-search-job',
        },
        {
            component: CNavItem,
            name: 'Search Course',
            to: '/searchcourse',
        },
        {
            component: CNavItem,
            name: 'Find tutor',
            to: '/find-tutor',
        },
        {
            component: CNavItem,
            name: 'My Points',
            to: '/my-points',
        },
        {
            component: CNavItem,
            name: 'Feedbacks',
            to: '/feedbacks',
        },
        {
            component: CNavItem,
            name: 'Question & Answers',
            to: '/question-answers',
        },
        {
            component: CNavItem,
            name: 'Earnings',
            to: '/Earnings',
        },
        // {
        //     component: CNavItem,
        //     name: 'Razor Pay Testing',
        //     to: '/razor-pay',
        // },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
}
else if (getUserRole() == "student") {
    _nav = [
        {
            component: CNavItem,
            name: 'Home',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'To do',
            to: '/todo',
        },
        {
            component: CNavItem,
            name: 'Post & Search Job',
            to: '/post-search-job',
        },
        {
            component: CNavItem,
            name: 'Search Course',
            to: '/searchcourse',
        },
        {
            component: CNavItem,
            name: 'Find tutor',
            to: '/find-tutor',
        },
        {
            component: CNavItem,
            name: 'My Points',
            to: '/my-points',
        },
        {
            component: CNavItem,
            name: 'Feedbacks',
            to: '/feedbacks',
        },
        {
            component: CNavItem,
            name: 'Question & Answers',
            to: '/question-answers',
        },
        {
            component: CNavItem,
            name: 'Guardians/Parents',
            to: '/guardians-parents',
        },
        {
            component: CNavItem,
            name: 'Payment',
            to: '/payment',
        },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
}
else if (getUserRole() == "parent") {
    _nav = [
        {
            component: CNavItem,
            name: 'Dashboard',
            to: '/home',
        },
        {
            component: CNavItem,
            name: 'My Profile',
            to: '/my-profile',
        },
        {
            component: CNavItem,
            name: 'My Childrens',
            to: '/my-childrens',
        },
        {
            component: CNavItem,
            name: 'Post & Search Job',
            to: '/post-search-job',
        },
        {
            component: CNavItem,
            name: 'Search Course',
            to: '/searchcourse',
        },
        {
            component: CNavItem,
            name: 'Question & Answers',
            to: '/question-answers',
        },
        {
            component: CNavItem,
            name: 'Search a Tutor',
            to: '/find-tutor',
        },
        {
            component: CNavItem,
            name: 'My Points',
            to: '/my-points',
        },
        {
            component: CNavItem,
            name: 'My Transactions',
            to: '/payment',
        },
        {
            component: CNavItem,
            name: 'Invite a Friend',
            to: '/invite-friend',
        },
        {
            component: CNavItem,
            name: 'Logout',
            to: '/logout',
        },
    ]
}

export default _nav
