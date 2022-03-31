import React from "react";
import CustomAlertControl from "../AlertMessage";
import AssignmentList from "./AssignmentList";
import StudentAssignment from "./StudentAssignedAssignment";
import { getUserData } from 'src/utility/utils'
import { checkAccessPermission } from 'src/utility/utils'
import Page403 from '../pages/page403/Page403'


const Assignment = () => {
  return (
    <>
      <CustomAlertControl />
      {/* For Tutor */}
      { (getUserData().role_name == "tutor" && checkAccessPermission('assignment_view')) ? 
      <AssignmentList />
      :
      // For Student
      (getUserData().role_name == "student" && checkAccessPermission('assignment_view')) ? 
    <StudentAssignment />
    :
    (<><Page403 /></>)
    }
    </>
  )

}
export default Assignment
