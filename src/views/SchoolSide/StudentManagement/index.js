import React from 'react'
import SchoolStudentList from "./SchoolStudentList"
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../../pages/page403/Page403";
import CustomAlertControl from '../../AlertMessage';

const StudentManagement = () => {
  return(
    <>
      
      {checkAccessPermission("user_view") ? (
        <>
        <CustomAlertControl />
        {/* School Student List tag */}
          <SchoolStudentList />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
    </>
  )
}

export default StudentManagement