import React from 'react'
import SchoolTutorList from "./SchootlTutorList"
import { checkAccessPermission } from "src/utility/utils";
import Page403 from "../../pages/page403/Page403";
import CustomAlertControl from '../../AlertMessage';

const TeacherManagement = () => {
  return(
    <>
    {checkAccessPermission("user_view") ? (
        <>
        <CustomAlertControl />
        {/* School Tutor list Tag */}
          <SchoolTutorList />
        </>
      ) : (
        <>
          <Page403 />
        </>
      )}
      
    </>
  )
}

export default TeacherManagement