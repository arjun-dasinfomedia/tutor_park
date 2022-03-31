import React from 'react'
import SubjectList from './SubjectList'
import CustomAlertControl from "../AlertMessage";

const Syllabus = () => {

  return(
    <>
        <CustomAlertControl />
        {/* Subject List */}
        <SubjectList />
    </>
  )
}

export default Syllabus